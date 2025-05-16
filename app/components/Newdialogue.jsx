import React from "react";
import { X } from "lucide-react";
function Newdialogue({onClose}) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow-lg">
        {" "}
        {/* Changed max-w-md to max-w-xl */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base font-normal text-black">
            Add Balencer
          </h2>
          <button
            className="text-black hover:bg-gray-100 rounded-sm p-1 transition-colors hover:cursor-pointer"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>
        <form className="space-y-5">
          <div className="flex items-center gap-x-4">
            <label htmlFor="fullName" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Code
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="code" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Description
            </label>
            <input
              type="text"
              id="code"
              name="code"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="accountNo" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              IP
            </label>
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="meterNo" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Port
            </label>
            <input
              type="text"
              id="meterNo"
              name="meterNo"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-x-4">
            <label htmlFor="meterNo" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Remarks
            </label>
            <input
              type="text"
              id="meterNo"
              name="meterNo"
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-8">
            <button
              type="submit"
              className="hover:cursor-pointer px-6 py-1.5 bg-[#001233] text-white text-sm rounded hover:bg-[#001144] transition-colors"
            >
              Ok
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-1.5 border border-gray-300 text-black text-sm rounded hover:bg-gray-50 hover:cursor-pointer transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Newdialogue;
