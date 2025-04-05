"use client";
import React from "react";

const PaymentSection = () => {
  return (
    <div className="space-y-4">
      {/* Payment Info Heading */}
      <div className="px-6 mt-5">
        <h3 className="font-medium text-gray-400">Free To Pay</h3>
        <h3 className="font-medium pt-4">Payment Info</h3>
      </div>

      {/* Payment Sections */}
      <div className="flex justify-between p-6 border-t border-gray-200">
        {/* Left Section */}
        <div className="space-y-4 text-left w-1/3">
          <div className="flex items-center">
            <label className="text-gray-500 w-24">Total Amount</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-40"
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-500 w-24">Payment</label>
            <select className="border  p-2 rounded w-40">
              <option className="text-white bg-gray-800">Cash</option>
              <option className="text-white bg-gray-800">Cheque</option>
              <option className="text-white bg-gray-800">Credit</option>
              <option className="text-white bg-gray-800">Wechat Pay</option>
              <option className="text-white bg-gray-800">
                Accounts Transfer
              </option>
              <option className="text-white bg-gray-800">Account Of Vs</option>
              <option className="text-white bg-gray-800">
                {" "}
                Account Of Customer
              </option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-gray-500 w-24">Stamp Tax</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-40"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 text-left w-1/3">
          <div className="flex items-center">
            <label className="text-gray-500 w-24">Tax</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-40"
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-500 w-24">Stamp Tax</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
