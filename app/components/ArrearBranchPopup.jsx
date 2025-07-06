"use client";
import React, { useState, useEffect, useRef } from "react"; // Added React import, useState, useEffect, useRef
import {
  X,
  Search,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Check, // For active/sell power icons
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

function ArrearBranchPopup({ isOpen, onClose, onSelect, initialSearchTerm = '' }) {
  const router = useRouter();
  const popupRef = useRef(null); // Ref for click outside
  const searchInputRef = useRef(null); // Ref for focusing search input

  // Search filters for the dialog's internal search
  const [deptCodeFilter, setDeptCodeFilter] = useState("");
  const [branchTypeFilter, setBranchTypeFilter] = useState("");
  const [areaCodeFilter, setAreaCodeFilter] = useState("");
  const [regClientFilter, setRegClientFilter] = useState("");
  const [sellPowerFilter, setSellPowerFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState(initialSearchTerm);
  const [nameFilter, setNameFilter] = useState("");

  // Dialog's internal table data and pagination
  const [branches, setBranches] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for dialog's table
  const [internalSelectedBranch, setInternalSelectedBranch] = useState(null); // Internally selected row

  console.log("ArrearBranchPopup: Component rendered. isOpen:", isOpen);

  // Focus search input when popup opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      // Reset filters and fetch data when opening the dialog
      // This ensures the dialog starts fresh or with initialSearchTerm
      setDeptCodeFilter("");
      setBranchTypeFilter("");
      setAreaCodeFilter("");
      setRegClientFilter("");
      setSellPowerFilter("");
      setCodeFilter(initialSearchTerm); // Apply initial search term if provided
      setNameFilter("");
      setPageIndex(0); // Reset page to 0 to trigger fresh fetch via useEffect
    }
  }, [isOpen, initialSearchTerm]); // Re-run when dialog opens or initialSearchTerm changes

  // Fetch data when dialog is open and pagination/filter states change
  useEffect(() => {
    if (isOpen) { // Only fetch if the dialog is actually open
      console.log("ArrearBranchPopup: useEffect triggered for data fetch in dialog.");
      fetchBranchesData();
    }
  }, [isOpen, pageIndex, deptCodeFilter, branchTypeFilter, areaCodeFilter, regClientFilter, sellPowerFilter, codeFilter, nameFilter]);

  const fetchBranchesData = async () => {
    console.log("ArrearBranchPopup: fetchBranchesData called.");
    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append("ACTION", "2");
    if (deptCodeFilter) formData.append("deptCode", deptCodeFilter);
    if (branchTypeFilter) formData.append("branchType", branchTypeFilter);
    if (areaCodeFilter) formData.append("areaCode", areaCodeFilter);
    if (regClientFilter) formData.append("regClient", regClientFilter);
    if (sellPowerFilter) formData.append("sellPower", sellPowerFilter);
    if (codeFilter) formData.append("code", codeFilter);
    if (nameFilter) formData.append("name", nameFilter);
    formData.append("Actived", "Y"); // As per response example
    formData.append("Cancelled", "N"); // As per response example
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("ArrearBranchPopup: Dialog API Payload:", payloadObject);

    try {
      const data = await apiFetcher("/api/branches", "POST", formData, router);
      setBranches(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      setInternalSelectedBranch(null); // Clear internal selection on new fetch
      console.log("ArrearBranchPopup: Data fetched successfully for branches.");
    } catch (error) {
      console.error("ArrearBranchPopup: Error fetching dialog data:", error);
      setBranches([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSearch = () => {
    console.log("ArrearBranchPopup: Dialog search triggered. Resetting pageIndex to 0.");
    setPageIndex(0); // Reset page to 0 on new search. useEffect will re-fetch.
  };

  const handlePageChange = (newPage) => {
    console.log("ArrearBranchPopup: handlePageChange called. New page (0-based):", newPage);
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

  const handleRowClick = (branch) => {
    console.log("ArrearBranchPopup: Row clicked:", branch);
    setInternalSelectedBranch(branch); // Set internal selection
  };

  const handleOkClick = () => {
    console.log("ArrearBranchPopup: OK button clicked. Internal selected branch:", internalSelectedBranch);
    if (internalSelectedBranch && onSelect) {
      onSelect(internalSelectedBranch); // Pass the internally selected branch back to parent
    }
    onClose(); // Close the dialog
  };

  // Close popup when clicking outside (re-added as it was missing from the latest provided version)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);


  if (!isOpen) {
    console.log("ArrearBranchPopup: Not open, returning null.");
    return null;
  }

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center p-2 sm:p-4 z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="hover:cursor-pointer absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Select Branch</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Search fields for the dialog */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Code</label>
              <input
                ref={searchInputRef} // Attach ref here for focus
                type="text"
                name="code"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Department Code</label>
              <input
                type="text"
                name="deptCode"
                value={deptCodeFilter}
                onChange={(e) => setDeptCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Branch Type</label>
              <input
                type="text"
                name="branchType"
                value={branchTypeFilter}
                onChange={(e) => setBranchTypeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Area Code</label>
              <input
                type="text"
                name="areaCode"
                value={areaCodeFilter}
                onChange={(e) => setAreaCodeFilter(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Register Client (Y/N)</label>
              <select
                name="regClient"
                value={regClientFilter}
                onChange={(e) => setRegClientFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Sell Power (Y/N)</label>
              <select
                name="sellPower"
                value={sellPowerFilter}
                onChange={(e) => setSellPowerFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
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
                  onBlur={fetchBranchesData} // Re-fetch on blur
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchBranchesData();
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
                <div className="text-center p-4">Loading branches...</div>
              ) : (
                <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Code
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Name
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Branch Type
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Department Name
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Active
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Sell Power
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.length > 0 ? (
                      branches.map((row, index) => (
                        <tr
                          key={row.Code || index}
                          // Highlight selected row
                          className={`border-b hover:bg-gray-50 text-xs sm:text-sm cursor-pointer ${
                            internalSelectedBranch?.Code === row.Code ? 'bg-blue-100' : ''
                          }`}
                          onClick={() => setInternalSelectedBranch(row)} // Just set internal selection on click
                        >
                          <td className="px-2 sm:px-4 py-1 sm:py-2">{row.Code || "-"}</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">{row.Name || "-"}</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">{row.BranchType || "-"}</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">{row.DeptName || "-"}</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            {row.Actived === "Y" ? (
                              <Check size={16} className="text-green-600 inline" />
                            ) : (
                              <X size={16} className="text-red-600 inline" />
                            )}
                          </td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            {row.SellPower === "Y" ? (
                              <Check size={16} className="text-green-600 inline" />
                            ) : (
                              <X size={16} className="text-red-600 inline" />
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-2 sm:px-4 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500">
                          No branches found.
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
              type="button" // Changed to button type to prevent form submission
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

export default ArrearBranchPopup;
