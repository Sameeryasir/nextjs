"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  CheckCircle2,
  Users,
  MoreHorizontal, 
  Building2, 
  X, 
  Minus, 
  Square
} from 'lucide-react';

// --- MODAL SUB-COMPONENT (for the AddBranchForm) ---
const SelectDepartmentModal = ({ isOpen, onClose, onConfirm }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  if (!isOpen) return null;
  const modalContainerClasses = isMaximized ? 'w-[95vw] h-[95vh]' : 'w-full max-w-2xl';
  const modalBodyClasses = isMaximized ? 'flex-grow' : 'h-72';
  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}>
      <div className="flex justify-between items-center bg-gray-100 border-b border-gray-200 py-2 px-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Select Department</h3>
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><Minus size={20} /></button>
          <button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600"><Square size={20} /></button>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
      </div>
      <div className={`p-6 space-y-2 overflow-y-auto ${modalBodyClasses}`}>
        <div className="flex items-center p-3 bg-yellow-500/10 border-2 border-yellow-500 rounded-md cursor-pointer">
          <Building2 className="w-5 h-5 text-yellow-600 mr-4 shrink-0" />
          <span className="font-semibold text-gray-800">SECDAIS</span>
        </div>
      </div>
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t border-gray-200 rounded-b-lg flex-shrink-0">
        <button onClick={onConfirm} className="bg-[#FF9900] text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600">OK</button>
        <button onClick={onClose} className="bg-gray-700 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800">Cancel</button>
      </div>
    </div>
  );
};

// --- "ADD BRANCH" FORM SUB-COMPONENT (Opens when "New" is clicked) ---
const AddBranchForm = ({ onReturnClick }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = (e) => e.preventDefault();
  const handleDepartmentSelect = () => setIsModalOpen(false);
  
  return (
    <>
      <div className="p-6 w-full bg-white">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Branch Information</h1>
        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
          <div className="flex items-center">
            <label htmlFor="departments-add" className="w-36 text-sm font-medium text-gray-700 shrink-0">Departments</label>
            <div className="flex flex-grow items-center gap-2">
              <input type="text" id="departments-add" className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
              <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
              <button onClick={() => setIsModalOpen(true)} type="button" className="bg-[#FF9900] text-white p-2 rounded-md hover:bg-orange-600 shrink-0">
                <MoreHorizontal size={22} />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <label htmlFor="type-add" className="w-36 text-sm font-medium text-gray-700 shrink-0">Type</label>
            <select id="type-add" defaultValue="owner" className="flex-grow px-3 py-2 border border-gray-300 rounded-md">
              <option value="owner">Owner</option>
              <option value="franchise">Franchise</option>
            </select>
          </div>
          <div className="flex items-center"><label htmlFor="code-add" className="w-36 text-sm font-medium text-gray-700 shrink-0">Code</label><input type="text" id="code-add" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          <div className="flex items-center"><label htmlFor="description-add" className="w-36 text-sm font-medium text-gray-700 shrink-0">Description</label><input type="text" id="description-add" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
          
          <div className="pt-4">
            <div className="border-b border-gray-200"><nav className="-mb-px flex space-x-6"><button type="button" onClick={() => setActiveTab('general')} className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-[#FF9900] text-[#FF9900]' : 'border-transparent text-gray-500'}`}>General</button><button type="button" onClick={() => setActiveTab('advance')} className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'advance' ? 'border-[#FF9900] text-[#FF9900]' : 'border-transparent text-gray-500'}`}>Advance</button></nav></div>
          </div>
          {activeTab === 'general' && (
            <div className="space-y-5 pt-4">
              <h2 className="text-xl font-semibold text-gray-700 pl-36">Base Info</h2>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Contact</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Mobile</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Phone</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Fax</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Address</label><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
              <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Active</label><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" /></div>
            </div>
          )}
          {activeTab === 'advance' && (
            <div className="space-y-5 pt-4">
                <div className="flex"><label className="w-36 text-sm font-medium text-gray-700 shrink-0 pt-1">Allow Vending</label><div className="flex flex-col gap-2"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" /><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" /></div></div>
                <div className="flex"><div className="w-36 shrink-0" /><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                <div className="flex"><div className="w-36 shrink-0" /><input type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Deposit</label><input type="text" defaultValue="0.00" className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Commission Payer</label><select className="flex-grow px-3 py-2 border border-gray-300 rounded-md"><option>Owner</option></select></div>
                <div className="flex"><label className="w-36 text-sm font-medium text-gray-700 shrink-0 pt-2">Commission List</label><div className="flex-grow"><table className="w-full text-sm border-collapse border border-gray-300"><thead className="bg-[#FF9900] text-white"><tr><th className="p-2 font-semibold text-left">SN</th><th className="p-2 font-semibold text-left">Amount</th><th className="p-2 font-semibold text-left">Type</th><th className="p-2 font-semibold text-left">Factor</th></tr></thead><tbody /></table></div></div>
            </div>
          )}
          <div className="flex justify-end items-center space-x-4 pt-4">
            <button type="submit" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Submit</button>
            <button type="button" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Refresh</button>
            <button onClick={onReturnClick} type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Return</button>
          </div>
        </form>
      </div>
      <SelectDepartmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDepartmentSelect} />
    </>
  );
};

