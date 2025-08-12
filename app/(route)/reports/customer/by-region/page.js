"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Import the functional modal components
import BranchSelectionDialogue from "@/app/components/clientdialogue/dialogue1";
import AreaSelectionDialogue from "@/app/components/clientdialogue/dialogue2";

// A simple modal component for showing API errors
const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4 text-red-600">API Error</h2>
      <p className="mb-4 break-words">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 w-full"
      >
        Close
      </button>
    </div>
  </div>
);


function Page() {
  const router = useRouter();

  // State for form inputs
  const [branch, setBranch] = useState({ code: "", name: "" });
  const [area, setArea] = useState({ code: "", name: "" });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  
  // State for dialogs and errors
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isAreaDialogOpen, setIsAreaDialogOpen] = useState(false);
  const [apiError, setApiError] = useState(null);

  // State for table data and search status
  const [tableData, setTableData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    pageIndex: 1,
  });

  const handleReload = () => window.location.reload();

  const handleExportToExcel = () => {
    if (tableData.length === 0) {
      alert("No data to export.");
      return;
    }
    const headers = ["Zone"]; // As per the UI, only one column
    const data = tableData.map((row) => [row.Zone]); // NOTE: This key must match the API response
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CustomersByRegion");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "customers_by_region.xlsx");
  };

  const handleSelectBranch = (selectedBranch) => {
    if (selectedBranch) {
      setBranch({ code: selectedBranch.Code, name: selectedBranch.Name });
    }
    setIsBranchDialogOpen(false);
  };

  const handleClearBranch = () => setBranch({ code: "", name: "" });

  const handleSelectArea = (selectedArea) => {
    if (selectedArea) {
      setArea({ code: selectedArea.Code, name: selectedArea.Description });
    }
    setIsAreaDialogOpen(false);
  };

  const handleClearArea = () => setArea({ code: "", name: "" });

  const handleSearch = async (page = 1) => {
    if (!branch.code || !area.code || !dateFrom || !dateTo) {
      alert("Please select a branch, an area, and both date fields.");
      return;
    }
    setIsSearching(true);
    setApiError(null);
    setTableData([]);

    const payload = new URLSearchParams();
    payload.append("ACTION", "12");
    payload.append("branchcode", branch.code);
    payload.append("AreaCode", area.code);
    payload.append("DateFrom", dateFrom);
    payload.append("DateTo", dateTo);
    payload.append("PAGE_INDEX", page - 1);

    try {
      const cookieString = document.cookie;
      if (!cookieString || cookieString.trim() === "") {
        router.push("/auth/login");
        throw new Error("Authentication required: No cookies found.");
      }

      const response = await fetch('/api/sge-reports', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
        },
        body: payload.toString(),
      });

      const responseText = await response.text();
      if (!response.ok) { throw new Error(`HTTP error ${response.status}: ${responseText}`); }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(responseText);
      }

      if (data && data.state === "0") {
        setTableData(data.rows || []);
        setPagination({
          total: Number(data.total),
          totalPages: Number(data.totalPages),
          pageIndex: Number(data.pageIndex),
        });
      } else {
        throw new Error(data.message || `API returned an error state: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const tableHeaders = ["Zone"];

  return (
    <div className="min-h-screen bg-white p-6">
      {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Customers By Region</h1>
        <div className="flex gap-4">
          <button onClick={handleReload} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Refresh</button>
          <button onClick={handleExportToExcel} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Excel</button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Print</button>
        </div>
      </div>

      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Branch</label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input type="text" value={branch.code} placeholder="Branch Code" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <input type="text" value={branch.name} placeholder="Branch Name" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <button type="button" onClick={() => setIsBranchDialogOpen(true)} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105">...</button>
            {isBranchDialogOpen && <BranchSelectionDialogue onClose={() => setIsBranchDialogOpen(false)} onSelect={handleSelectBranch} />}
            <button type="button" onClick={handleClearBranch} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"><X size={16} /></button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Select The Area</label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input type="text" value={area.code} placeholder="Area Code" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <input type="text" value={area.name} placeholder="Area Name" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <button type="button" onClick={() => setIsAreaDialogOpen(true)} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105">...</button>
            {isAreaDialogOpen && <AreaSelectionDialogue onClose={() => setIsAreaDialogOpen(false)} onSelect={handleSelectArea} />}
            <button type="button" onClick={handleClearArea} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"><X size={16} /></button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Date From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full sm:w-[375px] p-2 border rounded-md bg-gray-50" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Date To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full sm:w-[375px] p-2 border rounded-md bg-gray-50" />
        </div>
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button onClick={() => handleSearch(1)} disabled={isSearching} className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105 disabled:bg-gray-400">
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex gap-1 sm:gap-2">
            <button onClick={() => handleSearch(1)} disabled={pagination.pageIndex <= 1 || isSearching} className="disabled:text-gray-400 p-1"><ChevronFirst /></button>
            <button onClick={() => handleSearch(pagination.pageIndex - 1)} disabled={pagination.pageIndex <= 1 || isSearching} className="disabled:text-gray-400 p-1"><ChevronLeft /></button>
            <button onClick={() => handleSearch(pagination.pageIndex + 1)} disabled={pagination.pageIndex >= pagination.totalPages || isSearching} className="disabled:text-gray-400 p-1"><ChevronRight /></button>
            <button onClick={() => handleSearch(pagination.totalPages)} disabled={pagination.pageIndex >= pagination.totalPages || isSearching} className="disabled:text-gray-400 p-1"><ChevronLast /></button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
            <span className="text-gray-600 whitespace-nowrap">Total {pagination.total} Records</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-600 whitespace-nowrap">Page {pagination.pageIndex}/{pagination.totalPages || 1}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>{tableHeaders.map(h => <th key={h} className="p-3 text-left">{h}</th>)}</tr>
          </thead>
          <tbody className="text-sm text-gray-700 bg-white">
            {isSearching ? (
              <tr><td colSpan={tableHeaders.length} className="text-center p-4">Loading...</td></tr>
            ) : tableData.length > 0 ? (
              tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-3">{row.Zone || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={tableHeaders.length} className="text-center p-4 text-gray-500">No records found. Please start a search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
