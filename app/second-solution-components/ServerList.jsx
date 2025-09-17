"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  MoreHorizontal,
  X,
  Search
} from 'lucide-react';

// --- MODAL SUB-COMPONENT for Region Selection ---
const SelectRegionModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const modalTableHeaders = ["Code", "Description"];
  const modalTableData = [{ code: 'REG001', description: 'Region 1' }];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center bg-gray-100 border-b py-3 px-6 rounded-t-lg">
          <h3 className="text-lg font-semibold text-gray-900">Select Region</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 text-sm pb-4">
            <label className="font-medium text-gray-600">Code</label>
            <input type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" />
            <label className="font-medium text-gray-600">Description</label>
            <input type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" />
            <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white">
                <tr>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr>
              </thead>
              <tbody>
                {modalTableData.map((row, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 border-b">
                    <td className="p-3 text-gray-700">{row.code}</td>
                    <td className="p-3 text-gray-700">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t">
          <button onClick={onConfirm} className="px-8 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button>
          <button onClick={onClose} className="px-8 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button>
        </div>
      </div>
    </div>
  );
};

// --- New Server List Component ---
const NewServerList = ({ onReturnClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => setIsModalOpen(false);

  return (
    <>
      <form className="space-y-4 max-w-xl">
        {/* --- Header with Title and Buttons --- */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
          <div className="flex items-center justify-center gap-1">
            <button type="button" className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
              Refresh
            </button>
            <button type="button" className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">
              New
            </button>
            <button type="button"  className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">
              Details
            </button>
          </div>
        </div>

        {/* --- Form Fields Section --- */}
        <section>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label className="text-sm font-medium text-gray-600 justify-self-end">Server Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option></option>
            </select>
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">ID</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Description</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600 justify-self-end">Database Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option></option>
            </select>
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Main Server IP</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Server Port</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Database Name</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Operator Code</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Password</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600 justify-self-end">Active</label>
            <input type="checkbox" className="h-4 w-4 justify-self-start rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" />
          </div>
        </section>

        {/* --- Vending Server Section (empty as in original) --- */}
        <section>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
          </div>
        </section>

        {/* --- Footer Buttons --- */}
        <div className="flex justify-center space-x-2 pt-6">
          <button type="submit" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Submit</button>
          <button onClick={onReturnClick} type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Return</button>
        </div>
      </form>
      <SelectRegionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </>
  );
};

// --- Reusable component for the pagination controls ---
const PaginationControls = () => (
  <div className="flex items-center justify-between my-4 text-sm">
    <div className="flex items-center space-x-1 text-gray-600">
      <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button>
      <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button>
      <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button>
      <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button>
    </div>
    <div className="flex items-center space-x-3">
      <span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span>
      <input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" />
      <ArrowRight size={22} className="text-green-500 cursor-pointer" />
    </div>
  </div>
);

const ServerList = () => {
  const [showNewServer, setShowNewServer] = useState(false);
  const tableHeaders = ["Server Type", "Description", "Data Base", "Next Server IP", "Database Name", "Author"];
  const tableData = []; // Empty data as shown in image

  const handleReturnClick = () => {
    setShowNewServer(false);
  };

  // If showNewServer is true, display the NewServerList component
  if (showNewServer) {
    return (
      <div className="p-6 w-full bg-white min-h-screen">
        <NewServerList onReturnClick={handleReturnClick} />
      </div>
    );
  }

  return (
    <div className="p-6 w-full bg-white min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Server List</h1>
        <div className="flex space-x-2">
          <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">
            <div className="flex items-center justify-center gap-1">
              <Search size={16} />
              <span>Search</span>
            </div>
          </button>
          <button 
            onClick={() => setShowNewServer(true)}
            className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700"
          >
            New
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="space-y-4 mb-6 max-w-4xl">
        <div className="flex items-center gap-x-6">
          <label className="w-32 text-sm font-medium text-gray-600 text-left">ID</label>
          <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md"  />
        </div>
        <div className="flex items-center gap-x-6">
          <label className="w-32 text-sm font-medium text-gray-600 text-left">Description</label>
          <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md"  />
        </div>
        
        <div className="flex">
          <div className="w-32 mr-6" /> {/* Spacer */}
          <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">
            Search...
          </button>
        </div>
      </div>

      {/* Table */}
      <div>
        <PaginationControls />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                {tableHeaders.map(header => (
                  <th key={header} className="p-3 text-left font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={tableHeaders.length} className="p-10 text-center text-gray-400 bg-white border-b">
                  No server data available.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PaginationControls />
      </div>
    </div>
  );
};

export default ServerList;