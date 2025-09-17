"use client";
import React, { useState } from 'react';

const SystemInformation = () => {
    // State for the Key and License form
    const [keyLicenseData, setKeyLicenseData] = useState({
        key: 'SECDAIS INTEGRA',
        license: 'Add % Can Search Widely'
    });

    // Static data for the Register Information section
    const registerInfo = {
        companyName: 'SECDAIS',
        version: 'SECDAIS ENERGY SOLUTIONS V1.0.10FFCIAL',
        databaseVersion: 'INTERNAL V1.0.1',
        functions: 'ENTERPRISE',
        allowOperators: 'UNLIMITED',
        copyRight: 'SECDAIS GHANA LIMITED'
    };

    const handleKeyLicenseChange = (e) => {
        const { name, value } = e.target;
        setKeyLicenseData(prev => ({ ...prev, [name]: value }));
    };

    const labelClass = "w-32 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";
    const infoTextClass = "text-sm text-gray-800";


    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            <div className="max-w-2xl">
                {/* Key and License Section */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Key And License</h2>
                        <div className="flex items-center gap-4">
                            <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                                Refresh
                            </button>
                            <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Key</label>
                            <input
                                type="text"
                                name="key"
                                value={keyLicenseData.key}
                                onChange={handleKeyLicenseChange}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>License</label>
                            <input
                                type="text"
                                name="license"
                                value={keyLicenseData.license}
                                onChange={handleKeyLicenseChange}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex justify-end pt-2">
                            <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                                Search...
                            </button>
                        </div>
                    </div>
                </div>

                {/* Register Information Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Register Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Company Name</label>
                            <p className={infoTextClass}>{registerInfo.companyName}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Version</label>
                            <p className={infoTextClass}>{registerInfo.version}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Database Version</label>
                            <p className={infoTextClass}>{registerInfo.databaseVersion}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Functions</label>
                            <p className={infoTextClass}>{registerInfo.functions}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Allow Operators</label>
                            <p className={infoTextClass}>{registerInfo.allowOperators}</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <label className={labelClass}>Copy Right</label>
                            <p className={`${infoTextClass} text-orange-500 font-semibold`}>{registerInfo.copyRight}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                         <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                            Refresh
                        </button>
                        <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                            Register Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemInformation;
