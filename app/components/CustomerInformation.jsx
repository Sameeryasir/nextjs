"use client";
import React from "react";

function CustomerInformation() {
  return (
    <div className="w-full max-w-4xl p-4 bg-white justify-left">
      {/* Tab Navigation */}
      <div className="flex border-b  border-gray-200 mb-6  ">
        <button className="px-4 py-2 font-medium text-black  hover:cursor-pointer">
          Customer Information
        </button>
        <button className="px-4 py-2 font-medium text-black hover:text-black hover:cursor-pointer">
          Fees Details
        </button>
        <button className="px-4 py-2 font-medium text-black hover:text-black hover:cursor-pointer">
          Arrear Details
        </button>
      </div>

      {/* Customer Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Meter Num.</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Code</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Full Name</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Tariff</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Sponsor Amount</p>
            <p className="font-medium">-</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Balance Of Account</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Monthly Purchased</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Time Of Purchase</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Date Of Last Purchase</p>
            <p className="font-medium">-</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">
              Min. Transaction Amount
            </p>
            <p className="font-medium">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerInformation;
