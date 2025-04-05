"use client";
import React, { useState } from "react";
import { Search, Plus, StopCircle, Menu, ChevronDown } from "lucide-react";
import SearchCustomer from "./SearchCustomer";
import CustomerInformation from "./CustomerInformation";
import PaymentSection from "./PayementSection";
import Homevend from "./Homevend";

function Vending() {
  const [showHomevend, setShowHomevend] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-blue-50 p-2 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-4 border-b border-blue-100 w-full">
        <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-md hover:cursor-pointer">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <button
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-green-600 hover:bg-blue-100 rounded-md hover:cursor-pointer"
          onClick={() => setShowHomevend(!showHomevend)}
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{showHomevend ? "Hide Vend" : "New Vend"}</span>
        </button>
        <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-md hover:cursor-pointer">
          <StopCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Stop Session</span>
        </button>
        <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 hover:bg-blue-100 rounded-md hover:cursor-pointer">
          <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">End Session</span>
        </button>
      </div>

      {showHomevend ? (
        <Homevend />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 border-t border-b border-gray-200">
            {/* Search Customer - Left Panel */}
            <div className="w-full md:w-1/3 lg:min-w-[300px] border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-3 p-4 md:p-0">
              <SearchCustomer />
              <div className="mt-4 md:mt-19 text-sm md:text-base text-black pl-2 md:pl-5">
                Vending Details
              </div>
            </div>

            {/* Customer Information - Right Panel */}
            <div className="flex-1 p-4 md:pl-4">
              <CustomerInformation />
              <div className="mt-4 md:mt-8 text-sm md:text-base text-center">
                Arrear To Pay
              </div>
            </div>
          </div>
          <PaymentSection />
        </>
      )}
    </>
  );
}

export default Vending;
