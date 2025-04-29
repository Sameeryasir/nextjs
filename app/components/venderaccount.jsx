import React from "react";
import { ChevronDown } from "lucide-react";
import Venderaccounttable from "./venderaccounttable";
function Venderaccount() {
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-2xl text-left ml-8 mb-10 space-y-8">
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
            Arrear Details
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Code</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Pay Method</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">New</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Refrence</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Remark */}

            {/* Token Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition-colors ml-36">
                  Search...
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Venderaccounttable />
    </div>
  );
}

export default Venderaccount;
