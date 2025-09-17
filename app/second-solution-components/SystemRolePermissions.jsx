"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings, X } from 'lucide-react';

// --- Add New Items Modal Component ---
const AddNewItemsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        code: '',
        roleName: '',
        department: 'SECDAIS',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Item Data:", formData);
        onClose(); // Close the modal on submit
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4 border-2 border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Add New Items</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center">
                        <label className="w-32 text-sm font-medium text-gray-700">Code</label>
                        <input type="text" name="code" value={formData.code} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-sm font-medium text-gray-700">Role Name</label>
                        <input type="text" name="roleName" value={formData.roleName} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32 text-sm font-medium text-gray-700">Department</label>
                        <input type="text" name="department" value={formData.department} readOnly className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                    </div>
                    <div className="flex items-start">
                        <label className="w-32 text-sm font-medium text-gray-700 pt-2">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="flex-grow px-4 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                         <button type="submit" className="px-8 py-2.5 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                            OK
                        </button>
                        <button type="button" onClick={onClose} className="px-8 py-2.5 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const RolesPermission = () => {
    // State for managing modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State for active tab in the operator section
    const [activeTab, setActiveTab] = useState('operator');

    // Mock data for the roles list
    const rolesData = [
        { code: '2', roleName: 'Administrator', description: 'Administrator', department: 'DIRECTION GENERAL' },
        { code: '4', roleName: 'TP', description: 'Tp', department: 'DIRECTION GENERAL' },
        { code: '5', roleName: 'DC', description: 'Directrices Commerciale', department: 'DIRECTION GENERAL' },
        { code: '6', roleName: 'Caissier Principle', description: 'Caissier Principle', department: 'DIRECTION GENERAL' },
    ];

    // Mock data for the operator list
    const operatorData = [
        { userCode: '001', userName: 'John Doe', description: 'Main Operator', department: 'DIRECTION GENERAL', role: 'Administrator' },
        { userCode: '002', userName: 'Jane Smith', description: 'Backup Operator', department: 'DIRECTION GENERAL', role: 'TP' },
        { userCode: '003', userName: 'Peter Jones', description: 'Commercial Director', department: 'DIRECTION GENERAL', role: 'DC' },
    ];

    return (
        <>
            <div className="p-6 md:p-8 bg-white min-h-screen">
                {/* Roles List Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Roles List</h2>
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00] transition-colors">
                                Refresh
                            </button>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition-colors">
                                New
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                         <p className="text-sm font-medium text-gray-600">Searching Condition</p>
                    </div>

                    <PaginationControls totalRecords={rolesData.length} />

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-[#FF9900] text-white">
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Code</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role Name</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Department</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {rolesData.map((role, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-4 flex items-center"><Settings className="w-4 h-4 mr-2 text-gray-500" />{role.code}</td>
                                        <td className="py-3 px-4">{role.roleName}</td>
                                        <td className="py-3 px-4">{role.description}</td>
                                        <td className="py-3 px-4">{role.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Operator Section */}
                <div>
                     <div className="flex items-center border-b-2 border-gray-200 mb-4">
                        <button
                            onClick={() => setActiveTab('operator')}
                            className={`py-2 px-4 text-xl font-bold ${activeTab === 'operator' ? 'border-b-2 border-[#FF9900] text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Operator
                        </button>
                        <button
                            onClick={() => setActiveTab('permission')}
                            className={`py-2 px-4 text-xl font-bold ${activeTab === 'permission' ? 'border-b-2 border-[#FF9900] text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Permission
                        </button>
                    </div>
                    
                    {activeTab === 'operator' && (
                        <>
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
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                       {operatorData.length > 0 ? (
                                            operatorData.map((op, index) => (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-4">{op.userCode}</td>
                                                    <td className="py-3 px-4">{op.userName}</td>
                                                    <td className="py-3 px-4">{op.description}</td>
                                                    <td className="py-3 px-4">{op.department}</td>
                                                    <td className="py-3 px-4">{op.role}</td>
                                                </tr>
                                            ))
                                       ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-10 text-gray-500">No data available</td>
                                            </tr>
                                       )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                     {activeTab === 'permission' && (
                        <div className="text-center py-10 text-gray-500">
                            Permission details will be displayed here.
                        </div>
                    )}
                </div>
            </div>
            
            <AddNewItemsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
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

export default RolesPermission;
