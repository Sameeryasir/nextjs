"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
} from "lucide-react";
import Link from "next/link";
function Stockout() {
  const [startDate, setStartDate] = useState(new Date());
  const tableData = Array(6).fill({
    code: "0004100166",
    regDate: "2025-02014", // Fixed date format (should probably be "2025-02-14")
    accountNo: "31125296",
    fullName: "Aaaaaa Aaaaaaa",
    triff: "11", // Fixed typo (should be "tariff" if that's what you meant)
    meterNum: "25120400129",
    installed: true,
    callCenter: true,
  });

  const connectionData = [
    {
      meterNum: "0004100169",
      installDate: "2025-02-14",
      installReason: "New Meter Connected",
      uninstallDate: "",
      uninstallReason: "",
      operator: "1450",
    },
  ];
  return (
    <div className="w-full bg-white p-2 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Stock-Out List</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
            Refresh
          </button>
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              New
            </button>
        </div>
      </div>
      <div className="bg-white max-w-7xl mx-6 py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Starting Date
              </label>
              <input
                type="date"
                defaultValue="2025-02-14"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Meter No
              </label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                defaultValue="2025-02-14"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Type
              </label>
              <select className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Type</option>
                <option value="New">Stockin</option>
                <option value="Used">Others</option>
              </select>
            </div>

            <div className="flex items-center gap-18">
              <label className="w-32 text-sm font-medium text-gray-700">
                Warehouse
              </label>
              <div className="flex-1 flex gap-4">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center text-sm sm:text-lg w-[50px] hover:cursor-pointer"
                >
                  ...
                </button>
                <button
                  type="button"
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center w-[50px] hover:cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-40">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600 whitespace-nowrap">
                Total 1 Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-1, Page 1/1
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Turn To Page
              </span>
              <input
                type="text"
                className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                value="1"
              />
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Date</th>
                <th className="p-2 sm:p-3 text-left">Warehouse</th>
                <th className="p-2 sm:p-3 text-left">Meter Model</th>
                <th className="p-2 sm:p-3 text-left">Starting Code</th>
                <th className="p-2 sm:p-3 text-left">Ending Code</th>
                <th className="p-2 sm:p-3 text-left">Meters</th>
                <th className="p-2 sm:p-3 text-left">Type</th>
                <th className="p-2 sm:p-3 text-left">Handler</th>
                <th className="p-2 sm:p-3 text-left">Operator</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-[#FFE2B7] cursor-pointer transition-colors">
                <td className="p-2 sm:p-3">02/14/2025</td>
                <td className="p-2 sm:p-3">Main Warehouse</td>
                <td className="p-2 sm:p-3">EM-1000</td>
                <td className="p-2 sm:p-3">EM100001</td>
                <td className="p-2 sm:p-3">EM100050</td>
                <td className="p-2 sm:p-3">50</td>
                <td className="p-2 sm:p-3">New</td>
                <td className="p-2 sm:p-3">John Smith</td>
                <td className="p-2 sm:p-3">Admin</td>
              </tr>
              <tr className="hover:bg-[#FFE2B7] cursor-pointer transition-colors">
                <td className="p-2 sm:p-3">02/14/2025</td>
                <td className="p-2 sm:p-3">East Warehouse</td>
                <td className="p-2 sm:p-3">WM-2000</td>
                <td className="p-2 sm:p-3">WM200101</td>
                <td className="p-2 sm:p-3">WM200125</td>
                <td className="p-2 sm:p-3">25</td>
                <td className="p-2 sm:p-3">Used</td>
                <td className="p-2 sm:p-3">Sarah Johnson</td>
                <td className="p-2 sm:p-3">Operator</td>
              </tr>
              <tr className="hover:bg-[#FFE2B7] cursor-pointer transition-colors">
                <td className="p-2 sm:p-3">02/15/2025</td>
                <td className="p-2 sm:p-3">North Warehouse</td>
                <td className="p-2 sm:p-3">GM-3000</td>
                <td className="p-2 sm:p-3">GM300001</td>
                <td className="p-2 sm:p-3">GM300010</td>
                <td className="p-2 sm:p-3">10</td>
                <td className="p-2 sm:p-3">Refurbished</td>
                <td className="p-2 sm:p-3">Mike Brown</td>
                <td className="p-2 sm:p-3">Manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Stockout;
