"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  X,
} from "lucide-react";
import Link from "next/link";
function Page() {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Key and License
        </h1>
      
      </div>
      <div className="max-w-7xl text-left mb-14 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                Key
              </label>
              <input
                type="text"
                className="flex-1 p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm font-medium text-gray-700">
                License
              </label>
              <textarea
                rows={5}
                className="flex-1 p-2 h-[150px] border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none overflow-y-auto"
                placeholder="Enter license details..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Register Information
      </h1>
      <div className="mt-10">
        <div className="space-y-4 text-sm text-gray-600 ">
          <div className="flex ">
            <span className="w-40 font-medium">Company Name</span>
            <span>SECDAIS</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Version</span>
            <span>SECDAIS Energy Solutions V1.0.1 (101 Days)</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Database Version</span>
            <span>Internal V1.0.1</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Functions</span>
            <span>ENTERPRISE</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Allow Customers</span>
            <span>Unlimited</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Allow Customers</span>
            <span>Unlimited</span>
          </div>
          <div className="flex">
            <span className="w-40 font-medium">Copyright</span>
            <span className="text-blue-600 font-semibold">
              Copyright 2020–SECDAIS GHANA LIMITED
            </span>
          </div>
        </div>
      </div>
      <div className="ml-40 mt-10 flex  gap-4">
        {" "}
        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
          Register Again
        </button>
        <button
          onClick={() => handleReload()}
          className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Page;
