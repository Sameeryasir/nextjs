"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "@/app/utils/apiFetcher"; // Ensure this path is correct
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * A modal dialogue for searching and selecting an area.
 * @param {object} props - The component props.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {Function} props.onSelect - Function to call with the selected area data.
 */
function AreaSelectionDialogue({ onClose, onSelect }) {
  const router = useRouter();

  const [search, setSearch] = useState({ code: "", description: "" });
  const [data, setData] = useState({ rows: [], total: 0, totalPages: 1, pageIndex: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchAreas = async (page = 1) => {
    setLoading(true);
    setError(null);

    const payload = new URLSearchParams();
    payload.append("ACTION", "6");
    payload.append("parentCode", ""); // As per API spec
    payload.append("code", search.code);
    payload.append("description", search.description);
    payload.append("PAGE_INDEX", page - 1);

    try {
      const response = await apiFetcher('/api/public-exchange', 'POST', payload, router);
      if (response && response.state === "0") {
        setData({
          rows: response.rows || [],
          total: Number(response.total),
          totalPages: Number(response.totalPages),
          pageIndex: Number(response.pageIndex),
        });
      } else {
        throw new Error(response.message || "API returned an error state.");
      }
    } catch (err) {
      setError(err.message);
      setData({ rows: [], total: 0, totalPages: 1, pageIndex: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas(1);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchClick = () => { fetchAreas(1); };
  
  const handleOkClick = () => {
    if (selectedRow) {
      onSelect(selectedRow);
    }
    onClose();
  };

  const handlePageChange = (newPage) => {
    const pageNum = Number(newPage);
    if (pageNum >= 1 && pageNum <= data.totalPages) {
      fetchAreas(pageNum);
    }
  };
  
  const handleRowDoubleClick = (row) => {
    onSelect(row);
    onClose();
  };
  
  const tableHeaders = ["Code", "Description"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-4 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Select Area</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><X size={24} /></button>
        </div>
        <div className="flex items-center gap-2 mb-2">
            <input type="text" name="code" placeholder="Code" value={search.code} onChange={handleInputChange} className="p-2 border rounded-md w-32"/>
            <input type="text" name="description" placeholder="Description" value={search.description} onChange={handleInputChange} className="p-2 border rounded-md w-48"/>
            <button type="button" onClick={handleSearchClick} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Search...</button>
        </div>
        <div className="flex flex-wrap items-center gap-2 bg-gray-100 px-3 py-1 rounded text-sm mb-4">
            <div className="flex items-center">
              <button onClick={() => handlePageChange(1)} disabled={data.pageIndex <= 1} className="disabled:text-gray-400 p-1"><ChevronFirst size={20} /></button>
              <button onClick={() => handlePageChange(data.pageIndex - 1)} disabled={data.pageIndex <= 1} className="disabled:text-gray-400 p-1"><ChevronLeft size={20} /></button>
            </div>
            <span>Total {data.total} records, page {data.pageIndex}/{data.totalPages || 1}</span>
             <div className="flex items-center">
              <button onClick={() => handlePageChange(data.pageIndex + 1)} disabled={data.pageIndex >= data.totalPages} className="disabled:text-gray-400 p-1"><ChevronRight size={20} /></button>
              <button onClick={() => handlePageChange(data.totalPages)} disabled={data.pageIndex >= data.totalPages} className="disabled:text-gray-400 p-1"><ChevronLast size={20} /></button>
            </div>
        </div>
        <div className="flex-grow overflow-auto border">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#005587] text-white sticky top-0">
              <tr>{tableHeaders.map(h => <th key={h} className="p-2 font-semibold">{h}</th>)}</tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr><td colSpan={tableHeaders.length} className="text-center p-4">Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={tableHeaders.length} className="text-center p-4 text-red-500">Error: {error}</td></tr>
              ) : data.rows.length === 0 ? (
                <tr><td colSpan={tableHeaders.length} className="text-center p-4">No records found.</td></tr>
              ) : (
                data.rows.map((row) => (
                  <tr key={row.Code} onClick={() => setSelectedRow(row)} onDoubleClick={() => handleRowDoubleClick(row)} className={`cursor-pointer hover:bg-orange-100 ${selectedRow?.Code === row.Code ? 'bg-orange-200' : ''}`}>
                    <td className="p-2 border-t">{row.Code}</td>
                    <td className="p-2 border-t">{row.Description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t mt-4">
          <button onClick={handleOkClick} disabled={!selectedRow || loading} className="w-28 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center">✓ Ok</button>
          <button onClick={onClose} className="w-28 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AreaSelectionDialogue;
