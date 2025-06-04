import React from 'react'
import { X } from 'lucide-react';
function Addkeyword({ onClose }) {
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add New</h2>

        <form className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-gray-700 text-sm sm:text-base font-medium">
                File Name
              </label>
              <input
                type="text"
                name="fullName"
                className="w-72 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-gray-700 text-sm sm:text-base font-medium">
                Key Word
              </label>
              <input
                type="text"
                name="accountNo"
                className="w-72 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-gray-700 text-sm sm:text-base font-medium">
                Description
              </label>
              <input
                type="text"
                name="code"
                className="w-72 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-6">
            <button
              onClick={onClose}
              type="button"
              className="px-4 sm:px-6 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addkeyword