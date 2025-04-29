import React from "react";
import { Plus, RefreshCw, Settings, X } from "lucide-react"; // icons from lucide-react

function Securitycard() {
  return (
    <div className=" max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black">Security Module</h2>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Plus className="text-green-600" size={24} />
        </button>
      </div>

      {/* Card */}
      <div className="bg-gray-100 p-4 rounded-lg  border border-gray-200">
        <div className="flex items-start gap-10">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 flex items-center justify-center rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11097/11097039.png"
              alt="chip"
              className="w-10 h-10 object-contain text-red-500"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              89054310-STS6
            </h3>
            <p className="text-sm text-gray-600 mb-1">10.101.1.27/5100</p>
            <div className="text-sm text-green-600 font-semibold mb-2">
              ACTIVE
            </div>
            <p className="text-sm text-gray-600">89054310</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 mt-4">
          <button className="text-blue-500 hover:text-blue-700">
            <RefreshCw size={20} />
          </button>
          <button className="text-blue-600 hover:text-blue-800">
            <div className="w-5 h-5 bg-blue-400 rounded-full" />
          </button>
          <button className="text-green-500 hover:text-green-700">
            <Settings size={20} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Securitycard;
