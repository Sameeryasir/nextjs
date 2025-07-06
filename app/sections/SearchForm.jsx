// components/SearchCustomer.jsx
"use client"; // This is a client component

import React, { useState } from 'react';

// This component receives the `onSearch` prop from Content.jsx
const SearchCustomer = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: "",      // For Full Name
    refCode: "",   // For Account No
    number: "",    // For Meter Num
    // These remain empty as they don't have dedicated inputs in the visible form
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
    // Call the onSearch prop (which is fetchTableData in Content.jsx)
    // with the current search parameters.
    onSearch(searchParams);
  };

  return (
    // Reverted to original CSS structure for the search section
    <div className="p-2 md:p-6"> {/* Keep this padding consistent with Content.jsx outer div */}
      <div className="bg-white rounded-lg shadow mb-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">Searching Condition</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <label htmlFor="name" className="w-32 text-gray-700 font-medium">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name" // Matches the 'name' field for formData
                placeholder="Enter full name"
                value={searchParams.name}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <label htmlFor="refCode" className="w-32 text-gray-700 font-medium">Account No:</label>
              <input
                type="text"
                id="refCode"
                name="refCode" // Matches the 'refCode' field for formData
                placeholder="Enter account number"
                value={searchParams.refCode}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4"> {/* mb-4 for space before buttons */}
              <label htmlFor="number" className="w-32 text-gray-700 font-medium">Meter Num:</label>
              <input
                type="text"
                id="number"
                name="number" // Matches the 'number' field for formData
                placeholder="Enter meter number"
                value={searchParams.number}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-4"> {/* Buttons container */}
              <button
                type="submit" // This button will trigger the form submission
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center"
              >
                Search
              </button>
              <button
                type="button" // Use type="button" to prevent form submission for these
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                onClick={() => console.log('Search By History Installed clicked')} // Placeholder for other button actions
              >
                Search By History Installed
              </button>
              <button
                type="button" // Use type="button" to prevent form submission for these
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                onClick={() => console.log('Register Customer clicked')} // Placeholder for other button actions
              >
                Register Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchCustomer;