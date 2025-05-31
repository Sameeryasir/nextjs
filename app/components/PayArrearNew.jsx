"use client";

import { useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function PayArrearNew() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = 12;
  const recordsPerPage = 10;

  // Sample data for the table, using the current date (May 31, 2025)
  const payArrearData = [
    { description: "Arrear Payment", date: "2025-05-31", balance: "12000.00", payableFees: "600.00", frozenFee: "0.00" },
    { description: "Pending Arrear", date: "2025-05-31", balance: "11500.00", payableFees: "400.00", frozenFee: "0.00" },
    { description: "Arrear Adjustment", date: "2025-05-31", balance: "11000.00", payableFees: "500.00", frozenFee: "0.00" },
    { description: "Overdue Arrear", date: "2025-05-31", balance: "10500.00", payableFees: "300.00", frozenFee: "0.00" },
    { description: "Arrear Payment", date: "2025-05-31", balance: "10000.00", payableFees: "700.00", frozenFee: "0.00" },
    { description: "Pending Arrear", date: "2025-05-31", balance: "9500.00", payableFees: "400.00", frozenFee: "0.00" },
    { description: "Arrear Adjustment", date: "2025-05-31", balance: "9000.00", payableFees: "500.00", frozenFee: "0.00" },
    { description: "Overdue Arrear", date: "2025-05-31", balance: "8500.00", payableFees: "300.00", frozenFee: "0.00" },
    { description: "Arrear Payment", date: "2025-05-31", balance: "8000.00", payableFees: "600.00", frozenFee: "0.00" },
    { description: "Pending Arrear", date: "2025-05-31", balance: "7500.00", payableFees: "400.00", frozenFee: "0.00" },
    { description: "Arrear Adjustment", date: "2025-05-31", balance: "7000.00", payableFees: "500.00", frozenFee: "0.00" },
    { description: "Overdue Arrear", date: "2025-05-31", balance: "6500.00", payableFees: "300.00", frozenFee: "0.00" },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  // Calculate the data to display based on the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentData = payArrearData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Calculate the record range for the current page
  const recordStart = startIndex + 1;
  const recordEnd = endIndex;

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Customer Information</h1>
      
      </div>

      {/* Search Section */}
      <div className="bg-white max-w-5xl p-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Code */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Code</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* FullName */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">FullName</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Meter Num */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Meter Num</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Arrear */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Arrear</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              value="0.00"
              readOnly
            />
          </div>

          {/* Amount */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Amount</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Payment Type */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Payment Type</label>
            <select
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              defaultValue="Cash"
            >
              <option value="Cash">Cash</option>
              <option value="KMF">KMF</option>
            </select>
          </div>

          {/* Stamp Tax */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Stamp Tax</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Total amount */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Total amount</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Amount Received */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Amount Received</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Change */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Change</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              value="0.00"
              readOnly
            />
          </div>

          {/* Invoice */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Invoice</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Search Button */}
          <div className="flex items-center col-span-2 mt-4">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]">
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="px-4 py-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Arrear Details
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Payable Fees</th>
              <th className="p-3 text-left">Frozen Fee</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((arrear, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                    : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                }
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{arrear.description}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{arrear.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{arrear.balance}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{arrear.payableFees}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{arrear.frozenFee}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronFirst className="w-5 h-5 text-gray-600 hover:text-[#FF9900]" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-[#FF9900]" />
            </button>
            <span className="text-sm text-gray-700">
              Total {totalRecords} Records, Record {recordStart}-{recordEnd}, Page {currentPage}/{totalPages}, Turn To Page
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-[#FF9900]" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLast className="w-5 h-5 text-[#FF9900]" />
            </button>
            <input
              type="text"
              className="w-12 h-8 py-1 px-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900] text-center"
              defaultValue={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (!isNaN(page) && page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
            />
            <button
              onClick={() => {
                const inputPage = parseInt(document.querySelector('input[type="text"]').value);
                if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
                  setCurrentPage(inputPage);
                }
              }}
              className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}