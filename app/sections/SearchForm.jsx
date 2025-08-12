"use client";
import React, { useState } from 'react';
import { Search, UserPlus, History } from 'lucide-react';

const SearchCustomer = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    refCode: "",
    number: "",
    branchCode: "",
    priceCode: "",
    modelCode: "",
    installed: "",
    cancelled: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-4 border-b">Searching Condition</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={searchParams.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="refCode" className="mb-1 text-sm font-medium text-gray-700">Account No:</label>
            <input
              type="text"
              id="refCode"
              name="refCode"
              placeholder="Enter account number"
              value={searchParams.refCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="number" className="mb-1 text-sm font-medium text-gray-700">Meter Num:</label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="Enter meter number"
              value={searchParams.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#000D35] text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => console.log('Search By History Installed clicked')}
          >
            <History className="w-4 h-4 mr-2" />
            Search By History Installed
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#FF9900] text-white font-medium rounded-md hover:brightness-105 transition-colors"
            onClick={() => console.log('Register Customer clicked')}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Register Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchCustomer;
