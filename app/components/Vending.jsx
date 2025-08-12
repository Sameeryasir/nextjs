"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, StopCircle, MenuIcon, X } from "lucide-react";
import Payement from "./Payement"; 
import IdentifyCustomerDialog from "../sections/IdentifyCustomerDialog";
import { apiFetcher } from "../utils/apiFetcher"; // Ensure path is correct

// A simple modal component for showing API errors
const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4 text-red-600">API Error</h2>
      <p className="mb-4 break-words">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 w-full"
      >
        Close
      </button>
    </div>
  </div>
);


function Vending() {
  const router = useRouter();

  // State for search form inputs
  const [searchParams, setSearchParams] = useState({
    meterNum: "",
    accountNo: "", // Corresponds to refCode in the API
    code: "",
    name: "",
  });

  // State for API data, loading, and errors
  const [customerData, setCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // State for UI control
  const [activeTab, setActiveTab] = useState("info");
  const [showIdentifyCustomerDialog, setShowIdentifyCustomerDialog] = useState(false);

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // Handler for the "Identify Customer" button
  const handleIdentifyCustomer = async () => {
    // Check if at least one field is filled
    if (Object.values(searchParams).every(val => val.trim() === '')) {
        alert("Please fill at least one search field.");
        return;
    }

    setIsLoading(true);
    setApiError(null);
    setCustomerData(null);

    const payload = new URLSearchParams();
    payload.append("ACTION", "53");
    payload.append("meterNum", searchParams.meterNum);
    payload.append("refCode", searchParams.accountNo); // Map UI to API field name
    payload.append("code", searchParams.code);
    payload.append("name", searchParams.name);

    try {
        const data = await apiFetcher("/api/customer-exchange", "POST", payload, router);
        
        if (data.state !== 0 && data.state !== "0") { // Handle both number and string states
            throw new Error(data.message || "Customer could not be identified.");
        }
        
        setCustomerData(data); // Assuming success response is the customer object

    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  // Handler for receiving data from the search dialog
  const handleCustomerIdentifiedFromDialog = (customer) => {
    setCustomerData(customer);
    setShowIdentifyCustomerDialog(false);
    // Optionally pre-fill search fields from dialog selection
    setSearchParams({
        meterNum: customer.MeterNum || "",
        accountNo: customer.RefCode || "",
        code: customer.Code || "",
        name: customer.FullName || ""
    });
  };

  return (
    <div className="bg-white">
      {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
      {/* Top Navigation Bar */}
      <div className="bg-blue-50 p-4 flex items-center gap-4 border-b border-gray-200">
        <button
          className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-md"
          onClick={() => setShowIdentifyCustomerDialog(true)}
        >
          <Search size={20} />
          <span>Search</span>
        </button>
        {/* Other top buttons */}
      </div>

      <div className="container mx-auto mt-1.5 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Search Customer Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-4">Search Customer</h2>
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); handleIdentifyCustomer(); }}>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Meter Num</label>
                <input
                  type="text"
                  name="meterNum"
                  value={searchParams.meterNum}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Account No</label>
                <input
                  type="text"
                  name="accountNo"
                  value={searchParams.accountNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Code</label>
                <input
                  type="text"
                  name="code"
                  value={searchParams.code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={searchParams.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-[160px] bg-orange-500 text-white px-2 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? 'Identifying...' : 'Identify Customer'}
              </button>
            </form>
            
            {/* API Feedback Section */}
            <div className="mt-4">
                {customerData && !apiError && (
                    <div className="p-3 bg-green-50 rounded-md border border-green-200 text-green-800">
                        Customer Identified: {customerData.FullName} ({customerData.Code})
                    </div>
                )}
            </div>
          </div>

          {/* Customer Information Section */}
          <div className="col-span-2">
            <div className="mb-6">
              <nav className="flex gap-4 border-b border-gray-200">
                <button
                  className={`px-4 py-2 ${activeTab === "info" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                  onClick={() => setActiveTab("info")}
                >
                  Customer Information
                </button>
                {/* Other tabs */}
              </nav>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <InfoItem label="Meter Num." value={customerData?.MeterNum} />
                <InfoItem label="Balance Of Account" value={customerData?.AccBalance} />
                <InfoItem label="Code" value={customerData?.Code} />
                <InfoItem label="Monthly Purchased" value={customerData?.TotalKWh} />
                <InfoItem label="Full Name" value={customerData?.FullName} />
                <InfoItem label="Time Of Purchase" value={customerData?.LastVendTime} />
                <InfoItem label="Tariff" value={customerData?.TariffName || customerData?.TariffCode} />
                <InfoItem label="Date Of Last Purchase" value={customerData?.LastVendDate} />
                <InfoItem label="Sponsor Amount" value={customerData?.SponsorAMT} />
                <InfoItem label="Min. Transaction Amount" value={customerData?.MinAMT} />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
            <div className="grid grid-cols-2 gap-10">
                <h3 className="text-lg font-semibold">Vending Details</h3>
                <h3 className="text-lg font-semibold">Arrear To Pay</h3>
            </div>
            <div className="border-t border-gray-200 mt-2 pt-4">
                 <h3 className="font-semibold text-gray-800">Payment Info</h3>
                 <Payement />
            </div>
        </div>
      </div>
      
      <IdentifyCustomerDialog
        isOpen={showIdentifyCustomerDialog}
        onClose={() => setShowIdentifyCustomerDialog(false)}
        onSelect={handleCustomerIdentifiedFromDialog}
      />
    </div>
  );
}

// Helper component for displaying customer info items
const InfoItem = ({ label, value }) => (
    <div>
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
        <div className="text-gray-900 font-medium h-6">{value || "-"}</div>
    </div>
);

export default Vending;
