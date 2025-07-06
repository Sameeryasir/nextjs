// CompensatingRecord.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Addnew from "./Addnew"; // Assuming Addnew component is still in the same directory
import Link from "next/link";

function CompensatingRecord() {
  // State for search form fields
  const [registrationDate, setRegistrationDate] = useState(""); // Initialize empty, can set a default if needed
  const [customerCode, setCustomerCode] = useState("");
  const [customerId, setCustomerId] = useState(""); // Kept for UI sync, not directly sent to new API

  // State for API response and pagination
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based index for API payload
  const [totalPages, setTotalPages] = useState(0);

  // State for Addnew modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to get current date in ISO (YYYY-MM-DD) format for dateTo
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Memoized function to fetch data from the API
  const fetchTableData = useCallback(async (searchParamsOverride = null) => {
    // Check for cookies before making the API call
    const cookieString = document.cookie;
    if (!cookieString) {
      console.warn("No cookies found. Redirecting to /auth/login.");
      if (typeof window !== 'undefined') {
        window.location.href = "/auth/login";
      }
      return; // Stop execution if no cookies
    }

    // Determine which search parameters to use (override from search form or current state)
    // This ensures that when search is triggered, the `fetchTableData` uses the newly set values immediately.
    const effectiveRegistrationDate = searchParamsOverride?.registrationDate !== undefined ? searchParamsOverride.registrationDate : registrationDate;
    const effectiveCustomerCode = searchParamsOverride?.customerCode !== undefined ? searchParamsOverride.customerCode : customerCode;
    
    const formData = new URLSearchParams();
    formData.append("ACTION", "49"); 
    formData.append("code", effectiveCustomerCode); // The 'code' parameter for the API
    formData.append("dateFrom", effectiveRegistrationDate); // The 'dateFrom' parameter for the API
    formData.append("dateTo", getCurrentDate()); // 'dateTo' is always current date
    formData.append("PAGE_INDEX", pageIndex.toString()); // API expects 0-based for request payload

    // Define the API endpoint (using the proxied path from next.config.js)
    const API_URL = "/api/compensating-exchange"; 

    try {
      console.log("Initiating API request to", API_URL, "with payload:", formData.toString());
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
          Accept: "application/json, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "keep-alive",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData.toString(),
      });

      console.log("API Response Status:", response.status, response.statusText);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error("Authentication failed or forbidden. Redirecting to /auth/login.");
            if (typeof window !== 'undefined') {
                window.location.href = "/auth/login";
            }
            return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data (CompensatingRecord):", data); // Inspect this for exact field names!

      setTableData(data.rows || []);
      // `total` can be an empty string, convert to 0 if so, otherwise parse
      setTotalRecords(data.total ? parseInt(data.total) : 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // API returns 1-based pageIndex, convert to 0-based for internal state
      setPageIndex(parseInt(data.pageIndex) - 1 || 0);

    } catch (error) {
      console.error("Error fetching table data for Compensating Records:", error);
      setTableData([]);
      setTotalRecords(0);
      setTotalPages(0);
      setPageIndex(0);
    }
  }, [pageIndex, registrationDate, customerCode]); // Dependencies for useCallback

  // Effect to trigger data fetching when component mounts or relevant states change
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]); // Depend on memoized fetchTableData

  // Handlers for pagination controls
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
    }
  };

  // Handler for search form submission
  const handleSearchSubmit = () => {
    // When a new search is performed, reset page index to 0
    setPageIndex(0); 
    // Pass current search form state values directly to fetchTableData.
    // This ensures fetchTableData uses the immediate state values for the search,
    // rather than waiting for setState to complete.
    fetchTableData({
      registrationDate: registrationDate,
      customerCode: customerCode,
    });
  };

  // Handler for "Refresh" button (reloads data with current search/pagination)
  const handleRefresh = () => {
    // This will cause `fetchTableData` to re-run with the current state values
    fetchTableData();
  };

  return (
    <div className="w-full bg-white p-4 md:p-6">
      {/* Addnew Modal */}
      <Addnew isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="w-full bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            List Of Compensating
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base hover:cursor-pointer"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div>
              <Link href="/bussiness/compensation/information">
                <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer">
                  <Plus size={16} />
                  <span className="hidden sm:inline">New</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters (Search Form) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Registration Date Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Registration Date
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Customer Information Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Customer Information
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
                placeholder="Code"
                className="w-16 sm:w-20 border border-gray-300 rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
              <input
                type="text"
                value={customerId} // This field is not directly used in the API request for search
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Customer ID"
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center text-sm sm:text-lg hover:cursor-pointer "
              >
                ...
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerCode("");
                  setCustomerId("");
                }}
                className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              onClick={handleSearchSubmit} // Trigger search on click
              className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                onClick={() => handlePageChange(0)}
                style={{ opacity: pageIndex === 0 ? 0.5 : 1, cursor: pageIndex === 0 ? 'not-allowed' : 'pointer' }}
              />
              <ChevronLeft
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                onClick={() => handlePageChange(pageIndex - 1)}
                style={{ opacity: pageIndex === 0 ? 0.5 : 1, cursor: pageIndex === 0 ? 'not-allowed' : 'pointer' }}
              />
              <ChevronRight
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 cursor-pointer"
                onClick={() => handlePageChange(pageIndex + 1)}
                style={{ opacity: pageIndex >= totalPages - 1 ? 0.5 : 1, cursor: pageIndex >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
              />
              <ChevronLast
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 cursor-pointer"
                onClick={() => handlePageChange(totalPages - 1)}
                style={{ opacity: pageIndex >= totalPages - 1 ? 0.5 : 1, cursor: pageIndex >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
              />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600">
                Total {totalRecords} Records, Record{" "}
                {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                {pageIndex + 1}/{totalPages}
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600">Turn To Page</span>
              <input
                type="text"
                className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                value={pageIndex + 1}
                onChange={handlePageInputChange}
                onBlur={fetchTableData} // Fetch data when input loses focus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchTableData(); // Fetch data on Enter key press
                  }
                }}
              />
              <ChevronRight
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                onClick={fetchTableData} // Click to submit page number
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base">
            <thead>
              <tr className="bg-[#FF9900] text-white">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Code</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">
                  Full Name
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Date</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden md:table-cell">
                  Types
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden lg:table-cell">
                  Biz-Types
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right">Amount</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">
                  Operator
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="transition hover:bg-gray-100 even:bg-gray-50"
                  >
                    <td className="px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2">
                      <span className="inline-block w-4 text-orange-500">⚡</span>
                      {row.Code}
                    </td>
                    {/* Full Name: Use 'FullName' from the API response */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                      {row.FullName || ''}
                    </td>
                    {/* Date: Use 'BzDate' from the API response */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3">{row.BzDate}</td>
                    {/* Types: Use 'SupplyTypeName' from the API response */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                      {row.SupplyTypeName || ''}
                    </td>
                    {/* Biz-Types: Use 'RefTypeName' from the API response */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                      {row.RefTypeName || ''}
                    </td>
                    {/* Amount: Use 'AMT' from the API response and parse it to float */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold text-gray-700">
                      {typeof row.AMT === 'string' ? (parseFloat(row.AMT) || 0).toFixed(2) : (row.AMT || 0).toFixed(2)}
                    </td>
                    {/* Operator: Use 'COperator' from the API response */}
                    <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                      {row.COperator || ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CompensatingRecord;
