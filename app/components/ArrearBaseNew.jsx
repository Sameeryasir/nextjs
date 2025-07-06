"use client";

import { useState } from 'react';
import BranchPopup from './ArrearBranchPopup'; // Import the BranchPopup component

export default function ArrearBaseNew() {
  const [showBranchPopup, setShowBranchPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState({
    code: '',
    description: ''
  });

  console.log("ArrearBaseNew: Component rendered.");

  // This function is now called when the OK button in the popup is clicked
  const handleBranchSelect = (branch) => {
    console.log("ArrearBaseNew: Branch selected from popup (via OK button):", branch);
    setSelectedBranch({
      code: branch.Code, // Assuming API response has 'Code'
      description: branch.Name || branch.Description // Assuming API response has 'Name' or 'Description'
    });
    setShowBranchPopup(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Base Info</h1>

      <form className="w-full max-w-4xl">
        {/* Branch Selection Row */}
        <div className="grid grid-cols-1 gap-4 mb-2 relative">
          <div className="flex items-center space-x-2">
            <label className="w-32 text-gray-500 mr-2">Branch</label>
            <input
              type="text"
              className="w-80 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              placeholder="00000"
              value={selectedBranch.code}
              readOnly
              onClick={() => {
                console.log("ArrearBaseNew: Opening BranchPopup from code input.");
                setShowBranchPopup(true);
              }}
            />
            <input
              type="text"
              className="w-80 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              placeholder="SONELEC"
              value={selectedBranch.description}
              readOnly
            />
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded"
              onClick={() => {
                console.log("ArrearBaseNew: Opening BranchPopup from '...' button.");
                setShowBranchPopup(true); // Open the popup
              }}
            >
              ...
            </button>
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded"
              onClick={() => {
                console.log("ArrearBaseNew: Clearing selected branch.");
                setSelectedBranch({ code: '', description: '' });
              }}
            >
              ×
            </button>
          </div>

          {/* Branch Popup */}
          <BranchPopup
            isOpen={showBranchPopup}
            onClose={() => {
              console.log("ArrearBaseNew: Closing BranchPopup.");
              setShowBranchPopup(false);
            }}
            onSelect={handleBranchSelect} // Pass the handler for when OK is clicked
          />
        </div>
        {/* Single Column Section */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex items-center">
            <label className="w-32 text-gray-500 mr-2">Code</label>
            <input
              type="text"
              className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50"
              placeholder="00001"
            />
          </div>

          <div className="flex items-center mb-4">
            <label className="w-32 text-gray-500 mr-2">Description</label>
            <input
              type="text"
              className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50"
              placeholder="Dette Regularisation"
            />
          </div>
          <div className="flex items-center">
            <label className="w-32 text-gray-500 mr-2">Project Type</label>
            <select className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50">
              <option>GENERAL FEE</option>
              <option>FIXED FEE</option>
              <option>Terminable Fee </option>
              <option>Frais De Branchement</option>
              <option>CONNECTION FEE V2</option>
              <option>Per Time</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-32 text-gray-500 mr-2">Pay Method</label>
            <select className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50">
              <option>Per Day</option>
              <option>Per Month</option>
              <option>Per Year</option>
              <option>Per Month(Limit)</option>
              <option>Per Time</option>
              <option>Per Time(%)</option>
              <option>Per KWH</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-32 text-gray-400 mr-2">Contract Quantity</label>
            <input
              type="text"
              className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 "
              placeholder="1"
            />
          </div>
        </div>

        {/* General Section */}
        <div className="w-full max-w-4xl">
          <div className="flex space-x-8 mb-4">
            <span className="text-orange-500 font-semibold cursor-pointer">General</span>
            <span className="text-gray-400 font-semibold cursor-pointer">Interest</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">VAT Rate</label>
              <input type="text" placeholder="0.0000%" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">Frozen Days/Months</label>
              <input type="text" placeholder="0" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">Remove Freeze Fee</label>
              <input type="text" placeholder="0.00" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">Associated</label>
              <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md" />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">Shared</label>
              <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md" />
            </div>

            <div className="flex items-center space-x-4">
              <label className="w-32 text-gray-500 mr-2">Active</label>
              <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md" />
            </div>


            {/* Buttons */}
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                Submit
              </button>
              <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                Refresh
              </button>
              <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                Return
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
