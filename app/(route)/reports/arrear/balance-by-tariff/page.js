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
import Arreardialogue from "./arreardialogue";
function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  const tableData = [
    {
      branch: "Main Branch",
      tariffIndex: "01 00001-SONELEC NGAZIDJA",
      accountBalance: 120.5,
    },
    {
      branch: "East Branch",
      tariffIndex: "01 00002-SONELEC NGAZIDJA",
      accountBalance: 95.75,
    },
    {
      branch: "North Branch",
      tariffIndex: "01 00003-SONELEC NGAZIDJA",
      accountBalance: 180.25,
    },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  const handleExportToExcel = () => {
    const header = ["Branch", "Tariff Index", "Account Balance"];
    const rows = tableData.map((item) => [
      item.branch,
      item.tariffIndex,
      item.accountBalance,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Account Balance by tariff");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "account-data.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Balance By Tariff
        </h1>
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Project
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
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:cursor-pointer"
            >
              ...
            </button>
            {isDialogOpen && (
              <Arreardialogue onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Projects
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Select Project</option>
            {Array.from({ length: 10 }).map((_, index) => (
              <option
                key={index}
                value={`01 0000${index + 1}-SONELEC NGAZIDJA`}
              >
                {`01 0000${index + 1}-SONELEC NGAZIDJA`}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Tariff Index</th>
              <th className="p-3 text-left">Account Balance</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-[#FFE2B7] text-sm transition">
                <td className="p-3">{row.branch}</td>
                <td className="p-3">{row.tariffIndex}</td>
                <td className="p-3">{row.accountBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
