"use client";
import React, { useState } from "react";
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";

function SecuritypageTable() {
  const [tableData, setTableData] = useState(
    Array.from({ length: 6 }, (_, i) => ({
      code: `00041001${i + 60}`,
      description: "Electricite anjuado comores 60054",
      baseTime: "1993-01-01 00:00:00",
      expiryTime: "2025-06-29",
      issueDate: "2025-05-31",
      loaded: true,
      active: true,
    }))
  );

  const toggleActive = (index) => {
    const updatedData = [...tableData];
    updatedData[index].active = !updatedData[index].active;
    setTableData(updatedData);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
      {/* Pagination Controls */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] sm:min-w-0 text-center">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-3">SN</th>
              <th className="p-3">Description</th>
              <th className="p-3">Base Time</th>
              <th className="p-3">Expiry Time</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Loaded</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tableData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-[#FFE2B7] transition-colors  last:border-0"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{row.description || "-"}</td>
                <td className="p-3">{row.baseTime || "-"}</td>
                <td className="p-3">{row.expiryTime || "-"}</td>
                <td className="p-3">{row.issueDate || "-"}</td>
                <td className="p-3">
                  {row.loaded ? (
                    <span className="text-green-500 text-xl">✔️</span>
                  ) : (
                    <span className="text-red-500 text-xl">❌</span>
                  )}
                </td>
                <td className="p-3">
                  {/* Switch */}
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={row.active}
                      onChange={() => toggleActive(index)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-400 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecuritypageTable;
