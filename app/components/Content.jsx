"use client";
import React from 'react'
import {
  Bell,
  Building2,
  FileText,
  Database,
  Key,
  MessageSquare,
  Package,
  Shield,
  Info,
  MonitorDot,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Globe,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from 'react';
function Content() {
      const [activeTab, setActiveTab] = useState("connection");

     const tableData = Array(6).fill({
       code: "0004100166",
       regDate: "2025-02014",
       accountNo: "31125296",
       fullName: "Aaaaaa Aaaaaaa",
       triff: "11",
       meterNum: "25120400129",
       installed: true,
       callCenter: true,
     });
       const tabs = [
         { id: "customer-event", label: "Customer Event" },
         { id: "connection", label: "Connection" },
         { id: "vending", label: "Vending" },
         { id: "arrear-contract", label: "Arrear Contract" },
         { id: "maintenance-token", label: "Maintenance Token" },
         { id: "free-issue-list", label: "Free Issue List" },
         { id: "cancellation", label: "Cancellation" },
       ];
       const connectionData = [
         {
           meterNum: "0004100169",
           installDate: "2025-02-14",
           installReason: "New Meter Connected",
           uninstallDate: "",
           uninstallReason: "",
           operator: "1450",
         },
       ];

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 pl-150">
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded hover:cursor-pointer">
          Search
        </button>
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded">
          Search By History Installed
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <ChevronFirst className="w-5 h-5" />
              <ChevronLeft className="w-5 h-5" />
              <ChevronRight className="w-5 h-5 text-orange-500" />
              <ChevronLast className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-600">
                Total 1 Records, Record 1-1, Page 1/1
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
        </div>

        <table className="w-full">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Reg/Date</th>
              <th className="p-3 text-left">Account No</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Triff</th>
              <th className="p-3 text-left">Meter Num</th>
              <th className="p-3 text-left">Installed</th>
              <th className="p-3 text-left">Call Center</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-orange-100"}
              >
                <td className="p-3">{row.code}</td>
                <td className="p-3">{row.regDate}</td>
                <td className="p-3">{row.accountNo}</td>
                <td className="p-3">{row.fullName}</td>
                <td className="p-3">{row.triff}</td>
                <td className="p-3">{row.meterNum}</td>
                <td className="p-3">
                  <span className="text-green-500">✓</span>
                </td>
                <td className="p-3">
                  <span className="text-green-500">✓</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded ml-auto">
          Refresh
        </button>
      </div>

      {/* Connection Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Navigation controls */}
            <div className="flex gap-2">
              <ChevronFirst className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              <ChevronLeft className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              <ChevronRight className="w-5 h-5 text-orange-500 hover:text-orange-600" />
              <ChevronLast className="w-5 h-5 text-orange-500 hover:text-orange-600" />
            </div>

            {/* Pagination info and page input */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
              <span className="text-sm text-gray-600">
                Total 1 Records, Record 1-1, Page 1/1
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
        </div>

        <table className="w-full">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3 text-left">Meter Num.</th>
              <th className="p-3 text-left">Install Date</th>
              <th className="p-3 text-left">Install Reason</th>
              <th className="p-3 text-left">Uninstall Date</th>
              <th className="p-3 text-left">Uninstall Reason</th>
              <th className="p-3 text-left">Operator</th>
            </tr>
          </thead>
          <tbody>
            {connectionData.map((row, index) => (
              <tr key={index}>
                <td className="p-3">{row.meterNum}</td>
                <td className="p-3">{row.installDate}</td>
                <td className="p-3">{row.installReason}</td>
                <td className="p-3">{row.uninstallDate}</td>
                <td className="p-3">{row.uninstallReason}</td>
                <td className="p-3">{row.operator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Content