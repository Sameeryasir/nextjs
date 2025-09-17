"use client";
import React, { useState } from 'react';
import { Check, Settings } from 'lucide-react';

// --- Language Form Component ---
const LanguageForm = ({ onReturn }) => {
    const [formData, setFormData] = useState({
        name: '',
        isoCode: '',
        activated: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        onReturn(); // Return to the list after submission
    };

    return (
        <div className="max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-8">Basic Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md" 
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">ISO Code</label>
                    <select 
                        name="isoCode" 
                        value={formData.isoCode} 
                        onChange={handleChange} 
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-white"
                    >
                        <option value="">Select Code</option>
                        <option value="EN">EN</option>
                        <option value="ZH">ZH</option>
                        <option value="FR">FR</option>
                        <option value="AR">AR</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Activated</label>
                    <input 
                        type="checkbox" 
                        name="activated" 
                        checked={formData.activated} 
                        onChange={handleChange} 
                        className="h-5 w-5" 
                    />
                </div>
                <div className="flex items-center gap-4 pt-6">
                    <button type="submit" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                        Submit
                    </button>
                    <button type="button" className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                        Refresh
                    </button>
                    <button type="button" onClick={onReturn} className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                        Return
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- Language List Component ---
const LanguageList = ({ onNew }) => {
    const languageData = [
        { id: '1', name: 'English (English)', isoCode: 'EN', activated: true },
        { id: '2', name: '中文 (Chinese)', isoCode: 'ZH', activated: true },
        { id: '3', name: 'Français', isoCode: 'FR', activated: true },
        { id: '4', name: 'Arabic', isoCode: 'AR', activated: true },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Language List</h1>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                        Refresh
                    </button>
                    <button onClick={onNew} className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                        New
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-[#FF9900] text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ISO Code</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Activated</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {languageData.map(lang => (
                            <tr key={lang.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4 flex items-center">
                                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                                    {lang.id}
                                </td>
                                <td className="py-3 px-4">{lang.name}</td>
                                <td className="py-3 px-4">{lang.isoCode}</td>
                                <td className="py-3 px-4">
                                    {lang.activated && <Check className="w-5 h-5 text-green-500" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const InterfaceLanguage = () => {
    const [view, setView] = useState('list'); // 'list' or 'form'

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            {view === 'list' ? (
                <LanguageList onNew={() => setView('form')} />
            ) : (
                <LanguageForm onReturn={() => setView('list')} />
            )}
        </div>
    );
};

export default InterfaceLanguage;
