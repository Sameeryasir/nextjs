"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import VendorSessiondialogue from "./Vendorsessiondialogue";
import Messegedialogue from "./Messegedialogue";

function Newsubscription() {
  const [showDialog, setShowDialog] = useState(false);
const handleRefresh=()=>{
    window.location.reload()
}
  return (
    <>
      <div className="pl-10 mx-auto space-y-8 p-4">
        {/* Section Header */}
        <h1 className="text-xl font-semibold text-gray-900">
          Message Subscription
        </h1>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center">
            <label htmlFor="code" className="w-40 text-sm text-gray-600">
              Code
            </label>
            <input
              id="code"
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="description" className="w-40 text-sm text-gray-600">
              Description
            </label>
            <select
              id="description"
              defaultValue=""
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            >
              <option value="" disabled hidden>
                Default
              </option>
              <option value="Header office 1">Header office 1</option>
              <option value="Administrator">Administrator</option>
              <option value="Vending">Vending</option>
              <option value="Client Service">Client Service</option>
              <option value="Vent">Vent</option>
              <option value="Cassirier">Cassirier</option>
              <option value="Ouni">Ouni</option>
            </select>

            <div className="flex items-center gap-2 ml-2">
              <button
                type="button"
                onClick={() => setShowDialog(true)}
                className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
              >
                <span className="text-lg">...</span>
              </button>
              {showDialog && (
                <div className="fixed inset-0 z-50 bg-transparent bg-opacity-40 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <Messegedialogue
                      isOpen={showDialog}
                      onClose={() => setShowDialog(false)}
                    />
                  </div>
                </div>
              )}
              <button
                type="button"
                className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="subscriptionType"
              className="w-40 text-sm text-gray-600"
            >
              Subscription Type
            </label>
            <input
              id="subscriptionType"
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              onClick={() => setshowmessege(true)}
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="startupTime" className="w-40 text-sm text-gray-600">
              Startup Time
            </label>
            <input
              id="startupTime"
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="parameters" className="w-40 text-sm text-gray-600">
              Parameters
            </label>
            <input
              id="parameters"
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Cycle</label>
            <div className="flex gap-4">
              <input
                type="text"
                className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                placeholder="Enter value"
              />
              <select className="w-40 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900]">
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="nextTime" className="w-40 text-sm text-gray-600">
              Next Time
            </label>
            <input
              id="nextTime"
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>

        {/* Recipient Section */}
        <div className="space-y-6 mt-10 text-gray-700">
          <div className="flex items-start gap-4">
            <label className="w-40 text-sm pt-1">Recipient</label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Customer</span>
              </label>
              <span className="text-sm">Notice Type:</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>MSG</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Email</span>
              </label>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <label className="w-40 text-sm" />
            <div className="flex items-center gap-4 flex-wrap">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Operator</span>
              </label>
              <span className="text-sm ml-1.5">Notice Type:</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>MSG</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
                />
                <span>Email</span>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Activate</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-10 ml-40">
        <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Submit</span>
        </button>
        <button
          onClick={() => handleRefresh()}
          className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer"
        >
          <span>Refresh</span>
        </button>
        <Link href={"/messegesubscription"}>
          <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
            <span>Return</span>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Newsubscription;
