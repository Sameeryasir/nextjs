"use client";
import React, { useState } from 'react';

const RegisterInformationForm = () => {
    const [formData, setFormData] = useState({
        companyName: 'SECDAIS',
        telephone: "Company's Phone",
        fax: "Company's Fax",
        zipCode: 'Zip',
        contactAddress: 'ADDRESS',
        website: 'WWW.SECDAIS.COM',
        email: '',
        bank: '',
        bankAccount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            <h1 className="text-xl font-bold text-gray-800 mb-8">Register Information</h1>
            <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Telephone</label>
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Fax</label>
                    <input type="text" name="fax" value={formData.fax} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Zip Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Contact Address</label>
                    <input type="text" name="contactAddress" value={formData.contactAddress} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Website</label>
                    <input type="text" name="website" value={formData.website} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Bank</label>
                    <input type="text" name="bank" value={formData.bank} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div className="flex items-center">
                    <label className="w-36 text-sm font-medium text-gray-700">Bank Account</label>
                    <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                 <div className="flex space-x-4 pt-4">
                    <button type="submit" className="px-8 py-2.5 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">
                        Submit
                    </button>
                    <button type="button" className="px-8 py-2.5 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">
                        Refresh
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterInformationForm;
