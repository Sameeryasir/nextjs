"use client";
import React, { useState } from "react";
import Dialogue from "../../vending-reports/operator-trans-count/dialogue";
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
      date: "2025-07-01",
      accountNo: "ACC123456",
      name: "John Doe",
      meterNo: "MTR654321",
      totalAmt: 100.0,
      amount: 85.0,
      mpu: 5.0,
      actualAccount: "ACT998877",
      kwh: 450,
      arrear: 10.0,
    },
    {
      branch: "East Branch",
      date: "2025-07-02",
      accountNo: "ACC987654",
      name: "Jane Smith",
      meterNo: "MTR123456",
      totalAmt: 200.0,
      amount: 190.0,
      mpu: 5.0,
      actualAccount: "ACT112233",
      kwh: 700,
      arrear: 10.0,
    },
  ];

  // ✅ Excel Export Function
  const handleExportToExcel = () => {
    const headers = [
      "Branch",
      "Date",
      "Account No.",
      "Name",
      "Meter No.",
      "Total Amt",
      "Amount",
      "MPU",
      "Actual Account",
      "KWH",
      "Arrear",
    ];

    const rows = tableData.map((item) => [
      item.branch,
      item.date,
      item.accountNo,
      item.name,
      item.meterNo,
      item.totalAmt,
      item.amount,
      item.mpu,
      item.actualAccount,
      item.kwh,
      item.arrear,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Operator Vending Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "operator-vending-report.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Operator Vending Report
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
        {/* Operator Fields */}
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
        <table className="w-full min-w-[1000px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Account No.</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Meter No.</th>
              <th className="p-3 text-left">Total Amt</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">MPU</th>
              <th className="p-3 text-left">Actual Account</th>
              <th className="p-3 text-left">KWH</th>
              <th className="p-3 text-left">Arrear</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{item.branch}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.accountNo}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.meterNo}</td>
                <td className="p-3">${item.totalAmt.toFixed(2)}</td>
                <td className="p-3">${item.amount.toFixed(2)}</td>
                <td className="p-3">${item.mpu.toFixed(2)}</td>
                <td className="p-3">{item.actualAccount}</td>
                <td className="p-3">{item.kwh}</td>
                <td className="p-3">${item.arrear.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
