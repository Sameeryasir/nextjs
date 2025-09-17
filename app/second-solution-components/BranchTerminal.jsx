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
  Users 
} from 'lucide-react';

// --- "ADD NEW TERMINAL" FORM SUB-COMPONENT ---
const NewTerminalForm = ({ onReturnClick }) => {
  // 👇 1. State added to control the modal for this form
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Branch selected for New Terminal!");
    setIsModalOpen(false);
  };

  return (
    // 👇 2. A Fragment is used to return the form and the modal
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Terminals</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-4 max-w-xl">
          <div className="grid grid-cols-[8rem_1fr] items-center gap-x-4">
              <label htmlFor="form_branch" className="text-sm font-medium text-gray-600">Branch</label>
              <div className="flex items-center gap-1">
                  <input id="form_branch" type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
                  <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                  {/* 👇 3. onClick handler added to this button */}
                  <button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition">
                      <MoreHorizontal size={22} />
                  </button>
              </div>
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-center gap-x-4">
              <label htmlFor="form_ip_address" className="text-sm font-medium text-gray-600">IP Address</label>
              <input id="form_ip_address" type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-center gap-x-4">
              <label htmlFor="form_description" className="text-sm font-medium text-gray-600">Description</label>
              <input id="form_description" type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-center gap-x-4">
              <label htmlFor="form_active" className="text-sm font-medium text-gray-600">Active</label>
              <input id="form_active" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" />
          </div>
          <div className="grid grid-cols-[8rem_1fr] items-start gap-x-4">
              <label htmlFor="form_remarks" className="text-sm font-medium text-gray-600 pt-2">Remarks</label>
              <textarea id="form_remarks" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
          </div>
          
          <div className="flex pt-6">
              <div className="w-[8rem] mr-4"/> {/* Spacer */}
              <div className="flex space-x-2">
                  <button type="submit" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Submit</button>
                  <button type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                  <button onClick={onReturnClick} type="button" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Return</button>
              </div>
          </div>
        </form>
      </div>

      {/* 👇 4. The modal is rendered and controlled by this component's state */}
      <SelectBranchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

// --- MODAL SUB-COMPONENT (for selecting a branch) ---
const SelectBranchModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Code", "Data", "Type", "Description", "Department"];
  const modalTableData = [ { code: '0000', date: '2022-09-06', type: 'Owner', description: 'SONELAC', department: 'Null' }, ];

  if (!isOpen) return null;

  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl';

  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b border-gray-200 py-2 px-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Select A Branch</h3>
        <div className="flex items-center space-x-2"><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button><button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div>
      </div>
      <div className="p-6 space-y-4 flex-grow overflow-y-auto">
        <div className="flex items-center gap-4 text-sm pb-4 border-b"><label htmlFor="modal_code" className="font-medium text-gray-600">Code</label><input id="modal_code" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><label htmlFor="modal_name" className="font-medium text-gray-600">Name</label><input id="modal_name" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search</button></div>
        <PaginationControls />
        <div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr><th className="p-3 text-left font-semibold"><Users size={16}/></th>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{modalTableData.map((row, index) => (<tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-200"><td className="p-3 text-gray-500"><Users size={16}/></td><td className="p-3 text-gray-700">{row.code}</td><td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-gray-700">{row.type}</td><td className="p-3 text-gray-700">{row.description}</td><td className="p-3 text-gray-700">{row.department}</td></tr>))}</tbody></table></div>
      </div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t border-gray-200 rounded-b-lg flex-shrink-0"><button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button><button onClick={onClose} className="px-6 py-2 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-800 transition">Cancel</button></div>
    </div>
  );
};


// --- Reusable component for the pagination controls ---
const PaginationControls = () => (
  <div className="flex items-center justify-between my-4 text-sm">
    <div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div>
    <div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><ArrowRight size={22} className="text-green-500 cursor-pointer" /></div>
  </div>
);

// --- Main component for the Branch Terminals page ---
const BranchTerminals = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isListModalOpen, setListIsModalOpen] = useState(false); // Modal for the list view
  const tableHeaders = ["IP Address", "Branch", "Name", "Last Time", "Last Operator"];
  const handleListConfirm = () => setListIsModalOpen(false);

  if (viewMode === 'form') {
    return <NewTerminalForm onReturnClick={() => setViewMode('list')} />;
  }

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">List Of Terminals</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button onClick={() => setViewMode('form')} className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
          </div>
        </div>
        <div className="flex items-center gap-x-4 mb-6 max-w-xl">
            <label htmlFor="branch" className="w-20 text-sm font-medium text-gray-600 text-right">Branch</label>
            <div className="flex-grow flex items-center gap-1">
                <input id="branch" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <button onClick={() => setListIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
                <button className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
            </div>
        </div>
        <div className="flex items-center gap-x-4 mb-6 max-w-xl">
            <label htmlFor="ip_address" className="w-20 text-sm font-medium text-gray-600 text-right">IP Address</label>
            <input id="ip_address" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="flex mb-6"><div className="w-20 mr-4" /><button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min">Search...</button></div>
        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white"><tr>{tableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead>
              <tbody><tr><td colSpan={tableHeaders.length} className="p-10 text-center text-gray-400 bg-white">No terminal data available.</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectBranchModal isOpen={isListModalOpen} onClose={() => setListIsModalOpen(false)} onConfirm={handleListConfirm} />
    </>
  );
};

export default BranchTerminals;