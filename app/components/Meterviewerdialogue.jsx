"use client";
import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
function Meterviewerdialogue({onClose}) {
  const [formData, setFormData] = useState({
    fullName: "",
    code: "",
    accountNo: "",
    meterNum: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-[700px] rounded-lg shadow-xl max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
        onClick={onClose}
        className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700">
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Meter Details</h2>

        <form className="space-y-4">
          <div className="space-y-4">
            {/* Meter Num */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Meter Num
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* SGC */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                SGC
              </label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* Tarrif */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Tarrif
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* KRN */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                KRN
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* KEN */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                KEN
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* EA */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                EA
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>

            {/* Base Time */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Base Time
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Meterviewerdialogue;
