"use client";
import React, { useState } from "react";
import { Search, Plus, StopCircle, MenuIcon } from "lucide-react";
import Payement from "./Payement";

function Vending() {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className=" bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-blue-50  p-4 flex items-center gap-4 border-b] border-gray-200">
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-md">
          <Search size={20} />
          <span>Search</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-blue-100 rounded-md">
          <Plus size={20} />
          <span>New Vend</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-md">
          <StopCircle size={20} />
          <span>Stop Session</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-md">
          <MenuIcon size={20} />
          <span>End Session</span>
        </button>
      </div>

      <div className="container mx-auto mt-1.5">
        <div className="grid grid-cols-3 gap-15">
          {/* Search Customer Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Search Customer</h2>
            <form className="space-y-1.5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Meter Num
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Account No
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-[160px] bg-orange-500 text-white px-2 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Identify Customer
              </button>
            </form>
          </div>

          {/* Customer Information Section */}
          <div className="col-span-2">
            <div className="mb-6">
              <nav className="flex gap-4 border-b border-gray-200">
                <button
                  className={`px-4 py-2 ${
                    activeTab === "info"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("info")}
                >
                  Customer Information
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "fees"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("fees")}
                >
                  Fees Details
                </button>
                <button
                  className={`px-4 py-2 ${
                    activeTab === "arrear"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("arrear")}
                >
                  Arrear Details
                </button>
              </nav>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Meter Num.
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Code
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Tariff
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Sponsor Amount
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Balance Of Account
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Monthly Purchased
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Time Of Purchase
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Date Of Last Purchase
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Min. Transaction Amount
                  </label>
                  <div className="text-gray-900">-</div>
                </div>
              </div>
            </div>

            {/* Bottom Sections */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-2">
          <div>
            <h3 className="text-lg  text-left pl-34">Vending Details</h3>
          </div>
          <div>
            <h3 className="text-lg  text-left">Arrear To Pay</h3>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {/* Payment Info Heading */}
        <div className="justify-between px-6 border-t border-gray-200 ">
          <h3 className="font-medium text-gray-400">Free To Pay</h3>
          <h3 className="font-medium pt-4">Payment Info</h3>
        </div>

        {/* Payment Sections */}
        <Payement />
      </div>
    </div>
  );
}

export default Vending;