// --- "ADD NEW AUTHORIZATION" FORM SUB-COMPONENT ---
const AddNewAuthorizationForm = ({ onReturnClick }) => {
    // 👇 **CHANGED**: Styles of this form's fields now match the "Add Branch" form.
    const [formData, setFormData] = useState({
        branchCode: '00001', branchName: '0101 - ZHES', type: 'Owner', sn: '2',
        description: '', remarks: '', applicationDate: '25-05-11', applicationInfo: '',
        applicant: '', authDate: '25-05-11', authCode: '', startingDate: '25-05-11', days: '',
    });
    return (
        <div className="p-6 w-full bg-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Basic Info</h2>
                <div className="flex space-x-2"><button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button><button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button><button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Print</button></div>
            </div>
            <form className="max-w-xl space-y-5">
                <section>
                    <div className="space-y-5">
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Branch</label><div className="flex flex-grow items-center gap-2"><input type="text" value={formData.branchCode} className="w-24 px-3 py-2 border border-gray-300 rounded-md bg-gray-100"/><input type="text" value={formData.branchName} className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-100" /></div></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Type</label><input type="text" value={formData.type} className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-100" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">S.N.</label><input type="text" value={formData.sn} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Description</label><input type="text" value={formData.description} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Remarks</label><input type="text" value={formData.remarks} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                    </div>
                </section>
                <hr className="my-8" />
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Application Information</h2>
                    <div className="space-y-5">
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Application Date</label><input type="text" value={formData.applicationDate} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Application Information</label><input type="text" value={formData.applicationInfo} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Applicant</label><input type="text" value={formData.applicant} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                    </div>
                </section>
                <hr className="my-8" />
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Authorization Information</h2>
                    <div className="space-y-5">
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Auth Date</label><input type="text" value={formData.authDate} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Auth Code</label><input type="text" value={formData.authCode} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Starting Date</label><input type="text" value={formData.startingDate} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                        <div className="flex items-center"><label className="w-36 text-sm font-medium text-gray-700 shrink-0">Days</label><input type="text" value={formData.days} className="flex-grow px-3 py-2 border border-gray-300 rounded-md" /></div>
                    </div>
                </section>
                <div className="flex justify-end space-x-2 pt-8"><button type="button" className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button><button onClick={onReturnClick} type="button" className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Return</button></div>
            </form>
        </div>
    );
};


// --- PAGINATION CONTROLS ---
const PaginationControls = () => (
    <div className="flex items-center justify-between my-4 text-sm">
        <div className="flex items-center space-x-1 text-gray-600"><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} /></button><button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button></div>
        <div className="flex items-center space-x-3"><span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span><input type="text" className="w-16 px-2 py-1.5 border border-gray-300 rounded-md text-center" /><button className="p-1.5 rounded-full bg-green-500 text-white hover:bg-green-600"><ArrowRight size={16} /></button></div>
    </div>
);


// --- MAIN BROWSE BRANCH COMPONENT ---
const BrowseBranch = () => {
    // State now manages three possible views
    const [viewMode, setViewMode] = useState('list'); 

    const listData = [ { code: '0000', date: '2022-09-06', types: 'Owner', description: 'SONELAC', department: 'Null', accBalance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', active: true }, ];
    const authHeaders = ["Code", "Date", "Description", "Auth Date", "Starting Date", "Days"];
    const listHeaders = ["Code", "Date", "Types", "Description", "Department", "Acc.Balance", "KwH", "Amount", "Comission", "Active"];

    // Conditional Rendering Logic
    if (viewMode === 'auth_form') {
        return <AddNewAuthorizationForm onReturnClick={() => setViewMode('list')} />;
    }
    if (viewMode === 'add_branch_form') {
        return <AddBranchForm onReturnClick={() => setViewMode('list')} />;
    }

    // Default View: The List
    return (
        <div className="p-6 w-full bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">List Of Branch</h1>
                <div className="flex space-x-2">
                    <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                    <button onClick={() => setViewMode('add_branch_form')} className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
                    <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Print</button>
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Condition</h2>
                <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 max-w-lg">
                    <label className="text-sm font-medium text-gray-600">Code</label>
                    <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
                    <label className="text-sm font-medium text-gray-600">Description</label>
                    <input type="text" className="px-3 py-2 border border-gray-300 rounded-md" />
                    <div></div>
                    <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition w-min">Search...</button>
                </div>
            </div>
            <div>
                <PaginationControls />
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#FF9900] text-white">
                            <tr>
                                <th className="p-3 text-left font-semibold"><Users size={16}/></th>
                                {listHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map((row, index) => (
                                <tr key={index} className="bg-white hover:bg-gray-50">
                                   <td className="p-3 text-gray-500"><Users size={16}/></td>
                                   <td className="p-3 text-gray-700">{row.code}</td>
                                   <td className="p-3 text-gray-700">{row.date}</td>
                                   <td className="p-3 text-gray-700">{row.types}</td>
                                   <td className="p-3 text-gray-700">{row.description}</td>
                                   <td className="p-3 text-gray-700">{row.department}</td>
                                   <td className="p-3 text-gray-700">{row.accBalance}</td>
                                   <td className="p-3 text-gray-700">{row.kwh}</td>
                                   <td className="p-3 text-gray-700">{row.amount}</td>
                                   <td className="p-3 text-gray-700">{row.commission}</td>
                                   <td className="p-3 text-center">{row.active && <CheckCircle2 className="text-black mx-auto" size={20} />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Refresh</button>
                    <button onClick={() => setViewMode('auth_form')} className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">
                        Add New Authorization
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex items-baseline space-x-4">
                    <h2 className="text-xl font-bold text-gray-800">Authorization</h2>
                    <span className="text-lg font-semibold text-gray-600">Recharge</span>
                </div>
                <PaginationControls />
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#FF9900] text-white">
                            <tr>{authHeaders.map(header => <th key={header} className="p-3 text-left font-semibold">{header}</th>)}</tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={authHeaders.length} className="p-10 text-center text-gray-400 bg-white">No authorization data available.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BrowseBranch;