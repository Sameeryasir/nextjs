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


// --- "NEW RECHARGE" FORM SUB-COMPONENT ---
const NewRechargeForm = ({ onReturnClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleConfirm = () => setIsModalOpen(false);

  return (
    <>
      
      {/* 👇 **CHANGED**: Reduced max-width from 3xl to 2xl to make inputs smaller */}
      <form className="space-y-4 max-w-2xl">
        {/* --- First Section --- */}
        <div className="grid grid-cols-[10rem_1fr] items-center gap-x-4 gap-y-3">
          <label className="text-sm font-medium text-gray-600">Account Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
            <option></option>
            <option value="branch">Branch Account</option>
            <option value="terminal">Terminal Account</option>
          </select>

          <label className="text-sm font-medium text-gray-600">Branch</label>
          <div className="flex items-center gap-1">
            <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            <button onClick={() => setIsModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button>
            <button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button>
          </div>

          <label className="text-sm font-medium text-gray-600">Type</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          
          <label className="text-sm font-medium text-gray-600">Acc Balance</label>
          <div className="flex items-center gap-2">
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <span className="font-semibold text-gray-600">KMF</span>
          </div>
        </div>

        <hr className="my-6 !mt-6" />

        {/* --- Recharge Information Section --- */}
        <h2 className="text-xl font-bold text-gray-800 !mt-6 mb-4">Recharge Information</h2>
        <div className="grid grid-cols-[10rem_1fr] items-center gap-x-4 gap-y-3">
            <label className="text-sm font-medium text-gray-600">Total Amount</label>
            <div className="flex items-center gap-2">
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
                <input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <label className="text-sm font-medium text-gray-600">Total Commission</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Payment Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                <option>Cash</option>
                <option>Cheque</option>
            </select>

            <label className="text-sm font-medium text-gray-600">Stamp Tax</label>
            <div className="flex items-center gap-2">
                <input type="text" defaultValue="0" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <span className="font-semibold text-gray-600">KMF</span>
            </div>

            <label className="text-sm font-medium text-gray-600">Amount</label>
             <div className="flex items-center gap-2">
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                <span className="font-semibold text-gray-600">KMF</span>
            </div>

            <label className="text-sm font-medium text-gray-600">Reference</label>
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900] justify-self-start" />
            
            <label className="text-sm font-medium text-gray-600">Remarks</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />

            <label className="text-sm font-medium text-gray-600">Checker</label>
            <input type="text" defaultValue="Admin" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 pt-6">
            <button type="submit" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Submit</button>
            <button onClick={onReturnClick} type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Return</button>
        </div>
      </form>
      <SelectBranchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </>
  );
};


// --- MODAL SUB-COMPONENT for Branch Selection ---
const SelectBranchModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Code", "Data", "Type", "Description", "Department"];
  const modalTableData = [ { code: '0000', date: '2022-09-06', type: 'Owner', description: 'SONELAC', department: 'Null' }];
  if (!isOpen) return null;
  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl';
  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg flex-shrink-0"><h3 className="text-lg font-semibold text-gray-900">Select A Branch</h3><div className="flex items-center space-x-2"><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button><button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div></div>
      <div className="p-6 space-y-4 flex-grow overflow-y-auto"><div className="flex items-center gap-4 text-sm pb-4 border-b"><label htmlFor="modal_code_branch" className="font-medium text-gray-600">Code</label><input id="modal_code_branch" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><label htmlFor="modal_name_branch" className="font-medium text-gray-600">Name</label><input id="modal_name_branch" type="text" className="w-56 px-3 py-2 border border-gray-300 rounded-md" /><button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search</button></div><PaginationControls /><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr><th className="p-3 text-left font-semibold"><Users size={16}/></th>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{modalTableData.map((row, index) => (<tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-200"><td className="p-3 text-gray-500"><Users size={16}/></td><td className="p-3 text-gray-700">{row.code}</td><td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-gray-700">{row.type}</td><td className="p-3 text-gray-700">{row.description}</td><td className="p-3 text-gray-700">{row.department}</td></tr>))}</tbody></table></div></div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t rounded-b-lg flex-shrink-0"><button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">OK</button><button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button></div>
    </div>
  );
};

