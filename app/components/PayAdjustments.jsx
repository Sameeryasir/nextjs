"use client";

import { useState } from "react";
import { Search, RefreshCw, Plus } from "lucide-react";
import Link from "next/link";

export default function PayArrear() {
  const [formData, setFormData] = useState({
    code: "",
    fullName: "",
    meterNum: "",
    invoice: "",
    arrear: "0.00",
    amount: "",
    paymentType: "Cash",
    stampTax: "",
    totalAmount: "",
    amountReceived: "",
    change: "0.00",
  });

  const handleReload = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log("Search clicked with form data:", formData);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Customer Information</h1>
      </div>

      {/* Form Section */}
      <div className="bg-white max-w-5xl p-4">
        {/* Customer Information Heading */}
      
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 mb-6">
          {/* Code */}
          <div className="flex items-center flex-nowrap">
            <label className="w-32 text-sm text-gray-500">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Full Name */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* Meter Num */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Meter Num</label>
          <input
            type="text"
            name="meterNum"
            value={formData.meterNum}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* Description Dropdown */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Description</label>
          <select
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          >
            <option value="Dette Regularisation">Dette Regularisation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Arrear Details */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Arrear Details</h1>

        {/* Code */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Code</label>
          <input
            type="text"
            name="arrearCode"
            value={formData.arrearCode}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* Project */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Project</label>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* Pay Method */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Pay Method</label>
          <select
            name="payMethod"
            value={formData.payMethod}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          >
            <option value="Par Day">Par Day</option>
            <option value="Monthly">Per Month</option>
              <option value="Monthly">Per Year</option>
                <option value="Monthly">Per Time</option>
                <option value="Monthly">Per Time(%)</option>
                  <option value="Monthly">Per KWh</option>
          </select>
        </div>

        {/* Paying Date */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Paying Date</label>
          <input
            type="date"
            name="payingDate"
            value={formData.payingDate}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* New */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">New</label>
          <input
            type="text"
            name="newField"
            value={formData.newField}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>

        {/* Reference */}
        <div className="flex items-center mb-4">
          <label className="w-32 text-sm text-gray-500">Reference</label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            className="w-100 px-2 py-2 border border-gray-300 rounded-md bg-gray-50"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="flex items-center">
        <button
          onClick={handleSearch}
          className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
        >
          <Search size={16} />
          <span>Search</span>
        </button>
      </div>
    </div>
    </div>
  );
}