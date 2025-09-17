"use client";

import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  MoreHorizontal,
  X,
  Minus,
  Square
} from 'lucide-react';

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

// --- MODAL SUB-COMPONENT for Vending Server Selection ---
const SelectVendingServerModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Code", "Description", "Region", "Server IP"];
  const modalTableData = [
    { code: '0100', description: 'Header Office 01', region: 'Null', serverIp: '192.0.0.0' }
  ];

  if (!isOpen) return null;

  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-3xl';

  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Select Vending Server</h3>
        <div className="flex items-center space-x-2">
            <button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
      </div>
      <div className="p-6 space-y-4 flex-grow overflow-y-auto">
        <div className="flex items-center gap-4 text-sm pb-4 border-b">
            <label className="font-medium text-gray-600">Code</label>
            <input type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" />
            <label className="font-medium text-gray-600">Name</label>
            <input type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" />
            <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search</button>
        </div>
        <PaginationControls />
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead className="bg-[#FF9900] text-white">
                    <tr>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr>
                </thead>
                <tbody>
                    {modalTableData.map((row, index) => (
                        <tr key={index} className="bg-white hover:bg-gray-100 border-b border-gray-200">
                            <td className="p-3 text-gray-700">{row.code}</td>
                            <td className="p-3 text-gray-700">{row.description}</td>
                            <td className="p-3 text-gray-700">{row.region}</td>
                            <td className="p-3 text-gray-700">{row.serverIp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t rounded-b-lg flex-shrink-0">
        <button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button>
        <button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button>
      </div>
    </div>
  );
};

// --- Main Meter Viewer Component ---
const MeterViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const tableHeaders = ["Meter Number", "Customer Code", "Vending Server"];
  const meterData = [
    { meterNumber: '25120465312', customerCode: '00001025095', vendingServer: 'Header Office 01' },
    { meterNumber: '25120465312', customerCode: '00001025095', vendingServer: 'Header Office 01' },
    { meterNumber: '25120465312', customerCode: '00001025095', vendingServer: 'Header Office 01' },
  ];

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // You can add your file processing logic here
    }
  };

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          className="hidden" 
        />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meter List</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button onClick={handleImportClick} className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Import</button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Condition</h2>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 max-w-xl">
            <label className="text-sm font-medium text-gray-600">Meter Num</label>
            <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
            
            <label className="text-sm font-medium text-gray-600">Meter Status</label>
            <select defaultValue="vending" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
              <option value="vending">Vending</option>
              <option value="disabled">Disabled</option>
            </select>

            <label className="text-sm font-medium text-gray-600">Vending Server</label>
            <div className="flex items-center gap-1">
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
                <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
            </div>
            
            <div></div> {/* Spacer */}
            <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min">Search...</button>
          </div>
        </div>

        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white">
                <tr>{tableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr>
              </thead>
              <tbody>
                {meterData.map((row, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100 transition-colors cursor-pointer`}>
                    <td className="p-3 text-gray-700">{row.meterNumber}</td>
                    <td className="p-3 text-gray-700">{row.customerCode}</td>
                    <td className="p-3 text-gray-700">{row.vendingServer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectVendingServerModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MeterViewer;