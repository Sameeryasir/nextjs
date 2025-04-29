"use client";
import React, { useState } from "react"; // Added useState import
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
  RefreshCw,
  Plus,
  Globe,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import AllocateInformationdialog from "./AllocateInformationdialog";

function Venderaccounttable() {
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);
  const tableData = Array(6).fill({
    code: "0004100166",
    regDate: "2025-02014", // Fixed date format (should probably be "2025-02-14")
    accountNo: "31125296",
    fullName: "Aaaaaa Aaaaaaa",
    triff: "11", // Fixed typo (should be "tariff" if that's what you meant)
    meterNum: "25120400129",
    installed: true,
    callCenter: true,
  });

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
    <div className="w-full bg-white mt-10 ml-5">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Vendor Account List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]"
              onClick={() => setshowAllocateDialog(true)}
            >
              <span className="hidden sm:inline ml-3">Allocate</span>
            </button>
            {showAllocateDialog && (
              <AllocateInformationdialog
                onClose={() => setshowAllocateDialog(false)}
              />
            )}{" "}
          </div>
        </div>

        <p className="text-sm font-bold text-gray-800">Searching Conditions</p>
      </div>
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">User Code</th>
                <th className="p-2 sm:p-3 text-left">Name</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Department</th>
                <th className="p-2 sm:p-3 text-left">Account Balence</th>{" "}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-[#FFE2B7] cursor-pointer">
                  <td className="p-2 sm:p-3">{row.code}</td>
                  <td className="p-2 sm:p-3">{row.regDate}</td>
                  <td className="p-2 sm:p-3">{row.accountNo}</td>
                  <td className="p-2 sm:p-3">{row.fullName}</td>
                  <td className="p-2 sm:p-3">{row.fullName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
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
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 mt-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Allocating List
          </h1>
          <button className="px-3 sm:px-4 py-1 sm:py-2 bg-[#FF9900] text-white rounded whitespace-nowrap mr-10">
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Meter Num.</th>
                <th className="p-2 sm:p-3 text-left">Install Date</th>
                <th className="p-2 sm:p-3 text-left">Install Reason</th>
                <th className="p-2 sm:p-3 text-left">Uninstall Date</th>
                <th className="p-2 sm:p-3 text-left">Uninstall Reason</th>
                <th className="p-2 sm:p-3 text-left">Operator</th>
              </tr>
            </thead>
            <tbody>
              {connectionData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-2 sm:p-3">{row.meterNum}</td>
                  <td className="p-2 sm:p-3">{row.installDate}</td>
                  <td className="p-2 sm:p-3">{row.installReason}</td>
                  <td className="p-2 sm:p-3">{row.uninstallDate}</td>
                  <td className="p-2 sm:p-3">{row.uninstallReason}</td>
                  <td className="p-2 sm:p-3">{row.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Venderaccounttable;
