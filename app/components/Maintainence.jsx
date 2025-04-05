"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Maintaintoken() {
  const [tokenType, setTokenType] = useState("STS Standard");
  const [showDropdown, setShowDropdown] = useState(false);

  const tokenOptions = [
    "Clear Credit Token",
    "Clear Tamper Token",
    "Max. Power Limit Token",
    "Max. Phase Power Unbalance Limit",
  ];

  return (
    <div className="min-h-screen bg-white p-1">
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="max-w-3xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Customer Information
          </h2>
          <div className="space-y-4">
            {/* First row - two inline fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-400 w-24 flex-shrink-0">
                  Code
                </label>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Second input with invisible label for alignment */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-400 w-24 flex-shrink-0 invisible">
                  Code
                </label>
                <input
                  type="text"
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Full Name - inline */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
                Full Name
              </label>
              <input
                type="text"
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Meter Num - inline but half width */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
                Meter Num.
              </label>
              <input
                type="text"
                className="w-1/2 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Business Information
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[#9CA3AF] mb-2">Date</label>
              <input
                type="date"
                className="w-full md:w-1/2 px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            <div className="relative">
              <label className="block text-[#9CA3AF] mb-2">Token Type</label>
              <div
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md flex justify-between items-center cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-200"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="text-gray-900">{tokenType}</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-sm">
                  {tokenOptions.map((option) => (
                    <div
                      key={option}
                      className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setTokenType(option);
                        setShowDropdown(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-[#9CA3AF] mb-2">
                Token Sub Type
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] mb-2">Remark</label>
              <textarea
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] mb-2">Token</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button className="px-6 py-2 bg-[#FF9500] text-white rounded-md hover:bg-[#F08900] transition-colors">
                Search...
              </button>
              <button className="px-6 py-2 bg-[#FF9500] text-white rounded-md hover:bg-[#F08900] transition-colors">
                Return
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Maintaintoken;
