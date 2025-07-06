"use client";
import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react'; // Assuming RefreshCw is used
import { useRouter } from 'next/navigation'; // For redirection

function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: "",
    telephone: "",
    fax: "",
    zipCode: "",
    contactAddress: "",
    website: "",
    email: "",
    bank: "",
    bankAccount: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submit button loader

  console.log("Registration Utility Page: Component rendered.");

  useEffect(() => {
    console.log("Registration Utility Page: useEffect triggered for data fetch.");
    fetchRegisterInfo();
  }, []);

  const fetchRegisterInfo = async () => {
    console.log("Registration Utility Page: fetchRegisterInfo called.");
    setIsLoading(true);
    setError(null);

    const cookieString = document.cookie;
    console.log("Registration Utility Page: Current cookie string:", cookieString);

    if (!cookieString || cookieString.trim() === "") {
      console.warn("Registration Utility Page: No cookies found or cookie string is empty. Redirecting to /auth/login.");
      router.push("/auth/login");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registration Utility Page: Attempting to fetch from /api/utility-reginfo");
      const response = await fetch("/api/utility-reginfo", {
        method: "POST", // API is a POST request
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
        },
        body: new URLSearchParams("").toString(), // Empty body for initial fetch
      });

      console.log("Registration Utility Page: Fetch response received. Status:", response.status, "Status Text:", response.statusText);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Registration Utility Page: HTTP error! status: ${response.status}`, errorBody);
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
      }

      const htmlText = await response.text();
      console.log("Registration Utility Page: Raw HTML response:", htmlText);

      // --- HTML Parsing Logic ---
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      console.log("Registration Utility Page: DOMParser created document:", doc);

      // More robust extractValue function
      const extractValue = (selector, type = 'text', attribute = null) => {
        console.log(`  Attempting to extract for selector: "${selector}" (type: ${type})`);
        const element = doc.querySelector(selector);
        
        if (element) {
          console.log(`    Element found:`, element);
          let rawValue;
          if (type === 'value') {
            rawValue = element.value;
            console.log(`    Raw .value:`, rawValue);
          } else if (attribute) { // For attributes like 'src' for images
            rawValue = element.getAttribute(attribute);
            console.log(`    Raw attribute value (${attribute}):`, rawValue);
          } else { // type === 'text'
            // Use innerText for better compatibility across browsers and handling mixed content
            rawValue = element.innerText;
            console.log(`    Raw .innerText:`, rawValue);
          }
          // Clean up common HTML entities and excess whitespace
          const cleanedValue = rawValue?.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim() || '';
          console.log(`    Cleaned value:`, cleanedValue);
          return cleanedValue;
        } else {
          console.warn(`    Element NOT FOUND for selector: "${selector}"`);
        }
        return '';
      };

      // Function to extract value from a row where the label is in the first td
      const extractRowValue = (labelContent) => {
          const rowElement = Array.from(doc.querySelectorAll('table.TableBlock tr'))
              .find(tr => {
                  const labelTd = tr.querySelector('td.TableContent');
                  // Use textContent to ignore child nodes like <b>, <font>
                  return labelTd && labelTd.textContent.includes(labelContent);
              });
          
          if (rowElement) {
              const dataTd = rowElement.querySelector('td.TableData');
              if (dataTd) {
                  // For data TDs, directly get innerText and clean it.
                  const rawValue = dataTd.innerText;
                  const cleanedValue = rawValue?.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim() || '';
                  console.log(`  Extracting row value for "${labelContent}":`, cleanedValue);
                  return cleanedValue;
              }
          }
          console.warn(`  Row or data TD not found for label: "${labelContent}"`);
          return "";
      };


      const parsedData = {
        companyName: extractRowValue("Company Name"),
        telephone: extractValue("#edtTelNo", "value"),
        fax: extractValue("#edtFaxNo", "value"),
        zipCode: extractValue("#edtPostCode", "value"),
        contactAddress: extractValue("#edtAddress", "value"),
        website: extractValue("#edtUrl", "value"),
        email: extractValue("#edtEmail", "value"),
        bank: extractValue("#edtBankName", "value"),
        bankAccount: extractValue("#edtBankCode", "value"),
      };

      setFormData(parsedData);
      console.log("Registration Utility Page: Final Parsed Data State:", parsedData);

      if (Object.values(parsedData).every(val => val === "")) {
        console.warn("Registration Utility Page: All parsed fields are empty. This might indicate incorrect selectors or an unexpected HTML structure.");
        setError("Data could not be parsed. Check console for selector warnings.");
      }

    } catch (err) {
      console.error("Registration Utility Page: Error during fetch or parsing:", err);
      setError("Failed to load registration information. Please check network or API response format. See console for details.");
      setFormData({ // Clear data on error
        companyName: "",
        telephone: "",
        fax: "",
        zipCode: "",
        contactAddress: "",
        website: "",
        email: "",
        bank: "",
        bankAccount: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Input changed: ${name} = ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration Utility Page: Submit button clicked. Form data:", formData);
    setIsSubmitting(true);
    setError(null);

    const cookieString = document.cookie;
    if (!cookieString || cookieString.trim() === "") {
      console.warn("Registration Utility Page: No cookies found for submission. Redirecting.");
      router.push("/auth/login");
      setIsSubmitting(false);
      return;
    }

    // Prepare data for submission (based on the provided script's cpySaveData function)
    const params = new URLSearchParams();
    params.append("ACTION", "1"); // Assuming ACTION 1 for submit based on the script's outer params
    
    // Mapping form data to expected API parameters (Obj in original script)
    params.append("TelNo", formData.telephone);
    params.append("FaxNo", formData.fax);
    params.append("PostCode", formData.zipCode);
    params.append("Address", formData.contactAddress);
    params.append("Url", formData.website);
    params.append("Email", formData.email);
    params.append("BankName", formData.bank);
    params.append("BankCode", formData.bankAccount);
    
    try {
      console.log("Registration Utility Page: Submitting data to sys/utility/exchange.php");
      // You need a rewrite rule in next.config.mjs for this specific submission API if it's different from /api/utility-reginfo
      // Example new rewrite rule in next.config.mjs:
      // { source: '/api/utility-submit-data', destination: 'http://localhost:38080/general/sys/utility/exchange.php' },
      const response = await fetch("/api/utility-exchange", { // This URL needs to match your rewrite for submission
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
        },
        body: params.toString(),
      });

      console.log("Registration Utility Page: Submission response received. Status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Submission failed: ${response.status} - ${errorText}`);
      }

      const responseText = await response.text();
      console.log("Registration Utility Page: Submission response text:", responseText);

      alert("Submitted successfully!");
      window.location.reload(); // Reload page to show fresh data

    } catch (err) {
      console.error("Registration Utility Page: Error during submission:", err);
      setError("Failed to submit data: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    console.log("Registration Utility Page: Refresh button clicked. Re-fetching data.");
    fetchRegisterInfo();
  };

  return (
    <div className="min-h-screen bg-white">
      {isLoading || isSubmitting ? (
        <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      ) : null}
      <div
        className={`w-full bg-white mt-10 transition-opacity duration-300 ${isLoading || isSubmitting ? "opacity-50" : "opacity-100"}`}
      >
        <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
          <section>
            <h1 className="text-xl font-medium text-gray-900 mb-6">
              Registration
            </h1>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline ml-2">{error}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg onClick={() => setError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
            )}
            <div className="space-y-4">
              {/* Company Name (Read-only as per HTML response, no input tag) */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Company Name</label>
                <span className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700">
                  {formData.companyName || '-'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Fax</label>
                <input
                  type="text"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">
                  Contact Address
                </label>
                <input
                  type="text"
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Email</label>
                <input
                  type="email" // Changed to type="email" for better validation
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Bank</label>
                <input
                  type="text"
                  name="bank"
                  value={formData.bank}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">
                  Bank Account
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
            </div>
            <div className="flex gap-10 mt-10 justify-center">
              <button
                type="submit" // Changed to type="submit" to trigger form's onSubmit
                onClick={handleSubmit} // Explicitly call handleSubmit on click
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                disabled={isSubmitting} // Disable during submission
              >
                Submit
              </button>
              <button
                type="button" // Important: type="button" to prevent form submission
                onClick={handleRefresh}
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                disabled={isSubmitting}
              >
                Refresh
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
