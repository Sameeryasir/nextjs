"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  Landmark,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

function Definefee() {
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  const feeData = [
    {
      code: "FEE-001",
      description: "Meter Installation Fee",
      fee: "$50.00",
      taxIncluded: "Yes",
      taxPercentage: "10%",
      paymentType: "One-time",
    },
    {
      code: "FEE-002",
      description: "Monthly Service Charge",
      fee: "$15.00",
      taxIncluded: "Yes",
      taxPercentage: "10%",
      paymentType: "Recurring",
    },
    {
      code: "FEE-003",
      description: "Late Payment Penalty",
      fee: "$10.00",
      taxIncluded: "No",
      taxPercentage: "0%",
      paymentType: "Conditional",
    },
    {
      code: "FEE-004",
      description: "Meter Replacement Fee",
      fee: "$75.00",
      taxIncluded: "Yes",
      taxPercentage: "10%",
      paymentType: "One-time",
    },
    {
      code: "FEE-005",
      description: "Connection Fee",
      fee: "$30.00",
      taxIncluded: "Yes",
      taxPercentage: "10%",
      paymentType: "One-time",
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
            Fees List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => handleReload()}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href={'/base_information/definefee/baseinfo'}>
              <button className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]">
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </button>
            </Link>
          </div>
        </div>
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
                Total {feeData.length} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{feeData.length}, Page 1/1
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
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Fee</th>
                <th className="p-2 sm:p-3 text-left">Tax included</th>
                <th className="p-2 sm:p-3 text-left">Tax(%)</th>
                <th className="p-2 sm:p-3 text-left">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#FFE2B7] cursor-pointer border-b border-gray-200"
                >
                  <td className="p-2 sm:p-3">{row.code}</td>
                  <td className="p-2 sm:p-3">{row.description}</td>
                  <td className="p-2 sm:p-3">{row.fee}</td>
                  <td className="p-2 sm:p-3">{row.taxIncluded}</td>
                  <td className="p-2 sm:p-3">{row.taxPercentage}</td>
                  <td className="p-2 sm:p-3">{row.paymentType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Definefee;
