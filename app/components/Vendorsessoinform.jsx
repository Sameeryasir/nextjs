"use client";
import React, { useState } from "react";
import { X, Search } from "lucide-react";
import VendorSessiondialogue from "./Vendorsessiondialogue";

function Vendorsessoinform({
  userCode,
  setUserCode,
  dateFrom,
  setDateFrom,
  dateTo, // Receive dateTo prop
  setDateTo, // Receive setDateTo prop
  status,
  setStatus,
  selectedAreaCode,
  setSelectedAreaCode,
  handleSearch,
  handleRefresh,
}) {
  const [showDialog, setShowDialog] = useState(false);

  console.log("Vendorsessoinform: Component rendered.");
  console.log("Vendorsessoinform: Current search parameters in form:", { userCode, dateFrom, dateTo, status, selectedAreaCode });


  const handlePrint = () => {
    console.log("Vendorsessoinform: Print button clicked.");
    window.print();
  };

  const handleAreaSelected = (selectedCode) => {
    console.log("Vendorsessoinform: Area selected from dialog:", selectedCode);
    setSelectedAreaCode(selectedCode);
    setUserCode(selectedCode); // Assuming 'Select Area' populates 'User Code'
    setShowDialog(false);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-900">
          Vendor Session List
        </h1>
        <div className="flex justify-end space-x-2 sm:space-x-4 ">
          <button
            onClick={handleRefresh}
            className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer"
          >
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => handlePrint()}
            className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer"
          >
            <span className="hidden sm:inline">Print</span>
          </button>
          <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px] hover:cursor-pointer">
            <span className="hidden sm:inline">Excel</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl text-left ml-1 mb-14 space-y-8">
        <section className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">User Code</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                value={userCode}
                onChange={(e) => {
                  console.log("Vendorsessoinform: User Code input changed:", e.target.value);
                  setUserCode(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date From</label>
              <input
                type="date"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                value={dateFrom}
                onChange={(e) => {
                  console.log("Vendorsessoinform: Date From input changed:", e.target.value);
                  setDateFrom(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date To</label>
              <input
                type="date"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                value={dateTo} // Bound to dateTo state
                onChange={(e) => {
                  console.log("Vendorsessoinform: Date To input changed:", e.target.value);
                  setDateTo(e.target.value); // Update dateTo state
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Status</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                value={status}
                onChange={(e) => {
                  console.log("Vendorsessoinform: Status input changed:", e.target.value);
                  setStatus(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Select Area </label>
              <div className="flex gap-4 flex-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  value={selectedAreaCode}
                  readOnly
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  readOnly
                />

                <button
                  type="button"
                  onClick={() => {
                    console.log("Vendorsessoinform: Opening Select Area dialog.");
                    setShowDialog(true);
                  }}
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center text-sm sm:text-lg w-[50px] hover:cursor-pointer"
                >
                  ...
                </button>

                <button
                  type="button"
                  onClick={() => {
                    console.log("Vendorsessoinform: Clearing selected area code.");
                    setSelectedAreaCode("");
                    setUserCode("");
                  }}
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center w-[50px] hover:cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mt-5 ml-40 bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </section>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <VendorSessiondialogue
              isOpen={showDialog}
              onClose={() => {
                console.log("Vendorsessoinform: Closing Select Area dialog.");
                setShowDialog(false);
              }}
              onSelect={handleAreaSelected}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Vendorsessoinform;