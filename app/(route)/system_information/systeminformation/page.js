"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  // Other Lucide icons can be added if needed
} from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [registerData, setRegisterData] = useState({
    key: "",
    licence: "",
    companyName: "",
    version: "",
    databaseVersion: "", // Initialize databaseVersion
    functions: "",
    allowCustomers: "",
    allowOperators: "",
    copyright: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Register Page: Component rendered.");

  useEffect(() => {
    console.log("Register Page: useEffect triggered for data fetch.");
    fetchRegisterData();
  }, []);

  const fetchRegisterData = async () => {
    console.log("Register Page: fetchRegisterData called.");
    setIsLoading(true);
    setError(null); // Clear previous errors

    const cookieString = document.cookie;
    console.log("Register Page: Current cookie string:", cookieString);

    if (!cookieString || cookieString.trim() === "") {
      console.warn("Register Page: No cookies found or cookie string is empty. Redirecting to /auth/login.");
      router.push("/auth/login");
      setIsLoading(false); // Stop loading if redirecting
      return;
    }

    try {
      console.log("Register Page: Attempting to fetch from /api/register-info");
      const response = await fetch("/api/register-info", {
        method: "POST", // API is a POST request
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Often required for PHP POST
          Cookie: cookieString,
        },
        body: new URLSearchParams("").toString(), // Empty body if no specific payload required
      });

      console.log("Register Page: Fetch response received. Status:", response.status, "Status Text:", response.statusText);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Register Page: HTTP error! status: ${response.status}`, errorBody);
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
      }

      const htmlText = await response.text();
      console.log("Register Page: Raw HTML response:", htmlText);

      // --- HTML Parsing Logic ---
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      console.log("Register Page: DOMParser created document:", doc); // Log the parsed document object


      // Robust extractValue function with enhanced logging
      const extractValue = (selector, type = 'text') => { // type: 'text', 'value'
        console.log(`Extracting value for selector: "${selector}" (type: ${type})`);
        const element = doc.querySelector(selector);
        
        if (element) {
          console.log(`  Found element for selector: "${selector}"`, element);
          let rawValue;
          if (type === 'value') {
            // For input and textarea elements, 'value' property is usually more reliable
            rawValue = element.value;
            console.log(`  Raw element.value:`, rawValue);
          } else { // type === 'text'
            // Use innerText for comprehensive text extraction from other elements
            rawValue = element.innerText;
            console.log(`  Raw innerText value:`, rawValue);
          }
          const cleanedValue = rawValue?.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim() || '';
          console.log(`  Cleaned value:`, cleanedValue);
          return cleanedValue;
        } else {
          console.warn(`  Element not found for selector: "${selector}"`);
        }
        return ""; // Return empty string if element not found or value is empty
      };

      const extractedData = {
        key: extractValue("#edtCode", "value"), // Get 'value' attribute for input
        licence: extractValue("#edtLicence", "value"), // Now explicitly get 'value' property for textarea
        companyName: extractValue("tbody#bcadvInfo tr:nth-of-type(2) td.TableData"),
        version: extractValue("tbody#bcadvInfo tr:nth-of-type(3) td.TableData"),
        functions: extractValue("tbody#bcadvInfo tr:nth-of-type(4) td.TableData"),
        allowCustomers: extractValue("tbody#bcadvInfo tr:nth-of-type(5) td.TableData"),
        allowOperators: extractValue("tbody#bcadvInfo tr:nth-of-type(6) td.TableData"),
        copyright: extractValue("tbody#bcadvInfo tr:nth-of-type(7) td.TableData"),
      };
      
      // Extract Database Version from the Version string if it exists
      const versionText = extractedData.version;
      const dbVersionMatch = versionText.match(/\(Internal ([\d.]+)\)/);
      console.log("Register Page: Version text for DB version extraction:", versionText);
      if (dbVersionMatch && dbVersionMatch[1]) {
        extractedData.databaseVersion = dbVersionMatch[1];
        // Clean up version string
        extractedData.version = versionText.replace(/\(Internal [\d.]+\)/, '').replace(/, Network, Trial\([\d]+\s*Days\)/, '').trim();
        console.log("Register Page: Extracted Database Version:", extractedData.databaseVersion);
        console.log("Register Page: Cleaned Version string:", extractedData.version);
      } else {
        extractedData.databaseVersion = "-"; // Set to '-' if not found
        console.log("Register Page: Database Version not found in string.");
      }

      setRegisterData(extractedData);
      console.log("Register Page: Final Parsed Data State:", extractedData);

      // Check if all essential data fields are empty, might indicate parsing failure
      if (Object.values(extractedData).every(val => val === "" || val === "-")) {
          setError("Parsed data is empty. HTML structure might have changed or selectors are incorrect. Check console for selector warnings.");
      }

    } catch (err) {
      console.error("Register Page: Error during fetch or parsing:", err);
      setError("Failed to load registration information. Please check the API response format or selectors. See console for details.");
      setRegisterData({ // Clear data on error
        key: "",
        licence: "",
        companyName: "",
        version: "",
        databaseVersion: "",
        functions: "",
        allowCustomers: "",
        allowOperators: "",
        copyright: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log("Register Page: Refresh button clicked. Re-fetching data.");
    fetchRegisterData();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {isLoading && (
        <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      )}

      <div className={`w-full bg-white transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Key and License
          </h1>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40 flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <div className="max-w-7xl text-left mb-14 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium text-gray-700">
                  Key
                </label>
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={registerData.key}
                  readOnly // Make read-only
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium text-gray-700">
                  License
                </label>
                <textarea
                  rows={5}
                  className="flex-1 p-2 h-[150px] border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto"
                  value={registerData.licence}
                  readOnly // Make read-only
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Register Information
        </h1>
        <div className="mt-10">
          <div className="space-y-4 text-sm text-gray-600 ">
            <div className="flex ">
              <span className="w-40 font-medium">Company Name</span>
              <span>{registerData.companyName || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Version</span>
              <span>{registerData.version || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Database Version</span>
              <span>{registerData.databaseVersion || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Functions</span>
              <span>{registerData.functions || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Allow Customers</span>
              <span>{registerData.allowCustomers || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Allow Operators</span>
              <span>{registerData.allowOperators || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-40 font-medium">Copyright</span>
              <span className="text-blue-600 font-semibold">
                {registerData.copyright || "-"}
              </span>
            </div>
          </div>
        </div>
        <div className="ml-40 mt-10 flex gap-4">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
            Register Again
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
