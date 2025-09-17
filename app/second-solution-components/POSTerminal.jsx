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
  CheckCircle2,
  Minus,
  Square,
  Users
} from 'lucide-react';

// --- SUB-COMPONENT for the "Add New POS Terminal" Form ---
const NewPOSTerminalForm = ({ onReturnClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => setIsModalOpen(false);

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">List Of POS Terminals</h1>
          <div className="flex space-x-2">
            <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
            <button className="w-28 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100">Details</button>
          </div>
        </div>
        <form className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-x-4">
            <label className="w-40 text-sm font-medium text-gray-600 text-right">Branch</label>
            <div className="flex-grow flex items-center gap-1"><input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" /><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button></div>
          </div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">IMEI</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Type</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Tel No.</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Address</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Owner</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Network Fee</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Pay Date Of Network Fee</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">User Code</label><div className="flex-grow flex items-center gap-1"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button></div></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">User Name</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">User Key</label><div className="flex-grow flex items-center gap-1"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button></div></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Deduction Amount</label><div className="flex items-center gap-2"><select className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-white"><option>Branch Account</option></select><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" /></div></div>
          <div className="flex items-center gap-x-4"><div className="w-40"/> <div className="flex-grow flex items-center gap-2"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><span className="text-sm font-semibold">KMF</span></div></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Remarks</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Amount Balance</label><div className="flex-grow flex items-center gap-2"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><span className="text-sm font-semibold">KMF</span></div></div>
          <div className="flex items-center gap-x-4"><label className="w-40 text-sm font-medium text-gray-600 text-right">Active</label><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" /></div>
          <div className="flex justify-end pt-6"><div className="flex space-x-2"><button type="submit" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Submit</button><button type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button><button onClick={onReturnClick} type="button" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Return</button></div></div>
        </form>
      </div>
      <SelectBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </>
  );
};

// --- MODAL SUB-COMPONENT ---
const SelectBranchModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Code", "Data", "Type", "Description", "Department"];
  const modalTableData = [
    { code: '0000', date: '2022-09-06', type: 'Agent', description: '981P00451P04 - Islambank', department: 'Eximbank' },
    { code: '0001', date: '2022-09-07', type: 'Owner', description: 'Main Branch - Douala', department: 'Finance' },
    { code: '0002', date: '2022-09-08', type: 'Franchise', description: 'Service Point - Yaounde', department: 'Sales' },
  ];

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

// --- PAGINATION CONTROLS ---
const PaginationControls = () => (
  <div className="flex items-center justify-between my-4 text-sm"><div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div><div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><ArrowRight size={22} className="text-green-500 cursor-pointer" /></div></div>
);

// --- MAIN PAGE COMPONENT ---
const POSTerminals = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isListModalOpen, setListIsModalOpen] = useState(false);
  
  const posTableHeaders = ["Branch", "IMEI", "Owner", "Balance", "KwH", "Amount", "Comission", "Operator", "Date", "Active"];
  const changeListHeaders = ["Change Time", "old IMEI", "New IMEI", "Operator", "Remarks"];
  const handleListConfirm = () => setListIsModalOpen(false);
  const posData = [
    { branch: ["997P0191", "P01 - USDD", "NUR MONEY"], imei: 'AVM-001', owner: '1', balance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', operator: 'Admin', date: '2015-08-25 07:36:00', active: true },
    { branch: ["997P0192", "P02 - USDD", "CAMPOST"], imei: 'AVM-002', owner: '1', balance: '12.5000', kwh: '5.00', amount: '50.00', commission: '0.50', operator: 'UserA', date: '2015-08-26 10:22:00', active: true },
    { branch: ["997P0193", "P03 - USDD", "CASHPOINT"], imei: 'AVM-003', owner: '2', balance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', operator: 'Admin', date: '2015-08-27 14:05:00', active: false },
  ];
  const changeListData = [];

  // If viewMode is 'form', render the New Terminal Form
  if (viewMode === 'form') {
    return <NewPOSTerminalForm onReturnClick={() => setViewMode('list')} />;
  }

  // By default, render the List of Terminals view
  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">List Of POS Terminals</h1>
            <div className="flex space-x-2">
                <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                <button onClick={() => setViewMode('form')} className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
                <button className="w-28 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100">Details</button>
            </div>
        </div>
        <div className="space-y-3 mb-6 max-w-lg">
            <div className="flex items-center gap-x-6">
                <label htmlFor="branch" className="w-20 text-sm font-medium text-gray-600 text-right">Branch</label>
                <div className="flex-grow flex items-center gap-1">
                    <input id="branch" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                    <button onClick={() => setListIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
                    <button className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
                </div>
            </div>
            <div className="flex items-center gap-x-6">
                <label htmlFor="imei" className="w-20 text-sm font-medium text-gray-600 text-right">IMEI</label>
                <input id="imei" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex items-center gap-x-6">
                <label htmlFor="type" className="w-20 text-sm font-medium text-gray-600 text-right">Type</label>
                <select id="type" className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-white"><option></option></select>
            </div>
            <div className="flex">
                <div className="w-20 mr-6" />
                <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min mt-2">Search...</button>
            </div>
        </div>
        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr>{posTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{posData.map((row, index) => (<tr key={index} className="border-b hover:bg-gray-100 transition-colors"><td className="p-3 text-gray-700">{row.branch.map((line, i) => <div key={i}>{line}</div>)}</td><td className="p-3 text-gray-700">{row.imei}</td><td className="p-3 text-gray-700">{row.owner}</td><td className="p-3 text-gray-700">{row.balance}</td><td className="p-3 text-gray-700">{row.kwh}</td><td className="p-3 text-gray-700">{row.amount}</td><td className="p-3 text-gray-700">{row.commission}</td><td className="p-3 text-gray-700">{row.operator}</td><td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-center">{row.active && <CheckCircle2 className="text-black mx-auto" size={20} />}</td></tr>))}</tbody></table></div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">Change List</h2>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr>{changeListHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead>
              <tbody>
                {changeListData.length > 0 ? (
                    changeListData.map((row, index) => <tr key={index}></tr>)
                ) : (
                    <tr><td colSpan={changeListHeaders.length} className="p-10 text-center text-gray-400 bg-white border-b">No change data available.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectBranchModal isOpen={isListModalOpen} onClose={() => setListIsModalOpen(false)} onConfirm={handleListConfirm} />
    </>
  );
};

export default POSTerminals;
