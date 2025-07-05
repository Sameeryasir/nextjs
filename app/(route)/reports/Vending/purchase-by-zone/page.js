"use client";
import React, { useState } from "react";
import Dialogue from "../../dailycashreport/dialogue";
import Dialogue2 from "@/app/components/clientdialogue/dialogue2";
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
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

const handleExportToExcel = () => {
  const header = [
    "Vending Date",
    "Net kWH",
    "Net kWH Cost",
    "Fee Amount",
    "VAT",
    "StampTax",
  ];

  const rows = tableData.map((item) => [
    item.date,
    item.netKwh,
    `$${item.netCost.toFixed(2)}`,
    `$${item.fee.toFixed(2)}`,
    `$${item.vat.toFixed(2)}`,
    `$${item.stampTax.toFixed(2)}`,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase by Zone");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "purchase-kwh-by-zone.xlsx");
};


  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Purchase(Kwh) By Zone
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
            onClick={()=>window.print()}
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
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Vending Date</th>
              <th className="p-3 text-left">Net kWH</th>
              <th className="p-3 text-left">Net kWH Cost</th>
              <th className="p-3 text-left">Fee Amount</th>
              <th className="p-3 text-left">VAT</th>
              <th className="p-3 text-left">StampTax</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            <tr className="">
              <td className="p-3">2025-07-01</td>
              <td className="p-3">500</td>
              <td className="p-3">$150.00</td>
              <td className="p-3">$7.50</td>
              <td className="p-3">$15.00</td>
              <td className="p-3">$1.50</td>
            </tr>
            <tr className=" bg-gray-50">
              <td className="p-3">2025-07-02</td>
              <td className="p-3">750</td>
              <td className="p-3">$225.00</td>
              <td className="p-3">$11.25</td>
              <td className="p-3">$22.50</td>
              <td className="p-3">$2.25</td>
            </tr>
            <tr>
              <td className="p-3">2025-07-03</td>
              <td className="p-3">650</td>
              <td className="p-3">$195.00</td>
              <td className="p-3">$9.75</td>
              <td className="p-3">$19.50</td>
              <td className="p-3">$1.95</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
