"use client";
import React from "react";
import { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";
import Vendorsessoinform from "./Vendorsessoinform";
function VenderSessionpage() {
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
    <>
      <div className="w-full bg-white p-2 md:p-6">
      
        <Vendorsessoinform />

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
                  <th className="p-2 sm:p-3 text-left">User Name</th>
                  <th className="p-2 sm:p-3 text-left">Start Time</th>
                  <th className="p-2 sm:p-3 text-left">Status</th>
                  <th className="p-2 sm:p-3 text-left">Trans Amount</th>
                  <th className="p-2 sm:p-3 text-left">Bank Amount</th>
                  <th className="p-2 sm:p-3 text-left">Stop Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                  >
                    <td className="p-2 sm:p-3">{row.code || "-"}</td>
                    <td className="p-2 sm:p-3">{row.regDate || "-"}</td>
                    <td className="p-2 sm:p-3">{row.accountNo || "-"}</td>
                    <td className="p-2 sm:p-3">{row.fullName || "-"}</td>
                    <td className="p-2 sm:p-3">{row.transAmount || "-"}</td>
                    <td className="p-2 sm:p-3">{row.bankAmount || "-"}</td>
                    <td className="p-2 sm:p-3">{row.stopAmount || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderSessionpage;
