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
  Search
} from "lucide-react";
import Link from "next/link";
function Maintaintoken() {
  const [meterNum, setMeterNum] = useState("24170163497");
  const [accountNo, setAccountNo] = useState("");
  const [tokenType, setTokenType] = useState("STS Standard");
  const [creditType, setCreditType] = useState("Clear Credit Token");

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
 const Reload = () => {
   window.location.reload();
 };
  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className=" bg-white">
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Maintainance Token
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => Reload()}
                  className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md  transition hover:cursor-pointer"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
                <Link href="/bussiness/maintenancetoken/information">
                  <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer">
                    <Plus size={16} />
                    <span className="hidden sm:inline">New</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-md text-gray-500 mb-2">
                    Meter Num.
                  </label>
                  <input
                    type="text"
                    value={meterNum}
                    onChange={(e) => setMeterNum(e.target.value)}
                    className="w-full px-4 py-2 text-md border bg-gray-100 rounded-md border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-md text-gray-500 mb-2">
                    Account No.
                  </label>
                  <input
                    type="text"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    className="w-full px-4 py-2 text-md border bg-gray-100 rounded-md border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-md text-gray-500 mb-2">
                    Token Type
                  </label>
                  <div className="relative">
                    <select
                      value={tokenType}
                      onChange={(e) => setTokenType(e.target.value)}
                      className="w-full px-4 py-2 text-md border bg-gray-100 rounded-md appearance-none border-transparent"
                    >
                      <option>STS Standard</option>
                      <option>STS Premium</option>
                      <option>STS Basic</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-md text-gray-500 mb-2">
                    Credit Type
                  </label>
                  <div className="relative">
                    <select
                      value={creditType}
                      onChange={(e) => setCreditType(e.target.value)}
                      className="w-full px-4 py-2 text-md border bg-gray-100 rounded-md appearance-none border-transparent"
                    >
                      <option>Clear Credit Token</option>
                      <option>Standard Credit Token</option>
                    </select>
                    <ChevronDown
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>

              <div>
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
                  <th className="px-6 py-3 text-left">Token Class</th>
                  <th className="px-6 py-3 text-left">Account No.</th>
                  <th className="px-6 py-3 text-left">Meter Num.</th>
                  <th className="px-6 py-3 text-left">Value</th>
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

export default Maintaintoken;
