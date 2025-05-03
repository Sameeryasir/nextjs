"use client";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function ArrearProject() {

  return (
    <div className="p-6 bg-white-100">
      {/* Top Action Buttons - Replaced Search Buttons */}
      <div className="flex gap-4 mb-6 justify-end">
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          Modify
        </button>
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          Inactive
        </button>
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          Refresh
        </button>
        <Link href="/baseInformation">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
            New
          </button>
        </Link>
     
      </div>

      {/* SECDAIS Section */}
      <div className=" rounded-lg shadow mb-6 p-4">
        <h1 className="text-2xl font-bold mb-4">SECDAIS</h1>

        {/* Projects Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="mb-2">Searching Condition</p>

          {/* Pagination Controls */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2">
              <ChevronFirst className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              <ChevronRight className="w-5 h-5 text-orange-500 hover:text-orange-600" />
              <ChevronLast className="w-5 h-5 text-orange-500 hover:text-orange-600" />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-600">
                Total 18 Records, Record 0-10, Page 1/2
              </span>
              <span className="text-sm text-gray-600">|</span>
              <span className="text-sm text-gray-600">Turn To Page</span>
              <input
                type="text"
                className="w-12 border rounded px-2 py-1 text-sm text-center"
                value="1"
              />
              <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600" />
            </div>
          </div>

          {/* Projects Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-3 text-left">CODE</th>
                  <th className="p-3 text-left">DESCRIPTION</th>
                  <th className="p-3 text-left">PROJECT TYPE</th>
                  <th className="p-3 text-left">PAY METHOD</th>
                  <th className="p-3 text-left">STARTED</th>
                  <th className="p-3 text-left">ACTIVE</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-orange-50"}
                  >
                    <td className="p-3">00000000001</td>
                    <td className="p-3">Delta Regularization</td>
                    <td className="p-3">Feta General</td>
                    <td className="p-3">Per Time(s)</td>
                    <td className="p-3">✓</td>
                    <td className="p-3">Admin</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Version List Section */}
      <div className=" rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Version List</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              Refresh
            </button>
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              New
            </button>
          </div>
        </div>

        {/* Empty Version List Table */}
        <table className="w-full border-collapse">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">START UP TIME</th>
              <th className="p-3 text-left">AMOUNT</th>
              <th className="p-3 text-left">PAYING VALUE</th>
              <th className="p-3 text-left">OPERATOR</th>
              <th className="p-3 text-left">ACTIVE</th>
            </tr>
          </thead>
          <tbody>{/* Empty data */}</tbody>
        </table>
      </div>
    </div>
  );
}
