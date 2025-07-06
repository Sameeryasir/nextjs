"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link"; // Assuming Link is used for navigation
import Addkeyword from "./addkeyword"; // Assuming this is for the "Add Keyword" dialog
import { useRouter } from "next/navigation";
import { apiFetcher } from "@/app/utils/apiFetcher"; // Adjust path as necessary (e.g., ../../utils/apiFetcher)

function KeywordsPage() { // Renamed from 'Page' to 'KeywordsPage' to avoid confusion
  const router = useRouter();

  // State for search form inputs
  const [fileNameFilter, setFileNameFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState(""); // Maps to 'VALUE' in API payload
  const [languageFilter, setLanguageFilter] = useState(""); // Maps to 'code1' in API payload
  const [descIsEmpty, setDescIsEmpty] = useState(""); // Maps to 'IsEmpty' in API payload
  const [descriptionFilter, setDescriptionFilter] = useState(""); // Maps to 'Descrip' in API payload

  // State for fetched table data and pagination
  const [keywordRecords, setKeywordRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  const [isAddKeywordDialogOpen, setIsAddKeywordDialogOpen] = useState(false); // State for Add Keyword dialog

  console.log("KeywordsPage (Language Keywords List): Component rendered.");

  // Fetch data on component mount and when pageIndex changes or search parameters change
  useEffect(() => {
    console.log("KeywordsPage (Language Keywords List): useEffect triggered for pageIndex change or search params. Current pageIndex:", pageIndex);
    fetchKeywordsData();
  }, [pageIndex]); // Only re-fetch on pageIndex change. Search button will reset pageIndex.

  const fetchKeywordsData = async () => {
    console.log("KeywordsPage (Language Keywords List): fetchKeywordsData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "4"); // As per API payload for keywords
    if (fileNameFilter) formData.append("file", fileNameFilter);
    if (keywordFilter) formData.append("VALUE", keywordFilter); // Map Key Word to VALUE
    if (languageFilter) formData.append("code1", languageFilter); // Map Language to code1
    if (descIsEmpty) formData.append("IsEmpty", descIsEmpty); // Map Description Is Empty?
    if (descriptionFilter) formData.append("Descrip", descriptionFilter); // Map Description

    // The API payload for this API is 'PAGE_INDEX: 0', implying 0-indexed for this specific endpoint.
    // Confirm with API documentation if it truly expects 0 or 1. Based on response, it returned pageIndex: "1"
    // even with PAGE_INDEX: 0. So, we'll send pageIndex (0-based) directly.
    formData.append("PAGE_INDEX", pageIndex.toString());

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("KeywordsPage (Language Keywords List): Sending payload (object for clarity):", payloadObject);

    try {
      const data = await apiFetcher("/api/languages", "POST", formData, router);

      setKeywordRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // We don't update pageIndex from API response to avoid double calls
      console.log("KeywordsPage (Language Keywords List): Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("KeywordsPage (Language Keywords List): Error fetching data via apiFetcher:", error);
      setKeywordRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("KeywordsPage (Language Keywords List): handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("KeywordsPage (Language Keywords List): Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("KeywordsPage (Language Keywords List): handlePageInputChange called. Input value:", value);
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    // Convert 1-based input to 0-based state
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // This state update will trigger useEffect and fetch data for the new page
      console.log("KeywordsPage (Language Keywords List): Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("KeywordsPage (Language Keywords List): Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleRefresh = () => {
    console.log("KeywordsPage (Language Keywords List): Refresh button clicked. Fetching data.");
    // This will fetch data with current filters and current pageIndex
    fetchKeywordsData();
  };

  const handleSearch = () => {
    console.log("KeywordsPage (Language Keywords List): Search button clicked. Resetting pageIndex to 0 and fetching data.");
    setPageIndex(0); // Reset to first page on new search. useEffect will then trigger fetch.
  };

  // Export CSV function (retained from original code)
  const handleExport = () => {
    console.log("KeywordsPage (Language Keywords List): Export button clicked.");
    const csvContent = [
      ["File Name", "Key Word", "Lang1", "Lang2", "Lang3", "Last Update"], // Add all relevant headers
      ...keywordRecords.map((item) => [
        item.FileName || "-",
        item.ID || "-", // Key Word
        item.Lang1 || "-",
        item.Lang2 || "-",
        item.Lang3 || "-",
        item.UDATE || "-", // Last Update
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "language_keywords_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the URL object
  };


  return (
    <>
      <div className="min-h-screen bg-white">
        {isLoading && (
          <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
          </div>
        )}
        <div
          className={`w-full bg-white mt-10 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
            <section>
              <h1 className="text-xl font-medium text-gray-900 mb-6">
                Language Keywords List {/* Updated title */}
              </h1>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    File Name
                  </label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    value={fileNameFilter}
                    onChange={(e) => setFileNameFilter(e.target.value)}
                  >
                    <option value="">Select File Type</option>
                    <option value="common">Common</option>
                    <option value="function">Function</option>
                    <option value="message_lang">Message_lang</option>
                    <option value="smart_vend_lang">SMART vend_lang</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Key Word</label>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    value={keywordFilter}
                    onChange={(e) => setKeywordFilter(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Language</label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    {/* The values '1', '2', '3' here should correspond to actual Lang1, Lang2, Lang3 from API */}
                    <option value="1">English (Lang1)</option>
                    <option value="2">Chinese (Lang2)</option>
                    <option value="3">French (Lang3)</option>
                    {/* If you have an API to fetch actual language IDs/codes, you'd use that to populate these options */}
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Description Is Empty ?
                  </label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    value={descIsEmpty}
                    onChange={(e) => setDescIsEmpty(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="1">Empty</option> {/* As per payload IsEmpty: 1 */}
                    <option value="0">Not Empty</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Description
                  </label>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    value={descriptionFilter}
                    onChange={(e) => setDescriptionFilter(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-10 justify-end">
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                >
                  Search
                </button>
                <button
                  onClick={() => setIsAddKeywordDialogOpen(true)}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                >
                  Add Keyword
                </button>
                {isAddKeywordDialogOpen && (
                  <Addkeyword onClose={() => setIsAddKeywordDialogOpen(false)} />
                )}
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                >
                  Export
                </button>
              </div>
            </section>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-14 mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              Keywords
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
              {/* This Link seems to point to a 'new language' page, not 'add keyword'.
                  Consider if this should be 'new keyword' or removed if 'Add Keyword' button handles it. */}
              <Link href='/system_information/language/newlanguage'>
                <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]">
                  <Plus size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    New
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
            <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex gap-1 sm:gap-2">
                  {/* Pagination Controls */}
                  <ChevronFirst
                    className={`w-4 h-4 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                    onClick={() => handlePageChange(0)}
                    disabled={pageIndex === 0}
                  />
                  <ChevronLeft
                    className={`w-4 h-4 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={pageIndex === 0}
                  />
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                    onClick={() => handlePageChange(pageIndex + 1)}
                    disabled={pageIndex === totalPages - 1 || totalPages === 0}
                  />
                  <ChevronLast
                    className={`w-4 h-4 text-gray-400 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
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
                    onBlur={fetchKeywordsData} // Re-fetch on blur (if value changed)
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        fetchKeywordsData(); // Re-fetch on Enter
                      }
                    }}
                  />
                  <ChevronRight className="w-3 h-3 text-green-500 hover:text-green-600 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center p-4">Loading language keywords...</div>
              ) : (
                <table className="w-full min-w-[800px] sm:min-w-0">
                  <thead className="bg-[#FF9900] text-white">
                    <tr>
                      <th className="p-2 sm:p-3 text-left">File Name</th>
                      <th className="p-2 sm:p-3 text-left">Key Word</th>
                      <th className="p-2 sm:p-3 text-left">Lang1</th>
                      <th className="p-2 sm:p-3 text-left">Lang2</th>
                      <th className="p-2 sm:p-3 text-left">Lang3</th>
                      <th className="p-2 sm:p-3 text-left">Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywordRecords.length > 0 ? (
                      keywordRecords.map((item, index) => (
                        <tr key={item.ID || index} className="hover:bg-gray-50 transition">
                          <td className="p-2 sm:p-3 flex items-center gap-2 whitespace-nowrap">
                            <span className="text-lg">📄</span>
                            <span className="truncate">{item.FileName || "-"}</span>
                          </td>
                          <td className="p-2 sm:p-3 whitespace-nowrap">
                            <div className="flex items-center justify-between w-sm">
                              <span className="truncate">{item.ID || "-"}</span>
                              <span className="text-red-500 text-lg cursor-pointer justify-end">
                                ❌
                              </span>
                            </div>
                          </td>
                          <td className="p-2 sm:p-3">{item.Lang1 || "-"}</td>
                          <td className="p-2 sm:p-3">{item.Lang2 || "-"}</td>
                          <td className="p-2 sm:p-3">{item.Lang3 || "-"}</td>
                          <td className="p-2 sm:p-3">{item.UDATE || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center p-4 text-gray-500">
                          No language keywords found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KeywordsPage; // Export as KeywordsPage
