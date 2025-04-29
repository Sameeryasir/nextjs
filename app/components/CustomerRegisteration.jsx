"use client";
import React from "react";
import { X } from "lucide-react";

function CustomerRegisteration({ onClose }) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl bg-gray-100 p-6 rounded-lg shadow-lg">
        {" "}
        {/* Changed max-w-md to max-w-xl */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-base font-normal text-black">
            Customer Registration
          </h2>
          <button
            className="text-black hover:bg-gray-100 rounded-sm p-1 transition-colors"
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
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Aaaaaa Aaaaaaaaa Aaaaaaaa....."
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="code" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="0001014868..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="accountNo" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Account No
            </label>
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              placeholder="95033C..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-x-4">
            <label htmlFor="meterNo" className="text-sm text-black w-1/4">
              {" "}
              {/* Adjusted label width */}
              Meter No
            </label>
            <input
              type="text"
              id="meterNo"
              name="meterNo"
              placeholder="38020466633..."
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-8">
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#001233] text-white text-sm rounded hover:bg-[#001144] transition-colors"
            >
              Ok
            </button>
            <button
              type="button"
              className="px-6 py-1.5 border border-gray-300 text-black text-sm rounded hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegisteration;
