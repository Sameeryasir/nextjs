"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  ListOrdered,
  FileText,
} from "lucide-react";
import AllocateInformationdialog from "./AllocateInformationdialog";
import Link from "next/link";

function Tariffindex() {
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  // Data for the first table (List of Tariff)
  const tariffData = [
    {
      code: "T-001",
      branch: "Main Branch",
      description: "Residential Electricity",
      version: "v2.1",
    },
    {
      code: "T-002",
      branch: "North Region",
      description: "Commercial Electricity",
      version: "v1.5",
    },
    {
      code: "T-003",
      branch: "South Region",
      description: "Industrial Electricity",
      version: "v3.0",
    },
    {
      code: "T-004",
      branch: "East Region",
      description: "Agricultural Electricity",
      version: "v2.0",
    },
    {
      code: "T-005",
      branch: "West Region",
      description: "Government Electricity",
      version: "v1.8",
    },
  ];

  // Data for the second table (Tariff Version List)
  const tariffVersionData = [
    {
      version: "v2.1",
      startupTime: "2024-01-01",
      tariffType: "Residential",
      price: "$0.15/kWh",
      taxIncluded: "Yes",
      feeCharge: "$5.00",
      operator: "OP-1001",
      active: "Yes",
    },
    {
      version: "v1.5",
      startupTime: "2023-07-15",
      tariffType: "Commercial",
      price: "$0.20/kWh",
      taxIncluded: "Yes",
      feeCharge: "$10.00",
      operator: "OP-1002",
      active: "Yes",
    },
    {
      version: "v3.0",
      startupTime: "2024-03-01",
      tariffType: "Industrial",
      price: "$0.18/kWh",
      taxIncluded: "No",
      feeCharge: "$15.00",
      operator: "OP-1003",
      active: "No",
    },
    {
      version: "v2.0",
      startupTime: "2023-11-01",
      tariffType: "Agricultural",
      price: "$0.12/kWh",
      taxIncluded: "Yes",
      feeCharge: "$3.00",
      operator: "OP-1004",
      active: "Yes",
    },
  ];

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            List of Tariff
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => handleReload()}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href={'/base_information/tariff/newtariff'}>
              <button className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]">
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* First Table: List of Tariff */}
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
                Total {tariffData.length} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{tariffData.length}, Page 1/1
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
                <th className="p-2 sm:p-3 text-left">Code</th>
                <th className="p-2 sm:p-3 text-left">Branch</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Version</th>
              </tr>
            </thead>
            <tbody>
              {tariffData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#FFE2B7] cursor-pointer  border-gray-200"
                >
                  <td className="p-2 sm:p-3">{row.code}</td>
                  <td className="p-2 sm:p-3">{row.branch}</td>
                  <td className="p-2 sm:p-3">{row.description}</td>
                  <td className="p-2 sm:p-3">{row.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Second Table: Tariff Version List */}
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
                Total {tariffVersionData.length} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{tariffVersionData.length}, Page 1/1
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Tariff Version List
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Version</th>
                <th className="p-2 sm:p-3 text-left">Startup Time</th>
                <th className="p-2 sm:p-3 text-left">Tariff type</th>
                <th className="p-2 sm:p-3 text-left">Price</th>
                <th className="p-2 sm:p-3 text-left">Tax Included</th>
                <th className="p-2 sm:p-3 text-left">Fee Charge</th>
                <th className="p-2 sm:p-3 text-left">Operator</th>
                <th className="p-2 sm:p-3 text-left">Active</th>
              </tr>
            </thead>
            <tbody>
              {tariffVersionData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-[#FFE2B7]"
                  }
                >
                  <td className="p-2 sm:p-3">{row.version}</td>
                  <td className="p-2 sm:p-3">{row.startupTime}</td>
                  <td className="p-2 sm:p-3">{row.tariffType}</td>
                  <td className="p-2 sm:p-3">{row.price}</td>
                  <td className="p-2 sm:p-3">{row.taxIncluded}</td>
                  <td className="p-2 sm:p-3">{row.feeCharge}</td>
                  <td className="p-2 sm:p-3">{row.operator}</td>
                  <td className="p-2 sm:p-3">{row.active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tariffindex;
