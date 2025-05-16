
"use client";

import { useState } from 'react';
import BranchPopup from './ArrearBranchPopup';

export default function ArrearBaseNew() {
  const [showBranchPopup, setShowBranchPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState({ 
    code: '', 
    description: '' 
  });

  // Expanded mock data with 10 entries (5 per page)
  const mockBranches = [
    { code: '00000', date: '2021-11-03', type: 'DC', description: 'SONELEC', department: 'null', sgc: '600767' },
    { code: '00001', date: '2021-11-04', type: 'Vending', description: 'Dette', department: 'Finance', sgc: '600768' },
    { code: '00002', date: '2021-11-05', type: 'Maintenance', description: 'Point Installation', department: 'Tech', sgc: '600769' },
    { code: 'SE 00000', date: '2021-11-06', type: 'DC', description: 'FORMEL', department: 'Corporate', sgc: '600770' },
    { code: 'SE 00001', date: '2021-11-07', type: 'Vending Office', description: 'SONELEC Branch', department: 'Sales', sgc: '600771' },
    { code: '00003', date: '2021-11-08', type: 'DC', description: 'Regional Office', department: 'Management', sgc: '600772' },
    { code: '00004', date: '2021-11-09', type: 'Service', description: 'Customer Center', department: 'Support', sgc: '600773' },
    { code: 'SE 00002', date: '2021-11-10', type: 'DC', description: 'Headquarters', department: 'Admin', sgc: '600774' },
    { code: '00005', date: '2021-11-11', type: 'Vending', description: 'West District', department: 'Operations', sgc: '600775' },
    { code: '00006', date: '2021-11-12', type: 'Maintenance', description: 'Service Center', department: 'Technical', sgc: '600776' },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(mockBranches.length / recordsPerPage);
  const currentRecords = mockBranches.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handleBranchSelect = (branch) => {
    setSelectedBranch({
      code: branch.code,
      description: branch.description
    });
    setShowBranchPopup(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                setShowBranchPopup(true);
                setCurrentPage(1); // Reset to first page when opening
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
                setShowBranchPopup(!showBranchPopup);
                setCurrentPage(1); // Reset to first page when opening
              }}
            >
              ...
            </button>
            <button 
              type="button" 
              className="bg-[#FF9900] text-white px-3 py-2 rounded"
              onClick={() => setSelectedBranch({ code: '', description: '' })}
            >
              ×
            </button>
          </div>

          {/* Branch Popup */}
          <BranchPopup
            isOpen={showBranchPopup}
            onClose={() => setShowBranchPopup(false)}
            branches={currentRecords}
            onSelect={handleBranchSelect}
            isLoading={false}
            error={null}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={mockBranches.length}
            recordStart={(currentPage - 1) * recordsPerPage + 1}
            recordEnd={Math.min(currentPage * recordsPerPage, mockBranches.length)}
            onPageChange={handlePageChange}
            searchTerm=""
            onSearchChange={() => {}}
            onSearchSubmit={(e) => e.preventDefault()}
          />
        </div>
         {/* Single Column Section */}
         <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex items-center">
            <label className="w-32 text-gray-500  mr-2">Code</label>
              <input
                type="text"
               className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50"
                placeholder="00001"
              />
            </div>
  
            <div className="flex items-center mb-4">
    <label className="w-32 text-gray-500  mr-2">Description</label>
    <input
      type="text"
      className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50"
      placeholder="Dette Regularisation"
    />
  </div>
            <div className="flex items-center">
            <label className="w-32 text-gray-500  mr-2">Project Type</label>
              <select className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50">
                <option>GENERAL FEE</option>
                <option>FIXED FEE</option>
                <option>Terminable Fee </option>
                <option>Frais De Branchement</option>
                <option>CONNECTION FEE V2</option>
              </select>
            </div>
  
            <div className="flex items-center">
              <label  className="w-32 text-gray-500  mr-2">Pay Method</label>
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
              <label  className="w-32 text-gray-400 mr-2">Contract Quantity</label>
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
            <label className="w-32 text-gray-500  mr-2">VAT Rate</label>
            <input type="text" placeholder="0.0000%" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
          </div>
  
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-500  mr-2">Frozen Days/Months</label>
            <input type="text" placeholder="0" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
          </div>
  
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-500  mr-2">Remove Freeze Fee</label>
            <input type="text" placeholder="0.00" className="w-90 px-2 py-2 border border-gray-200 rounded-md bg-gray-50 " />
          </div>
  
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-500  mr-2">Associated</label>
            <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md" />
          </div>
  
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-500  mr-2">Shared</label>
            <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md"  />
          </div>
  
          <div className="flex items-center space-x-4">
            <label className="w-32 text-gray-500  mr-2">Active</label>
            <input type="checkbox" className="h-3 w-3 border-gray-300 rounded-md"  />
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
  