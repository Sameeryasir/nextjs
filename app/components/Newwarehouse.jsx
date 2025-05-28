"use client";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Newwarehouse() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/warehouse");
  };
  const handleReload=()=>{
   window.location.reload();
  }
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-1xl mx-auto space-y-8 ml-8">
        {/* Section Header */}
        <h1 className="text-xl font-semibold text-gray-900">Warehouse</h1>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Code</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Department</label>
            <div className="flex gap-4">
              {/* First Input: Value */}
              <input
                type="text"
                className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                placeholder=""
              />

              {/* Second Input: Dropdown for time units */}
              <input
                type="text"
                className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                placeholder=""
              />
              <div className="flex items-center gap-2 ml-2">
                <button
                  type="button"
                  className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
                >
                  <span className="text-lg">...</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Description</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Description</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Contact</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Phone</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Next Time</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>

        {/* Recipient Section */}
        <div className="space-y-6 mt-10 text-gray-700">
          {/* Customer Row */}

          {/* Operator Row */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Share</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>

          {/* Activate Row */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Activate</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-2 gap-2 mt-10 ml-40">
        <button
          onClick={handleSubmit}
          className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer"
        >
          <span>Submit</span>
        </button>
        <button 
        onClick={()=>handleReload()}
        className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
          <span>Refresh</span>
        </button>
        <Link href={"/meterwarehouse/warehouse"}>
          {" "}
          <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
            <span>Return</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Newwarehouse;
