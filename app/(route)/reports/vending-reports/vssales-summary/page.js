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

// Import the functional Branch modal
import BranchSelectionDialogue from "@/app/components/clientdialogue/dialogue1";
// NOTE: apiFetcher is no longer used in this component as the logic is handled directly in handleSearch for better error display.

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
  const [branchType, setBranchType] = useState("Vending Office"); // Default value
  const [operator, setOperator] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  
  // State for dialogs and errors
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
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
    const headers = ["Branch", "Tariff", "Type", "Total Sales", "Charges", "Arrear", "Unit Cost", "Step1", "Step2", "Step3", "Step4", "kWh"];
    const data = tableData.map((row) => headers.map(header => row[header] || ''));
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesSummary");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "SalesSummary.xlsx");
  };

  // --- Data Fetching and State Management ---
  const handleSelectBranch = (selectedBranch) => {
    if (selectedBranch) {
      setBranch({ code: selectedBranch.Code, name: selectedBranch.Name });
    }
    setIsBranchDialogOpen(false);
  };

  const handleClearBranch = () => setBranch({ code: "", name: "" });

  const handleSearch = async (page = 1) => {
    if (!branch.code || !dateFrom || !dateTo) {
      alert("Please select a branch and both date fields.");
      return;
    }
    setIsSearching(true);
    setApiError(null);
    setTableData([]);

    const payload = new URLSearchParams();
    payload.append("ACTION", "1");
    payload.append("branchCode", branch.code);
    payload.append("dateFrom", dateFrom);
    payload.append("dateTo", dateTo);
    payload.append("branchType", branchType);
    payload.append("operator", operator);
    payload.append("PAGE_INDEX", page - 1);

    try {
      // Direct fetch implementation for robust error handling
      const cookieString = document.cookie;
      if (!cookieString || cookieString.trim() === "") {
        router.push("/auth/login");
        throw new Error("Authentication required: No cookies found.");
      }

      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookieString,
      };

      const config = {
        method: 'POST',
        headers: headers,
        body: payload.toString(),
      };

      const response = await fetch('/api/sge-reports', config);
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${responseText}`);
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, the response was likely a plain text error from the backend.
        // We will display this text directly.
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
        // This handles cases where the JSON is valid but indicates an API-level error.
        throw new Error(data.message || `API returned an error state: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  const tableHeaders = ["Branch", "Tariff", "Type", "Total Sales", "Charges", "Arrear", "Unit Cost", "Step1", "Step2", "Step3", "Step4", "kWh"];

  return (
    <div className="min-h-screen bg-white p-6">
      {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">VS Sales Summary</h1>
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
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Type</label>
          <select value={branchType} onChange={(e) => setBranchType(e.target.value)} className="w-full sm:w-[375px] p-2 border rounded-md bg-gray-50">
            <option value="Vending Office">Vending Office</option>
            <option value="Agone">Agone</option>
            <option value="SMS">SMS</option>
            <option value="USSD">USSD</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Operator</label>
          <input type="text" value={operator} onChange={(e) => setOperator(e.target.value)} className="w-full sm:w-[375px] p-2 border rounded-md bg-gray-50" />
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
          <tbody className="text-sm text-gray-800">
            {isSearching ? (
              <tr><td colSpan={tableHeaders.length} className="text-center p-4">Loading...</td></tr>
            ) : tableData.length > 0 ? (
              tableData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {tableHeaders.map(header => <td key={header} className="p-3">{row[header] || 'N/A'}</td>)}
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
