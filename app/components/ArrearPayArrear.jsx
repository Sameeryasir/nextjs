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

export default function AccountPayArrear() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalRecords = 12;
  const recordsPerPage = 10;

  // Sample data for the table
  const accountPaymentData = [
    { date: "2025-05-28", accountNo: "31125296", customerName: "Aaaaaa Aaaaaaa", meterNum: "25120400129", amount: "2000.00", receiptNo: "REC001", operator: "John Doe", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125297", customerName: "Bbbbbb Bbbbbb", meterNum: "25120400130", amount: "2100.00", receiptNo: "REC002", operator: "Jane Smith", status: "Pending" },
    { date: "2025-05-28", accountNo: "31125298", customerName: "Cccccc Cccccc", meterNum: "25120400131", amount: "2200.00", receiptNo: "REC003", operator: "Alice Brown", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125299", customerName: "Dddddd Dddddd", meterNum: "25120400132", amount: "2300.00", receiptNo: "REC004", operator: "Bob Wilson", status: "Pending" },
    { date: "2025-05-28", accountNo: "31125300", customerName: "Eeeeee Eeeeee", meterNum: "25120400133", amount: "2400.00", receiptNo: "REC005", operator: "Emma Davis", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125301", customerName: "Ffffff Fffffff", meterNum: "25120400134", amount: "2500.00", receiptNo: "REC006", operator: "John Doe", status: "Pending" },
    { date: "2025-05-28", accountNo: "31125302", customerName: "Gggggg Gggggg", meterNum: "25120400135", amount: "2600.00", receiptNo: "REC007", operator: "Jane Smith", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125303", customerName: "Hhhhhh Hhhhhh", meterNum: "25120400136", amount: "2700.00", receiptNo: "REC008", operator: "Alice Brown", status: "Pending" },
    { date: "2025-05-28", accountNo: "31125304", customerName: "Iiiiii Iiiiiii", meterNum: "25120400137", amount: "2800.00", receiptNo: "REC009", operator: "Bob Wilson", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125305", customerName: "Jjjjjj Jjjjjj", meterNum: "25120400138", amount: "2900.00", receiptNo: "REC010", operator: "Emma Davis", status: "Pending" },
    { date: "2025-05-28", accountNo: "31125306", customerName: "Kkkkkk Kkkkkk", meterNum: "25120400139", amount: "3000.00", receiptNo: "REC011", operator: "John Doe", status: "Paid" },
    { date: "2025-05-28", accountNo: "31125307", customerName: "Llllll Llllll", meterNum: "25120400140", amount: "3100.00", receiptNo: "REC012", operator: "Jane Smith", status: "Pending" },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  // Calculate the data to display based on the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentData = accountPaymentData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  // Calculate the record range for the current page
  const recordStart = startIndex + 1;
  const recordEnd = endIndex;

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Account Payment List</h1>
        <div className="flex gap-2">
          <button
            onClick={handleReload}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <Link href="/payarrearnew">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
              <Plus size={18} />
              New
            </button>
          </Link>
        </div>
      </div>

      {/* Search Section */}
      {/* Search Section */}
      <div className="bg-white max-w-5xl p-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Meter Num */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Meter Num</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Full Name</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Code */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Code</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Account No */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500 mr-4">Account No</label>
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Account No</th>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Meter Num</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Receipt No</th>
              <th className="p-3 text-left">Operator</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((payment, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                    : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                }
              >
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.accountNo}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.customerName}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.meterNum}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.receiptNo}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.operator}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.status}</td>
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
          <div className="flex gap-2">
            <button
              onClick={handleReload}
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
              <Link href="/payarrearnew">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
              <Plus size={18} />
              New
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}