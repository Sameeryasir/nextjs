"use client";

import { useEffect, useRef } from 'react';

export default function BranchPopup({
  isOpen,
  onClose,
  branches,
  onSelect,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalRecords,
  recordStart,
  recordEnd,
  onPageChange,
  searchTerm,
  onSearchChange,
  onSearchSubmit
}) {
  const popupRef = useRef(null);
  const searchInputRef = useRef(null);
  const tableRef = useRef(null);

  // Focus search input when popup opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close popup when clicking outside
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

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="absolute left-32 top-12 z-50 w-[800px] bg-white border border-gray-300 rounded shadow-lg"
    >
      <div className="p-3 border-b border-gray-300 bg-gray-100">
        <h3 className="font-semibold">Select The Branch</h3>

        {/* Full Name Row */}
        <div className="flex items-center mt-2">
          <label className="text-sm font-medium mr-2 w-20">Full Name</label>
          <input
            type="text"
            className="w-[400px] px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50"
          />
        </div>

        {/* Code Row */}
        <div className="flex items-center mt-2">
          <label className="text-sm font-medium mr-2 w-20">Code</label>
          <input
            type="text"
            className="w-[400px] px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50"
          />
        </div>

        {/* Search Button Row */}
        <div className="flex ml-22 mt-2">
          <button
            type="button"
            className="px-4 w-30 py-1 bg-[#01143C] text-white rounded text-sm"
            onClick={onSearchSubmit}
          >
            Search
          </button>
        </div>

        {isLoading ? (
          <div className="text-sm text-gray-500 mt-1">Loading branches...</div>
        ) : error ? (
          <div className="text-sm text-red-500 mt-1">{error}</div>
        ) : (
          <div className="text-sm text-gray-500 mt-1">
            Total {totalRecords} Records, Showing {recordStart} - {recordEnd},
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Scrollable Table Area */}
      <div className="overflow-y-auto max-h-[400px]">
        <table ref={tableRef} className="w-full text-sm">
          <thead className="bg-[#01143C] sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-white">Code</th>
              <th className="px-4 py-2 text-left text-white">Date</th>
              <th className="px-4 py-2 text-left text-white">Types</th>
              <th className="px-4 py-2 text-left text-white">Description</th>
              <th className="px-4 py-2 text-left text-white">Department</th>
              <th className="px-4 py-2 text-left text-white">SGC</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr
                key={index}
                className="border-b hover:bg-blue-50 cursor-pointer even:bg-gray-50"
                onClick={() => onSelect(branch)}
              >
                <td className="px-4 py-2">{branch.code}</td>
                <td className="px-4 py-2">{branch.date}</td>
                <td className="px-4 py-2">{branch.type}</td>
                <td className="px-4 py-2">{branch.description}</td>
                <td className="px-4 py-2">{branch.department}</td>
                <td className="px-4 py-2">{branch.sgc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-3 border-t border-gray-300 bg-gray-50">
        <div className="text-sm text-gray-500">
          Showing {recordStart} to {recordEnd} of {totalRecords} entries
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50"
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border border-gray-300 rounded bg-white disabled:opacity-50"
            disabled={currentPage === totalPages || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end p-3 bg-gray-50 border-t border-gray-300">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded mr-2"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-[#01143C] text-white rounded"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
}