// --- MODAL SUB-COMPONENT for POS Selection ---
const SelectPOSModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const modalTableHeaders = ["Branch", "IMEI", "Date", "Description"];
  const modalTableData = [ { branch: ['99TP0199TP01 - USSD', 'HURI MONEY'], imei: 'AVM-001', date: '2015-08-25 07:36:00', description: '1'}];
  if (!isOpen) return null;
  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-4xl';
  return (
    <div onClick={(e) => e.stopPropagation()} className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b py-2 px-4 rounded-t-lg flex-shrink-0"><h3 className="text-lg font-semibold text-gray-900">Select POS</h3><div className="flex items-center space-x-2"><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button><button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button></div></div>
      <div className="p-6 space-y-4 flex-grow overflow-y-auto"><div className="flex items-center gap-4 text-sm pb-4 border-b"><label htmlFor="modal_sn_pos" className="font-medium text-gray-600">SN</label><input id="modal_sn_pos" type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" /><label htmlFor="modal_imei_pos" className="font-medium text-gray-600">IMEI</label><input id="modal_imei_pos" type="text" className="w-48 px-3 py-2 border border-gray-300 rounded-md" /><button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Search...</button></div><PaginationControls /><div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-[#FF9900] text-white"><tr>{modalTableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead><tbody>{modalTableData.map((row, index) => (<tr key={index} className="bg-white hover:bg-gray-50 border-b border-gray-200"><td className="p-3 text-gray-700">{row.branch.map((line, i) => <div key={i}>{line}</div>)}</td><td className="p-3 text-gray-700">{row.imei}</td><td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-gray-700">{row.description}</td></tr>))}</tbody></table></div></div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t rounded-b-lg flex-shrink-0"><button onClick={onConfirm} className="px-6 py-2 bg-[#FF9900] text-white font-bold rounded-md hover:brightness-95 transition">Ok</button><button onClick={onClose} className="px-6 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-700 transition">Cancel</button></div>
    </div>
  );
};

// Reusable component for the pagination controls
const PaginationControls = () => (
  <div className="flex items-center justify-between my-4 text-sm"><div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} className="text-[#FF9900]" /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div><div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><ArrowRight size={22} className="text-green-500 cursor-pointer" /></div></div>
);

// Main component for the Recharge page
const Recharge = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isPOSModalOpen, setIsPOSModalOpen] = useState(false);
  const tableHeaders = ["Recharge Date", "Branch", "IMEI", "POS Owner", "Reference", "Amount", "Operator", "Approval", "Checker", "Office", "Cancelled Reason"];
  const rechargeData = [ { date: '2022-09-06', branch: ['997P04991P04', '- Eximbank'], imei: '', posOwner: '', reference: 'Text Examine', amount: '1.0000000', operator: 'Admin', approval: true, checker: 'Admin', office: '', cancelledReason: '' }, ];

  if (viewMode === 'form') {
    return (
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">Recharge</h1><div className="flex space-x-2"><button className="w-28 text-center py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button><button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button><button className="w-28 text-center py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100">Details</button><button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Approval</button><button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Reject</button><button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Reverse</button></div></div>
        <NewRechargeForm onReturnClick={() => setViewMode('list')} />
      </div>
    );
  }

  return (
    <>
      <div className="p-6 w-full bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Branch Recharge List</h1>
          <div className="flex space-x-2">
            <button className="w-28 text-center py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
            <button onClick={() => setViewMode('form')} className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
            <button className="w-28 text-center py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100">Details</button>
            <button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Approval</button>
            <button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Reject</button>
            <button className="w-28 text-center py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Reverse</button>
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 mb-6 max-w-xl">
            <label className="text-sm font-medium text-gray-600">Account Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"><option value=""></option><option value="branch">Branch Account</option><option value="terminal">Terminal Account</option></select>
            <label className="text-sm font-medium text-gray-600">Branch</label>
            <div className="flex items-center gap-1"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><button onClick={() => setIsBranchModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button><button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button></div>
            <label className="text-sm font-medium text-gray-600">POS</label>
            <div className="flex items-center gap-1"><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /><button onClick={() => setIsPOSModalOpen(true)} type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><MoreHorizontal size={22} /></button><button type="button" className="p-2 bg-[#FF9900] text-white rounded-md hover:brightness-95 transition"><X size={22} /></button></div>
            <label className="text-sm font-medium text-gray-600">Status</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <label className="text-sm font-medium text-gray-600">Date From</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <label className="text-sm font-medium text-gray-600">Date Too</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <div></div>
            <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min mt-2">Search...</button>
        </div>
        <div>
          <PaginationControls />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#FF9900] text-white"><tr>{tableHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr></thead>
              <tbody>
                {rechargeData.map((row, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-yellow-100 transition-colors cursor-pointer`}>
                    <td className="p-3 text-gray-700">{row.date}</td><td className="p-3 text-gray-700">{row.branch.map((line, i) => <div key={i}>{line}</div>)}</td>
                    <td className="p-3 text-gray-700">{row.imei}</td><td className="p-3 text-gray-700">{row.posOwner}</td>
                    <td className="p-3 text-gray-700">{row.reference}</td><td className="p-3 text-gray-700">{row.amount}</td>
                    <td className="p-3 text-gray-700">{row.operator}</td><td className="p-3 text-center">{row.approval && <CheckCircle2 className="text-black mx-auto" size={20} />}</td>
                    <td className="p-3 text-gray-700">{row.checker}</td><td className="p-3 text-gray-700">{row.office}</td>
                    <td className="p-3 text-gray-700">{row.cancelledReason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SelectBranchModal isOpen={isBranchModalOpen} onClose={() => setIsBranchModalOpen(false)} onConfirm={() => setIsBranchModalOpen(false)} />
      <SelectPOSModal isOpen={isPOSModalOpen} onClose={() => setIsPOSModalOpen(false)} onConfirm={() => setIsPOSModalOpen(false)} />
    </>
  );
};

export default Recharge;