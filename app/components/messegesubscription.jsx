"use client";
import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";
import Messegetable from "./Messegetable";
import SearchForm from "./SearchForm";
function Messegesubscription() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  // Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const [formData, setFormData] = useState({
    code: "",
    description: "",
  });
  const [showmessege, setshowmessege] = useState(false);
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-1xl mx-auto space-y-8 ml-8">
        {/* Section Header */}
        <h1 className="text-xl font-semibold text-gray-900">
          Message Subscription
        </h1>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Code</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Description</label>
            <select
              defaultValue=""
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            >
              <option value="" disabled hidden>
                Default
              </option>
              <option value="Header office 1">Header office 1</option>
              <option value="Administrator">Administrator</option>
              <option value="Vending">Vending</option>
              <option value="Client Service">Client Service</option>
              <option value="Vent">Vent</option>
              <option value="Cassirier">Cassirier</option>
              <option value="Ouni">Ouni</option>
            </select>

            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
              >
                <span className="text-lg">...</span>
              </button>
              <button
                type="button"
                className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">
              Subscription Type
            </label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
              onClick={() => setshowmessege(true)}
            />
          </div>
          {showmessege && (
            <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center p-2 sm:p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setshowmessege(false)}
                >
                  <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Add New Record</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 text-sm sm:text-base font-medium">
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <label className="w-32 text-gray-700 text-sm sm:text-base font-medium">
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-2 rounded gap-2 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(1)}
                        >
                          <ChevronFirst size={16} className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          disabled={currentPage === 1}
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                        >
                          <ChevronLeft size={16} className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          disabled={currentPage === totalPages}
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                        >
                          <ChevronRight size={16} className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(totalPages)}
                        >
                          <ChevronLast size={16} className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left whitespace-nowrap">
                        Total 0 Records, Record 0, Page {currentPage}/
                        {totalPages}, Turn To Page
                      </span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="1"
                          max={totalPages}
                          value={currentPage}
                          onChange={(e) => {
                            const page = Math.min(
                              totalPages,
                              Math.max(1, Number(e.target.value))
                            );
                            setCurrentPage(page || 1);
                          }}
                          className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded text-center"
                        />
                        <span className="text-green-500 cursor-pointer hover:text-green-600">
                          →
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto mt-2 sm:mt-4">
                      <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-800 text-white">
                            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                              Code
                            </th>
                            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                              Description
                            </th>
                            <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-gray-50 text-xs sm:text-sm">
                            <td className="px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-blue-600"
                                // Optional: add value or checked if needed
                              />
                              1
                            </td>
                            <td className="px-2 sm:px-4 py-1 sm:py-2">
                              AAAAAaa
                            </td>
                            <td className="px-2 sm:px-4 py-1 sm:py-2">
                              Status
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <button
                      type="button"
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-md hover:bg-gray-50"
                      onClick={() => setshowmessege(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700"
                    >
                      OK
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Startup Time</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Parameters</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Cycle</label>
            <div className="flex gap-4">
              {/* First Input: Value */}
              <input
                type="text"
                className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                placeholder="Enter value"
              />

              {/* Second Input: Dropdown for time units */}
              <select className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Next Time</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>

        {/* Recipient Section */}
        <div className="space-y-6 mt-10 text-gray-700">
          {/* Customer Row */}
          <div className="flex items-start gap-4">
            <label className="w-40 text-sm pt-1">Recipient</label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Customer</span>
              </label>
              <span className="text-sm">Notice Type:</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>MSG</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Email</span>
              </label>
            </div>
          </div>

          {/* Operator Row */}
          <div className="flex items-start gap-4">
            <label className="w-40 text-sm" />
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Operator</span>
              </label>
              <span className="text-sm ml-1.5">Notice Type:</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>MSG</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Email</span>
              </label>
            </div>
          </div>

          {/* Activate Row */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Activate</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-2 gap-2 mt-10 ml-40">
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Submit</span>
        </button>
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Refresh</span>
        </button>
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Return</span>
        </button>
      </div>
      <SearchForm/>
      <Messegetable/>
    </div>
  );
}

export default Messegesubscription;
