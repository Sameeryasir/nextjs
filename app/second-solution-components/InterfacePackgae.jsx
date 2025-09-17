"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';

// --- SUB-COMPONENT for the "Add New Authorization" Form ---
const AddNewAuthorizationForm = ({ onReturnClick }) => {
    const [formData, setFormData] = useState({
        branchCode: '00001',
        branchName: '0101 - ZHES',
        type: 'Owner',
        sn: '2',
        description: '',
        remarks: '',
        applicationDate: '25-05-11',
        applicationInfo: '',
        applicant: '',
        authDate: '25-05-11',
        authCode: '',
        startingDate: '25-05-11',
        days: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const FormRow = ({ label, children }) => (
        <div className="grid grid-cols-[10rem_1fr] items-center gap-x-4">
            <label className="text-sm font-medium text-gray-600 justify-self-end">{label}</label>
            <div>{children}</div>
        </div>
    );

    return (
        <div className="p-6 w-full bg-white">
             {/* Page Header for the Form */}
            <div className="flex justify-end items-center mb-6">
                <div className="flex space-x-2">
                    <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                    <button className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
                    <button className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Print</button>
                </div>
            </div>
            <form className="max-w-3xl space-y-4">
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Info</h2>
                    <div className="space-y-3">
                        <FormRow label="Branch">
                            <div className="flex items-center gap-2">
                                <input type="text" name="branchCode" value={formData.branchCode} onChange={handleChange} className="w-24 px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readOnly/>
                                <input type="text" name="branchName" value={formData.branchName} onChange={handleChange} className="flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readOnly/>
                            </div>
                        </FormRow>
                        <FormRow label="Type"><input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100" readOnly /></FormRow>
                        <FormRow label="S.N."><input type="text" name="sn" value={formData.sn} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Description"><input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Remarks"><input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                    </div>
                </section>
                <hr className="my-8" />
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Application Information</h2>
                    <div className="space-y-3">
                        <FormRow label="Application Date"><input type="text" name="applicationDate" value={formData.applicationDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Application Information"><input type="text" name="applicationInfo" value={formData.applicationInfo} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Applicant"><input type="text" name="applicant" value={formData.applicant} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                    </div>
                </section>
                <hr className="my-8" />
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Authorization Information</h2>
                    <div className="space-y-3">
                        <FormRow label="Auth Date"><input type="text" name="authDate" value={formData.authDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Auth Code"><input type="text" name="authCode" value={formData.authCode} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Starting Date"><input type="text" name="startingDate" value={formData.startingDate} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                        <FormRow label="Days"><input type="text" name="days" value={formData.days} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md" /></FormRow>
                    </div>
                </section>
                <div className="flex justify-end space-x-2 pt-8">
                    <button type="button" className="w-28 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                    <button onClick={onReturnClick} type="button" className="w-28 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">Return</button>
                </div>
            </form>
        </div>
    );
};


// --- Reusable component for the pagination controls ---
const PaginationControls = () => (
    <div className="flex items-center justify-between my-4 text-sm">
        <div className="flex items-center space-x-1 text-gray-600">
            <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsLeft size={18} /></button>
            <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronLeft size={18} /></button>
            <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronRight size={18} /></button>
            <button className="p-1.5 rounded-md hover:bg-gray-200"><ChevronsRight size={18} /></button>
        </div>
        <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-600">Total 0 Records, Record 1 - 0, Page 1/10, Turn To Page</span>
            <input type="text" className="w-16 px-2 py-1.5 border border-gray-300 rounded-md text-center" />
            <button className="p-1.5 rounded-full bg-green-500 text-white hover:bg-green-600"><ArrowRight size={16} /></button>
        </div>
    </div>
);


// --- MAIN BROWSE BRANCH COMPONENT ---
const InterfacePackgae = () => {
    // **1. STATE ADDED:** This state manages which view is active ('list' or 'form').
    const [viewMode, setViewMode] = useState('list'); 

    const listData = [
        { code: '0000', date: '2022-09-06', types: 'Owner', description: 'SONELAC', department: 'Null', accBalance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', active: true },
        { code: '0000', date: '2022-09-06', types: 'Owner', description: 'SONELAC', department: 'Null', accBalance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', active: true },
        { code: '0000', date: '2022-09-06', types: 'Owner', description: 'SONELAC', department: 'Null', accBalance: '0.0000', kwh: '0.00', amount: '0.00', commission: '0.00', active: true },
    ];
    const authHeaders = ["Code", "Date", "Description", "Auth Date", "Starting Date", "Days"];
    const listHeaders = ["Code", "Date", "Types", "Description", "Department", "Acc.Balance", "KwH", "Amount", "Comission", "Active"];

    // **3. CONDITIONAL RENDERING:** If viewMode is 'form', render the form component.
    if (viewMode === 'form') {
        return <AddNewAuthorizationForm onReturnClick={() => setViewMode('list')} />;
    }

    // By default, render the list view.
    return (
        <div className="p-6 w-full bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">List Of Branch</h1>
                <div className="flex space-x-2">
                    <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Refresh</button>
                    <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700">New</button>
                    <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">Print</button>
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
                    {/* **2. ONCLICK HANDLER ADDED:** This button now changes the viewMode state. */}
                    <button onClick={() => setViewMode('form')} className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:brightness-95 transition">
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

export default InterfacePackgae;