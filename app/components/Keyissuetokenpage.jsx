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
import Keypage from "./Keypage";
function Keychangetokenpage() {
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
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Branch</label>
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

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">SGC</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Tarrif</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            {/* Full Name */}

            {/* Meter Num */}
          </div>
        </section>

        {/* Business Information Section */}
        <section>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Information of Repalcement{" "}
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
              <label className="w-32 text-sm text-gray-500">New SGC</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Token Sub Type */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">New Tarrif</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            {/* Remark */}
            <div className="flex items-start gap-4">
              <label className="w-32 text-sm text-gray-500 mt-2">Remark</label>
              <textarea className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 h-24 resize-none" />
            </div>

            {/* Token Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2  ml-40">
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition-colors">
                  Search...
                </button>

                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 transition-colors">
                  Return
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Keypage/>
    </div>
  );
}

export default Keychangetokenpage;
