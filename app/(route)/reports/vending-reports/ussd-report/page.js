"use client";
import React, { useState } from "react";
import Dialogue1 from "@/app/components/clientdialogue/dialogue1";
import { RefreshCw, X } from "lucide-react";
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
      tiersParti: "John Doe",
      agence: "Main Warehouse",
      date: "2023-09-01",
      transactions: 12,
      montantTotal: 3200,
      montantKwh: 2400,
      energieKwh: 960,
    },
    {
      tiersParti: "Jane Smith",
      agence: "East Warehouse",
      date: "2023-09-02",
      transactions: 8,
      montantTotal: 1800,
      montantKwh: 1400,
      energieKwh: 700,
    },
    {
      tiersParti: "Ali Khan",
      agence: "North Warehouse",
      date: "2023-09-03",
      transactions: 15,
      montantTotal: 3900,
      montantKwh: 3000,
      energieKwh: 1200,
    },
  ];

  // ✅ Export to Excel
  const handleExportToExcel = () => {
    const header = [
      "Tiers Parti",
      "AGENCE",
      "Date",
      "Nombre de Trans.",
      "Montan Total",
      "Montan KWH",
      "Energie kWh",
    ];
    const dataRows = tableData.map((row) => [
      row.tiersParti,
      row.agence,
      row.date,
      row.transactions,
      row.montantTotal,
      row.montantKwh,
      row.energieKwh,
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([header, ...dataRows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "USSD Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, "ussd_report.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">USSD Report</h1>
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

        {/* Operator */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Tiers Parti</th>
              <th className="p-3 text-left">AGENCE</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Nombre de Trans.</th>
              <th className="p-3 text-left">Montan Total</th>
              <th className="p-3 text-left">Montan KWH</th>
              <th className="p-3 text-left">Energie kWh</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 bg-white">
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="p-3">{row.tiersParti}</td>
                <td className="p-3">{row.agence}</td>
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.transactions}</td>
                <td className="p-3">{row.montantTotal}</td>
                <td className="p-3">{row.montantKwh}</td>
                <td className="p-3">{row.energieKwh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
