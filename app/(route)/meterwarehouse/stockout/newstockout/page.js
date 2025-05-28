"use client";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Stockindialogue from "@/app/components/Stockindialogue";
import Link from "next/link";
function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const handleReload = () => {
    window.location.reload();
  };
  const handleSubmit = () => {
    router.push("/stockin");
  };
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-1xl mx-auto space-y-8 ml-8">
        {/* Section Header */}
        <h1 className="text-xl font-semibold text-gray-900">New Stock Out</h1>
        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Date</label>
            <input
              type="date"
              className="w-48 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Type</label>
            <select
              className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              defaultValue=""
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="stock-in">Stock In</option>
              <option value="stock-out">Stock Out</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Relevant Code</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Handler</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50 "
            />
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Warehouse</label>
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
                  className="bg-[#FF9900] text-white px-2 sm:px-3 py-2 rounded-md hover:bg-[#FF9900] transition flex items-center justify-center text-sm sm:text-lg w-[50px] hover:cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}
                >
                  ...
                </button>
                {isDialogOpen && (
                  <Stockindialogue onClose={() => setIsDialogOpen(false)} />
                )}
                <button
                  type="button"
                  className="bg-[#FF9900] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center w-10 h-10"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Meter Model</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 text-sm text-gray-600">Starting Code</label>
            <input
              type="text"
              className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Starting Code</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
        {/* Recipient Section */}
        <div className="space-y-6 mt-10 text-gray-700">
          {/* Customer Row */}

          {/* Operator Row */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm">Is batch ?</label>
            <input
              type="checkbox"
              className="form-checkbox accent-[#FF9900] hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Branch Quantity</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Expiray Date</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Remarks</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Checker</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Operator</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>{" "}
        <div className="flex items-center">
          <label className="w-40 text-sm text-gray-600">Operation Date</label>
          <input
            type="text"
            className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            placeholder=""
          />
        </div>
      </div>
      <div className="flex flex-col-2 gap-2 mt-10 ml-40">
        <button
          className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer"
          onClick={handleSubmit} // ✅ Also correct
        >
          <span>Submit</span>
        </button>
        <button
          onClick={() => handleReload()}
          className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer"
        >
          <span>Refresh</span>
        </button>
        <Link href={"/meterwarehouse/stockout"}>
          <button className="bg-[#FF9900] text-white px-3 py-2 rounded-md flex items-center gap-2 shadow-md transition w-full sm:w-[120px] justify-center hover:cursor-pointer">
            <span>Return</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
