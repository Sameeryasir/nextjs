import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import Addnew from "./Addnew";

function CompensatingRecord() {
  const [registrationDate, setRegistrationDate] = useState("2025-02-14");
  const [customerCode, setCustomerCode] = useState("02");
  const [customerId, setCustomerId] = useState("02-NGAZID.Ja");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="w-full-screen bg-white p-6">
      <Addnew isOpen={showModal} onClose={() => setShowModal(false)} />

      <div className="w-full bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            List Of Compensating
          </h1>
          <div className="flex space-x-3">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-orange-600 transition">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-orange-600 transition"
            >
              <Plus size={18} />
              New
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Customer ID"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => {
                  setCustomerCode("");
                  setCustomerId("");
                }}
                className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-400 transition flex items-center"
              >
                <X size={18} />
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition flex items-center gap-1">
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm mb-4">
          <div className="flex gap-2">
            <button className="border p-2 rounded hover:bg-gray-200">
              <ChevronFirst size={18} />
            </button>
            <button className="border p-2 rounded hover:bg-gray-200">
              <ChevronLeft size={18} />
            </button>
            <button className="border p-2 rounded hover:bg-gray-200">
              <ChevronRight size={18} />
            </button>
            <button className="border p-2 rounded hover:bg-gray-200">
              <ChevronLast size={18} />
            </button>
          </div>
          <span className="text-sm text-gray-600">
            Total Records, Record 1-, Page 1/2059, Turn To Page
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              className="border rounded w-16 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="text-orange-500 hover:text-orange-600 transition">
              →
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Types</th>
                <th className="px-4 py-3 text-left">Biz-Types</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-left">Operator</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="border-b transition hover:bg-gray-100 even:bg-gray-50"
                >
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="inline-block w-4 text-orange-500">⚡</span>
                    {record.code}
                  </td>
                  <td className="px-4 py-3">{record.fullName}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">{record.types}</td>
                  <td className="px-4 py-3">{record.bizTypes}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-700">
                    {record.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{record.operator}</td>
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
