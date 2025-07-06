"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search, // Added Search icon for the form
} from "lucide-react";
import { useRouter } from "next/navigation";
import Dialogue from "./dialogue"; // Assuming this is for 'New' role
import Operator from "./Operator"; // Existing component being rendered

import { apiFetcher } from "@/app/utils/apiFetcher"; // Import the reusable API fetcher

function Page() {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State for search form inputs
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");

  // State for fetched Role List table data
  const [roles, setRoles] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  console.log("Page (Role List): Component rendered.");

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    console.log("Page (Role List): useEffect triggered for pageIndex change. Current pageIndex:", pageIndex);
    fetchRolesData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchRolesData = async () => {
    console.log("Page (Role List): fetchRolesData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "19");
    if (searchCode) formData.append("code", searchCode);
    if (searchName) formData.append("name", searchName);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Page (Role List): Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/roles", "POST", formData, router);

      setRoles(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // Do not update pageIndex from API response to avoid double calls
      console.log("Page (Role List): Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("Page (Role List): Error fetching data via apiFetcher:", error);
      setRoles([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Page (Role List): handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    } else {
      console.log("Page (Role List): Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("Page (Role List): handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("Page (Role List): Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("Page (Role List): Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("Page (Role List): Refresh button clicked. Fetching data.");
    // This will fetch data with current filters and current pageIndex
    fetchRolesData();
  };

  const handleSearch = () => {
    console.log("Page (Role List): Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page on new search. useEffect will then trigger fetch.
  };

  return (
    <>
      <div className="w-full bg-white mt-10">
        {isLoading && (
          <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
          </div>
        )}
        <div
          // Opacity transition removed as isLoading will handle visibility
          className={`w-full bg-white mt-10 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className="flex flex-col pb-4 mb-4 gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                Role List
              </h1>
              <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleRefresh}
                  className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    Refresh
                  </span>
                </button>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    New
                  </span>
                </button>
                {isDialogOpen && (
                  <Dialogue onClose={() => setIsDialogOpen(false)} />
                )}
              </div>
            </div>

            {/* Search inputs for Role List */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label htmlFor="searchCode" className="text-sm text-gray-500">
                  Code:
                </label>
                <input
                  type="text"
                  id="searchCode"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="searchName" className="text-sm text-gray-500">
                  Name:
                </label>
                <input
                  type="text"
                  id="searchName"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
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
          </div>

          <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
            <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex gap-1 sm:gap-2">
                  {/* Pagination Controls */}
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
                    onBlur={fetchRolesData} // Re-fetch on blur (if value changed)
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        fetchRolesData(); // Re-fetch on Enter
                      }
                    }}
                  />
                  <ChevronRight
                    className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                    onClick={fetchRolesData} // Trigger fetch when clicking this icon
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center p-4">Loading roles data...</div>
              ) : (
                <table className="w-full min-w-[800px] sm:min-w-0">
                  <thead className="bg-[#FF9900] text-white">
                    <tr>
                      <th className="p-2 sm:p-3 text-left">Code</th>
                      <th className="p-2 sm:p-3 text-left">Role Name</th>
                      <th className="p-2 sm:p-3 text-left">Description</th>
                      <th className="p-2 sm:p-3 text-left">Privilege level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.length > 0 ? (
                      roles.map((role, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="p-2 sm:p-3 text-sm text-gray-800">
                            {role.Code || "-"}
                          </td>
                          <td className="p-2 sm:p-3 text-sm text-gray-800">
                            {role.Name || "-"}
                          </td>
                          <td className="p-2 sm:p-3 text-sm text-gray-800">
                            {role.Description || "-"}
                          </td>
                          <td className="p-2 sm:p-3 text-sm text-gray-800">
                            {role.AdminRange || "-"} {/* Assuming AdminRange maps to Privilege Level */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                          No roles found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <Operator /> {/* This component remains as is */}
        </div>
      </div>
    </>
  );
}

export default Page;
