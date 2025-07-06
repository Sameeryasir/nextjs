"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Check, // For Active/Status indicators if needed
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary (e.g., ../utils/apiFetcher)

function IdentifyCustomerDialog({ isOpen, onClose, onSelect }) { // onSelect will pass identified customer data back
  const router = useRouter();
  const dialogRef = useRef(null); // Ref for click outside
  const searchInputRef = useRef(null); // Ref for focusing search input

  // Search filters for the dialog
  const [meterNumFilter, setMeterNumFilter] = useState("");
  const [accountNoFilter, setAccountNoFilter] = useState(""); // Assuming 'refCode' or similar from previous APIs
  const [codeFilter, setCodeFilter] = useState(""); // Assuming 'code' from previous APIs
  const [fullNameFilter, setFullNameFilter] = useState(""); // Assuming 'cstName' from previous APIs

  // Dialog's internal table data and pagination
  const [customerRecords, setCustomerRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially as data fetches on search click
  const [apiError, setApiError] = useState(null); // To store API error messages (like SQL syntax error)
  const [internalSelectedCustomer, setInternalSelectedCustomer] = useState(null); // Internally selected row

  console.log("IdentifyCustomerDialog: Component rendered. isOpen:", isOpen);

  // Focus search input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      // Reset filters when dialog opens for a fresh start
      setMeterNumFilter("");
      setAccountNoFilter("");
      setCodeFilter("");
      setFullNameFilter("");
      setPageIndex(0); // Reset page to 0
      setCustomerRecords([]); // Clear previous results
      setTotalRecords(0);
      setTotalPages(0);
      setApiError(null); // Clear any previous errors
      setInternalSelectedCustomer(null); // Clear previous selection
    }
  }, [isOpen]);

  const fetchCustomerData = async () => {
    console.log("IdentifyCustomerDialog: fetchCustomerData called.");
    setIsLoading(true);
    setApiError(null); // Clear previous errors

    const formData = new URLSearchParams();
    // Assuming API requires a specific ACTION for searching customers.
    // Based on the provided payload for public/exchange.php, no ACTION is given.
    // So I will use ACTION: 1 (common default) or if you provide a specific ACTION for this API,
    // please replace it.
    formData.append("ACTION", "1"); // Placeholder, please specify if API uses a different ACTION
    if (meterNumFilter) formData.append("meterNum", meterNumFilter);
    if (accountNoFilter) formData.append("accountNo", accountNoFilter); // Map to whatever API expects
    if (codeFilter) formData.append("code", codeFilter);
    if (fullNameFilter) formData.append("fullName", fullNameFilter);

    // This API doesn't specify pagination in the prompt, but it's good practice to send it
    formData.append("PAGE_INDEX", (pageIndex + 1).toString());

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("IdentifyCustomerDialog: API Payload:", payloadObject);

    try {
      // API URL for Public Exchange, assuming it handles customer search
      const data = await apiFetcher("/api/public-exchange", "POST", formData, router);

      // Check if the API response itself contains the SQL error message
      if (data.errorMessage && typeof data.errorMessage === 'string' && data.errorMessage.includes("SQL syntax")) {
        setApiError(data.errorMessage);
        setCustomerRecords([]);
        setTotalRecords(0);
        setTotalPages(0);
        console.error("IdentifyCustomerDialog: API returned SQL syntax error:", data.errorMessage);
        return; // Stop processing
      }

      setCustomerRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("IdentifyCustomerDialog: Data fetched successfully for customers.");

    } catch (error) {
      console.error("IdentifyCustomerDialog: Error fetching customer data:", error);
      // If error from apiFetcher contains SQL syntax error
      if (error.message && typeof error.message === 'string' && error.message.includes("SQL syntax")) {
          setApiError(error.message);
      } else {
          setApiError("Failed to fetch data. Please try again.");
      }
      setCustomerRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSearch = () => {
    console.log("IdentifyCustomerDialog: Dialog search triggered. Resetting pageIndex to 0.");
    setPageIndex(0); // Reset page to 0 on new search, useEffect will re-fetch
    // Force a fetch if filters changed but pageIndex is still 0
    if (pageIndex === 0) {
      fetchCustomerData();
    }
  };

  const handlePageChange = (newPage) => {
    console.log("IdentifyCustomerDialog: handlePageChange called. New page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") return;
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  const handleRowClick = (customer) => {
    console.log("IdentifyCustomerDialog: Row clicked:", customer);
    setInternalSelectedCustomer(customer); // Set internal selection
  };

  const handleOkClick = () => {
    console.log("IdentifyCustomerDialog: OK button clicked. Internal selected customer:", internalSelectedCustomer);
    if (internalSelectedCustomer && onSelect) {
      onSelect(internalSelectedCustomer); // Pass the internally selected customer back to parent
    }
    onClose(); // Close the dialog
  };

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);


  if (!isOpen) {
    console.log("IdentifyCustomerDialog: Not open, returning null.");
    return null;
  }

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Identify Customer</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Search fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Meter Num</label>
              <input
                ref={searchInputRef}
                type="text"
                name="meterNum"
                value={meterNumFilter}
                onChange={(e) => setMeterNumFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Account No</label>
              <input
                type="text"
                name="accountNo"
                value={accountNoFilter}
                onChange={(e) => setAccountNoFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Code</label>
              <input
                type="text"
                name="code"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullNameFilter}
                onChange={(e) => setFullNameFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleDialogSearch}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40 flex items-center justify-center gap-2"
            >
              <Search size={16} /> Identify Customer
            </button>
          </div>

          <div className="mt-4 sm:mt-6">
            {/* Dialog's Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-2 rounded gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === 0}
                  onClick={() => handlePageChange(0)}
                >
                  <ChevronFirst size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === 0}
                  onClick={() => handlePageChange(pageIndex - 1)}
                >
                  <ChevronLeft size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                  onClick={() => handlePageChange(pageIndex + 1)}
                >
                  <ChevronRight size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                  onClick={() => handlePageChange(totalPages - 1)}
                >
                  <ChevronLast size={16} className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left whitespace-nowrap">
                Total {totalRecords} Records, Record{" "}
                {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                {pageIndex + 1}/{totalPages}, Turn To Page
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageIndex + 1}
                  onChange={handlePageInputChange}
                  onBlur={fetchCustomerData} // Re-fetch on blur
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchCustomerData();
                    }
                  }}
                  className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded text-center"
                />
                <span className="text-green-500 cursor-pointer hover:text-green-600">
                  →
                </span>
              </div>
            </div>

            {/* API Error Message Box */}
            {apiError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">API Error:</strong>
                <span className="block sm:inline ml-2">{apiError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg onClick={() => setApiError(null)} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
              </div>
            )}

            {/* Dialog's Table */}
            <div className="overflow-x-auto mt-2 sm:mt-4">
              {isLoading ? (
                <div className="text-center p-4">
                  {/* Loader similar to your previous implementation */}
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FF9900] mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading customer data...</p>
                </div>
              ) : (
                <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Times
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Date
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Meter Num.
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Power
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Payable
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Operator
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerRecords.length > 0 ? (
                      customerRecords.map((row, index) => (
                        <tr
                          key={row.ID || index} // Using ID if available, otherwise index
                          className={`border-b hover:bg-gray-50 text-xs sm:text-sm cursor-pointer ${
                            internalSelectedCustomer?.ID === row.ID ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => handleRowClick(row)} // Just set internal selection on click
                        >
                          {/* Map API response fields to table columns */}
                          <td className="px-2 sm:px-4 py-1">{row.Times || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.Date || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.MeterNum || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.Power || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.Payable || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.Operator || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-2 sm:px-4 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500">
                          No customer records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOkClick} // Call handleOkClick to pass selected data
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IdentifyCustomerDialog;
