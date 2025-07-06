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
  Search, // Added Search icon for consistency
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Meterviewerdialogue from "./Meterviewerdialogue"; // Assuming this is the dialog component
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

function Meterviewer() {
  const router = useRouter();

  // State for search form inputs
  const [meterNumFilter, setMeterNumFilter] = useState("");
  const [stockCodeFilter, setStockCodeFilter] = useState(""); // For Warehouse Code
  const [modelCodeFilter, setModelCodeFilter] = useState(""); // For Meter Model Code
  const [statusFilter, setStatusFilter] = useState("");

  // State for fetched table data and pagination
  const [meterListRecords, setMeterListRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  // State for the MeterViewer Dialogue
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null); // To pass data to the dialog

  console.log("Meterviewer: Component rendered.");

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    console.log("Meterviewer: useEffect triggered for pageIndex change. Current pageIndex:", pageIndex);
    fetchMeterListData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchMeterListData = async () => {
    console.log("Meterviewer: fetchMeterListData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "35"); // As per new API payload
    if (meterNumFilter) formData.append("meterNum", meterNumFilter);
    if (stockCodeFilter) formData.append("stockCode", stockCodeFilter); // Warehouse Code
    if (modelCodeFilter) formData.append("modelCode", modelCodeFilter); // Meter Model Code
    if (statusFilter) formData.append("status", statusFilter);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Meterviewer: Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/warehouse", "POST", formData, router);

      setMeterListRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // Do not update pageIndex from API response to avoid double calls
      console.log("Meterviewer: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("Meterviewer: Error fetching data via apiFetcher:", error);
      setMeterListRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Meterviewer: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("Meterviewer: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("Meterviewer: handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("Meterviewer: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("Meterviewer: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("Meterviewer: Refresh button clicked. Fetching data.");
    // This will fetch data with current filters and current pageIndex
    fetchMeterListData();
  };

  const handleSearch = () => {
    console.log("Meterviewer: Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page on new search. useEffect will then trigger fetch.
  };

  const handlePrint = () => {
    console.log("Meterviewer: Print button clicked.");
    window.print();
  };

  const handleExportToExcel = () => {
    console.log("Meterviewer: Export to Excel button clicked.");
    if (meterListRecords.length === 0) {
      console.warn("No data to export.");
      return;
    }

    const headers = [
      "Meter Number",
      "Warehouse",
      "Status",
      "Prod. Date",
      "Expiry Date",
      "SGC",
      "TI",
      "Base Time",
      "Model Name", // Added more headers based on response
      "Model Code",
      "Stock Code",
      "Reg Code",
      "Repair No",
      "Init Value",
      "Max Power",
    ];

    const dataToExport = meterListRecords.map((item) => [
      item.MeterNum || "-",
      item.StockName || "-",
      item.StatusName || "-",
      item.ProdDate || "-",
      item.ExpiryDate || "-",
      item.SGC || "-",
      item.TI || "-",
      item.LastDate || "-", // Base Time
      item.ModelName || "-",
      item.ModelCode || "-",
      item.StockCode || "-",
      item.RegCode || "-",
      item.RepairNo || "-",
      item.InitValue || "-",
      item.MaxPower || "-",
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...dataToExport]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meters");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "MeterList.xlsx");
    console.log("MeterList.xlsx exported.");
  };

  const openMeterDetailsDialog = (meter) => {
    console.log("Opening Meter Details dialog for:", meter);
    setSelectedMeter(meter);
    setIsDialogOpen(true);
  };

  const closeMeterDetailsDialog = () => {
    console.log("Closing Meter Details dialog.");
    setSelectedMeter(null);
    setIsDialogOpen(false);
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
          <h1 className="text-2xl font-semibold text-gray-800">Meter List</h1>
          <div className="flex gap-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
            >
              Refresh
            </button>
            <button
              onClick={handleExportToExcel}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
            >
              Excel
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
            >
              Print
            </button>
          </div>
        </div>

        {/* Search Inputs */}
        <div className="max-w-7xl text-left mb-14 space-y-8">
          {/* Warehouse Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-32 text-sm font-medium text-gray-700">
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
              {/* This input would ideally show the Warehouse Name based on the code entered */}
              <input
                type="text"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                readOnly // Make it read-only or add a lookup
              />
              <button
                type="button"
                // This button would typically open a warehouse selection dialog, not Meterviewerdialogue
                // For now, it doesn't open the main dialog, but its functionality needs clarification.
                className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
              >
                ...
              </button>
              <button
                type="button"
                onClick={() => setStockCodeFilter("")} // Clear warehouse filter
                className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Meter Model Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-32 text-sm font-medium text-gray-700">
              Meter Model
            </label>
            <input
              type="text"
              className="w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Model Code"
              value={modelCodeFilter}
              onChange={(e) => setModelCodeFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>

          {/* Meter Num Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-32 text-sm font-medium text-gray-700">
              Meter Num
            </label>
            <input
              type="text"
              className="w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={meterNumFilter}
              onChange={(e) => setMeterNumFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>

          {/* Status Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="w-32 text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              className="w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Installed, In Warehouse"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center sm:justify-start pl-0 sm:pl-40">
            <button
              onClick={handleSearch}
              className="w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105 hover:cursor-pointer"
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
                  className={`w-5 h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(0)}
                  disabled={pageIndex === 0}
                />
                <ChevronLeft
                  className={`w-5 h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(pageIndex - 1)}
                  disabled={pageIndex === 0}
                />
                <ChevronRight
                  className={`w-5 h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                />
                <ChevronLast
                  className={`w-5 h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
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
                  onBlur={fetchMeterListData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchMeterListData();
                    }
                  }}
                  className="w-10 border rounded px-2 py-1 text-center text-sm"
                />
                <ChevronRight
                  className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer"
                  onClick={fetchMeterListData}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center p-4">Loading meter list...</div>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#FF9900] text-white">
                  <tr>
                    <th className="p-3 text-left">Meter Number</th>
                    <th className="p-3 text-left">Warehouse</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Prod. Date</th>
                    <th className="p-3 text-left">Expiry Date</th>
                    <th className="p-3 text-left">SGC</th>
                    <th className="p-3 text-left">TI</th>
                    <th className="p-3 text-left">Base Time</th>
                    <th className="p-3 text-left">Details</th> {/* Added for the Details button */}
                  </tr>
                </thead>
                <tbody>
                  {meterListRecords.length > 0 ? (
                    meterListRecords.map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                      >
                        <td className="p-3">{row.MeterNum || "-"}</td>
                        <td className="p-3">{row.StockName || "-"}</td>
                        <td className="p-3">{row.StatusName || "-"}</td>
                        <td className="p-3">{row.ProdDate || "-"}</td>
                        <td className="p-3">{row.ExpiryDate || "-"}</td>
                        <td className="p-3">{row.SGC || "-"}</td>
                        <td className="p-3">{row.TI || "-"}</td>
                        <td className="p-3">{row.LastDate || "-"}</td> {/* Using LastDate for Base Time */}
                        <td className="p-3">
                          <button
                            onClick={() => openMeterDetailsDialog(row)} // Pass the entire row data
                            className="bg-[#FF9900] text-white px-3 py-1 rounded-md text-sm hover:brightness-105"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center p-4 text-gray-500">
                        No meters found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* MeterViewer Dialogue (Modal) */}
      {isDialogOpen && (
        <Meterviewerdialogue
          onClose={closeMeterDetailsDialog}
          meterData={selectedMeter} // Pass the selected meter's data to the dialog
        />
      )}
    </div>
  );
}
export default Meterviewer;
