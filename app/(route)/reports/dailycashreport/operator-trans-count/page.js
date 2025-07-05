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

 // Sample Table Data
 const tableData = [
   {
     branch: "Main Warehouse",
     operator: "John Doe",
     date: "2023-09-01",
     tranCount: 15,
     mpu: 5,
     cash: 200,
     totalCost: 800,
   },
   {
     branch: "East Warehouse",
     operator: "Jane Smith",
     date: "2023-09-02",
     tranCount: 20,
     mpu: 7,
     cash: 300,
     totalCost: 1000,
   },
 ];

 // Excel Export Function
 const handleExportToExcel = () => {
   const worksheetData = [
     ["Branch", "Operator", "Date", "Tran Count", "MPU", "Cash", "Total Cost"],
     ...tableData.map((row) => [
       row.branch,
       row.operator,
       row.date,
       row.tranCount,
       row.mpu,
       row.cash,
       row.totalCost,
     ]),
   ];

   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, "OperList");

   const excelBuffer = XLSX.write(workbook, {
     bookType: "xlsx",
     type: "array",
   });

   const blob = new Blob([excelBuffer], {
     type: "application/octet-stream",
   });

   saveAs(blob, "Meter_List.xlsx");
 };
  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Operator Sales Count
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
        {/* Warehouse Row */}
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

        {/* Warehouse Duplicate */}
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
            </button>
          </div>
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
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Operator</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Tran Count</th>
              <th className="p-3 text-left">MPU</th>
              <th className="p-3 text-left">Cash</th>
              <th className="p-3 text-left">Total Cost</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3">{item.branch}</td>
                <td className="p-3">{item.operator}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">{item.tranCount}</td>
                <td className="p-3">{item.mpu}</td>
                <td className="p-3">{item.cash}</td>
                <td className="p-3">{item.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
