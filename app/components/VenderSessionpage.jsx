"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

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


function VenderAccountPage() {
  const router = useRouter();

  // State for search form inputs
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");

  // State for table data and pagination
  const [vendorAccountRecords, setVendorAccountRecords] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    pageIndex: 1,
  });
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);


  const fetchVendorAccounts = async (page = 1) => {
    setIsLoading(true);
    setApiError(null);

    const payload = new URLSearchParams();
    payload.append("ACTION", "1");
    payload.append("userCode", userCode);
    payload.append("userName", userName);
    payload.append("isVender", "Y");
    payload.append("PAGE_INDEX", page - 1);

    try {
        const data = await apiFetcher("/api/vendor-accounts", "POST", payload, router);
        if (data.state !== 0 && data.state !== "0") {
            throw new Error(data.message || "Failed to fetch vendor accounts.");
        }
        setVendorAccountRecords(data.rows || []);
        setPagination({
            total: Number(data.total),
            totalPages: Number(data.totalPages),
            pageIndex: Number(data.pageIndex),
        });
    } catch (error) {
        setApiError(error.message);
        setVendorAccountRecords([]);
    } finally {
        setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchVendorAccounts(1);
  }, []);

  const handleSearch = () => {
    fetchVendorAccounts(1); // Search always goes to the first page
  };
  
  const handleReload = () => {
      setUserCode("");
      setUserName("");
      fetchVendorAccounts(1);
  }

  const tableHeaders = ["User Code", "Name", "Description", "Department", "Account Balance"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Vendor Account List</h1>
                <div className="flex gap-4">
                    <button onClick={handleReload} className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40 flex items-center justify-center gap-2">
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <p className="text-md font-semibold text-gray-700 mb-4">Searching Conditions</p>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="userCode" className="text-sm text-gray-600">User Code:</label>
                        <input
                            type="text"
                            id="userCode"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            onKeyPress={(e) => { if (e.key === "Enter") handleSearch(); }}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="userName" className="text-sm text-gray-600">Name:</label>
                        <input
                            type="text"
                            id="userName"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onKeyPress={(e) => { if (e.key === "Enter") handleSearch(); }}
                        />
                    </div>
                    <button onClick={handleSearch} disabled={isLoading} className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition disabled:bg-gray-400">
                        <Search size={16} />
                        <span>{isLoading ? 'Searching...' : 'Search'}</span>
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <button onClick={() => fetchVendorAccounts(1)} disabled={pagination.pageIndex <= 1 || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronFirst /></button>
                    <button onClick={() => fetchVendorAccounts(pagination.pageIndex - 1)} disabled={pagination.pageIndex <= 1 || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronLeft /></button>
                    <button onClick={() => fetchVendorAccounts(pagination.pageIndex + 1)} disabled={pagination.pageIndex >= pagination.totalPages || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronRight /></button>
                    <button onClick={() => fetchVendorAccounts(pagination.totalPages)} disabled={pagination.pageIndex >= pagination.totalPages || isLoading} className="p-2 rounded hover:bg-gray-100 disabled:text-gray-300"><ChevronLast /></button>
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
                        ) : vendorAccountRecords.length > 0 ? (
                            vendorAccountRecords.map((row, index) => (
                                <tr key={row.Code || index} className="hover:bg-orange-50 border-b">
                                    <td className="px-6 py-4">{row.Code}</td>
                                    <td className="px-6 py-4">{row.Name}</td>
                                    <td className="px-6 py-4">{row.Description}</td>
                                    <td className="px-6 py-4">{row.DeptName || 'N/A'}</td>
                                    <td className="px-6 py-4">{row.AccBalance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={tableHeaders.length} className="text-center p-6 text-gray-500">No vendor accounts found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default VenderAccountPage;
