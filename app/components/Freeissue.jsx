"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  Search,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { apiFetcher } from "../utils/apiFetcher"; // Ensure path is correct

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


function Keypage() {
  const router = useRouter();

  // State for form inputs
  const [meterNum, setMeterNum] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [fullName, setFullName] = useState(""); // New state for Full Name
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // State for API data, loading, and errors
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    pageIndex: 1,
  });
  
  const handleSearch = async (page = 1, isInitialLoad = false) => {
    // On initial load, we don't require date filters, but for search, we do.
    if (!isInitialLoad && (!dateFrom || !dateTo)) {
        alert("Please select both 'Date From' and 'Date To' for searching.");
        return;
    }

    setIsLoading(true);
    setApiError(null);

    const payload = new URLSearchParams();
    payload.append("ACTION", "60");
    payload.append("dateFrom", dateFrom);
    payload.append("dateTo", dateTo);
    payload.append("meterNum", meterNum);
    payload.append("refCode", accountNo);
    payload.append("cstName", fullName); // Use fullName state for cstName
    payload.append("cstCode", ""); // Not in UI
    payload.append("PAGE_INDEX", page - 1);

    try {
        const data = await apiFetcher("/api/customer-exchange", "POST", payload, router);
        if (data.state !== 0 && data.state !== "0") {
            throw new Error(data.message || "Failed to fetch data.");
        }
        setTableData(data.rows || []);
        setPagination({
            total: Number(data.total),
            totalPages: Number(data.totalPages),
            pageIndex: Number(data.pageIndex),
        });
    } catch (error) {
        setApiError(error.message);
        setTableData([]); // Clear table on error
    } finally {
        setIsLoading(false);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    handleSearch(1, true);
  }, []);

  const handleReload = () => {
    // Reset filters and fetch initial data again
    setMeterNum("");
    setAccountNo("");
    setFullName(""); // Clear full name on reload
    setDateFrom("");
    setDateTo("");
    handleSearch(1, true);
  };

  const tableHeaders = ["Date", "Account No.", "Full Name", "Meter Num.", "Power", "Reason", "Operator"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Key Change List</h1>
          <div className="flex gap-4">
            <button onClick={handleReload} className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              Refresh
            </button>
            <Link href={'/bussiness/keytoken/information'}>
              <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                New
              </button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-md text-gray-500 mb-2">Meter Num.</label>
              <input
                type="text"
                value={meterNum}
                onChange={(e) => setMeterNum(e.target.value)}
                className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md focus:ring-2 focus:ring-orange-400 border-transparent"
              />
            </div>
            <div>
              <label className="block text-md text-gray-500 mb-2">Account No.</label>
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md focus:ring-2 focus:ring-orange-400 border-transparent"
              />
            </div>
            <div>
              <label className="block text-md text-gray-500 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md focus:ring-2 focus:ring-orange-400 border-transparent"
              />
            </div>
             <div>
              <label className="block text-md text-gray-500 mb-2">Date From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md focus:ring-2 focus:ring-orange-400 border-transparent"
              />
            </div>
             <div>
              <label className="block text-md text-gray-500 mb-2">Date To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md focus:ring-2 focus:ring-orange-400 border-transparent"
              />
            </div>
          </div>
          <div>
            <button onClick={() => handleSearch(1)} disabled={isLoading} className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px] disabled:bg-gray-400">
              <Search size={16} />
              <span>{isLoading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <button onClick={() => handleSearch(pagination.pageIndex)} disabled={pagination.pageIndex <= 1 || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronFirst /></button>
                <button onClick={() => handleSearch(pagination.pageIndex - 1)} disabled={pagination.pageIndex <= 1 || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronLeft /></button>
                <button onClick={() => handleSearch(pagination.pageIndex + 1)} disabled={pagination.pageIndex >= pagination.totalPages || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronRight /></button>
                <button onClick={() => handleSearch(pagination.totalPages)} disabled={pagination.pageIndex >= pagination.totalPages || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronLast /></button>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span>Total {pagination.total} Records</span>
                <span>|</span>
                <span>Page {pagination.pageIndex}/{pagination.totalPages || 1}</span>
            </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#000D35] to-[#FF9900] text-white h-12">
                {tableHeaders.map(header => <th key={header} className="px-6 py-3 text-left font-semibold">{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={tableHeaders.length} className="text-center p-6">Loading...</td></tr>
              ) : tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={row.Code || index} className="hover:bg-orange-50 border-b">
                    <td className="px-6 py-4 flex items-center"><Calendar size={16} className="mr-2 text-gray-400" />{row.BzDate}</td>
                    <td className="px-6 py-4">{row.RefCode}</td>
                    <td className="px-6 py-4">{row.FullName}</td>
                    <td className="px-6 py-4">{row.MeterNum}</td>
                    <td className="px-6 py-4">{row.Power}</td>
                    <td className="px-6 py-4">{row.ReasonCode}</td>
                    <td className="px-6 py-4">{row.COperator}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={tableHeaders.length} className="text-center p-6 text-gray-500">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Keypage;
