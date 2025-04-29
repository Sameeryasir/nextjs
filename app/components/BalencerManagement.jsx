import React from "react";
import BalencerTable from "./BalencerTable";

function BalencerManagement() {
  return (
    <div className="min-h-screen bg-white ">
      <div className="flex flex-1 justify-end gap-10">
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          Refresh
        </button>{" "}
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          New
        </button>
      </div>
      <div className="max-w-2xl text-left ml-8 mb-10 space-y-8">
        {/* Customer Information Section */}
        <section className>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Load-Balencer
          </h1>
          <div className="space-y-4">
            {/* Code + Other Code - Unified row */}

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Code</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Description</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors ml-36">
                  Search...
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <BalencerTable />
    </div>
  );
}

export default BalencerManagement;
