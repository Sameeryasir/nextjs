"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

function ProjectSearchDialog({ isOpen, onClose, onSelect }) {
  const router = useRouter();
  const dialogRef = useRef(null); // Ref for click outside
  const searchInputRef = useRef(null); // Ref for focusing search input

  // Search filters for the dialog
  const [codeFilter, setCodeFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [branchCodeFilter, setBranchCodeFilter] = useState(""); // Assuming project API can also be filtered by branch

  // Dialog's internal table data and pagination
  const [projects, setProjects] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [internalSelectedProject, setInternalSelectedProject] = useState(null); // Internally selected row

  console.log("ProjectSearchDialog: Component rendered. isOpen:", isOpen);

  // Focus search input and reset filters when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      setCodeFilter("");
      setDescriptionFilter("");
      setBranchCodeFilter("");
      setPageIndex(0); // Reset page to 0 to trigger fresh fetch via useEffect
      setInternalSelectedProject(null); // Clear previous selection
    }
  }, [isOpen]);

  // Fetch data when dialog is open and pagination/filter states change
  useEffect(() => {
    if (isOpen) { // Only fetch if the dialog is actually open
      console.log("ProjectSearchDialog: useEffect triggered for data fetch.");
      fetchProjectsData();
    }
  }, [isOpen, pageIndex, codeFilter, descriptionFilter, branchCodeFilter]);

  const fetchProjectsData = async () => {
    console.log("ProjectSearchDialog: fetchProjectsData called.");
    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append("ACTION", "1"); // As per ArrearProject API (same API as project list)
    if (codeFilter) formData.append("code", codeFilter);
    if (descriptionFilter) formData.append("description", descriptionFilter);
    if (branchCodeFilter) formData.append("branchcode", branchCodeFilter);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("ProjectSearchDialog: API Payload:", payloadObject);

    try {
      // Use the /api/arrear-projects endpoint as it uses ACTION=1 for project listing
      const data = await apiFetcher("/api/arrear-projects", "POST", formData, router);
      setProjects(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("ProjectSearchDialog: Data fetched successfully for projects.");
    } catch (error) {
      console.error("ProjectSearchDialog: Error fetching project data:", error);
      setProjects([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSearch = () => {
    console.log("ProjectSearchDialog: Dialog search triggered. Resetting pageIndex to 0.");
    setPageIndex(0); // Reset page to 0 on new search, useEffect will re-fetch
  };

  const handlePageChange = (newPage) => {
    console.log("ProjectSearchDialog: handlePageChange called. New page (0-based):", newPage);
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

  const handleRowClick = (project) => {
    console.log("ProjectSearchDialog: Row clicked:", project);
    setInternalSelectedProject(project); // Set internal selection
  };

  const handleOkClick = () => {
    console.log("ProjectSearchDialog: OK button clicked. Internal selected project:", internalSelectedProject);
    if (internalSelectedProject && onSelect) {
      onSelect(internalSelectedProject); // Pass the internally selected project back to parent
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

  if (!isOpen) return null;

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

        <h2 className="text-xl font-semibold mb-4">Search Project</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Search fields for the dialog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Code</label>
              <input
                ref={searchInputRef}
                type="text"
                name="code"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Description</label>
              <input
                type="text"
                name="description"
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {/* Add branchcode search if needed in this dialog */}
            <div>
              <label className="block text-gray-700 text-sm sm:text-base font-medium mb-1">Branch Code</label>
              <input
                type="text"
                name="branchcode"
                value={branchCodeFilter}
                onChange={(e) => setBranchCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleDialogSearch}
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-32 flex items-center justify-center gap-2"
            >
              <Search size={16} /> Search
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
                  onBlur={fetchProjectsData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchProjectsData();
                    }
                  }}
                  className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded text-center"
                />
                <span className="text-green-500 cursor-pointer hover:text-green-600">
                  →
                </span>
              </div>
            </div>

            {/* Dialog's Table */}
            <div className="overflow-x-auto mt-2 sm:mt-4">
              {isLoading ? (
                <div className="text-center p-4">Loading projects...</div>
              ) : (
                <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Code
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Description
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Pay Method
                      </th>
                      <th className="px-2 sm:px-4 py-1 text-left text-xs sm:text-sm font-normal">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length > 0 ? (
                      projects.map((row, index) => (
                        <tr
                          key={row.Code || index}
                          className={`border-b hover:bg-gray-50 text-xs sm:text-sm cursor-pointer ${
                            internalSelectedProject?.Code === row.Code ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => handleRowClick(row)} // Just set internal selection on click
                        >
                          <td className="px-2 sm:px-4 py-1">{row.Code || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.Description || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">{row.PayTypeName || "-"}</td>
                          <td className="px-2 sm:px-4 py-1">
                            {row.Actived === "Y" ? (
                              <Check size={16} className="text-green-600 inline" />
                            ) : (
                              <X size={16} className="text-red-600 inline" />
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm text-gray-500">
                          No projects found.
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

export default ProjectSearchDialog;
