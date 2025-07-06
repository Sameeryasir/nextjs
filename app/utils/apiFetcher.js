// utils/apiFetcher.js
import { useRouter } from "next/navigation"; // Keep this import here

/**
 * Reusable function for making authenticated API requests.
 * Checks for cookies and redirects to login if not found.
 * Handles both object responses with a 'state' field and direct array responses.
 *
 * @param {string} url - The API endpoint URL (e.g., '/api/meter-model').
 * @param {string} method - The HTTP method (e.g., 'POST', 'GET').
 * @param {URLSearchParams} payload - The FormData payload for POST requests.
 * @param {object} router - The Next.js router instance from useRouter().
 * @returns {Promise<object|Array>} - A promise that resolves with the parsed JSON response (object or array).
 * @throws {Error} - Throws an error if the request fails or API returns an error state/unexpected format.
 */
export async function apiFetcher(url, method, payload, router) {
  console.log(`apiFetcher: Called for URL: ${url}`);

  const cookieString = document.cookie;
  console.log("apiFetcher: Current cookie string:", cookieString);

  if (!cookieString || cookieString.trim() === "") {
    console.warn("apiFetcher: No cookies found or cookie string is empty. Redirecting to /auth/login.");
    // Use window.location.href or router.push, depending on your app's needs.
    // router.push is preferred in Next.js client components.
    router.push("/auth/login");
    throw new Error("Authentication required: No cookies found."); // Stop execution
  }

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: cookieString,
    Accept: "application/json, text/javascript, */*", // Requesting JSON or JavaScript
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest", // Often expected by PHP backends
  };

  const config = {
    method: method,
    headers: headers,
    body: payload.toString(), // For POST requests with URLSearchParams
  };

  try {
    console.log(`apiFetcher: Attempting to fetch from ${url} with method ${method} and payload: ${payload.toString()}`);
    const response = await fetch(url, config);

    console.log(`apiFetcher: Fetch response received. Status: ${response.status}, Status Text: ${response.statusText}`);
    console.log("apiFetcher: Response headers:", response.headers);

    if (!response.ok) {
      const errorBody = await response.text(); // Get raw response body for debugging
      console.error(`apiFetcher: HTTP error! Status: ${response.status}`, errorBody);
      throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
    }

    const data = await response.json(); // Attempt to parse as JSON
    console.log("apiFetcher: Raw JSON response:", data); // Log raw JSON response

    // FIX: Check if data is an array directly
    if (Array.isArray(data)) {
      console.log("apiFetcher: Response is a JSON array, returning directly.");
      return data;
    } else if (typeof data === 'object' && data !== null && data.state !== undefined) {
      // Original logic for objects with a 'state' field
      if (data.state === "0") {
        console.log("apiFetcher: Response is a JSON object with state '0', returning data.");
        return data;
      } else {
        console.error("apiFetcher: API returned an error state (data.state is not '0'):", data);
        throw new Error(`API error: ${JSON.stringify(data)}`);
      }
    } else {
      // Handle cases where response is neither a standard object with 'state' nor a direct array
      console.error("apiFetcher: Unexpected API response format:", data);
      throw new Error(`API error: Unexpected response format: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error("apiFetcher: Error during fetch operation:", error);
    // Re-throw the error for the calling component to handle (e.g., set local error state)
    throw error;
  }
}
