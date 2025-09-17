"use client";
import React, { useState } from 'react';
import { Folder } from 'lucide-react';

const DepartmentForm = () => {
    // Original data for resetting the form
    const initialFormData = {
        code: 'SECDAIS',
        name: "Company's Phone",
        telephone: "Company's Fax",
        fax: 'Zip',
        supervisor: 'ADDRESS',
        managementScoop: 'INHERITED',
        region1: '',
        region2: '',
        address: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    // State to toggle between 'New' and 'Submit'/'Cancel' buttons
    const [isEditing, setIsEditing] = useState(false);

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Show Submit/Cancel buttons and clear the form for new entry
    const handleNew = () => {
        setIsEditing(true);
        setFormData({
            code: '',
            name: '',
            telephone: '',
            fax: '',
            supervisor: '',
            managementScoop: 'INHERITED',
            region1: '',
            region2: '',
            address: '',
        });
    };
    
    // Hide Submit/Cancel buttons and reset the form
    const handleCancel = () => {
        setIsEditing(false);
        setFormData(initialFormData);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // After submission, hide Submit/Cancel and show New button again
        setIsEditing(false);
        setFormData(initialFormData);
    };

    // Input field classes
    const labelClass = "w-40 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";
    const readOnlyInputClass = `${inputClass} bg-gray-100`;

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-x-12">
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

            {/* Right Column: Department Details Form */}
            <div className="col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Details Of Department</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center">
                        <label className={labelClass}>Code</label>
                        <input type="text" name="code" value={formData.code} readOnly={!isEditing} className={isEditing ? inputClass : readOnlyInputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Telephone</label>
                        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Fax</label>
                        <input type="text" name="fax" value={formData.fax} onChange={handleChange} className={inputClass} />
                    </div>
                     <div className="flex items-center">
                        <label className={labelClass}>Supervisor</label>
                        <input type="text" name="supervisor" value={formData.supervisor} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Management Scoop</label>
                        <select name="managementScoop" value={formData.managementScoop} onChange={handleChange} className={`${inputClass} bg-white`}>
                            <option value="INHERITED">INHERITED</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </div>
                     <div className="flex items-center">
                        <label className={labelClass}>Region</label>
                        <div className="flex-grow flex gap-4">
                           <input type="text" name="region1" value={formData.region1} onChange={handleChange} className={inputClass} />
                           <input type="text" name="region2" value={formData.region2} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>
                     <div className="flex items-center">
                        <label className={labelClass}>Address</label>
                        <input name="address" value={formData.address} onChange={handleChange} className={inputClass} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-6">
                        {isEditing ? (
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-12 py-3 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-12 py-3 bg-[#0D223F] text-white font-bold rounded-md hover:bg-[#1c3a64] transition-all"
                                >
                                    Submit
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNew}
                                className="px-12 py-3 bg-[#F59E0B] text-white font-bold rounded-md hover:bg-[#d97706] transition-all"
                            >
                                New
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentForm;
