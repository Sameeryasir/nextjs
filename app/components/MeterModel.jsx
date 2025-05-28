"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Plus,
} from "lucide-react";
import AllocateInformationdialog from "./AllocateInformationdialog";

function MeterModel() {
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  const meterModelData = [
    {
      code: "MM-001",
      description: "Single Phase Smart Meter",
      meterType: "Electronic",
      phase: "1",
      voltage: "220V",
      current: "10A",
      maxCurrent: "60A",
      usageAgeLimit: "10 years",
      ti: "1.0",
      initValue: "0.0 kWh",
      maxPower: "13.2 kW",
    },
    {
      code: "MM-002",
      description: "Three Phase Industrial Meter",
      meterType: "Electronic",
      phase: "3",
      voltage: "400V",
      current: "100A",
      maxCurrent: "600A",
      usageAgeLimit: "15 years",
      ti: "0.5",
      initValue: "0.0 kWh",
      maxPower: "240 kW",
    },
    {
      code: "MM-003",
      description: "Single Phase Basic Meter",
      meterType: "Electromechanical",
      phase: "1",
      voltage: "220V",
      current: "5A",
      maxCurrent: "30A",
      usageAgeLimit: "7 years",
      ti: "1.5",
      initValue: "0.0 kWh",
      maxPower: "6.6 kW",
    },
    {
      code: "MM-004",
      description: "Three Phase Commercial Meter",
      meterType: "Electronic",
      phase: "3",
      voltage: "400V",
      current: "50A",
      maxCurrent: "300A",
      usageAgeLimit: "12 years",
      ti: "0.2",
      initValue: "0.0 kWh",
      maxPower: "120 kW",
    },
    {
      code: "MM-005",
      description: "Prepaid Smart Meter",
      meterType: "Electronic",
      phase: "1",
      voltage: "220V",
      current: "15A",
      maxCurrent: "90A",
      usageAgeLimit: "10 years",
      ti: "1.0",
      initValue: "0.0 kWh",
      maxPower: "19.8 kW",
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
            Meter Model List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => handleReload()}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]"
              onClick={() => setshowAllocateDialog(true)}
            >
              <Plus size={16} />

              <span className="hidden sm:inline ">New</span>
            </button>
            {showAllocateDialog && (
              <AllocateInformationdialog
                onClose={() => setshowAllocateDialog(false)}
              />
            )}
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
                Total {meterModelData.length} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{meterModelData.length}, Page 1/1
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
                <th className="p-2 sm:p-3 text-left">Meter Type</th>
                <th className="p-2 sm:p-3 text-left">Phase</th>
                <th className="p-2 sm:p-3 text-left">Voltage</th>
                <th className="p-2 sm:p-3 text-left">Current</th>
                <th className="p-2 sm:p-3 text-left">Max.Current</th>
                <th className="p-2 sm:p-3 text-left">Use Age Limit</th>
                <th className="p-2 sm:p-3 text-left">TI</th>
                <th className="p-2 sm:p-3 text-left">Init. Value</th>
                <th className="p-2 sm:p-3 text-left">Max.Power</th>
              </tr>
            </thead>
            <tbody>
              {meterModelData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#FFE2B7] cursor-pointer  border-gray-200"
                >
                  <td className="p-2 sm:p-3">{row.code}</td>
                  <td className="p-2 sm:p-3">{row.description}</td>
                  <td className="p-2 sm:p-3">{row.meterType}</td>
                  <td className="p-2 sm:p-3">{row.phase}</td>
                  <td className="p-2 sm:p-3">{row.voltage}</td>
                  <td className="p-2 sm:p-3">{row.current}</td>
                  <td className="p-2 sm:p-3">{row.maxCurrent}</td>
                  <td className="p-2 sm:p-3">{row.usageAgeLimit}</td>
                  <td className="p-2 sm:p-3">{row.ti}</td>
                  <td className="p-2 sm:p-3">{row.initValue}</td>
                  <td className="p-2 sm:p-3">{row.maxPower}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MeterModel;
