"use client";
import React from "react";
import {
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
} from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Meterviewerdialogue from "./Meterviewerdialogue";

function Meterviewer() {
const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const data = [
      [
        "EM100001",
        "Main Warehouse",
        "New",
        "2023-01-15",
        "2033-01-15",
        "SGC-001",
        "TI-001",
        "2014-01-01 00:00:00",
      ],
      [
        "WM200101",
        "East Warehouse",
        "Used",
        "2022-08-10",
        "2032-08-10",
        "SGC-002",
        "TI-002",
        "2014-01-01 00:00:00",
      ],
      [
        "GM300001",
        "North Warehouse",
        "Refurbished",
        "2021-05-20",
        "2031-05-20",
        "SGC-003",
        "TI-003",
        "2014-01-01 00:00:00",
      ],
    ];

    const headers = [
      "Meter Number",
      "Warehouse",
      "Status",
      "Prod. Date",
      "Expiry Date",
      "SGC",
      "TI",
      "Base Time",
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meters");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
 
    saveAs(blob, "MeterList.xlsx");
  };

  return (
    <div className="w-full bg-white p-2 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Meter List</h1>
        <div className="flex gap-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Refresh
          </button>
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Excel
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>
      {/* ...rest of your component stays unchanged */}
      {/* Filter/Search Form */}
      <div className="bg-white py-8 px-6 space-y-6">
        {/* Warehouse Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Warehouse
          </label>
          <div className="flex gap-2 flex-wrap w-full max-w-4xl">
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={()=>setIsDialogOpen(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
            >
              ...
            </button>
            {isDialogOpen && (
              <Meterviewerdialogue onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105 hover:cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Code Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Meter Model
          </label>
          <input
            type="text"
            className="w-[375px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Meter No Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Meter Num
          </label>
          <input
            type="text"
            className="w-[375px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            className="w-[375px] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Search Button */}
        <div className="flex justify-center sm:justify-start pl-0 sm:pl-40">
          <button className="w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105 hover:cursor-pointer">
            Search
          </button>
        </div>
      </div>

      {/* Table & Pagination */}
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Pagination Buttons */}
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronRight className="w-5 h-5 text-[#FF9900] cursor-pointer" />
              <ChevronLast className="w-5 h-5 text-[#FF9900] cursor-pointer" />
            </div>

            {/* Page Info */}
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600">Total 1 Records</span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600">Record 1-1, Page 1/1</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">Turn To Page</span>
              <input
                type="text"
                value="1"
                className="w-10 border rounded px-2 py-1 text-center text-sm"
              />
              <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-3 text-left">Meter Number</th>
                <th className="p-3 text-left">Warehouse</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Prod. Date</th>
                <th className="p-3 text-left">Expiry Date</th>
                <th className="p-3 text-left">SGC</th>
                <th className="p-3 text-left">TI</th>
                <th className="p-3 text-left">Base Time</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "EM100001",
                  "Main Warehouse",
                  "New",
                  "2023-01-15",
                  "2033-01-15",
                  "SGC-001",
                  "TI-001",
                  "2014-01-01 00:00:00",
                ],
                [
                  "WM200101",
                  "East Warehouse",
                  "Used",
                  "2022-08-10",
                  "2032-08-10",
                  "SGC-002",
                  "TI-002",
                  "2014-01-01 00:00:00",
                ],
                [
                  "GM300001",
                  "North Warehouse",
                  "Refurbished",
                  "2021-05-20",
                  "2031-05-20",
                  "SGC-003",
                  "TI-003",
                  "2014-01-01 00:00:00",
                ],
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                >
                  {row.map((cell, i) =>
                    i === 7 ? (
                      <td key={i} className="p-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span>{cell}</span>
                          <button className="bg-[#FF9900] text-white px-3 py-1 rounded-md text-sm hover:brightness-105">
                            Details
                          </button>
                        </div>
                      </td>
                    ) : (
                      <td key={i} className="p-3">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Meterviewer;