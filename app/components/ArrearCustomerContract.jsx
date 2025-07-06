"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import Link from "next/link";
import * as XLSX from "xlsx"; // Import xlsx library
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Import the reusable API fetcher

import SearchProjectModel from "./SearchProjectmodel"; // The dialog for selecting projects

// Helper function to get today's date in YYYY-MM-DD format (for default Date To)
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CustomerContract() {
  const router = useRouter();

  // State for search form inputs
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState(getTodayDate()); // Default to current date
  const [meterNumFilter, setMeterNumFilter] = useState("");
  const [refCodeFilter, setRefCodeFilter] = useState(""); // This seems to map to 'Code' or 'RegCode' in API response
  const [codeFilter, setCodeFilter] = useState(""); // Based on payload, different from refCode?
  const [cstNameFilter, setCstNameFilter] = useState(""); // Maps to FullName
  const [projectCodeFilter, setProjectCodeFilter] = useState(""); // Selected from popup
  const [projectNameDisplay, setProjectNameDisplay] = useState(""); // Display name
  const [statusFilter, setStatusFilter] = useState("");

  // State for fetched table data and pagination
  const [customerContracts, setCustomerContracts] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  const [activeTab, setActiveTab] = useState("payment"); // Controls Payment List / Adjustment List tabs
  const [showProjectPopup, setShowProjectPopup] = useState(false); // State for project selection modal visibility

  const statusOptions = ["Cancelled", "Once and Finished", "Paying", "Finished", "Pause"];

  console.log("CustomerContract: Component rendered.");

  // Fetch data on component mount and when pageIndex or search filters change
  useEffect(() => {
    console.log("CustomerContract: useEffect triggered for data fetch.");
    fetchCustomerContractsData();
  }, [pageIndex, dateFromFilter, dateToFilter, meterNumFilter, refCodeFilter, codeFilter, cstNameFilter, projectCodeFilter, statusFilter]);

  const fetchCustomerContractsData = async () => {
    console.log("CustomerContract: fetchCustomerContractsData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "7"); // As per new API payload for customer contracts
    if (meterNumFilter) formData.append("meterNum", meterNumFilter);
    if (refCodeFilter) formData.append("refCode", refCodeFilter); // Assuming this is for reference code
    if (codeFilter) formData.append("code", codeFilter); // Assuming this is for general code search
    if (cstNameFilter) formData.append("cstName", cstNameFilter);
    if (projectCodeFilter) formData.append("projectCode", projectCodeFilter);
    if (statusFilter) formData.append("status", statusFilter);

    // Date filters - ensure YYYY-MM-DD format
    if (dateFromFilter) formData.append("dateFrom", dateFromFilter);
    if (dateToFilter) formData.append("dateTo", dateToFilter);

    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("CustomerContract: Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/arrear-projects", "POST", formData, router); // Using existing arrear-projects endpoint

      setCustomerContracts(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("CustomerContract: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("CustomerContract: Error fetching data via apiFetcher:", error);
      setCustomerContracts([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("CustomerContract: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("CustomerContract: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("CustomerContract: handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("CustomerContract: Setting pageIndex from input to (0-based):", page - 0); // Corrected log message
    } else {
      console.log("CustomerContract: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("CustomerContract: Refresh button clicked. Re-fetching data.");
    fetchCustomerContractsData(); // Force re-fetch with current filters and page
  };

  const handleSearch = () => {
    console.log("CustomerContract: Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page. useEffect will trigger fetch.
  };

  const handleProjectSelect = (project) => {
    console.log("CustomerContract: Project selected from popup:", project);
    setProjectCodeFilter(project.Code); // Set the project code for filtering
    setProjectNameDisplay(project.Description); // Display the project name
    setShowProjectPopup(false); // Close the dialog
    setPageIndex(0); // Reset page to 0 to trigger new search with selected project
  };

  // Data for Payment List tab (static as no API provided for tabs)
  const paymentListData = [
    { date: "2025-05-28", types: "Payment", balance: "9900.00", amount: "2000.00", payable: "7900.00", extraPay: "0.00", interest: "100.00", frozenFee: "50.00" },
    { date: "2025-05-28", types: "Payment", balance: "9800.00", amount: "2100.00", payable: "7700.00", extraPay: "0.00", interest: "150.00", frozenFee: "75.00" },
  ];

  // Data for Adjustment List tab (static as no API provided for tabs)
  const adjustmentListData = [
    { date: "2025-05-28", payMethod: "Pre Times", previousBalance: "10000.00", adjustment: "500.00", totalBalance: "9500.00", new: "0.00", payingDate: "2025-05-28", operator: "John Doe" },
    { date: "2025-05-28", payMethod: "Postpaid", previousBalance: "9900.00", adjustment: "300.00", totalBalance: "9600.00", new: "0.00", payingDate: "2025-05-28", operator: "Jane Smith" },
  ];

  // Function to export data to Excel
  const exportToExcel = () => {
    console.log("CustomerContract: Export to Excel clicked.");
    let data = [];
    let fileName = "";
    let sheetName = "";
    let headers = [];

    // Main customer contracts data for Excel
    data = customerContracts;
    fileName = "Customer_Contracts.xlsx";
    sheetName = "Customer Contracts";
    headers = [
      "Code", "Ref Code", "Execute Date", "Project Name", "Meter Number",
      "Full Name", "Amount", "Balance", "Paid", "Paid Date", "Pay Daily/Monthly",
      "Pay Type Name", "Status", "Operator", "Active"
    ];

    const mappedData = data.map(row => [
      row.Code || "-",
      row.RegCode || "-", // RefCode
      row.ExecDate || "-",
      row.ProjecName || "-", // Project Name
      row.MeterNum || "-",
      row.FullName || "-",
      row.AMT || "-",
      row.Balance || "-",
      row.Paid || "-",
      row.PaidDate || "-",
      row.PayDM || "-",
      row.PayTypeName || "-",
      row.Status || "-",
      row.COperator || "-",
      row.Actived === "Y" ? "Yes" : "No",
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...mappedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
    console.log(`${fileName} exported.`);
  };

  return (
    <div className="bg-white p-6">
      {/* Loading spinner overlay */}
      {isLoading && (
        <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      )}

      <div className={`w-full bg-white transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Customer Contract List</h1> {/* Updated title */}
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <Link href="/arrearcustomernew"> {/* Link for new contract */}
              <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
                <Plus size={18} />
                New
              </button>
            </Link>
            <button
              onClick={exportToExcel}
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]"
            >
              <FileSpreadsheet size={18} />
              Excel
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white max-w-5xl p-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Date From */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Date From</label>
              <input
                type="date"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Date To</label>
              <input
                type="date"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
              />
            </div>

            {/* Meter Number */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Meter Number</label>
              <input
                type="text"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={meterNumFilter}
                onChange={(e) => setMeterNumFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>

            {/* Full Name */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Full Name</label>
              <input
                type="text"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={cstNameFilter}
                onChange={(e) => setCstNameFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>

            {/* Code (mapped to refCode in payload for now) */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Code</label>
              <input
                type="text"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>

            {/* Account No (not in payload for ACTION 7, leaving as UI input) */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Account No</label>
              <input
                type="text"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={refCodeFilter} // Using refCodeFilter for Account No input based on the response's RegCode
                onChange={(e) => setRefCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
            </div>

            {/* Projects */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Projects</label>
              <input
                type="text"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                value={projectNameDisplay} // Display project name from selected popup
                readOnly
              />
              <button
                type="button"
                className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
                onClick={() => setShowProjectPopup(true)} // Open Project selection popup
              >
                ...
              </button>
              <button
                type="button"
                className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
                onClick={() => { setProjectCodeFilter(""); setProjectNameDisplay(""); handleSearch(); }} // Clear project filter
              >
                ×
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <label className="w-32 text-sm text-gray-500 mr-4">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              >
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6">
            <button
              onClick={handleSearch}
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* First Table Section (Customer Contracts) */}
        <div className="bg-white rounded-lg shadow overflow-x-auto mt-6">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Pagination Controls */}
              <div className="flex gap-1 sm:gap-2">
                <ChevronFirst
                  className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(0)}
                  disabled={pageIndex === 0}
                />
                <ChevronLeft
                  className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(pageIndex - 1)}
                  disabled={pageIndex === 0}
                />
                <ChevronRight
                  className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                />
                <ChevronLast
                  className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600 whitespace-nowrap">
                  Total {totalRecords} Records
                </span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Record{" "}
                  {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                  {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                  {pageIndex + 1}/{totalPages}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Turn To Page
                </span>
                <input
                  type="text"
                  className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                  value={pageIndex + 1}
                  onChange={handlePageInputChange}
                  onBlur={fetchCustomerContractsData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchCustomerContractsData();
                    }
                  }}
                />
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer" />
              </div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-3 text-left">Code</th> {/* Mapped from API 'Code' */}
                <th className="p-3 text-left">Ref Code</th> {/* Mapped from API 'RegCode' */}
                <th className="p-3 text-left">Execute Date</th> {/* Mapped from API 'ExecDate' */}
                <th className="p-3 text-left">Project</th> {/* Mapped from API 'ProjecName' */}
                <th className="p-3 text-left">Meter Num</th> {/* Mapped from API 'MeterNum' */}
                <th className="p-3 text-left">Customer Name</th> {/* Mapped from API 'FullName' */}
                <th className="p-3 text-left">Amount</th> {/* Mapped from API 'AMT' */}
                <th className="p-3 text-left">Balance</th> {/* Mapped from API 'Balance' */}
                <th className="p-3 text-left">Paid</th> {/* Mapped from API 'Paid' */}
                <th className="p-3 text-left">Paid Date</th> {/* Mapped from API 'PaidDate' */}
                <th className="p-3 text-left">Pay D/M</th> {/* Mapped from API 'PayDM' */}
                <th className="p-3 text-left">Pay Method</th> {/* Mapped from API 'PayTypeName' */}
                <th className="p-3 text-left">Status</th> {/* Mapped from API 'Status' */}
                <th className="p-3 text-left">Operator</th> {/* Mapped from API 'COperator' */}
                <th className="p-3 text-left">Active</th> {/* Mapped from API 'Actived' */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="15" className="text-center p-4">Loading customer contracts...</td>
                </tr>
              ) : customerContracts.length > 0 ? (
                customerContracts.map((contract, index) => (
                  <tr key={contract.Code || index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.Code || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.RegCode || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.ExecDate || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.ProjecName || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.MeterNum || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.FullName || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.AMT || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.Balance || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.Paid || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.PaidDate || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.PayDM || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.PayTypeName || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.Status || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.COperator || "-"}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {contract.Actived === "Y" ? (
                        <span className="text-green-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-red-600 font-semibold">No</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="text-center p-4 text-gray-500">
                    No customer contracts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex items-center gap-2">
              <button
                className={`p-1 rounded-full ${pageIndex === 0 ? 'text-gray-400' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(0)}
                disabled={pageIndex === 0}
              >
                <ChevronFirst className="w-5 h-5" />
              </button>
              <button
                className={`p-1 rounded-full ${pageIndex === 0 ? 'text-gray-400' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700">
                Total {totalRecords} Records, Record{" "}
                {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                {pageIndex + 1}/{totalPages}, Turn To Page
              </span>
              <button
                className={`p-1 rounded-full ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={pageIndex === totalPages - 1 || totalPages === 0}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                className={`p-1 rounded-full ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'hover:bg-gray-200'}`}
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={pageIndex === totalPages - 1 || totalPages === 0}
              >
                <ChevronLast className="w-5 h-5" />
              </button>
              <input
                type="text"
                className="w-12 h-8 py-1 px-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900] text-center"
                value={pageIndex + 1}
                onChange={handlePageInputChange}
                onBlur={fetchCustomerContractsData}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchCustomerContractsData();
                  }
                }}
              />
              <button className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600" onClick={fetchCustomerContractsData}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
                onClick={handleRefresh}
              >
                <RefreshCw size={18} />
                Refresh
              </button>
              <Link href="/arrearcustomernew">
                <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
                  <Plus size={18} />
                  New
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs for Payment List and Adjustment List (static as no APIs provided for these) */}
        <div className="mt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-1">
              <button
                onClick={() => setActiveTab("payment")}
                className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === "payment" ? "border-[#FF9900] text-white bg-[#FF9900]" : "border-blue-500 text-gray-500 hover:text-[#FF9900]"}`}
              >
                Payment List
              </button>
              <button
                onClick={() => setActiveTab("adjustment")}
                className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === "adjustment" ? "border-[#FF9900] text-white bg-[#FF9900]" : "border-[#FF9900] text-gray-500 hover:text-[#FF9900]"}`}
              >
                Adjustment List
              </button>
            </nav>
          </div>
          <div className="bg-white rounded-lg shadow mt-2 overflow-x-auto">
            {activeTab === "payment" ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FF9900] text-white">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Types</th>
                    <th className="p-3 text-left">Balance</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Payable</th>
                    <th className="p-3 text-left">Extra Pay</th>
                    <th className="p-3 text-left">Interest</th>
                    <th className="p-3 text-left">Frozen Fee</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentListData.map((payment, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.types}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.balance}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.payable}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.extraPay}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.interest}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.frozenFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#FF9900] text-white">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Pay Method</th>
                    <th className="p-3 text-left">Previous Balance</th>
                    <th className="p-3 text-left">Adjustment</th>
                    <th className="p-3 text-left">Total Balance</th>
                    <th className="p-3 text-left">New</th>
                    <th className="p-3 text-left">Paying Date</th>
                    <th className="p-3 text-left">Operator</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adjustmentListData.map((adjustment, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.date}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.payMethod}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.previousBalance}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.adjustment}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.totalBalance}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.new}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.payingDate}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Search Project Modal */}
        <SearchProjectModel
          isOpen={showProjectPopup}
          onClose={() => setShowProjectPopup(false)}
          onSelect={handleProjectSelect} // Pass the handler for when a project is selected
        />
      </div>
    </div>
  );
}
