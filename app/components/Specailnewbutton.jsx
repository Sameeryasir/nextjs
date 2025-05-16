import React from 'react'
import Link from 'next/link';
function Specailnewbutton() {
  return (
    <div className="bg-white p-6">
      {/* Header Row with Title and Action Buttons */}
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl font-medium text-gray-900 mb-4">Base Info</h1>
      </div>

      <div className="max-w-2xl text-left mb-14 space-y-8">
        {/* Customer Information Section */}

        <section className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Meter Num</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Date </label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Token</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Remarks</label>
              <input
                type="text"
                className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </section>
        <div className="ml-40 flex space-x-2">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-30">
            Search
          </button>
          <button 
          className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-30">
            Refresh
          </button>
          <Link href={"/specialtoken"}>
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-30">
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Specailnewbutton