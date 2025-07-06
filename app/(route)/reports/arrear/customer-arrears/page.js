"use client";
import React, { useState } from "react";
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tableData = [
    {
      date: "02/14/2025",
      warehouse: "Main Warehouse",
      model: "EM-1000",
      startCode: "EM100001",
      endCode: "EM100050",
      meters: 50,
      type: "New",
      handler: "John Smith",
      operator: "Admin",
    },
    {
      date: "02/14/2025",
      warehouse: "East Warehouse",
      model: "WM-2000",
      startCode: "WM200101",
      endCode: "WM200125",
      meters: 25,
      type: "Used",
      handler: "Sarah Johnson",
      operator: "Operator",
    },
    {
      date: "02/15/2025",
      warehouse: "North Warehouse",
      model: "GM-3000",
      startCode: "GM300001",
      endCode: "GM300010",
      meters: 10,
      type: "Refurbished",
      handler: "Mike Brown",
      operator: "Manager",
    },
  ];

  const handleReload = () => window.location.reload();

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transfer Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "transfer-report.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Transfer List</h1>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition w-40"
        >
          Refresh
        </button>
      </div>

      {/* Form */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Date From
              </label>
              <input
                type="date"
                defaultValue="2025-02-14"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Branch
              </label>
              <div className="flex-1 flex flex-wrap gap-2">
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  ...
                </button>
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Select Area
              </label>
              <div className="flex-1 flex flex-wrap gap-2">
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200  rounded-md bg-gray-50"
                />
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  ...
                </button>
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Tariff
              </label>
              <select className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50">
                <option value="">Select Tariff</option>
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i}>{`01 0000${i + 1}-SONELEC NGAZIDJA`}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Date To
              </label>
              <input
                type="date"
                defaultValue="2025-02-14"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Customer Info
              </label>
              <div className="flex-1 flex flex-wrap gap-2">
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  ...
                </button>
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Project
              </label>
              <div className="flex-1 flex flex-wrap gap-2">
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  ...
                </button>
                <button className="w-10 h-10 bg-[#FF9900] text-white rounded-md flex justify-center items-center">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Meter Num
              </label>
              <select className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50">
                <option value="">Select Type</option>
                <option value="New">ORDINAIRE</option>
                <option value="Used">PDCEL</option>
                <option value="Used">BCHTS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center md:justify-start md:pl-40">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition w-40">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ChevronFirst className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
            <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
            <ChevronRight className="w-5 h-5 text-[#FF9900] cursor-pointer" />
            <ChevronLast className="w-5 h-5 text-[#FF9900] cursor-pointer" />
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-sm">
              <span className="text-gray-600">Total 3 Records</span>
              <span className="text-gray-600">| Record 1-3, Page 1/1</span>
              <span className="text-gray-600">| Turn To Page</span>
              <input
                type="text"
                value="1"
                className="w-12 border rounded px-2 py-1 text-center"
              />
              <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>

        <table className="w-full min-w-[900px]">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Account No.</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Meter Num.</th>
              <th className="p-3 text-left">Tariff</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Remaining UnPaid Amount</th>
              <th className="p-3 text-left">Initial Amount</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-[#FFE2B7] cursor-pointer transition"
              >
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.warehouse}</td>
                <td className="p-3">{item.model}</td>
                <td className="p-3">{item.startCode}</td>
                <td className="p-3">{item.endCode}</td>
                <td className="p-3">{item.meters}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.handler}</td>
                <td className="p-3">{item.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
