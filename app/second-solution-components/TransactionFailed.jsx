"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  MoreHorizontal,
  X
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

// --- MODAL SUB-COMPONENT for Branch Selection ---
const SelectBranchModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const modalTableHeaders = ["Code", "Data", "Type", "Description", "Department"];
  const modalTableData = [ { code: '0000', date: '2022-09-06', type: 'Owner', description: 'SONELAC', department: 'Null' }];
  return (
    <div onClick={(e) => e.stopPropagation()} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col w-full max-w-4xl">
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900">Select A Branch</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-sm pb-4">
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
                <tr key={index} className="bg-white hover:bg-gray-100 border-b">
                  <td className="p-3 text-gray-700">{row.code}</td>
                  <td className="p-3 text-gray-700">{row.date}</td>
                  <td className="p-3 text-gray-700">{row.type}</td>
                  <td className="p-3 text-gray-700">{row.description}</td>
                  <td className="p-3 text-gray-700">{row.department}</td>
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
  );
};

// --- MODAL SUB-COMPONENT for Vending Server Selection ---
const SelectVendingServerModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const modalTableHeaders = ["Code", "Description", "Region", "Server IP"];
  const modalTableData = [ { code: '0100', description: 'Header Office 01', region: 'Null', serverIp: '192.0.0.0' } ];
  return (
    <div onClick={(e) => e.stopPropagation()} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col w-full max-w-3xl">
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg">
        <h3 className="text-lg font-semibold text-gray-900">Select Vending Server</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-sm pb-4">
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
                <tr key={index} className="bg-white hover:bg-gray-100 border-b">
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
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t">
        <button onClick={onConfirm} className="px-8 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button>
        <button onClick={onClose} className="px-8 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button>
      </div>
    </div>
  );
};

// --- Main Transactions Failed Component ---
const TransactionsFailed = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isVendingServerModalOpen, setIsVendingServerModalOpen] = useState(false);
  const tableHeaders = ["Reverse Time", "Branch Name", "Vending Server", "TransID", "Meter Num", "Trans Time", "Amount"];

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Transaction Failed</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Delete All</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Excel</button>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-3 mb-6 max-w-3xl">
          <div className="flex items-center gap-x-6">
            <div className="flex items-center gap-x-4 flex-1">
              <label className="w-32 text-sm font-medium text-gray-600 text-right">Reverse Time From</label>
              <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex items-center gap-x-4 flex-1">
              <label className="w-20 text-sm font-medium text-gray-600 text-right">Reverse Time To</label>
              <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <label className="w-32 text-sm font-medium text-gray-600 text-right">Branch</label>
            <div className="flex-grow flex items-center gap-1">
              <select className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-white"><option></option></select>
              <button onClick={() => setIsBranchModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
              <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <label className="w-32 text-sm font-medium text-gray-600 text-right">Vending Server</label>
            <div className="flex-grow flex items-center gap-1">
              <select className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-white"><option></option></select>
              <button onClick={() => setIsVendingServerModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
              <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <label className="w-32 text-sm font-medium text-gray-600 text-right">Meter Number</label>
            <div className="flex-grow flex items-center gap-2">
              <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
              <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-x-6">
            <label className="w-32 text-sm font-medium text-gray-600 text-right">Trans ID</label>
            <div className="flex-grow flex items-center gap-2">
              <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
              <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="flex">
            <div className="w-32 mr-6" /> {/* Spacer */}
            <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min">Search...</button>
          </div>
        </div>

        {/* Table */}
        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white">
                <tr>{tableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr>
              </thead>
              <tbody>
                <tr><td colSpan={tableHeaders.length} className="p-10 text-center text-gray-400 bg-white border-b">No transaction data available.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectBranchModal 
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        onConfirm={() => setIsBranchModalOpen(false)}
      />
      <SelectVendingServerModal 
        isOpen={isVendingServerModalOpen}
        onClose={() => setIsVendingServerModalOpen(false)}
        onConfirm={() => setIsVendingServerModalOpen(false)}
      />
    </>
  );
};

export default TransactionsFailed;
