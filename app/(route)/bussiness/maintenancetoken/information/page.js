"use client";
import { useState } from "react";

import React from "react";
import {
  Minus,
  Square,
  X,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  ChevronDown,
} from "lucide-react";
function Page() {
  const [showSearchDialog, setShowSearchDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
        {/* Customer Information Section */}
        <section className>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Customer Information
          </h1>
          <div className="space-y-4">
            {/* Code + Other Code - Unified row */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Code</label>
              <div className="flex gap-4 flex-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Meter Num */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Meter Num.</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </section>

        {/* Business Information Section */}
        <section>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Business Information
          </h1>
          <div className="space-y-4">
            {/* Date */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Token Type */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Token Type</label>
              <div className="relative w-[280px]">
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 appearance-none"
                  defaultValue="STS Standard"
                >
                  <option>STS Standard</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Token Sub Type */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Token Sub Type
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Remark */}
            <div className="flex items-start gap-4">
              <label className="w-32 text-sm text-gray-500 mt-2">Remark</label>
              <textarea className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 h-24 resize-none" />
            </div>

            {/* Token Buttons */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Token</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSearchDialog(true)}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Search...
                </button>
                {showSearchDialog && (
                  <div className=" bg-transparent p-4 fixed inset-0 z-50 overflow-auto">
                    <div className="bg-gray-100 rounded-lg shadow-lg max-w-6xl mx-auto mt-30">
                      {/* Dialog Header */}
                      <div className="flex justify-end gap-2 p-2 border-b">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Minus size={16} />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Square size={16} />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => setShowSearchDialog(false)}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Search Form */}
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">
                              Account No
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">Code</label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-1">
                              Meter Num.
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-1.5 border rounded"
                            />
                          </div>
                        </div>

                        <div>
                          <button className="px-4 py-1.5 bg-[#0A1E46] text-white rounded hover:bg-[#152a5a] transition-colors">
                            Search
                          </button>
                        </div>
                      </div>

                      {/* Pagination Controls */}
                      <div className="px-4 py-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[
                            ChevronFirst,
                            ChevronLeft,
                            ChevronRight,
                            ChevronLast,
                          ].map((Icon, i) => (
                            <button
                              key={i}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Icon size={16} />
                            </button>
                          ))}
                        </div>
                        <span className="text-sm">
                          Total 1 Records, Record 1 - 1, Page 1/1, Turn To Page
                        </span>
                        <input
                          type="text"
                          className="w-16 px-2 py-1 border rounded"
                        />
                        <button className="p-1 text-green-600 hover:bg-gray-100 rounded">
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Data Table */}
                      <div className="px-4 pb-4">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-[#0A1E46] text-white">
                              {[
                                "Code",
                                "Reg. Date",
                                "Account No",
                                "Full Name",
                                "Meter Num.",
                              ].map((header) => (
                                <th
                                  key={header}
                                  className="py-2 px-4 text-left"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>{/* Data goes here */}</tbody>
                        </table>
                      </div>

                      {/* Dialog Footer */}
                      <div className="p-4 border-t flex justify-end gap-2">
                        <button className="px-4 py-1.5 bg-[#0A1E46] text-white rounded hover:bg-[#152a5a] transition-colors w-[100px]">
                          Ok
                        </button>
                        <button className="px-4 py-1.5 border rounded hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition-colors">
                  Return
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
