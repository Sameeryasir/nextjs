"use client";

import { useState } from "react";
import {
  Search,
  RefreshCw,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import Link from "next/link";
import * as XLSX from "xlsx"; // Import xlsx library

import SearchProjectModel from "./SearchProjectmodel";
export default function CustomerContract() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const statusOptions = ["Cancelled", "Once and Finished", "Paying", "Finished", "Pause"];
  const totalRecords = 5;
  const recordsPerPage = 5;
  const [activeTab, setActiveTab] = useState("payment");
  const [showProjectPopup, setShowProjectPopup] = useState(false); // State for modal visibility

  // Original data for the first table
  const originalPaymentData = [
    { date: "2025-05-28", accountNo: "31125296", nameOfCustomer: "Aaaaaa Aaaaaaa", meterNum: "25120400129", project: "Project A", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125297", nameOfCustomer: "Bbbbbb Bbbbbb", meterNum: "25120400130", project: "Project B", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125298", nameOfCustomer: "Cccccc Cccccc", meterNum: "25120400131", project: "Project C", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125299", nameOfCustomer: "Dddddd Dddddd", meterNum: "25120400132", project: "Project D", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
    { date: "2025-05-28", accountNo: "31125300", nameOfCustomer: "Eeeeee Eeeeee", meterNum: "25120400133", project: "Project E", payMethod: "Pre Times", initialAmount: "9900.00", paid: "0.00", balance: "9900.00", payingDate: "2025-05-28", expiryDate: "Null", payValue: "0.00" },
  ];

  // Data for Payment List tab
  const paymentListData = [
    { date: "2025-05-28", types: "Payment", balance: "9900.00", amount: "2000.00", payable: "7900.00", extraPay: "0.00", interest: "100.00", frozenFee: "50.00" },
    { date: "2025-05-28", types: "Payment", balance: "9800.00", amount: "2100.00", payable: "7700.00", extraPay: "0.00", interest: "150.00", frozenFee: "75.00" },
    { date: "2025-05-28", types: "Payment", balance: "9700.00", amount: "2200.00", payable: "7500.00", extraPay: "0.00", interest: "200.00", frozenFee: "100.00" },
    { date: "2025-05-28", types: "Payment", balance: "9600.00", amount: "2300.00", payable: "7300.00", extraPay: "0.00", interest: "250.00", frozenFee: "125.00" },
    { date: "2025-05-28", types: "Payment", balance: "9500.00", amount: "2400.00", payable: "7100.00", extraPay: "0.00", interest: "300.00", frozenFee: "150.00" },
  ];

  // Data for Adjustment List tab
  const adjustmentListData = [
    { date: "2025-05-28", payMethod: "Pre Times", previousBalance: "10000.00", adjustment: "500.00", totalBalance: "9500.00", new: "0.00", payingDate: "2025-05-28", operator: "John Doe" },
    { date: "2025-05-28", payMethod: "Postpaid", previousBalance: "9900.00", adjustment: "300.00", totalBalance: "9600.00", new: "0.00", payingDate: "2025-05-28", operator: "Jane Smith" },
    { date: "2025-05-28", payMethod: "Pre Times", previousBalance: "9800.00", adjustment: "400.00", totalBalance: "9400.00", new: "0.00", payingDate: "2025-05-28", operator: "Alice Brown" },
    { date: "2025-05-28", payMethod: "Postpaid", previousBalance: "9700.00", adjustment: "200.00", totalBalance: "9500.00", new: "0.00", payingDate: "2025-05-28", operator: "Bob Wilson" },
    { date: "2025-05-28", payMethod: "Pre Times", previousBalance: "9600.00", adjustment: "600.00", totalBalance: "9000.00", new: "0.00", payingDate: "2025-05-28", operator: "Emma Davis" },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    let data = [];
    let fileName = "";
    let sheetName = "";

    // Select data based on the active tab
    if (activeTab === "payment") {
      data = paymentListData;
      fileName = "Payment_List.xlsx";
      sheetName = "Payment List";
    } else if (activeTab === "adjustment") {
      data = adjustmentListData;
      fileName = "Adjustment_List.xlsx";
      sheetName = "Adjustment List";
    } else {
      // Default to originalPaymentData if no tab is selected (main table)
      data = originalPaymentData;
      fileName = "Customer_Contracts.xlsx";
      sheetName = "Customer Contracts";
    }

    // Create a new workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generate and download the Excel file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Free Issue List</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => handleReload()}
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
          <button 
            onClick={exportToExcel}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]"
          >
            <FileSpreadsheet size={18} /> 
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
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Account No</th>
              <th className="p-3 text-left">Name of Customer</th>
              <th className="p-3 text-left">Meter Num</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Pay Method</th>
              <th className="p-3 text-left">Initial Amount</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Paying Date</th>
              <th className="p-3 text-left">Expiry Date</th>
              <th className="p-3 text-left">Pay Value</th>
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
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Types</th>
                  <th className="p-3 text-left">Balance</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Payable</th>
                  <th className="p-3 text-left">Extra Pay</th>
                  <th className="p-3 text-left">Interest</th>
                  <th className="p-3 text-left">Frozen Fee</th>
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Pay Method</th>
                  <th className="p-3 text-left">Previous Balance</th>
                  <th className="p-3 text-left">Adjustment</th>
                  <th className="p-3 text-left">Total Balance</th>
                  <th className="p-3 text-left">New</th>
                  <th className="p-3 text-left">Paying Date</th>
                  <th className="p-3 text-left">Operator</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {adjustmentListData.map((adjustment, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50 hover:bg-[#FFE2B7] cursor-pointer transition-colors" : "bg-white hover:bg-[#FFE2B7] cursor-pointer transition-colors"}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.payMethod}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.previousBalance}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.adjustment}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.totalBalance}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.new}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.payingDate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{adjustment.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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