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
import Accountdialogue from "./accountdialogue";
import Accountdialogue1 from "./accountdialogue1";
import Accountdialogue2 from "./accountdialogue2";

function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen1, setIsDialogOpen1] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  /** ---------------------------
   *  Sample table data
   *  ---------------------------
   *  `branch` is still kept in the
   *  object for completeness, but
   *  it is no longer rendered in
   *  the table or exported.
   */
  const tableData = [
    {
      branch: "Main Branch",
      accountNo: "ACC123456",
      project: "Solar Upgrade",
      regDate: "2024-05-01",
      closeDate: "2025-05-01",
      payingDate: "2025-01-10",
      payMethod: "Credit Card",
      remainBalance: 150.5,
      periodicPayment: 100,
    },
    {
      branch: "North Branch",
      accountNo: "ACC789012",
      project: "Energy Audit",
      regDate: "2023-07-12",
      closeDate: "2024-07-12",
      payingDate: "2024-06-20",
      payMethod: "Cash",
      remainBalance: 75.25,
      periodicPayment: 50,
    },
  ];

  /* -------- Basic Actions -------- */
  const handleReload = () => window.location.reload();

  const handleExportToExcel = () => {
    const header = [
      // "Branch",  <-- removed
      "Account No.",
      "Project",
      "Reg. Date",
      "Close Date",
      "Paying Date",
      "Pay Method",
      "Remain Balance",
      "Periodic Payment Amount",
    ];

    const rows = tableData.map((item) => [
      // item.branch, <-- removed
      item.accountNo,
      item.project,
      item.regDate,
      item.closeDate,
      item.payingDate,
      item.payMethod,
      item.remainBalance,
      item.periodicPayment,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([header, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Account Payments");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "customer-account-payments.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* ░░ Header ░░ */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Account Payments
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105"
          >
            Refresh
          </button>
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105"
          >
            Excel
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105"
          >
            Print
          </button>
        </div>
      </div>

      {/* ░░ Search Form ░░ */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        {/* Branch Fields (kept) */}
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
              <Accountdialogue onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Customer Info Fields */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Customer Info
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
              <Accountdialogue1 onClose={() => setIsDialogOpen1(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:brightness-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Account No. */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Account No.
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

      {/* ░░ Table ░░ */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
            <tr>
              {/* Branch header removed */}
              <th className="p-3 text-left">Account No.</th>
              <th className="p-3 text-left">Project</th>
              <th className="p-3 text-left">Reg.Date</th>
              <th className="p-3 text-left">Close Date</th>
              <th className="p-3 text-left">Paying Date</th>
              <th className="p-3 text-left">Pay Method</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Total Paid</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-[#FFE2B7] transition text-sm">
                {/* Branch cell removed */}
                <td className="p-3">{row.accountNo}</td>
                <td className="p-3">{row.project}</td>
                <td className="p-3">{row.regDate}</td>
                <td className="p-3">{row.closeDate}</td>
                <td className="p-3">{row.payingDate}</td>
                <td className="p-3">{row.payMethod}</td>
                <td className="p-3">{row.remainBalance}</td>
                <td className="p-3">{row.periodicPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
