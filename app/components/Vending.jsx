"use client";
import React, { useState } from "react";
import { Search, Plus, StopCircle, MenuIcon } from "lucide-react";
import Payement from "./Payement"; // Assuming this is a static component
import IdentifyCustomerDialog from "../sections/IdentifyCustomerDialog"; // Import the new dialog

function Vending() {
  const [activeTab, setActiveTab] = useState("info");
  const [showIdentifyCustomerDialog, setShowIdentifyCustomerDialog] = useState(false);
  const [identifiedCustomer, setIdentifiedCustomer] = useState(null); // State to store identified customer data

  console.log("Vending: Component rendered.");

  const handleIdentifyCustomerClick = () => {
    console.log("Vending: 'Identify Customer' button clicked. Opening dialog.");
    setShowIdentifyCustomerDialog(true);
  };

  // NEW: Handler for the top "Search" button
  const handleTopSearchClick = () => {
    console.log("Vending: Top 'Search' button clicked. Opening dialog.");
    setShowIdentifyCustomerDialog(true);
  };

  const handleCustomerIdentified = (customerData) => {
    console.log("Vending: Customer identified from dialog:", customerData);
    setIdentifiedCustomer(customerData);
    setShowIdentifyCustomerDialog(false); // Close the dialog
    // Here you would populate your Vending form fields with customerData
    // Example: updateMeterNum(customerData.MeterNum), etc.
    // For now, let's just log it and close the dialog
  };

  return (
    <div className="bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-blue-50 p-4 flex items-center gap-4 border-b border-gray-200">
        <button
          className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-md"
          onClick={handleTopSearchClick} // Connect the top search button to open the dialog
        >
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
            <form className="space-y-1.5" onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Meter Num
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  // You would bind this input to a state variable (e.g., meterNumSearch)
                  // and pass that to the dialog's initial search term if desired.
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
                type="button" // Change to type="button" to prevent form submission, let onClick handle dialog
                onClick={handleIdentifyCustomerClick}
                className="w-[160px] bg-orange-500 text-white px-2 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Identify Customer
              </button>
            </form>
            {identifiedCustomer && (
              <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200 text-green-800">
                Customer Identified: {identifiedCustomer.MeterNum} ({identifiedCustomer.ID} - {identifiedCustomer.FullName})
              </div>
            )}
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
                  <div className="text-gray-900">{identifiedCustomer?.MeterNum || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Code
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.Code || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.FullName || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Tariff
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.TariffName || identifiedCustomer?.TariffCode || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Sponsor Amount
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.SponsorAMT || "-"}</div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Balance Of Account
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.AccBalance || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Monthly Purchased
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.TotalKWh || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Time Of Purchase
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.LastVendTime || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Date Of Last Purchase
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.LastVendDate || "-"}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">
                    Min. Transaction Amount
                  </label>
                  <div className="text-gray-900">{identifiedCustomer?.MinAMT || "-"}</div>
                </div>
              </div>
            </div>

            {/* Bottom Sections */}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-2">
          <div>
            <h3 className="text-lg text-left pl-34">Vending Details</h3>
          </div>
          <div>
            <h3 className="text-lg text-left">Arrear To Pay</h3>
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

      {/* Identify Customer Dialog */}
      <IdentifyCustomerDialog
        isOpen={showIdentifyCustomerDialog}
        onClose={() => setShowIdentifyCustomerDialog(false)}
        onSelect={handleCustomerIdentified}
      />
    </div>
  );
}

export default Vending;
