"use client";
import React, { useState } from "react";
import Dialogue from "../../dailycashreport/operator-trans-count/dialogue";
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

  // ✅ Sample Table Data
  const tableData = [
    {
      branch: "Main Branch",
      yearMonth: "2025-07",
      tariff: "01 00001-SONELEC NGAZIDJA",
      chargeCount: 25,
      amount: 1050.75,
    },
    {
      branch: "East Branch",
      yearMonth: "2025-07",
      tariff: "01 00003-SONELEC NGAZIDJA",
      chargeCount: 32,
      amount: 1420.0,
    },
    {
      branch: "North Branch",
      yearMonth: "2025-06",
      tariff: "01 00004-SONELEC NGAZIDJA",
      chargeCount: 28,
      amount: 1205.5,
    },
  ];

  // ✅ Excel Export Function
  const handleExportToExcel = () => {
    const headers = [
      "Branch",
      "Year/Month",
      "Tariff",
      "Count Of Charges",
      "Amount",
    ];

    const rows = tableData.map((item) => [
      item.branch,
      item.yearMonth,
      item.tariff,
      item.chargeCount,
      item.amount,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "operator-charges-report.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Services Fee Report
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
              <Dialogue onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Type Select */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Type
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="vending-office">Vending Office</option>
            <option value="agent">Agent</option>
            <option value="sms">SMS</option>
            <option value="ussd">USSD</option>
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
            Date To
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fee List */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Fee List
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="tva">TVA</option>
            <option value="rdv">RDV</option>
            <option value="partie-fee-mono">Partie Fee MONO</option>
            <option value="partie-fixe-tri">Partie Fixe TRI</option>
            <option value="partie-fixe">Partie Fixe</option>
            <option value="partie-fixe-tri-alt">Partie Fixe TRI (Alt)</option>
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
        <table className="w-full min-w-[1000px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Year/Month</th>
              <th className="p-3 text-left">Tariff</th>
              <th className="p-3 text-left">Count Of Charges</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{item.branch}</td>
                <td className="p-3">{item.yearMonth}</td>
                <td className="p-3">{item.tariff}</td>
                <td className="p-3">{item.chargeCount}</td>
                <td className="p-3">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
