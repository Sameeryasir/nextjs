import React from 'react'

function page() {
  const handlerelaod=()=>{}
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
        <section className>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Registration
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Telephone</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Tax</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Zip Code</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Contact address
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Website</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Email</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Bank</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Bank Account</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>
          <div className="flex  gap-10 mt-10 justify-center">
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              Submit
            </button>
            <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              Refresh
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default page