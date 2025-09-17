"use client";
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const SystemLog = () => {
    // Mock data for the system log table
    const logData = [
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
        { userCode: 'Devteam', time: '2025-04-24 15:52:40', ipAddress: '192.168.2.137', type: 'LOGIN', remark: '' },
    ];

    const labelClass = "w-24 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";

    return (
        <div className="bg-white p-6 md:p-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold text-gray-800">System Log</h1>
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                        Refresh
                    </button>
                    <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                        Delete
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 max-w-xl">
                <div className="space-y-4">
                    <div className="flex items-center gap-6">
                        <label className={labelClass}>Date</label>
                        <input 
                            type="text" 
                            defaultValue="SECDAIS INTEGRA"
                            className={inputClass}
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <label className={labelClass}>User Code</label>
                        <select className={`${inputClass} bg-white`}>
                            <option>Add % Can Search Widely</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-6">
                        <label className={labelClass}>Type</label>
                        <input 
                            type="text" 
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

            <PaginationControls totalRecords={logData.length} />

            {/* System Log Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-[#FF9900] text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User Code</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Time</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">IP Address</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Remark</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {logData.map((log, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{log.userCode}</td>
                                <td className="py-3 px-4">{log.time}</td>
                                <td className="py-3 px-4">{log.ipAddress}</td>
                                <td className="py-3 px-4">{log.type}</td>
                                <td className="py-3 px-4">{log.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default SystemLog;
