import React from "react";
export default function SearchProjectModel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed ml-30 inset-0 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg p-6 w-[95%] max-w-6xl relative">
        {/* Close and Minimize Icons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="text-gray-500 hover:text-black text-xl font-bold"
            title="Minimize"
            // onClick={...} you can define this handler if minimize functionality is needed
          >
            −
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Search Projects</h2>

        {/* Filter Form */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-500 text-sm mb-1">Code</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Code"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm mb-1">
              Description
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
              onClick={() => {}}
            >
              Search
            </button>
          </div>
        </div>

        {/* Pagination Info and Controls */}
        <div className="flex items-center gap-2 mb-4">
          <button className="text-lg">◀◀</button>
          <button className="text-lg">◀</button>
          <span>Total 12 Records, Record 1-10, Page 1/2, Turn To Page</span>
          <input
            type="text"
            className="border border-gray-300 rounded p-1 w-16 ml-2"
            placeholder="1"
          />
          <button className="text-green-500 text-2xl">➜</button>
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto border border-gray-300">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="px-2 py-2">Code</th>
                <th className="px-2 py-2">Description</th>
                <th className="px-2 py-2">Project Type</th>
                <th className="px-2 py-2">Pay Method</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-t text-left">
                <td className="px-2 py-2">123456000224456</td>
                <td className="px-2 py-2">Dette Regularization</td>
                <td className="px-2 py-2">First General</td>
                <td className="px-2 py-2">per times(%)</td>
              </tr>
              <tr className="bg-white border-t text-left">
                <td className="px-2 py-2">123456000224456</td>
                <td className="px-2 py-2">Dette Regularization</td>
                <td className="px-2 py-2">First General</td>
                <td className="px-2 py-2">per times(%)</td>
              </tr>
              <tr className="bg-white border-t text-left">
                <td className="px-2 py-2">123456000224456</td>
                <td className="px-2 py-2">Dette Regularization</td>
                <td className="px-2 py-2">First General</td>
                <td className="px-2 py-2">per times(%)</td>
              </tr>
              {/* Add more rows dynamically here */}
            </tbody>
          </table>
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded [w-120px]">
            OK
          </button>
          <button
            onClick={onClose}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
