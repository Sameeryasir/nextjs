"use client";
import React, { useState } from "react";
import Dialogue1 from "@/app/components/clientdialogue/dialogue1";
import Dialogue2 from "@/app/components/clientdialogue/dialogue2";
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

  const [tableData, setTableData] = useState([
    {
      client: "Client A",
      date: "2023-01-15",
      values: [120, 80, 30, 25, 12, 7, 15, 18, 9, 5, 350, 100, 50],
    },
    {
      client: "Client B",
      date: "2022-08-10",
      values: [110, 70, 28, 22, 14, 9, 12, 20, 8, 6, 340, 90, 48],
    },
    {
      client: "Client C",
      date: "2021-05-20",
      values: [100, 60, 25, 20, 10, 6, 11, 19, 7, 4, 320, 85, 45],
    },
  ]);

  const handleReload = () => {
    window.location.reload();
  };

  const handleExportToExcel = () => {
    const headers = [
      "Category Client",
      "Date",
      "702141",
      "411461",
      "422111",
      "443111 (1)",
      "443270",
      "702131",
      "443111 (2)",
      "442811",
      "442111 (1)",
      "442111 (2)",
      "Energine (kWh)",
      "411111",
      "411111 (BMUE)",
    ];

    const data = tableData.map((row) => [row.client, row.date, ...row.values]);

    const worksheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Meters");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "MeterList.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
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
        </div>
      </div>

      {/* Form Fields */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        {/* Warehouse Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Warehouse
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
            Date To
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Warehouse Duplicate */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Warehouse
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
              onClick={() => setIsDialogOpen1(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              ...
            </button>
            {isDialogOpen1 && (
              <Dialogue2 onClose={() => setIsDialogOpen1(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Type */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Type
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="no-cancel">No Cancel</option>
            <option value="7-days">Cancel</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105">
            Search
          </button>
        </div>
      </div>

      {/* Table & Pagination */}
      <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
              <tr>
                <th className="p-3 text-left">Category Client</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">702141</th>
                <th className="p-3 text-left">411461</th>
                <th className="p-3 text-left">422111</th>
                <th className="p-3 text-left">443111 (1)</th>
                <th className="p-3 text-left">443270</th>
                <th className="p-3 text-left">702131</th>
                <th className="p-3 text-left">443111 (2)</th>
                <th className="p-3 text-left">442811</th>
                <th className="p-3 text-left">442111 (1)</th>
                <th className="p-3 text-left">442111 (2)</th>
                <th className="p-3 text-left">Energine (kWh)</th>
                <th className="p-3 text-left">411111</th>
                <th className="p-3 text-left">411111 (BMUE)</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3">{row.client}</td>
                  <td className="p-3">{row.date}</td>
                  {row.values.map((val, idx) => (
                    <td className="p-3" key={idx}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default Page;
