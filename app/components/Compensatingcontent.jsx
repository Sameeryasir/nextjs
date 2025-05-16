import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Addnew from "./Addnew";
import Link from "next/link";
function CompensatingRecord() {
  const [registrationDate, setRegistrationDate] = useState("2025-02-14");
  const [customerCode, setCustomerCode] = useState("02");
  const [customerId, setCustomerId] = useState("02-NGAZID.Ja");
  const [showModal, setShowModal] = useState(false);
  const [showdialogue, setShowdialogue] = useState(false);
  // Sample data
  const records = Array(5).fill({
    code: "00000000155",
    fullName: "SOILIH IBRAHIM (CHAARANI AZUMOU ABDOUDOU MAT 921)",
    date: "2022-06-12 13:26:17",
    types: "KWH",
    bizTypes: "Vending Write-Off",
    amount: 148.7,
    operator: "Admin",
  });
  const Reload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <Addnew isOpen={showModal} onClose={() => setShowModal(false)} />
      <div className="w-full bg-white">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            List Of Compensating
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => Reload()}
              className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base hover:cursor-pointer"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <div>
              <Link href="/compensatingnewform">
                <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer">
                  <Plus size={16} />
                  <span className="hidden sm:inline">New</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Registration Date Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Registration Date
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Customer Information Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Customer Information
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
                placeholder="Code"
                className="w-16 sm:w-20 border border-gray-300 rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Customer ID"
                className="flex-1 min-w-0 border border-gray-300 rounded-md px-2 sm:px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center text-sm sm:text-lg hover:cursor-pointer "
              >
                ...
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomerCode("");
                  setCustomerId("");
                }}
                className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center">
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Pagination */}
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600">
                Total 1 Records, Record 1-1, Page 1/1
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600">Turn To Page</span>
              <input
                type="text"
                className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                value="1"
              />
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm text-sm sm:text-base">
            <thead>
              <tr className="bg-[#FF9900] text-white">
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Code</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">
                  Full Name
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">Date</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden md:table-cell">
                  Types
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden lg:table-cell">
                  Biz-Types
                </th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-right">Amount</th>
                <th className="px-2 sm:px-4 py-2 sm:py-3 text-left hidden sm:table-cell">
                  Operator
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="transition hover:bg-gray-100 even:bg-gray-50"
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2">
                    <span className="inline-block w-4 text-orange-500">⚡</span>
                    {record.code}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                    {record.fullName}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{record.date}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden md:table-cell">
                    {record.types}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                    {record.bizTypes}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-right font-semibold text-gray-700">
                    {record.amount.toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                    {record.operator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CompensatingRecord;
