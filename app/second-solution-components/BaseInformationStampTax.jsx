"use client";
import React, { useState } from 'react';

const BaseInformationStampTax = () => {
    // State to toggle between the list view and the form view
    const [showForm, setShowForm] = useState(false);

    // Handler to show the form
    const handleNewClick = () => {
        setShowForm(true);
    };

    // Handler to return to the list view
    const handleReturnClick = () => {
        setShowForm(false);
    };

    // Main component render logic
    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            {showForm ? (
                <StampTaxForm onReturn={handleReturnClick} />
            ) : (
                <StampTaxList onNew={handleNewClick} />
            )}
        </div>
    );
};

/**
 * Component for displaying the list of stamp taxes
 */
const StampTaxList = ({ onNew }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">Stamp Tax List</h1>
                <div className="flex space-x-2">
                    <button
                        className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={onNew}
                        className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]"
                    >
                        New
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-md border border-gray-200 overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-[#F59E0B] text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Code</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Apply Time</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Value From</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Value To</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Factor</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Active</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                       {/* Table body will be empty initially as per the image */}
                       <tr>
                         <td colSpan="8" className="text-center py-10 text-gray-500">No data available</td>
                       </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/**
 * Component for the form to add a new stamp tax
 */
const StampTaxForm = ({ onReturn }) => {
    return (
        <div className="max-w-2xl">
            <h1 className="text-xl font-bold text-gray-800 mb-6">Stamp Tax List</h1>
            <div className="space-y-5">
                 <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Code</label>
                    <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Description</label>
                    <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Apply Time</label>
                    <input type="text" value="2025-02-14 18:49:58" readOnly className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Value From</label>
                    <input type="text" value="KMF" className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Value To</label>
                    <input type="text" value="KMF" className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Type</label>
                    <select className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-white">
                        <option>Fixed</option>
                        <option>Percentage</option>
                    </select>
                </div>
                 <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Factor</label>
                    <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-32 text-sm font-medium text-gray-700">Active</label>
                    <input type="checkbox" className="h-5 w-5 text-blue-600 border-gray-300 rounded" />
                </div>
            </div>
            <div className="flex space-x-4 mt-8">
                <button
                    className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]"
                >
                    Submit
                </button>
                 <button
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300"
                >
                    Refresh
                </button>
                <button
                    onClick={onReturn}
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700"
                >
                    Return
                </button>
            </div>
        </div>
    );
};


export default BaseInformationStampTax;
