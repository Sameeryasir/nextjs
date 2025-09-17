"use client";
import React, { useState } from 'react';
import { Folder, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

// --- Operator Form Component ---
const OperatorForm = ({ initialData, onReturn }) => {
    const [formData, setFormData] = useState(
        initialData || {
            code: '',
            name: '',
            description: '',
            mainRole: '',
            department: 'SECDAIS',
            bindIp: false,
            loginDisabled: false,
            disableExamine: false,
        }
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        onReturn(); // Return to list after submission
    };

    const labelClass = "w-32 text-sm font-medium text-gray-700";
    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md";

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
             <form onSubmit={handleSubmit}>
                {/* Basic Information Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Basic Information</h2>
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center">
                            <label className={labelClass}>Code</label>
                            <input type="text" name="code" value={formData.code} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="flex items-center">
                            <label className={labelClass}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="flex items-center">
                            <label className={labelClass}>Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="flex items-center">
                            <label className={labelClass}>Main Role</label>
                            <select name="mainRole" value={formData.mainRole} onChange={handleChange} className={`${inputClass} bg-white`}>
                                <option value="">Select Role</option>
                                <option value="ADMINISTRATOR">Administrator</option>
                                <option value="OPERATOR">Operator</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className={labelClass}>Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} className={`${inputClass} bg-white`}>
                                <option value="SECDAIS">SECDAIS</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Authority Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Authority</h2>
                    <div className="space-y-4 max-w-2xl">
                       <div className="flex items-center">
                           <label className={labelClass}>Bind IP</label>
                           <input type="checkbox" name="bindIp" checked={formData.bindIp} onChange={handleChange} className="h-5 w-5" />
                       </div>
                        <div className="flex items-center">
                           <label className={labelClass}>Access Control</label>
                           <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="loginDisabled" checked={formData.loginDisabled} onChange={handleChange} className="h-5 w-5" />
                                    <span>Login Disabled</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" name="disableExamine" checked={formData.disableExamine} onChange={handleChange} className="h-5 w-5" />
                                    <span>Disable To Examine Operator List</span>
                                </label>
                           </div>
                       </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button type="submit" className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">Submit</button>
                    <button type="button" className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">Refresh</button>
                    <button type="button" className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">New</button>
                    <button type="button" onClick={onReturn} className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">Return</button>
                </div>

            </form>
        </div>
    );
};


const OperatorList = () => {
    // State to toggle between list and form views
    const [view, setView] = useState('list'); // 'list' or 'form'
    // State to hold the currently selected operator for modification
    const [selectedOperator, setSelectedOperator] = useState(null);
     // State to hold the data for the selected row
    const [selectedRow, setSelectedRow] = useState(null);

    const operatorData = [
        { userCode: '1155', userName: 'Wardo Mohamed', description: 'Directrices Commerciale', department: 'DIRECTION GENERAL', role: 'ADMINISTRATOR' },
        { userCode: 'Admin', userName: 'Administrator', description: 'Administrator', department: 'NULL', role: 'ADMINISTRATOR' },
        { userCode: 'Admin', userName: 'Administrator', description: 'Administrator', department: 'NULL', role: 'ADMINISTRATOR' },
        { userCode: '1155', userName: 'Wardo Mohamed', description: 'Directrices Commerciale', department: 'DIRECTION GENERAL', role: 'ADMINISTRATOR' },
        { userCode: 'Admin', userName: 'Administrator', description: 'Administrator', department: 'NULL', role: 'ADMINISTRATOR' },
    ];

    const handleNew = () => {
        setSelectedOperator(null); // Ensure no data is pre-filled
        setView('form');
    };

    const handleModify = () => {
        if (selectedRow) {
            setSelectedOperator(selectedRow); // Set the selected operator data for the form
            setView('form');
        } else {
            alert("Please select an operator to modify.");
        }
    };
    
    // If the view is 'form', render the OperatorForm
    if (view === 'form') {
        return <OperatorForm initialData={selectedOperator} onReturn={() => setView('list')} />
    }

    // Otherwise, render the OperatorList
    return (
        <div className="bg-white p-6 md:p-8 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-x-8">
            {/* Left Column: Department List */}
            <div className="col-span-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Department List</h2>
                <div className="bg-gray-100 p-2 rounded-md border border-gray-200 cursor-pointer">
                    <div className="bg-white flex items-center p-3 rounded-md shadow-sm">
                        <Folder className="w-5 h-5 text-orange-500 mr-3" />
                        <p className="text-sm font-semibold text-gray-800">SECDAIS</p>
                    </div>
                </div>
            </div>

            {/* Right Column: Operator List */}
            <div className="col-span-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Operator List</h2>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00] transition-colors">
                            Refresh
                        </button>
                        <button className="px-4 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00] transition-colors">
                            Excel
                        </button>
                         <button onClick={handleModify} className="px-4 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00] transition-colors">
                            Modify
                        </button>
                         <button className="px-4 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00] transition-colors">
                            Delete
                        </button>
                        <button onClick={handleNew} className="px-4 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors">
                            New
                        </button>
                    </div>
                </div>

                <p className="text-sm font-medium text-gray-600 mb-4">Searching Condition</p>

                <PaginationControls totalRecords={operatorData.length} />

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-[#FF9900] text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User Code</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Department</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {operatorData.map((op, index) => (
                                <tr 
                                    key={index} 
                                    onClick={() => setSelectedRow(op)}
                                    className={`border-b border-gray-200 cursor-pointer ${selectedRow?.userCode === op.userCode ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                >
                                    <td className="py-3 px-4">{op.userCode}</td>
                                    <td className="py-3 px-4">{op.userName}</td>
                                    <td className="py-3 px-4">{op.description}</td>
                                    <td className="py-3 px-4">{op.department}</td>
                                    <td className="py-3 px-4">{op.role}</td>
                                    <td className="py-3 px-4">
                                        <button className="px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-md hover:bg-gray-900">
                                            Change Password
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Pagination Controls Component
const PaginationControls = ({ totalRecords, pageIndex = 0, totalPages = 1 }) => {
    return (
        <div className="flex items-center justify-between mb-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
                <ChevronsLeft className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                <ChevronRight className="w-5 h-5 cursor-pointer hover:text-gray-800" />
                <ChevronsRight className="w-5 h-5 cursor-pointer hover:text-gray-800" />
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span>Total {totalRecords} Records,</span>
                <span>Record {totalRecords > 0 ? pageIndex * 10 + 1 : 0} - {Math.min((pageIndex + 1) * 10, totalRecords)},</span>
                <span>Page {pageIndex + 1}/{totalPages},</span>
                <span>Turn To Page</span>
                <input
                    type="text"
                    defaultValue={pageIndex + 1}
                    className="w-12 border border-gray-300 rounded-md px-2 py-1 text-center"
                />
                <ChevronRight className="w-5 h-5 text-green-500 cursor-pointer hover:text-green-600" />
            </div>
        </div>
    );
};


export default OperatorList;
