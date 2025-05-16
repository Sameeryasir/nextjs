"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
} from "lucide-react";
import Link from "next/link";
function Freeissue() {
  const [meterNum, setMeterNum] = useState("24170163497");
  const [accountNo, setAccountNo] = useState("");
  const [tokenType, setTokenType] = useState("STS Standard");
  const [creditType, setCreditType] = useState("Clear Credit Token");
 const [status, setStatus] = useState("");
 const statusOptions = ["Active", "Inactive", "Pending"];
  const records = [
    {
      date: "2025-02-14 17:46:53",
      tokenClass: "STS Stand Clear Tamper Tamper Token",
      accountNo: "02119356k",
      meterNum: "25120493835",
      value: "Clear Tamper",
      operator: "2063",
    },
    {
      date: "2025-02-14 17:46:53",
      tokenClass: "STS Stand Clear Tamper Tamper Token",
      accountNo: "02119356k",
      meterNum: "25120493835",
      value: "Clear Tamper",
      operator: "2063",
    },
    {
      date: "2025-02-14 17:46:53",
      tokenClass: "STS Stand Clear Tamper Tamper Token",
      accountNo: "02119356k",
      meterNum: "25120493835",
      value: "Clear Tamper",
      operator: "2063",
    },
    {
      date: "2025-02-14 17:46:53",
      tokenClass: "STS Stand Clear Tamper Tamper Token",
      accountNo: "02119356k",
      meterNum: "25120493835",
      value: "Clear Tamper",
      operator: "2063",
    },
    {
      date: "2025-02-14 17:46:53",
      tokenClass: "STS Stand Clear Tamper Tamper Token",
      accountNo: "02119356k",
      meterNum: "25120493835",
      value: "Clear Tamper",
      operator: "2063",
    },
    // More records...
  ];
const reload=()=>{
  window.location.reload();
}
  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className=" bg-white ">
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Free Issue List
              </h1>
              <div className="flex gap-2">
                <button 
                onClick={()=>reload()}
                className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md  transition hover:cursor-pointer">
                  <RefreshCw size={18} />
                  Refresh
                </button>
                <Link href={'/freeissuenewbutton'}>
                  <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
                    <Plus size={18} />
                    New
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white max-w-4xl">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Meter Num
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Account No
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      ></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md  transition w-[120px]">
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white ">
          <div className="p-4  flex items-center justify-between text-sm text-gray-600">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <ChevronFirst className="w-5 h-5" />
                  <ChevronLeft className="w-5 h-5" />
                  <ChevronRight className="w-5 h-5 text-orange-500" />
                  <ChevronLast className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm text-gray-600">
                    Total 1 Records, Record 1-1, Page 1/1
                  </span>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">Turn To Page</span>
                  <input
                    type="text"
                    className="w-12 border rounded px-2 py-1 text-sm text-center"
                    value="1"
                  />
                  <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border-white ">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FF9900] text-white h-15">
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Account No</th>
                  <th className="px-6 py-3 text-left">Customer Name</th>
                  <th className="px-6 py-3 text-left">Meter Num.</th>
                  <th className="px-6 py-3 text-left">Free Power</th>
                  <th className="px-6 py-3 text-left">Reason Code</th>
                  <th className="px-6 py-3 text-left">Operator</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className=" hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {record.date}
                    </td>
                    <td className="px-6 py-4">{record.tokenClass}</td>
                    <td className="px-6 py-4">{record.accountNo}</td>
                    <td className="px-6 py-4">{record.meterNum}</td>
                    <td className="px-6 py-4">{record.value}</td>
                    <td className="px-6 py-4">{record.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Freeissue;
