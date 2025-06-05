import Link from 'next/link';
import React from 'react'

function Page() {
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-1xl mx-auto space-y-8 ml-8">
        {/* Section Header */}
        <h1 className="text-xl font-semibold text-gray-900">Stamp Tax Info</h1>

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
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Apply Time</label>
            <input
              type="time"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Value Form</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Value To</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600"> Type</label>
            <select className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#FF9900]">
              <option value="">Select payment type</option>
              <option value="Per Time(x)">Fixed</option>
              <option value="Per day">Percent</option>
            </select>
          </div>
        </div>

        {/* Recipient Section */}
        <div className="space-y-6 mt-10 text-gray-700">
          {/* Customer Row */}

          {/* Operator Row */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Active</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>

          {/* Activate Row */}
        </div>
      </div>
      <div className="flex flex-col-2 gap-2 mt-10 ml-48">
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Submit</span>
        </button>
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Refresh</span>
        </button>{" "}
        <Link href='/base_information/stamptax'>
          <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
            <span>Return</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Page