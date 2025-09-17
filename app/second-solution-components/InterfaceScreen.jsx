"use client";
import React, { useState } from 'react';

const InterfaceScreenForm = () => {
    // State to manage form data, pre-filled with values from the image
    const [formData, setFormData] = useState({
        title: 'SECDAIS INTEGRA',
        topTitle: 'SECDAIS INTEGRA',
        topIcon: '',
        widthOfTopIcon: '45 PX',
        heightOfTopIcon: '45 PX Less Than 50 PX',
        statusBarMiddleWords: 'SECDAIS INTEGRA',
        noticeText: 'SECDAIS INTEGRA USSD'
    });

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const labelClass = "w-48 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            <div className="max-w-3xl">
                <form onSubmit={handleSubmit}>
                    {/* IE Explorer Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">IE Explorer</h2>
                        <div className="flex items-center">
                            <label className={labelClass}>Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    {/* Main Interface Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Main Interface</h2>
                        <div className="space-y-5">
                            <div className="flex items-center">
                                <label className={labelClass}>Top Title</label>
                                <input type="text" name="topTitle" value={formData.topTitle} onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="flex items-center">
                                <label className={labelClass}>Top Icon</label>
                                <div className="flex-grow flex items-center">
                                    <input type="text" name="topIcon" placeholder="NO FILE CHOOSEN" readOnly className={`${inputClass} bg-gray-100 rounded-r-none`} />
                                    <button type="button" className="px-4 py-2 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300">
                                        Choose File
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className={labelClass}>Widths Of Top Icon</label>
                                <input type="text" name="widthOfTopIcon" value={formData.widthOfTopIcon} onChange={handleChange} className={inputClass} />
                            </div>
                             <div className="flex items-center">
                                <label className={labelClass}>Height Of Top Icon</label>
                                <input type="text" name="heightOfTopIcon" value={formData.heightOfTopIcon} onChange={handleChange} className={inputClass} />
                            </div>
                             <div className="flex items-center">
                                <label className={labelClass}>Status Bar Middle Words</label>
                                <input type="text" name="statusBarMiddleWords" value={formData.statusBarMiddleWords} onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                     {/* Notice Text Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Notice Text</h2>
                        <div className="flex items-center">
                            <label className={labelClass}>Notice Text</label>
                            <input type="text" name="noticeText" value={formData.noticeText} onChange={handleChange} className={inputClass} />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        <button type="submit" className="px-10 py-3 bg-[#0D223F] text-white font-bold rounded-md hover:bg-[#1c3a64] transition-all">
                            Submit
                        </button>
                        <button type="button" className="px-10 py-3 bg-[#F59E0B] text-white font-bold rounded-md hover:bg-[#d97706] transition-all">
                            Refresh
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterfaceScreenForm;
