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
import SearchProjectModel from "./SearchProjectmodel";
export default function CustomerContract() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState(""); // Fixed typo: usestatus -> setStatus
  const statusOptions = ["Cancelled", "Once and Finished", "Paying", "Finished", "Pause"];
  const totalRecords = 5;
  const recordsPerPage = 5;
  const [activeTab, setActiveTab] = useState("payment");
  const [showProjectPopup, setShowProjectPopup] = useState(false); // State for modal visibility

  // Original data for the first table with updated date
  const originalPaymentData = [
    { date: "2025-05-28", accountNo: "31125296", nameOfCustomer: "Aaaaaa Aaaaaaa", meterNum: "25120400129", project: "Project A", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125297", nameOfCustomer: "Bbbbbb Bbbbbb", meterNum: "25120400130", project: "Project B", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125298", nameOfCustomer: "Cccccc Cccccc", meterNum: "25120400131", project: "Project C", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125299", nameOfCustomer: "Dddddd Dddddd", meterNum: "25120400132", project: "Project D", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125300", nameOfCustomer: "Eeeeee Eeeeee", meterNum: "25120400133", project: "Project E", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
  ];

  // Data for Payment List tab with updated date
  const paymentListData = [
    { date: "2025-05-28", types: "Payment", balance: "9900.00", amount: "2000.00", payable: "7900.00", extraPay: "0.00", interest: "100.00", frozenFee: "50.00" },
    { date: "2025-05-28", types: "Payment", balance: "9800.00", amount: "2100.00", payable: "7700.00", extraPay: "0.00", interest: "150.00", frozenFee: "75.00" },
    { date: "2025-05-28", types: "Payment", balance: "9700.00", amount: "2200.00", payable: "7500.00", extraPay: "0.00", interest: "200.00", frozenFee: "100.00" },
    { date: "2025-05-28", types: "Payment", balance: "9600.00", amount: "2300.00", payable: "7300.00", extraPay: "0.00", interest: "250.00", frozenFee: "125.00" },
    { date: "2025-05-28", types: "Payment", balance: "9500.00", amount: "2400.00", payable: "7100.00", extraPay: "0.00", interest: "300.00", frozenFee: "150.00" },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Free Issue List</h1>
        <div className="flex gap-2">
          <button
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <Link href="/arrearcustomernew">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
              <Plus size={18} />
              New
            </button>
          </Link>
          <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
            Excel
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white max-w-5xl p-4">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Date From */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Date From</label>
            <input
              type="date"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Date To */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Date To</label>
            <input
              type="date"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Meter Number */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Meter Number</label>
            <input
              type="number"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Full Name</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Code */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Code</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Account No */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Account No</label>
            <input
              type="number"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Projects */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Projects</label>
            <input
              type="text"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
              onClick={() => {
                setShowProjectPopup(true);
                setCurrentPage(1); // Reset to first page when opening
              }}
            >
              ...
            </button>
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
              onClick={() => {}}
            >
              ×
            </button>
          </div>

          {/* Status */}
          <div className="flex items-center">
            <label className="w-32 text-sm text-gray-500 mr-4">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]">
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* First Table Section */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="px-4 py-2 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Total {totalRecords} Records, Record 1-{Math.min(recordsPerPage, totalRecords)}, Page 1/{Math.ceil(totalRecords / recordsPerPage)}, Turn To Page
          </h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[100px] whitespace-nowrap">Account No</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[140px] whitespace-nowrap">Name of Customer</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[100px] whitespace-nowrap">Meter Num</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Project</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[90px] whitespace-nowrap">Pay Method</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[110px] whitespace-nowrap">Initial Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Paid</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Balance</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[90px] whitespace-nowrap">Paying Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[90px] whitespace-nowrap">Expiry Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Pay Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {originalPaymentData.map((contract, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.accountNo}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.nameOfCustomer}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.meterNum}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.project}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.payMethod}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.initialAmount}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.paid}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.balance}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.payingDate}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.expiryDate}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{contract.payValue}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-200">
              <ChevronFirst className="w-5 h-5 text-gray-600 hover:text-[#FF9900]" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-200">
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-[#FF9900]" />
            </button>
            <span className="text-sm text-gray-700">
              Total {totalRecords} Records, Record 1-{Math.min(recordsPerPage, totalRecords)}, Page 1/{Math.ceil(totalRecords / recordsPerPage)}, Turn To Page
            </span>
            <button className="p-1 rounded-full hover:bg-gray-200">
              <ChevronRight className="w-5 h-5 text-[#FF9900]" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-200">
              <ChevronLast className="w-5 h-5 text-[#FF9900]" />
            </button>
            <input
              type="text"
              className="w-12 h-8 py-1 px-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900] text-center"
              defaultValue="1"
            />
            <button className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
            <Link href="/arrearcustomernew">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
              <Plus size={18} />
              New
            </button>
          </Link>
          </div>
        </div>
      </div>

      {/* Tabs for Payment List and Adjustment List */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-1">
            <button
              onClick={() => setActiveTab("payment")}
              className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === "payment" ? "border-[#FF9900] text-white bg-[#FF9900]" : "border-blue-500 text-gray-500 hover:text-[#FF9900]"}`}
            >
              Payment List
            </button>
            <button
              onClick={() => setActiveTab("adjustment")}
              className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === "adjustment" ? "border-[#FF9900] text-white bg-[#FF9900]" : "border-[#FF9900] text-gray-500 hover:text-[#FF9900]"}`}
            >
              Adjustment List
            </button>
          </nav>
        </div>
        <div className="bg-white rounded-lg shadow mt-2 overflow-x-auto">
          {activeTab === "payment" ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Types</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Balance</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Payable</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Extra Pay</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Interest</th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider min-w-[80px] whitespace-nowrap">Frozen Fee</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentListData.map((payment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.types}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.balance}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.amount}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.payable}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.extraPay}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.interest}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{payment.frozenFee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div></div> // No content displayed for Adjustment List
          )}
        </div>
      </div>

      {/* Search Project Modal */}
      <SearchProjectModel
        isOpen={showProjectPopup}
        onClose={() => setShowProjectPopup(false)}
      />
    </div>
  );
}