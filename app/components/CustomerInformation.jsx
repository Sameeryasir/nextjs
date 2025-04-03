"use client";
import React from "react";

function CustomerInformation() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
          Customer Information
        </button>
        <button className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
          Fees Details
        </button>
        <button className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
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

      {/* Arrear To Pay Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium mb-2 text-center">Arrear To Pay</h3>
        {/* Content for Arrear To Pay would go here */}
      </div>
    </div>
  );
}

export default CustomerInformation;
