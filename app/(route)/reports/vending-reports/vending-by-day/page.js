"use client";
import React, { useState } from "react";
import Dialogue1 from "@/app/components/clientdialogue/dialogue1";
import Dialogue from "./dialogue";
import {
  RefreshCw,
  Plus,
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
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  // ✅ Sample Table Data
  const tableData = [
    {
      accountNo: "ACC123456",
      changeKwh: 120,
      operator: "John Doe",
      date: "2023-09-01",
      code: "OP001",
    },
    {
      accountNo: "ACC654321",
      changeKwh: 90,
      operator: "Jane Smith",
      date: "2023-09-02",
      code: "OP002",
    },
  ];

  // ✅ Excel Export Function
  const handleExportToExcel = () => {
    const worksheetData = [
      ["Account No.", "Change KWH", "Operator", "Date", "Code"],
      ...tableData.map((row) => [
        row.accountNo,
        row.changeKwh,
        row.operator,
        row.date,
        row.code,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vending By Day");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "vending_by_day.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Vending By Day</h1>
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
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        {/* Branch */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Branch
          </label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              ...
            </button>
            {isDialogOpen && (
              <Dialogue1 onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Meter Model */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Meter Model
          </label>
          <select
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select Model
            </option>
            <option value="EM-1000">General IC Meter</option>
            <option value="WM-2000">cpu Card Meter</option>
            <option value="SM-3000">Keypad</option>
            <option value="HM-4000">Solar Meter</option>
          </select>
        </div>

        {/* Date From */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Date From
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Date To */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Operator */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Operator
          </label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* <button
              type="button"
              onClick={() => setIsDialogOpen1(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              ...
            </button>
            {isDialogOpen1 && (
              <Dialogue onClose={() => setIsDialogOpen1(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button> */}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105">
            Search
          </button>
        </div>
      </div>

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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Account No.</th>
              <th className="p-3 text-left">Change KWH</th>
              <th className="p-3 text-left">Operator</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Code</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 bg-white ">
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="p-3">{item.accountNo}</td>
                <td className="p-3">{item.changeKwh}</td>
                <td className="p-3">{item.operator}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
