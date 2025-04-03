import React from 'react'
function SearchCustomer() {
  return (
    <div className="p-4 bg-white w-full">
      <h2 className="text-lg font-semibold mb-4 text-left">Search Customer</h2>

      <div className="space-y-4 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Meter Num
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
            placeholder="Enter meter number"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Account No
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
            placeholder="Enter account number"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Code
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
            placeholder="Enter code"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1 text-left">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-left"
            placeholder="Enter full name"
          />
        </div>
      </div>

      <button className="mt-8 px-6 py-2 bg-orange-500 text-white rounded-md transition-colors shadow-sm text-left w-auto">
        Identify Customer
      </button>
    </div>
  );
}

export default SearchCustomer