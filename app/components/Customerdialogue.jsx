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

function Customerdialogue() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="max-w-3xl px-4 py-6 sm:px-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Base info</h1>

        {/* Form */}
        <form className="space-y-5">
          {/* Code */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label
              htmlFor="code"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Code
            </label>
            <input
              id="code"
              type="text"
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
          </div>

          {/* Meter Mode */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label
              htmlFor="meterMode"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Meter Mode
            </label>
            <select
              id="meterMode"
              name="meterMode"
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-gray-900"
              defaultValue=""
            >
              <option value="" disabled>
                Select Meter Mode
              </option>
              <option value="General Monophase">General Monophase</option>
              <option value="General Tripphase">General Tripphase</option>
              <option value="Compteur HT">Compteur HT</option>
            </select>
          </div>

          {/* Tariff */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label
              htmlFor="tariff"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Tariff
            </label>
            <select
              id="tariff"
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option>Select Tariff</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
              <option>01 00001 - SONELEC NGAZIDJA</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label
              htmlFor="description"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
          </div>

          {/* Maximum Load Threshold */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label
              htmlFor="maxLoad"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Maximum Load Threshold
            </label>
            <input
              id="maxLoad"
              type="text"
              className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
            />
          </div>

          {/* Active Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
            <label
              htmlFor="active"
              className="w-full sm:w-40 text-sm text-gray-700 font-medium"
            >
              Active
            </label>
            <input
              id="active"
              type="checkbox"
              className="h-5 w-5 accent-[#FF9900] cursor-pointer"
            />
          </div>
        </form>
      </div>

      <div className="mt-10   ">
        {/* First Table Section */}
        <h1 className="text-gray-400 ml-3">Vending</h1>

        <div
          className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#001F4D] ml-5 mt-1 hover:cursor-pointer"
          onClick={toggleDropdown}
        >
          <span className="text-[#001F4D] text-xl font-bold leading-none">
            +
          </span>
        </div>

        <div className="  mb-4 mt-5 sm:mb-6 overflow-x-auto">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Fee</th>
                  <th className="p-2 sm:p-3 text-left">Fee</th>
                  <th className="p-2 sm:p-3 text-left">TaxIncluded</th>
                  <th className="p-2 sm:p-3 text-left">Def.Tax Rate</th>
                  <th className="p-2 sm:p-3 text-left">Tax(%)</th>
                  <th className="p-2 sm:p-3 text-left">Payement Type</th>
                </tr>
              </thead>
              {/* Dropdown appears after click */}
              {showDropdown && (
                <div className="w-64 ml-5 mt-2">
                  <select className="w-full px-4 py-2 border  rounded-md text-black">
                    <option>TVA</option>
                    <option>RDV</option>
                    <option>Partie Fixe Mono</option>
                    <option>Partie Fixe TRI</option>
                    <option>Partie Fixe</option>
                    <option>Partie Fix TRI</option>
                    <option>Testee</option>
                  </select>
                </div>
              )}
            </table>
          </div>
        </div>

        {/* Second Table Section */}
        <h1 className="text-gray-400 ml-3">Replace Max.Power</h1>
        <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#001F4D] ml-5 mt-1 hover:cursor-pointer">
          <span className="text-[#001F4D] text-xl font-bold leading-none">
            +
          </span>
        </div>
        <div className=" mb-4 sm:mb-6 overflow-x-auto mt-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Fee</th>
                  <th className="p-2 sm:p-3 text-left">Fee</th>
                  <th className="p-2 sm:p-3 text-left">TaxIncluded</th>
                  <th className="p-2 sm:p-3 text-left">Def.Tax Rate</th>
                  <th className="p-2 sm:p-3 text-left">Tax(%)</th>
                  <th className="p-2 sm:p-3 text-left">Payement Type</th>
                </tr>
              </thead>
              {/* Dropdown appears after click */}
              {showDropdown && (
                <div className=" w-64 ml-5 mt-2">
                  <select className="w-full px-4 py-2 border  rounded-md text-black">
                    <option>TVA</option>
                    <option>RDV</option>
                    <option>Partie Fixe Mono</option>
                    <option>Partie Fixe TRI</option>
                    <option>Partie Fixe</option>
                    <option>Partie Fix TRI</option>
                    <option>Testee</option>
                  </select>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customerdialogue;
