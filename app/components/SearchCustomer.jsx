"use client";
import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import SearchByHistory from "./SearchByHistory";
import CustomerRegisteration from "./CustomerRegisteration";
const mockCustomers = [
  {
    id: "1",
    fullName: "John Doe",
    accountNo: "ACC001",
    meterNum: "MTR001",
    status: "active",
    lastReading: "1234.5 kWh",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    accountNo: "ACC002",
    meterNum: "MTR002",
    status: "active",
    lastReading: "2345.6 kWh",
  },
  {
    id: "3",
    fullName: "Robert Johnson",
    accountNo: "ACC003",
    meterNum: "MTR003",
    status: "inactive",
    lastReading: "3456.7 kWh",
  },
];

function SearchCustomer() {
  const [searchParams, setSearchParams] = useState({
    fullName: "",
    accountNo: "",
    meterNum: "",
  });

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [showSearchByHistory, setShowSearchByHistory] = useState(false);

  const handleOpen = () => setShowSearchByHistory(true);
  const handleClose = () => setShowSearchByHistory(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex items-left gap-3 mb-10">
        <h1 className="text-xl font-bold text-gray-900">Customer List</h1>
      </div>

      <div className="">
        <div className="max-w-7xl pl-10">
          {/* Search Form */}
          <div className=" mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Searching Condition
            </h2>
            <div className="space-y-4">
              {" "}
              {/* Vertical spacing between rows */}
              {/* First row - Full Name */}
              <div className="space-y-4 w-full max-w-2xl">
                {" "}
                {/* Container with max width */}
                {/* Full Name */}
                <div className="flex items-center w-full">
                  <label className="text-sm font-medium text-gray-700 w-32 mr-4">
                    {" "}
                    {/* Fixed width label */}
                    Full Name:
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={searchParams.fullName}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                {/* Account No */}
                <div className="flex items-center w-full">
                  <label className="text-sm font-medium text-gray-700 w-32 mr-4">
                    Account No:
                  </label>
                  <input
                    type="text"
                    name="accountNo"
                    value={searchParams.accountNo}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter account number"
                  />
                </div>
                {/* Meter Num */}
                <div className="flex items-center w-full">
                  <label className="text-sm font-medium text-gray-700 w-32 mr-4">
                    Meter Num:
                  </label>
                  <input
                    type="text"
                    name="meterNum"
                    value={searchParams.meterNum}
                    onChange={handleSearch}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2"
                    placeholder="Enter meter number"
                  />
                </div>
              </div>
            </div>
            <div className="mt-7 flex ml-20 gap-6 ">
              <button className="hover:cursor-pointer flex  px-6 py-2.5 bg-[#FF9900] text-white rounded-md focus:outline-none focus:ring-2  focus:ring-offset-2">
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
              <button className="hover:cursor-pointer flex items-center px-6 py-2.5 bg-[#FF9900] text-white rounded hover:bg-[#FF8800] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleOpen}> Search By History Installed
              </button>

              {showSearchByHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent ">
                  <div className=" max-w-4xl max-h-[90vh]">
                    <SearchByHistory onClose={handleClose} />
                  </div>
                </div>
              )}
              {/* Register Customer Button */}
              <div className="text-right">
                <button
              className="hover:cursor-pointer flex items-center px-6 py-2.5 bg-[#FF9900] text-white rounded hover:bg-[#FF8800] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setShowForm(true)}
                >
                  Register Customer
                </button>
              </div>

              {/* Registration Form */}
              {showForm && (
                <CustomerRegisteration onClose={() => setShowForm(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCustomer;
