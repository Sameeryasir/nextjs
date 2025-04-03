"use client";
import React, { useState } from "react";
import { Search, Plus, StopCircle, Menu, ChevronDown } from "lucide-react";
import SearchCustomer from "./SearchCustomer";
import CustomerInformation from "./CustomerInformation";
import PaymentSection from "./PayementSection";
import Homevend from "./Homevend"; // Import your Homevend component

function Vending() {
  const [showHomevend, setShowHomevend] = useState(false);

  return (
    <>
      <div className="bg-blue-50 p-4 flex items-center gap-4 border-b border-blue-100 w-full">
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 rounded-md">
          <Search size={20} />
          <span>Search</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-blue-100 rounded-md"
          onClick={() => setShowHomevend(!showHomevend)}
        >
          <Plus size={20} />
          <span>{showHomevend ? "Hide Vend" : "New Vend"}</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 rounded-md">
          <StopCircle size={20} />
          <span>Stop Session</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 rounded-md">
          <Menu size={20} />
          <span>End Session</span>
        </button>
      </div>

      {showHomevend ? (
        <Homevend />
      ) : (
        <>
          <div className="flex gap-8 p-4 border-t border-b border-gray-200">
            {/* Search Customer - Left Panel */}
            <div className="w-1/3 min-w-[300px] border-r border-gray-200 pr-4">
              <SearchCustomer />
            </div>

            {/* Customer Information - Right Panel */}
            <div className="flex-1 pl-4">
              <CustomerInformation />
            </div>
          </div>
          <PaymentSection />
        </>
      )}
    </>
  );
}

export default Vending;
