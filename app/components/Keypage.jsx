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

function Keypage() {
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

  return (
    <div className="p-6">
      <div className="">
        {/* Header */}

        <div className=" bg-white">
          <div className="">
            {/* Header with buttons aligned to right */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Key Change List
              </h1>
              <div className="flex gap-4">
                {" "}
                {/* Added gap between buttons */}
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                  Refresh
                </button>
                <Link href={'/keytokenpage'}>
                  <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                    Search
                  </button>
                </Link>
              </div>
            </div>

            {/* Rest of your content remains the same */}
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
                    className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md border-transparent"
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
                    className="w-full px-4 py-2 text-lg border bg-gray-100 rounded-md border-transparent"
                  />
                </div>
              </div>

              <div>
                <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]">
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
                  <th className="px-6 py-3 text-left">Account No.</th>
                  <th className="px-6 py-3 text-left">Meter Num.</th>
                  <th className="px-6 py-3 text-left">Old Key</th>
                  <th className="px-6 py-3 text-left">New Key</th>
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

export default Keypage;
