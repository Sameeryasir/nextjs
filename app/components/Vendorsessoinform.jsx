import React, { useState } from "react";
import { X, Search } from "lucide-react";
import Vendorsessiondialog from "./Vendorsessiondialog";
import Addnew from "./Addnew";
import ReactDOM from "react-dom";
import VendorSessiondialogue from "./Vendorsessiondialogue";

function Vendorsessoinform() {
  const [showDialog, setShowDialog] = useState(false);

  const handlePrint = () => {
    window.print();
  };
  const handleReload=()=>{
    window.location.reload();
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-gray-900">
          Vendor Session List
        </h1>
        <div className="flex justify-end space-x-2 sm:space-x-4 ">
          <button 
          onClick={()=>handleReload()}
          className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer">
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
        {/* Header Row with Title and Action Buttons */}

        {/* Customer Information Section */}
        <section className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">User Code</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date From</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date To</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Status</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Select Area </label>
              <div className="flex gap-4 flex-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />

                <button
                  type="button"
                  onClick={() => setShowDialog(true)}
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center text-sm sm:text-lg w-[50px] hover:cursor-pointer"
                >
                  ...
                </button>
                {showDialog && (
                  <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <VendorSessiondialogue
                        isOpen={showDialog}
                        onClose={() => setShowDialog(false)}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center w-[50px] hover:cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowDialog(true)}
            className="mt-5 ml-40 bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px] hover:cursor-pointer"
          >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* {showDialog && (
            <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center">
              <div className="bg-gray-100 rounded-xl p-6 shadow-lg max-w-md w-full">
                <div className="flex space-x-4 justify-end">
                  <button
                    className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    onClick={() => setShowDialog(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Vendorsessiondialog />
                <div className="flex justify-end mt-4 gap-3">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="bg-[#01143C] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px] text-center hover:cursor-pointer"
                  >
                    Ok
                  </button>
                  <button
                    onClick={() => setShowDialog(false)}
                    className="bg-[#01143C]px-4  border border-gray-400 hover:bg-gray-100 transition px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:cursor-pointer w-auto sm:w-[110px] text-center"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </section>
      </div>
    </div>
  );
}

export default Vendorsessoinform;
