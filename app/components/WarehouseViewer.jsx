"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
  Search,
} from "lucide-react";
import Link from "next/link";
import Stockindialogue from "./Stockindialogue"; // This dialog is for selecting items (e.g., warehouse, meter model)
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

function WarehouseViewer() {
  const router = useRouter();

  // State for search form inputs
  const [stockCodeFilter, setStockCodeFilter] = useState(""); // For Warehouse Code
  const [stockNameDisplay, setStockNameDisplay] = useState(""); // To display selected Warehouse Name
  const [modelCodeFilter, setModelCodeFilter] = useState(""); // For Meter Model Code (will send 001, 002, 003)
  const [modelNameDisplay, setModelNameDisplay] = useState(""); // To display selected Meter Model Name (not directly used by API)

  // States for the 'Starting Date' fields (not directly used in current API, but kept for UI)
  const [startingDateInput1, setStartingDateInput1] = useState("");
  const [startingDateInput2, setStartingDateInput2] = useState("");

  // State for fetched table data and pagination
  const [stockInRecords, setStockInRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  // State for the Stock In Dialogue (repurposed for selection)
  const [isStockInDialogOpen, setIsStockInDialogOpen] = useState(false);
  const [dialogContext, setDialogContext] = useState(""); // To know what type of selection dialog is open (e.g., 'warehouse', 'meterModel')

  // Fixed Meter Model options for dropdown with correct values
  const meterModelOptions = [
    { code: "", name: "Select Meter Model" }, // Default empty option
    { code: "001", name: "General Monophasé" },
    { code: "002", name: "General Triphasé" },
    { code: "003", name: "Compteur HT" },
  ];

  console.log("WarehouseViewer: Component rendered.");

  // Fetch data on component mount and when pageIndex changes or search parameters change
  useEffect(() => {
    console.log("WarehouseViewer: useEffect triggered for pageIndex change. Current pageIndex:", pageIndex);
    fetchStockInData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchStockInData = async () => {
    console.log("WarehouseViewer: fetchStockInData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "36"); // As per new API payload
    if (stockCodeFilter) formData.append("stockCode", stockCodeFilter);
    if (modelCodeFilter) formData.append("modelCode", modelCodeFilter); // This will now send '001', '002', '003' etc.
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("WarehouseViewer: Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/warehouse", "POST", formData, router);

      setStockInRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("WarehouseViewer: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("WarehouseViewer: Error fetching data via apiFetcher:", error);
      setStockInRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("WarehouseViewer: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("WarehouseViewer: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("WarehouseViewer: handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("WarehouseViewer: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("WarehouseViewer: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("WarehouseViewer: Refresh button clicked. Fetching data.");
    fetchStockInData(); // Fetch data with current filters and current pageIndex
  };

  const handleSearch = () => {
    console.log("WarehouseViewer: Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page on new search. useEffect will then trigger fetch.
  };

  const openSelectionDialog = (context) => {
    setDialogContext(context);
    setIsStockInDialogOpen(true);
  };

  const handleSelectedValue = (selectedValue) => {
    console.log("WarehouseViewer: Selected value from dialog:", selectedValue, "for context:", dialogContext);
    if (dialogContext === "warehouse") {
      setStockCodeFilter(selectedValue.Code);
      setStockNameDisplay(selectedValue.Description); // Assuming Description is the name
    } else if (dialogContext === "meterModel") {
      // This part would be for a dialog returning a meter model, not a dropdown.
      // If a dialog were used, you'd set modelCodeFilter from selectedValue.Code
      // setModelCodeFilter(selectedValue.Code);
      // setModelNameDisplay(selectedValue.Description);
    }
    setIsStockInDialogOpen(false); // Close dialog
    // Trigger search after selection
    setPageIndex(0); // Reset page to 0 on new selection filter
    // fetchStockInData is called by useEffect when pageIndex changes.
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Loading spinner overlay */}
      {isLoading && (
        <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      )}

      <div
        className={`w-full bg-white transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Stock In List</h1>
          <div className="flex gap-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
            >
              Refresh
            </button>
            <Link href="/path/to/new-stock-in-page">
              <button
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
              >
                <Plus size={16} className="inline mr-2" /> New
              </button>
            </Link>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-7xl text-left mb-14 space-y-8">
          {/* Warehouse Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-40 text-sm font-medium text-gray-700">
              Warehouse
            </label>
            <div className="flex gap-2 flex-wrap w-full max-w-4xl">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Code"
                value={stockCodeFilter}
                onChange={(e) => setStockCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <input
                type="text"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                value={stockNameDisplay}
                readOnly
              />
              <button
                type="button"
                onClick={() => openSelectionDialog("warehouse")}
                className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
              >
                ...
              </button>
              <button
                type="button"
                onClick={() => { setStockCodeFilter(""); setStockNameDisplay(""); handleSearch(); }}
                className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Meter Model Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-40 text-sm font-medium text-gray-700">
              Meter Model
            </label>
            <select
              className="min-w-[400px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={modelCodeFilter}
              onChange={(e) => setModelCodeFilter(e.target.value)}
            >
              {meterModelOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dummy Starting Date inputs - kept as per original structure, not tied to API payload for ACTION 36 */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-40 text-sm font-medium text-gray-700">
              Starting Date
            </label>
            <input
              type="date"
              className="min-w-[400px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={startingDateInput1}
              onChange={(e) => setStartingDateInput1(e.target.value)}
            />
            <input
              type="date"
              className="min-w-[400px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={startingDateInput2}
              onChange={(e) => setStartingDateInput2(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center md:justify-start md:pl-44 mt-10">
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-48"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table & Pagination */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Pagination Buttons */}
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

              {/* Page Info */}
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600">Total {totalRecords} Records</span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600">Record{" "}
                  {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                  {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                  {pageIndex + 1}/{totalPages}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600">Turn To Page</span>
                <input
                  type="text"
                  value={pageIndex + 1}
                  onChange={handlePageInputChange}
                  onBlur={fetchStockInData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchStockInData();
                    }
                  }}
                  className="w-10 border rounded px-2 py-1 text-center text-sm"
                />
                <ChevronRight
                  className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer"
                  onClick={fetchStockInData}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center p-4">Loading stock in data...</div>
            ) : (
              <table className="w-full min-w-[800px] sm:min-w-0">
                <thead className="bg-[#FF9900] text-white">
                  <tr>
                    <th className="p-2 sm:p-3 text-left">Date</th>
                    <th className="p-2 sm:p-3 text-left">Warehouse</th>
                    <th className="p-2 sm:p-3 text-left">Meter Model</th>
                    <th className="p-2 sm:p-3 text-left">Starting Code</th>
                    <th className="p-2 sm:p-3 text-left">Ending Code</th>
                    <th className="p-2 sm:p-3 text-left">Meters</th>
                    <th className="p-2 sm:p-3 text-left">Type</th>
                    <th className="p-2 sm:p-3 text-left">Handler</th>
                    <th className="p-2 sm:p-3 text-left">Operator</th>
                  </tr>
                </thead>
                <tbody>
                  {stockInRecords.length > 0 ? (
                    stockInRecords.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#FFE2B7] cursor-pointer transition-colors">
                        <td className="p-2 sm:p-3">{row.LastDate || "-"}</td>
                        <td className="p-2 sm:p-3">{row.StockName || "-"}</td>
                        <td className="p-2 sm:p-3">{row.ModelName || "-"}</td>
                        {/* The 'Starting Code'/'Ending Code' and 'Type'/'Handler'/'Operator' fields from your static data
                            are not directly available as separate fields in the API response for ACTION 36.
                            I'm mapping based on the API response fields provided, and using placeholder '-' for missing ones.
                            If your API has these fields under different names, please clarify.
                            Nos, Nos1, Nos2 appear to be quantities, not codes.
                            If 'Starting Code' and 'Ending Code' are derived from MeterNum, that logic needs to be implemented. */}
                        <td className="p-2 sm:p-3">{row.Nos || "-"}</td> {/* Placeholder for Starting Code, using Nos */}
                        <td className="p-2 sm:p-3">{row.Nos1 || "-"}</td>{/* Placeholder for Ending Code, using Nos1 */}
                        <td className="p-2 sm:p-3">{row.Nos2 || "-"}</td> {/* Placeholder for Meters, using Nos2 */}
                        <td className="p-2 sm:p-3">-</td> {/* Placeholder for Type */}
                        <td className="p-2 sm:p-3">-</td> {/* Placeholder for Handler */}
                        <td className="p-2 sm:p-3">-</td> {/* Placeholder for Operator */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-4 text-gray-500">
                        No stock in records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Stockindialogue (Selection Modal) */}
      {isStockInDialogOpen && (
        <Stockindialogue
          heading={dialogContext === "warehouse" ? "Select Warehouse" : "Select Item"}
          onClose={() => setIsStockInDialogOpen(false)}
          onSelect={handleSelectedValue}
          apiContext={dialogContext}
        />
      )}
    </div>
  );
}
export default WarehouseViewer;
