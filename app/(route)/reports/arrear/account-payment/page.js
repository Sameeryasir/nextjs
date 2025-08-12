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

// Import the functional modal components and the API fetcher
// Make sure the paths to these files are correct in your project
import BranchSelectionDialogue from "./accountdialogue"; // Assuming this is your Branch modal
import CustomerInfoDialogue from "./accountdialogue1"; // Assuming this is your Customer modal
import { apiFetcher } from "../../../../utils/apiFetcher"; // Path to your apiFetcher utility

function Page() {
  const router = useRouter();

  // State for controlling the dialogs
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isCustomerInfoDialogOpen, setIsCustomerInfoDialogOpen] = useState(false);
  
  // State for form inputs and selections
  const [branch, setBranch] = useState({ code: "", name: "" });
  const [customer, setCustomer] = useState({ code: "", name: "" });
  const [accountNo, setAccountNo] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // State for the table data, loading, and errors
  const [tableData, setTableData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    pageIndex: 1,
  });

  // --- Basic Actions ---
  const handleReload = () => window.location.reload();

  const handleExportToExcel = () => {
    if (tableData.length === 0) {
      alert("No data to export.");
      return;
    }
    const header = [
      "Account No.",
      "Project",
      "Reg. Date",
      "Close Date",
      "Paying Date",
      "Pay Method",
      "Remain Balance",
      "Periodic Payment Amount",
    ];
    const rows = tableData.map((item) => [
      item.AccountNo,
      item.ProjectName,
      item.RegDate,
      item.CloseDate,
      item.PayingDate,
      item.PayMethod,
      item.RemainBalance,
      item.PeriodicPayment,
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Account Payments");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "customer-account-payments.xlsx");
  };

  // --- Handlers for Selection Modals ---
  const handleSelectBranch = (selectedBranch) => {
    if (selectedBranch) {
      setBranch({ code: selectedBranch.Code, name: selectedBranch.Name });
      // Clear dependent fields when branch changes
      setCustomer({ code: "", name: "" });
      setAccountNo("");
    }
    setIsBranchDialogOpen(false);
  };

  const handleClearBranch = () => {
    setBranch({ code: "", name: "" });
    setCustomer({ code: "", name: "" });
    setAccountNo("");
  };

  const handleSelectCustomer = (selectedCustomer) => {
    if (selectedCustomer) {
      setCustomer({ code: selectedCustomer.Code, name: selectedCustomer.FullName });
      setAccountNo(selectedCustomer.Code || ""); // Using customer code for Account No.
    }
    setIsCustomerInfoDialogOpen(false);
  };

  const handleClearCustomer = () => {
    setCustomer({ code: "", name: "" });
    setAccountNo("");
  };

  // --- Search Handler ---
  const handleSearch = async (page = 1) => {
    if (!dateFrom || !dateTo) {
      alert("Please select both 'Date From' and 'Date To'.");
      return;
    }
    if (!branch.code) {
      alert("Please select a Branch.");
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setTableData([]);

    const payload = new URLSearchParams();
    payload.append("ACTION", "17");
    payload.append("branchcode", branch.code);
    payload.append("code", customer.code); // This is the customer code
    payload.append("dateFrom", dateFrom);
    payload.append("dateTo", dateTo);
    payload.append("PAGE_INDEX", page);

    try {
      const response = await apiFetcher('/api/sge-reports', 'POST', payload, router);
      if (response && response.state === "0") {
        setTableData(response.rows || []);
        setPagination({
          total: Number(response.total),
          totalPages: Number(response.totalPages),
          pageIndex: Number(response.pageIndex),
        });
      } else {
        throw new Error(response.message || "API returned an error state.");
      }
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Account Payments
        </h1>
        <div className="flex gap-4">
          <button onClick={handleReload} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Refresh</button>
          <button onClick={handleExportToExcel} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Excel</button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105">Print</button>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        {/* Branch Fields */}
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

        {/* Customer Info Fields */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Customer Info</label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input type="text" value={customer.code} placeholder="Customer Code" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <input type="text" value={customer.name} placeholder="Customer Name" className="flex-1 min-w-[150px] p-2 border rounded-md bg-gray-200" readOnly />
            <button type="button" onClick={() => setIsCustomerInfoDialogOpen(true)} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105">...</button>
            {isCustomerInfoDialogOpen && <CustomerInfoDialogue onClose={() => setIsCustomerInfoDialogOpen(false)} onSelect={handleSelectCustomer} />}
            <button type="button" onClick={handleClearCustomer} className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"><X size={16} /></button>
          </div>
        </div>

        {/* Account No. */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Account No.</label>
          <input type="text" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Date From */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Date From</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Date To */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">Date To</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Search Button */}
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button onClick={() => handleSearch(1)} disabled={isSearching} className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105 disabled:bg-gray-400">
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex gap-1 sm:gap-2">
            <button onClick={() => handleSearch(1)} disabled={pagination.pageIndex <= 1 || isSearching} className="disabled:text-gray-400 p-1"><ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <button onClick={() => handleSearch(pagination.pageIndex - 1)} disabled={pagination.pageIndex <= 1 || isSearching} className="disabled:text-gray-400 p-1"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <button onClick={() => handleSearch(pagination.pageIndex + 1)} disabled={pagination.pageIndex >= pagination.totalPages || isSearching} className="disabled:text-gray-400 p-1"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <button onClick={() => handleSearch(pagination.totalPages)} disabled={pagination.pageIndex >= pagination.totalPages || isSearching} className="disabled:text-gray-400 p-1"><ChevronLast className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
            <span className="text-gray-600 whitespace-nowrap">Total {pagination.total} Records</span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-600 whitespace-nowrap">Page {pagination.pageIndex}/{pagination.totalPages || 1}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Account No.</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Reg.Date</th>
              <th className="p-3 text-left">Close Date</th>
              <th className="p-3 text-left">Paying Date</th>
              <th className="p-3 text-left">Pay Method</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Total Paid</th>
            </tr>
          </thead>
          <tbody>
            {isSearching ? (
              <tr><td colSpan="8" className="text-center p-4">Loading...</td></tr>
            ) : searchError ? (
              <tr><td colSpan="8" className="text-center p-4 text-red-500">Error: {searchError}</td></tr>
            ) : tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr key={index} className="hover:bg-[#FFE2B7] transition text-sm">
                  {/* NOTE: Please verify these keys match your actual API response */}
                  <td className="p-3">{row.AccountNo || 'N/A'}</td>
                  <td className="p-3">{row.ProjectName || 'N/A'}</td>
                  <td className="p-3">{row.RegDate || 'N/A'}</td>
                  <td className="p-3">{row.CloseDate || 'N/A'}</td>
                  <td className="p-3">{row.PayingDate || 'N/A'}</td>
                  <td className="p-3">{row.PayMethod || 'N/A'}</td>
                  <td className="p-3">{row.RemainBalance || 'N/A'}</td>
                  <td className="p-3">{row.TotalPaid || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="text-center p-4 text-gray-500">No records found. Please start a search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
