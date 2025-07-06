"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Search,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Check, // For active/inactive status display
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary (e.g., ../utils/apiFetcher or ../../utils/apiFetcher)

function SearchProjectModel({ isOpen, onClose, onSelect }) {
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

  console.log("SearchProjectModel: Component rendered. isOpen:", isOpen);

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
      console.log("SearchProjectModel: useEffect triggered for data fetch.");
      fetchProjectsData();
    }
  }, [isOpen, pageIndex, codeFilter, descriptionFilter, branchCodeFilter]);

  const fetchProjectsData = async () => {
    console.log("SearchProjectModel: fetchProjectsData called.");
    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append("ACTION", "1"); // As per ArrearProject API (same API for project list)
    if (codeFilter) formData.append("code", codeFilter);
    if (descriptionFilter) formData.append("description", descriptionFilter);
    if (branchCodeFilter) formData.append("branchcode", branchCodeFilter);
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("SearchProjectModel: API Payload:", payloadObject);

    try {
      const data = await apiFetcher("/api/arrear-projects", "POST", formData, router);
      setProjects(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("SearchProjectModel: Data fetched successfully for projects.");
    } catch (error) {
      console.error("SearchProjectModel: Error fetching project data:", error);
      setProjects([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSearch = () => {
    console.log("SearchProjectModel: Dialog search triggered. Resetting pageIndex to 0.");
    setPageIndex(0); // Reset page to 0 on new search, useEffect will re-fetch
  };

  const handlePageChange = (newPage) => {
    console.log("SearchProjectModel: handlePageChange called. New page (0-based):", newPage);
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
    console.log("SearchProjectModel: Row clicked:", project);
    setInternalSelectedProject(project); // Set internal selection
  };

  const handleOkClick = () => {
    console.log("SearchProjectModel: OK button clicked. Internal selected project:", internalSelectedProject);
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
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center">
      <div
        ref={dialogRef}
        className="bg-white rounded shadow-lg p-6 w-[95%] max-w-6xl relative"
      >
        {/* Close and Minimize Icons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="text-gray-500 hover:text-black text-xl font-bold"
            title="Minimize"
            // onClick={...} you can define this handler if minimize functionality is needed
          >
            −
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Search Projects</h2>

        {/* Filter Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-500 text-sm mb-1">Code</label>
            <input
              ref={searchInputRef} // Attach ref here for focus
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Code"
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">
              Description
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
              value={descriptionFilter}
              onChange={(e) => setDescriptionFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
            />
          </div>
          <div> {/* Added Branch Code filter input */}
            <label className="block text-gray-500 text-sm mb-1">
              Branch Code
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Branch Code"
              value={branchCodeFilter}
              onChange={(e) => setBranchCodeFilter(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
              onClick={handleDialogSearch}
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        {/* Pagination Info and Controls */}
        <div className="flex items-center gap-2 mb-4">
          <button
            className={`text-lg ${pageIndex === 0 ? 'text-gray-400 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
          >
            ◀◀
          </button>
          <button
            className={`text-lg ${pageIndex === 0 ? 'text-gray-400 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            ◀
          </button>
          <span>
            Total {totalRecords} Records, Record{" "}
            {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
            {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
            {pageIndex + 1}/{totalPages}, Turn To Page
          </span>
          <input
            type="text"
            className="border border-gray-300 rounded p-1 w-16 ml-2 text-center"
            value={pageIndex + 1}
            onChange={handlePageInputChange}
            onBlur={fetchProjectsData}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchProjectsData();
              }
            }}
          />
          <button
            className={`text-2xl ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-green-500'}`}
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex === totalPages - 1 || totalPages === 0}
          >
            ➜
          </button>
          <button
            className={`text-lg ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={pageIndex === totalPages - 1 || totalPages === 0}
          >
            ▶▶
          </button>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto border border-gray-300">
          {isLoading ? (
            <div className="text-center p-4">Loading projects...</div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="px-2 py-2">Code</th>
                  <th className="px-2 py-2">Description</th>
                  <th className="px-2 py-2">Project Type</th> {/* Mapped from PayTypeName or CalcType? Check API response for this */}
                  <th className="px-2 py-2">Pay Method</th>
                  <th className="px-2 py-2">Active</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <tr
                      key={project.Code || index}
                      className={`border-t hover:bg-gray-100 cursor-pointer ${internalSelectedProject?.Code === project.Code ? 'bg-blue-100' : ''}`}
                      onClick={() => handleRowClick(project)}
                    >
                      <td className="px-2 py-2">{project.Code || "-"}</td>
                      <td className="px-2 py-2">{project.Description || "-"}</td>
                      {/* Mapping Project Type based on response - assuming CalcType or specific mapping */}
                      <td className="px-2 py-2">{project.CalcType || "-"}</td>
                      <td className="px-2 py-2">{project.PayTypeName || "-"}</td>
                      <td className="px-2 py-2">
                        {project.Actived === "Y" ? (
                          <Check size={16} className="text-green-600 inline" />
                        ) : (
                          <X size={16} className="text-red-600 inline" />
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded w-[120px]"
            onClick={handleOkClick}
          >
            OK
          </button>
          <button
            onClick={onClose}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchProjectModel;
