import React from 'react'
import { RefreshCw,Plus } from 'lucide-react';
import Link from 'next/link';
function Page() {
  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Stamp Tax List
          </h1>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-[#e68900] transition text-sm sm:text-base">
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href="/base_information/stamptax/stamptax_info">
              <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-[#e68900] transition text-sm sm:text-base">
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </button>
            </Link>
            <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center justify-center shadow-sm hover:bg-[#e68900] transition text-sm sm:text-base">
              <span className="hidden sm:inline">Activate</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Code</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Apply Time</th>
                <th className="p-2 sm:p-3 text-left">Value Form</th>
                <th className="p-2 sm:p-3 text-left">Value To</th>
                <th className="p-2 sm:p-3 text-left">Type</th>
                <th className="p-2 sm:p-3 text-left">Factor</th>
                <th className="p-2 sm:p-3 text-left">Active</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page