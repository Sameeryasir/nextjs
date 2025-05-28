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

function CustomerType() {
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  // Data for the first table (List of Tariff)
  const CustomerData = [
    {
      code: "T-001",
      description: "Residential Electricity",
      meterType: "Single Phase",
      tariff: "v2.1",
      activate: true,
    },
    {
      code: "T-002",
      description: "Commercial Electricity",
      meterType: "Three Phase",
      tariff: "v1.5",
      activate: false,
    },
    {
      code: "T-003",
      description: "Industrial Electricity",
      meterType: "High Voltage",
      tariff: "v3.0",
      activate: true,
    },
    {
      code: "T-004",
      description: "Agricultural Electricity",
      meterType: "Single Phase",
      tariff: "v2.0",
      activate: false,
    },
    {
      code: "T-005",
      description: "Government Electricity",
      meterType: "Three Phase",
      tariff: "v1.8",
      activate: true,
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
            Customer Type List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => handleReload()}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href={"/newtariff"}>
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
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"></div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Code</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">MeterType</th>
                <th className="p-2 sm:p-3 text-left">Tariff</th>
                <th className="p-2 sm:p-3 text-left">Activate</th>
              </tr>
            </thead>
            <tbody>
              {CustomerData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#FFE2B7] cursor-pointer border-gray-200"
                >
                  <td className="p-2 sm:p-3">{row.code}</td>
                  <td className="p-2 sm:p-3">{row.description}</td>
                  <td className="p-2 sm:p-3">{row.meterType}</td>
                  <td className="p-2 sm:p-3">{row.tariff}</td>
                  <td className="p-2 sm:p-3">
                    {row.activate ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Inactive
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CustomerType;
