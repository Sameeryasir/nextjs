"use client";
import React, { useState } from 'react';
import { Folder, RefreshCw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Minus, Link as LinkIcon } from 'lucide-react';

// Mock data for the region table
const regionData = [
    { code: '01', description: 'NGAZIDJA' },
    { code: '02', description: 'MOHELI' },
    { code: '03', description: 'ANJOUAN' },
    { code: '04', description: 'USSD' },
];

/**
 * Component for the "Add Data Items" modal popup
 */
const AddDataItemsModule = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg border">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Add Data Items</h3>
                    <div className="flex items-center space-x-3">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <Minus size={22} />
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X size={22} />
                        </button>
                    </div>
                </div>
                <div className="space-y-6 pt-6">
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Code</label>
                        <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Sequence</label>
                        <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-start">
                        <label className="w-28 text-sm font-medium text-gray-700 pt-2">Description</label>
                        <textarea rows="4" className="flex-grow px-4 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button className="px-8 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">
                        OK
                    </button>
                    <button onClick={onClose} className="px-8 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


const BaseInformationRegion = () => {
  // State to manage the selected item in the left list
  const [selectedItem, setSelectedItem] = useState("001-Area");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  
  const totalRecords = regionData.length;
  const totalPages = Math.ceil(totalRecords / 10);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  const handlePageInputChange = (e) => {
    const page = Number(e.target.value) - 1;
    if (page >= 0 && page < totalPages) {
      setPageIndex(page);
    }
  };


  return (
    <div className="bg-white p-6 md:p-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
        {/* Left Data List */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Data List</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <ul>
              <li
                className={`flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md ${selectedItem === "001-Area" ? 'bg-gray-200' : ''}`}
                onClick={() => handleItemClick("001-Area")}
              >
                <Folder className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">001-Area</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Details Pane */}
        <div className="col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">001-Area</h2>
                 <div className="flex space-x-2">
                    <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
                    <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">New</button>
                    <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Modify</button>
                    <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">Delete</button>
                 </div>
            </div>

            {/* Pagination Controls */}
             <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200 mb-4">
                <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-gray-800 disabled:text-gray-300" disabled={pageIndex === 0}>
                        <ChevronsLeft size={20} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-800 disabled:text-gray-300" disabled={pageIndex === 0}>
                        <ChevronLeft size={20} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-800" disabled={pageIndex >= totalPages -1}>
                        <ChevronRight size={20} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-800" disabled={pageIndex >= totalPages - 1}>
                        <ChevronsRight size={20} />
                    </button>
                </div>
                 <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                    <span className="text-gray-600 whitespace-nowrap">
                      Total {totalRecords} Records
                    </span>
                    <span className="text-gray-600 hidden sm:inline">|</span>
                    <span className="text-gray-600 whitespace-nowrap">
                      Record{" "}
                      {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                      {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                      {pageIndex + 1}/{totalPages}
                    </span>
                    <span className="text-gray-600 hidden sm:inline">|</span>
                    <span className="text-gray-600 whitespace-nowrap">
                      Turn To Page
                    </span>
                    <input
                      type="text"
                      className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-0.5 text-center text-xs sm:text-sm"
                      value={pageIndex + 1}
                      onChange={handlePageInputChange}
                    />
                    <button>
                        <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
                    <div className="w-1/2">Code</div>
                    <div className="w-1/2">Description</div>
                </div>
                <ul className="divide-y divide-gray-200 min-h-[200px]">
                   {regionData.map(item => (
                       <li key={item.code} className="flex items-center p-3 hover:bg-gray-50">
                            <div className="w-1/2 flex items-center text-sm text-gray-700">
                                <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span>{item.code}</span>
                            </div>
                           <div className="w-1/2 text-sm text-gray-700">{item.description}</div>
                       </li>
                   ))}
                </ul>
            </div>
            <AddDataItemsModule isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default BaseInformationRegion;
