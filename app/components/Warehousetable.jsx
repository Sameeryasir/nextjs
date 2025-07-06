"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  ChevronFirst,
  Check,
  X,
  Package,
  RefreshCw, // Added Refresh icon
  Search,    // Added Search icon
  Plus,      // Added Plus icon for New button
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary (e.g., ../../utils/apiFetcher)

function Warehousetable() {
  const router = useRouter();

  // State for search form inputs
  const [codeFilter, setCodeFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");

  // State for fetched table data and pagination
  const [warehouseRecords, setWarehouseRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  console.log("Warehousetable: Component rendered.");

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    console.log("Warehousetable: useEffect triggered for pageIndex change. Current pageIndex:", pageIndex);
    fetchWarehouseData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchWarehouseData = async () => {
    console.log("Warehousetable: fetchWarehouseData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    if (codeFilter) formData.append("code", codeFilter);
    if (descriptionFilter) formData.append("description", descriptionFilter);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Warehousetable: Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/warehouse", "POST", formData, router);

      setWarehouseRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // Do not update pageIndex from API response to avoid double calls
      console.log("Warehousetable: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("Warehousetable: Error fetching data via apiFetcher:", error);
      setWarehouseRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Warehousetable: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("Warehousetable: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("Warehousetable: handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("Warehousetable: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("Warehousetable: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("Warehousetable: Refresh button clicked. Fetching data.");
    fetchWarehouseData(); // Fetch data with current filters and current pageIndex
  };

  const handleSearch = () => {
    console.log("Warehousetable: Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page on new search. useEffect will then trigger fetch.
  };

  return (
    <div className="w-full bg-white p-2 md:p-6">
      {/* Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          Warehouse List
        </h1>
        <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          {/* Assuming a 'New' button or similar functionality */}
          <button
            // onClick={() => { /* Implement new warehouse dialog/page logic */ }}
            className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Search Inputs */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="codeFilter" className="text-sm text-gray-500">
            Code:
          </label>
          <input
            type="text"
            id="codeFilter"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            value={codeFilter}
            onChange={(e) => setCodeFilter(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="descriptionFilter" className="text-sm text-gray-500">
            Description:
          </label>
          <input
            type="text"
            id="descriptionFilter"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition"
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        {/* Pagination */}
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
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
                value={pageIndex + 1} // Display 1-based page index
                onChange={handlePageInputChange}
                onBlur={fetchWarehouseData} // Re-fetch on blur (if value changed)
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchWarehouseData(); // Re-fetch on Enter
                  }
                }}
              />
              <ChevronRight
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                onClick={fetchWarehouseData} // Trigger fetch when clicking this icon
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-4">Loading warehouse data...</div>
          ) : (
            <table className="w-full min-w-[800px] sm:min-w-0 text-center">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3">Code</th>
                  <th className="p-2 sm:p-3">Description</th>
                  <th className="p-2 sm:p-3">Department</th>
                  <th className="p-2 sm:p-3">Share</th>
                  <th className="p-2 sm:p-3">Active</th>
                </tr>
              </thead>
              <tbody>
                {warehouseRecords.length > 0 ? (
                  warehouseRecords.map((item, index) => (
                    <tr key={index} className="hover:bg-[#FFE2B7] cursor-pointer">
                      <td className="p-2 sm:p-3 flex items-center justify-center gap-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        {item.Code || "-"}
                      </td>
                      <td className="p-2 sm:p-3">{item.Description || "-"}</td>
                      <td className="p-2 sm:p-3">{item.DeptName || "-"}</td>
                      <td className="p-2 sm:p-3">
                        {item.Shared === "Y" ? (
                          <Check className="text-green-600 w-5 h-5 inline" />
                        ) : (
                          <X className="text-red-600 w-5 h-5 inline" />
                        )}
                      </td>
                      <td className="p-2 sm:p-3">
                        {item.Active === "Y" ? (
                          <Check className="text-green-600 w-5 h-5 inline" />
                        ) : (
                          <X className="text-red-600 w-5 h-5 inline" />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No warehouse records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Warehousetable;
