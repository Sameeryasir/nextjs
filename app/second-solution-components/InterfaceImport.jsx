"use client";
import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

// --- Save Success Modal Component ---
const SaveSuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm mx-4 text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Save Success</h2>
                <button 
                    onClick={onClose}
                    className="w-full px-8 py-3 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]"
                >
                    OK
                </button>
            </div>
        </div>
    );
};


const InterfaceImportFile = () => {
    // State for form data
    const [formData, setFormData] = useState({
        fileName: 'Common',
        language: 'English (English)'
    });
    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle the import action and show the modal
    const handleImport = () => {
        console.log("Importing file with data:", formData);
        setIsModalOpen(true);
    };

    const labelClass = "w-32 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";

    return (
        <>
            <div className="bg-white p-6 md:p-8 min-h-screen">
                <div className="max-w-xl">
                    <h1 className="text-xl font-bold text-gray-800 mb-8">Import Language File</h1>
                    <div className="space-y-5">
                        <div className="flex items-center gap-4">
                            <label className={labelClass}>File Name</label>
                            <div className="flex-grow flex items-center gap-2">
                                <select 
                                    name="fileName" 
                                    value={formData.fileName} 
                                    onChange={handleChange} 
                                    className={`${inputClass} bg-white`}
                                >
                                    <option value="Common">Common</option>
                                    <option value="Other">Other</option>
                                </select>
                                <button 
                                    onClick={handleImport}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md border border-gray-300 hover:bg-gray-300"
                                >
                                    Import
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className={labelClass}>Language</label>
                            <input 
                                type="text" 
                                name="language" 
                                value={formData.language} 
                                onChange={handleChange} 
                                className={inputClass} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SaveSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default InterfaceImportFile;
