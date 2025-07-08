"use client";
import React, { useState } from "react";
import Dialogue1 from "@/app/components/clientdialogue/dialogue1";
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

  const handleReload = () => {
    window.location.reload();
  };

  // Sample data
  const [tableData, setTableData] = useState([
    {
      branch: "Main Branch",
      tariff: "T1",
      type: "Residential",
      totalSales: 12500,
      charges: 2300,
      arrear: 500,
      unitCost: 0.12,
      step1: 3000,
      step2: 2500,
      step3: 2000,
      step4: 1500,
      kwh: 9000,
    },
    {
      branch: "East Branch",
      tariff: "T2",
      type: "Commercial",
      totalSales: 22000,
      charges: 4100,
      arrear: 1500,
      unitCost: 0.15,
      step1: 4000,
      step2: 3500,
      step3: 3000,
      step4: 2500,
      kwh: 13000,
    },
    {
      branch: "North Branch",
      tariff: "T3",
      type: "Industrial",
      totalSales: 30500,
      charges: 5200,
      arrear: 2000,
      unitCost: 0.18,
      step1: 5000,
      step2: 4500,
      step3: 4000,
      step4: 3500,
      kwh: 17000,
    },
  ]);

  const handleExportToExcel = () => {
    const headers = [
      "Branch",
      "Tariff",
      "Type",
      "Total Sales",
      "Charges",
      "Arrear",
      "Unit Cost",
      "Step1",
      "Step2",
      "Step3",
      "Step4",
      "kWh",
    ];

    const data = tableData.map((row) => [
      row.branch,
      row.tariff,
      row.type,
      row.totalSales,
      row.charges,
      row.arrear,
      row.unitCost,
      row.step1,
      row.step2,
      row.step3,
      row.step4,
      row.kwh,
    ]);

    const worksheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesSummary");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "SalesSummary.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          VS Sales Summary
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
        {/* Branch Fields */}
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

        {/* Type Field */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Type
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="no-cancel">Vending Office</option>
            <option value="7-days">Agone</option>
            <option value="7-days">SMS</option>
            <option value="7-days">USSD</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Operator
          </label>
          <input
            type="text"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Tariff</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Total Sales</th>
              <th className="p-3 text-left">Charges</th>
              <th className="p-3 text-left">Arrear</th>
              <th className="p-3 text-left">Unit Cost</th>
              <th className="p-3 text-left">Step1</th>
              <th className="p-3 text-left">Step2</th>
              <th className="p-3 text-left">Step3</th>
              <th className="p-3 text-left">Step4</th>
              <th className="p-3 text-left">kWh</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {tableData.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{item.branch}</td>
                <td className="p-3">{item.tariff}</td>
                <td className="p-3">{item.type}</td>
                <td className="p-3">{item.totalSales}</td>
                <td className="p-3">{item.charges}</td>
                <td className="p-3">{item.arrear}</td>
                <td className="p-3">{item.unitCost}</td>
                <td className="p-3">{item.step1}</td>
                <td className="p-3">{item.step2}</td>
                <td className="p-3">{item.step3}</td>
                <td className="p-3">{item.step4}</td>
                <td className="p-3">{item.kwh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
