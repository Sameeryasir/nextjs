// components/CustomerTable.jsx
"use client"; // This is a client component

import React from 'react';
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CustomerTable = ({
  tableData,
  totalRecords,
  pageIndex,
  totalPages,
  handlePageChange,
  handlePageInputChange,
  fetchTableData // Pass fetchTableData to allow refresh/re-submit on input blur/enter
}) => {
  return (
    <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
      <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex gap-1 sm:gap-2">
            <ChevronFirst
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
              onClick={() => handlePageChange(0)}
              style={{ opacity: pageIndex === 0 ? 0.5 : 1, cursor: pageIndex === 0 ? 'not-allowed' : 'pointer' }}
            />
            <ChevronLeft
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
              onClick={() => handlePageChange(pageIndex - 1)}
              style={{ opacity: pageIndex === 0 ? 0.5 : 1, cursor: pageIndex === 0 ? 'not-allowed' : 'pointer' }}
            />
            <ChevronRight
              className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 cursor-pointer"
              onClick={() => handlePageChange(pageIndex + 1)}
              style={{ opacity: pageIndex >= totalPages - 1 ? 0.5 : 1, cursor: pageIndex >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
            />
            <ChevronLast
              className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 cursor-pointer"
              onClick={() => handlePageChange(totalPages - 1)}
              style={{ opacity: pageIndex >= totalPages - 1 ? 0.5 : 1, cursor: pageIndex >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
            <span className="text-gray-600 whitespace-nowrap">
              Total {totalRecords} Records
            </span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span className="text-gray-600 whitespace-nowrap">
              Record{" "}
              {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
              {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
              {pageIndex + 1}/{totalPages}
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600 whitespace-nowrap">
              Turn To Page
            </span>
            <input
              type="text"
              className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
              value={pageIndex + 1} // Display 1-based index to the user
              onChange={handlePageInputChange}
              onBlur={fetchTableData} // Fetch data when input loses focus
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchTableData(); // Fetch data on Enter key press
                }
              }}
            />
            <ChevronRight
              className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
              onClick={fetchTableData} // Click to submit page number
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] sm:min-w-0">
          <thead className="bg-[#FF9900] text-white">
            <tr>
              <th className="p-2 sm:p-3 text-left">Code</th>
              <th className="p-2 sm:p-3 text-left">Reg/Date</th>
              <th className="p-2 sm:p-3 text-left">Account No</th>
              <th className="p-2 sm:p-3 text-left">Full Name</th>
              <th className="p-2 sm:p-3 text-left">Triff</th>
              <th className="p-2 sm:p-3 text-left">Meter Num</th>
              <th className="p-2 sm:p-3 text-left">Installed</th>
              <th className="p-2 sm:p-3 text-left">Call Center</th>
              {/* Add any other headers here if you find more fields in the API response */}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-orange-100"}
                >
                  <td className="p-2 sm:p-3">{row.Code}</td>
                  <td className="p-2 sm:p-3">{row.RegDate}</td>
                  <td className="p-2 sm:p-3">{row.AccountNo || row.RefCode || ''}</td>
                  <td className="p-2 sm:p-3">{row.CustomerName || row.FullName || ''}</td>
                  <td className="p-2 sm:p-3">{row.Triff || row.TriffCode || row.Tariff || row.TariffCode || row.PriceCode || ''}</td>
                  <td className="p-2 sm:p-3">{row.MeterNum || row.MeterNumber || ''}</td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={
                        row.Installed || row.isInstalled ? "text-green-500" : "text-red-500"
                      }
                    >
                      {(row.Installed || row.isInstalled) ? "✓" : "✗"}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={
                        row.CallCenter || row.hasCallCenter ? "text-green-500" : "text-red-500"
                      }
                    >
                      {(row.CallCenter || row.hasCallCenter) ? "✓" : "✗"}
                    </span>
                  </td>
                  {/* Add any other td elements here for additional fields found in API response */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;