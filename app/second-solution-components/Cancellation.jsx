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

// --- Reusable component for the pagination controls within the modal ---
const PaginationControls = () => (
  <div className="flex items-center justify-between my-4 text-sm">
    <div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div>
    <div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><ArrowRight size={22} className="text-green-500 cursor-pointer" /></div>
  </div>
);

// --- MODAL SUB-COMPONENT ---
const SelectBranchModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Code", "Data", "Type", "Description", "Department"];
  const modalTableData = [ { code: '0000', date: '2022-09-06', type: 'Owner', description: 'SONELAC', department: 'Null' }];
  if (!isOpen) return null;
  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl';
  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg flex-shrink-0"><h3 className="text-lg font-semibold text-gray-900">Select A Branch</h3><div className="flex items-center space-x-2"><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button><button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div></div>
      <div className="p-6 space-y-4 flex-grow overflow-y-auto"><div className="flex items-center gap-4 text-sm pb-4 border-b"><label htmlFor="modal_code" className="font-medium text-gray-600">Code</label><input id="modal_code" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><label htmlFor="modal_name" className="font-medium text-gray-600">Name</label><input id="modal_name" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search</button></div><PaginationControls /><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr><th className="p-3 text-left font-semibold"><Users size={16}/></th>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{modalTableData.map((row, index) => (<tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-200"><td className="p-3 text-gray-500"><Users size={16}/></td><td className="p-3 text-gray-700">{row.code}</td><td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-gray-700">{row.type}</td><td className="p-3 text-gray-700">{row.description}</td><td className="p-3 text-gray-700">{row.department}</td></tr>))}</tbody></table></div></div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t rounded-b-lg flex-shrink-0"><button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button><button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button></div>
    </div>
  );
};

// --- Main Cancellation Component ---
const Cancellation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Information Of Branch</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Details</button>
          </div>
        </div>

        {/* 👇 **CHANGED**: Reduced max-width from 2xl to xl to make fields smaller */}
        <div className="max-w-xl">
          <form className="space-y-4">
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
              <label className="text-sm font-medium text-gray-600">Code & Name</label>
              <div className="flex items-center gap-1">
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
                <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
              </div>
              
              <label className="text-sm font-medium text-gray-600">Type</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />

              <label className="text-sm font-medium text-gray-600">Date</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />

              <label className="text-sm font-medium text-gray-600">Comission</label>
              <div className="flex items-center gap-2">
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <span className="font-semibold text-gray-600">KMF</span>
              </div>
            </div>

            <hr className="my-6 !mt-8" />

            <h2 className="text-xl font-bold text-gray-800 !mt-8 mb-4">Contract Details</h2>
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
              <label className="text-sm font-medium text-gray-600">Date</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />

              <label className="text-sm font-medium text-gray-600">Reason</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"><option></option></select>

              <label className="text-sm font-medium text-gray-600">Acc Balance</label>
              <div className="flex items-center gap-2"><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" /><span className="font-semibold text-gray-600">KMF</span></div>

              <label className="text-sm font-medium text-gray-600">Deposite</label>
              <div className="flex items-center gap-2"><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" /><span className="font-semibold text-gray-600">KMF</span></div>

              <label className="text-sm font-medium text-gray-600">Compensate</label>
              <div className="flex items-center gap-2"><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" /><span className="font-semibold text-gray-600">KMF</span></div>
              
              <label className="text-sm font-medium text-gray-600">Payment Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"><option></option></select>

              <label className="text-sm font-medium text-gray-600">Payable</label>
              <div className="flex items-center gap-2"><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" /><span className="font-semibold text-gray-600">KMF</span></div>

              <label className="text-sm font-medium text-gray-600">Remarks</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div className="flex justify-end pt-6">
                <button type="submit" className="px-10 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <SelectBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </>
  );
};

export default Cancellation;