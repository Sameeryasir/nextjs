"use client";
import React, { useState, useEffect } from "react"; // Added useEffect for potential side effects or data processing
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Meterviewerdialogue({ onClose, meterData }) {
  // Initialize form data from meterData prop, or empty if no data is provided
  const [formData, setFormData] = useState({
    meterNum: meterData?.MeterNum || "",
    sgc: meterData?.SGC || "",
    tariff: meterData?.ModelName || "", // Assuming ModelName can act as Tariff or is a placeholder
    krn: meterData?.RegCode || "", // Using RegCode for KRN as a placeholder
    ken: "", // Not found in API response, leaving empty
    ea: "", // Not found in API response, leaving empty
    baseTime: meterData?.LastDate || "", // Using LastDate for Base Time
    prodDate: meterData?.ProdDate || "",
    expiryDate: meterData?.ExpiryDate || "",
    stockName: meterData?.StockName || "",
    statusName: meterData?.StatusName || "",
    ti: meterData?.TI || "",
    initValue: meterData?.InitValue || "",
    maxPower: meterData?.MaxPower || "",
    modelCode: meterData?.ModelCode || "",
    stockCode: meterData?.StockCode || "",
    repairNo: meterData?.RepairNo || "",
  });

  console.log("Meterviewerdialogue: Component rendered. meterData:", meterData);

  // Update form data if meterData prop changes (e.g., if dialog is reused for different meters)
  useEffect(() => {
    setFormData({
      meterNum: meterData?.MeterNum || "",
      sgc: meterData?.SGC || "",
      tariff: meterData?.ModelName || "",
      krn: meterData?.RegCode || "",
      ken: "",
      ea: "",
      baseTime: meterData?.LastDate || "",
      prodDate: meterData?.ProdDate || "",
      expiryDate: meterData?.ExpiryDate || "",
      stockName: meterData?.StockName || "",
      statusName: meterData?.StatusName || "",
      ti: meterData?.TI || "",
      initValue: meterData?.InitValue || "",
      maxPower: meterData?.MaxPower || "",
      modelCode: meterData?.ModelCode || "",
      stockCode: meterData?.StockCode || "",
      repairNo: meterData?.RepairNo || "",
    });
  }, [meterData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Meterviewerdialogue: Input changed -", name, ":", value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meterviewerdialogue: Form submitted with data:", formData);
    // Here you would typically send updated data to an API
    onClose(); // Close the dialog on submit
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-[700px] rounded-lg shadow-xl max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Meter Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {/* Meter Num */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Meter Num
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly // Make read-only if it's just for display
              />
            </div>

            {/* SGC */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                SGC
              </label>
              <input
                type="text"
                name="sgc"
                value={formData.sgc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Tarrif (using ModelName as placeholder) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Tariff
              </label>
              <input
                type="text"
                name="tariff"
                value={formData.tariff}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* KRN (using RegCode as placeholder) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                KRN
              </label>
              <input
                type="text"
                name="krn"
                value={formData.krn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* KEN */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                KEN
              </label>
              <input
                type="text"
                name="ken"
                value={formData.ken}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* EA */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                EA
              </label>
              <input
                type="text"
                name="ea"
                value={formData.ea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Base Time */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Base Time
              </label>
              <input
                type="text"
                name="baseTime"
                value={formData.baseTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

             {/* Prod. Date */}
             <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Prod. Date
              </label>
              <input
                type="text"
                name="prodDate"
                value={formData.prodDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Expiry Date */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Warehouse (StockName) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Warehouse
              </label>
              <input
                type="text"
                name="stockName"
                value={formData.stockName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Status (StatusName) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Status
              </label>
              <input
                type="text"
                name="statusName"
                value={formData.statusName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* TI */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                TI
              </label>
              <input
                type="text"
                name="ti"
                value={formData.ti}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Init Value (from AMRModel) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Init Value
              </label>
              <input
                type="text"
                name="initValue"
                value={formData.initValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Max Power (from AMRModel) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Max Power
              </label>
              <input
                type="text"
                name="maxPower"
                value={formData.maxPower}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Model Code */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Model Code
              </label>
              <input
                type="text"
                name="modelCode"
                value={formData.modelCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Stock Code */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Stock Code
              </label>
              <input
                type="text"
                name="stockCode"
                value={formData.stockCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>

            {/* Repair No */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
              <label className="block text-gray-700 text-sm sm:text-base font-medium sm:col-span-2">
                Repair No
              </label>
              <input
                type="text"
                name="repairNo"
                value={formData.repairNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 sm:col-span-3"
                readOnly
              />
            </div>


          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
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
