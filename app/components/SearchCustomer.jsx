import React from "react";

function SearchCustomer() {
  return (
    <div className="bg-white w-sm p-4.5">
      <h2 className="text-lg font-semibold mb-2 text-left">Search Customer</h2>

      <div className="space-y-3 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Meter Num
          </label>
          <input
            type="text"
            className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left text-sm"
            placeholder=""
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Account No
          </label>
          <input
            type="text"
            className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left text-sm"
            placeholder=""
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Code
          </label>
          <input
            type="text"
            className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left text-sm"
            placeholder=""
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left text-sm"
            placeholder=""
          />
        </div>
      </div>

      <div className="flex justify-left mt-3">
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md text-sm shadow-sm hover:brightness-95 transition-colors">
          Identify Customer
        </button>
      </div>
    </div>
  );
}

export default SearchCustomer;
