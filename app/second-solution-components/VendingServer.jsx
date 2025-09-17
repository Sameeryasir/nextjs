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
  Minus,
  Square,
  Folder
} from 'lucide-react';

// --- "NEW VENDING SERVER" FORM SUB-COMPONENT ---
const NewVendingServerForm = ({ onReturnClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => setIsModalOpen(false);

  return (
    <>
      {/* 👇 **CHANGED**: Reduced max-width from 2xl to xl to make inputs smaller */}
      <form className="space-y-4 max-w-xl">
        {/* --- Branch Information Section --- */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Branch Information</h2>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label className="text-sm font-medium text-gray-600">Code</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600">Description</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option></option>
            </select>

            <label className="text-sm font-medium text-gray-600">Region</label>
            <div className="flex items-center gap-1">
                <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
            </div>
          </div>
        </section>

        <hr className="my-6 !mt-8" />

        {/* --- Vending Server Section --- */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 !mt-8 mb-4">Vending Server</h2>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label className="text-sm font-medium text-gray-600">Master Server IP (Host)</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600">Backup Server IP (Host)</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Current Server</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600">Server Port</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600">Operator Code</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Password</label>
            <input type="password" className="px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Auth Code</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Active</label>
            <input type="checkbox" className="h-4 w-4 justify-self-start rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" />

            <label className="text-sm font-medium text-gray-600">Parameters</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </section>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 pt-6">
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
    <div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div>
    <div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><ArrowRight size={22} className="text-green-500 cursor-pointer" /></div>
  </div>
);

// --- MODAL SUB-COMPONENT for Region Selection ---
const SelectRegionModal = ({ isOpen, onClose, onConfirm }) => {
  const [expandedItems, setExpandedItems] = useState(['NGAZIDJA']);
  const [selectedItem, setSelectedItem] = useState(null);
  const regionData = [ { name: 'NGAZIDJA', children: ['Moroni', 'Bambo', 'Dimani', 'Wachili'] }, { name: 'MOHELI', children: [] }, { name: 'ANJOUAN', children: [] }, { name: 'USSD', children: [] }, ];
  if (!isOpen) return null;
  const toggleExpand = (itemName) => { setExpandedItems(prev => prev.includes(itemName) ? prev.filter(item => item !== itemName) : [...prev, itemName] ); };
  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col w-full max-w-xl`}>
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg"><h3 className="text-lg font-semibold text-gray-900">Select Region</h3><div className="flex items-center space-x-2"><button className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button><button className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div></div>
      <div className="p-6 space-y-2 flex-grow overflow-y-auto">{regionData.map(parent => (<div key={parent.name}><div onClick={() => { toggleExpand(parent.name); setSelectedItem(parent.name); }} className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${selectedItem === parent.name ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}><Folder className="w-5 h-5 text-yellow-600 mr-3 shrink-0" /><span className="font-medium text-gray-800">{parent.name}</span></div>{expandedItems.includes(parent.name) && parent.children.length > 0 && (<div className="pl-8 pt-1 space-y-1">{parent.children.map(child => (<div key={child} onClick={(e) => { e.stopPropagation(); setSelectedItem(child); }} className={`p-2 rounded-md cursor-pointer text-sm transition-colors ${selectedItem === child ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>{child}</div>))}</div>)}</div>))}</div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t rounded-b-lg"><button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button><button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button></div>
    </div>
  );
};

// --- Main Vending Server Component ---
const VendingServer = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isListModalOpen, setListIsModalOpen] = useState(false);
  const tableHeaders1 = ["Code", "Description", "Region", "Main Server IP", "Backup Server IP", "Current Server", "Meter", "Active"];
  const tableHeaders2 = ["Code", "Name", "Data", "Operator"];

  if (viewMode === 'form') {
    return (
        <div className="p-6 w-full bg-white min-h-screen">
            <NewVendingServerForm onReturnClick={() => setViewMode('list')} />
        </div>
    );
  }

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vending Server List</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button onClick={() => setViewMode('form')} className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Condition</h2>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 max-w-lg">
            <label className="text-sm font-medium text-gray-600">Code</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            <label className="text-sm font-medium text-gray-600">Name</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            <label className="text-sm font-medium text-gray-600">Region</label>
            <div className="flex items-center gap-1">
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <button onClick={() => setListIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
                <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
            </div>
            <div></div>
            <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min">Search...</button>
          </div>
        </div>
        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white"><tr>{tableHeaders1.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead>
              <tbody><tr><td colSpan={tableHeaders1.length} className="p-10 text-center text-gray-400 bg-white border-b">No vending server data available.</td></tr></tbody>
            </table>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-baseline space-x-4">
            <h2 className="text-xl font-bold text-gray-800">Region List</h2>
            <span className="text-lg font-semibold text-gray-600">Operator</span>
          </div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white"><tr>{tableHeaders2.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead>
              <tbody><tr><td colSpan={tableHeaders2.length} className="p-10 text-center text-gray-400 bg-white border-b">No region data available.</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectRegionModal 
        isOpen={isListModalOpen}
        onClose={() => setListIsModalOpen(false)}
        onConfirm={() => setListIsModalOpen(false)}
      />
    </>
  );
};

export default VendingServer;