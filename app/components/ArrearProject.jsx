"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Plus,
  Search, // Added Search icon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Import the reusable API fetcher

export default function ArrearProject() {
  const router = useRouter();

  // State for search form inputs
  const [codeFilter, setCodeFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [branchCodeFilter, setBranchCodeFilter] = useState("");

  // State for fetched table data and pagination
  const [arrearProjects, setArrearProjects] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  console.log("ArrearProject: Component rendered.");

  // Fetch data on component mount and when pageIndex or search filters change
  useEffect(() => {
    console.log("ArrearProject: useEffect triggered for pageIndex or filter change.");
    console.log("Current filters for fetch:", { codeFilter, descriptionFilter, branchCodeFilter, pageIndex });
    fetchArrearProjectsData();
  }, [pageIndex, codeFilter, descriptionFilter, branchCodeFilter]); // FIX: Added filter states to dependencies

  const fetchArrearProjectsData = async () => {
    console.log("ArrearProject: fetchArrearProjectsData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    if (codeFilter) formData.append("code", codeFilter);
    if (descriptionFilter) formData.append("description", descriptionFilter);
    if (branchCodeFilter) formData.append("branchcode", branchCodeFilter);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("ArrearProject: Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/arrear-projects", "POST", formData, router);

      setArrearProjects(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // Do not update pageIndex from API response to avoid double calls
      console.log("ArrearProject: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("ArrearProject: Error fetching data via apiFetcher:", error);
      setArrearProjects([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("ArrearProject: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("ArrearProject: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("ArrearProject: handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("ArrearProject: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("ArrearProject: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("ArrearProject: Refresh button clicked. Re-fetching data with current filters and page.");
    // Force a re-fetch without changing filters or page index
    fetchArrearProjectsData();
  };

  const handleSearch = () => {
    console.log("ArrearProject: Search button clicked.");
    // Reset pageIndex to 0 to start a new search from the first page.
    // If already on the first page (pageIndex is 0), then just force a refresh.
    // Otherwise, setting pageIndex to 0 will trigger the useEffect.
    if (pageIndex === 0) {
      fetchArrearProjectsData(); // Force fetch if already on first page
    } else {
      setPageIndex(0); // Reset to first page on new search, useEffect will then trigger fetch
    }
  };

  return (
    <div className="p-6 bg-white-100">
      {/* Loading spinner overlay */}
      {isLoading && (
        <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      )}

      <div className={`w-full bg-white transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        {/* Top Action Buttons */}
        <div className="flex gap-4 mb-6 justify-end">
          <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
            Modify
          </button>
          <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
            Inactive
          </button>
          <button
            onClick={handleRefresh}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
          >
            Refresh
            <RefreshCw size={25} />
          </button>
          <Link href="/baseInformation">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
              <Plus size={25} />
              NEW
            </button>
          </Link>
        </div>

        {/* SECDAIS Section */}
        <div className="rounded-lg shadow mb-6 p-4">
          <h1 className="text-2xl font-bold mb-4">SECDAIS</h1>

          {/* Projects Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            <p className="mb-2">Searching Condition</p>

            {/* Search Form */}
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
              <div className="flex items-center gap-2">
                <label htmlFor="branchCodeFilter" className="text-sm text-gray-500">
                  Branch:
                </label>
                <input
                  type="text"
                  id="branchCodeFilter"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  value={branchCodeFilter}
                  onChange={(e) => setBranchCodeFilter(e.target.value)}
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


            {/* Pagination Controls */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-2">
                <ChevronFirst
                  className={`w-5 h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-orange-500'}`}
                  onClick={() => handlePageChange(0)}
                  disabled={pageIndex === 0}
                />
                <ChevronLeft
                  className={`w-5 h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-orange-500'}`}
                  onClick={() => handlePageChange(pageIndex - 1)}
                  disabled={pageIndex === 0}
                />
                <ChevronRight
                  className={`w-5 h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-orange-500 hover:text-orange-600'}`}
                  onClick={() => handlePageChange(pageIndex + 1)}
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                />
                <ChevronLast
                  className={`w-5 h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-orange-500 hover:text-orange-600'}`}
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                />
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span className="text-sm text-gray-600">
                  Total {totalRecords} Records
                </span>
                <span className="text-sm text-gray-600 hidden sm:inline">|</span>
                <span className="text-sm text-gray-600">
                  Record{" "}
                  {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                  {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                  {pageIndex + 1}/{totalPages}
                </span>
                <span className="text-sm text-gray-600">|</span>
                <span className="text-sm text-gray-600">Turn To Page</span>
                <input
                  type="text"
                  className="w-12 border rounded px-2 py-1 text-sm text-center"
                  value={pageIndex + 1}
                  onChange={handlePageInputChange}
                  onBlur={fetchArrearProjectsData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchArrearProjectsData();
                    }
                  }}
                />
                <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600" />
              </div>
            </div>

            {/* Projects Table */}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center p-4">Loading projects data...</div>
              ) : (
                <table className="w-full border-collapse">
                  <thead className="bg-[#FF9900] text-white">
                    <tr>
                      <th className="p-3 text-left">CODE</th>
                      <th className="p-3 text-left">DESCRIPTION</th>
                      <th className="p-3 text-left">PAY METHOD NAME</th> {/* From API PayTypeName */}
                      <th className="p-3 text-left">CALC TYPE</th> {/* From API CalcType */}
                      <th className="p-3 text-left">ACTIVATED</th> {/* From API Actived */}
                      <th className="p-3 text-left">OPERATOR</th> {/* From API COperator */}
                    </tr>
                  </thead>
                  <tbody>
                    {arrearProjects.length > 0 ? (
                      arrearProjects.map((row, i) => (
                        <tr
                          key={row.Code || i}
                          className={i % 2 === 0 ? "bg-white" : "bg-orange-50"}
                        >
                          <td className="p-3">{row.Code || "-"}</td>
                          <td className="p-3">{row.Description || "-"}</td>
                          <td className="p-3">{row.PayTypeName || "-"}</td>
                          <td className="p-3">{row.CalcType || "-"}</td>
                          <td className="p-3">
                            {row.Actived === "Y" ? (
                              <span className="text-green-600 font-semibold">✓</span>
                            ) : (
                              <span className="text-red-600 font-semibold">✗</span>
                            )}
                          </td>
                          <td className="p-3">{row.COperator || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-4 text-gray-500">
                          No projects found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Version List Section (Static as no API provided) */}
        <div className="rounded-lg shadow p-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Version List</h2>
            <div className="flex gap-4">
              <button
                onClick={handleRefresh} // This refresh button will fetch main projects data
                className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
              >
                Refresh
                <RefreshCw size={25} />
              </button>
              <Link href="/baseInformation">
                <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
                  <Plus size={25} />
                  NEW
                </button>
              </Link>
            </div>
          </div>

          {/* Empty Version List Table */}
          <table className="w-full border-collapse">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-3 text-left">START UP TIME</th>
                <th className="p-3 text-left">AMOUNT</th>
                <th className="p-3 text-left">PAYING VALUE</th>
                <th className="p-3 text-left">OPERATOR</th>
                <th className="p-3 text-left">ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No version data available.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
