"use client";
import React, { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';

// --- Details Modal ---
const DetailsModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Task Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="space-y-3 text-sm">
                    <p><strong>ID:</strong> {data.id}</p>
                    <p><strong>Description:</strong> {data.description}</p>
                    <p><strong>Type:</strong> {data.type}</p>
                    <p><strong>Cycle:</strong> {data.cycle}</p>
                    <p><strong>Base Time:</strong> {data.baseTime}</p>
                    <p><strong>Next Time:</strong> {data.nextTime}</p>
                    <p><strong>Module File:</strong> {data.moduleFile}</p>
                    <p><strong>Active:</strong> {data.active ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    );
};

// --- Add New Item Modal ---
const AddNewItemModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        id: '',
        description: '',
        type: 'Once',
        cycle: '',
        cycleUnit: 'Minute',
        baseTime: '',
        nextTime: '',
        tryWhenFailed: false,
        moduleFile: '',
        parameters: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Task Data:", formData);
        onClose();
    };

    const labelClass = "w-32 text-sm font-medium text-gray-700";
    const inputClass = "flex-grow px-4 py-2 border border-gray-300 rounded-md";

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Add New Items</h3>
                     <div className="flex items-center space-x-3">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><Minus size={22} /></button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center">
                        <label className={labelClass}>ID</label>
                        <input type="text" name="id" value={formData.id} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className={`${inputClass} bg-white`}>
                            <option>Once</option>
                            <option>Cycle</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Cycle</label>
                        <div className="flex-grow flex items-center gap-2">
                           <input type="text" name="cycle" value={formData.cycle} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                           <select name="cycleUnit" value={formData.cycleUnit} onChange={handleChange} className="px-4 py-2 border border-gray-300 rounded-md bg-white">
                               <option>Minute</option>
                               <option>Hour</option>
                               <option>Day</option>
                           </select>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Base Time</label>
                        <input type="text" name="baseTime" value={formData.baseTime} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Next Time</label>
                        <input type="text" name="nextTime" value={formData.nextTime} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Try When Failed</label>
                        <input type="checkbox" name="tryWhenFailed" checked={formData.tryWhenFailed} onChange={handleChange} className="h-5 w-5" />
                    </div>
                    <div className="flex items-center">
                        <label className={labelClass}>Module File</label>
                        <input type="text" name="moduleFile" value={formData.moduleFile} onChange={handleChange} className={inputClass} />
                    </div>
                     <div className="flex items-center">
                        <label className={labelClass}>Parameters</label>
                        <input type="text" name="parameters" value={formData.parameters} onChange={handleChange} className={inputClass} />
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


const SystemTasks = () => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const taskData = [
        { id: 1, description: 'Get Meters From Vending Server.', type: 'Cycle', cycle: '1 MINITUE(S)', baseTime: '2012-03-21 18:19:38', nextTime: '2012-03-21 18:19:38', moduleFile: 'CheckMeters.Dll', active: true },
        { id: 2, description: 'Get Meters From Vending Server.', type: 'Cycle', cycle: '1 MINITUE(S)', baseTime: '2012-03-21 18:19:38', nextTime: '2012-03-21 18:19:38', moduleFile: 'CheckMeters.Dll', active: true },
        { id: 3, description: 'Get Meters From Vending Server.', type: 'Cycle', cycle: '1 MINITUE(S)', baseTime: '2012-03-21 18:19:38', nextTime: '2012-03-21 18:19:38', moduleFile: 'CheckMeters.Dll', active: true },
        { id: 4, description: 'Get Meters From Vending Server.', type: 'Cycle', cycle: '1 MINITUE(S)', baseTime: '2012-03-21 18:19:38', nextTime: '2012-03-21 18:19:38', moduleFile: 'CheckMeters.Dll', active: true },
    ];
    
    const handleDetailsClick = () => {
        if (selectedTask) {
            setIsDetailsModalOpen(true);
        } else {
            alert("Please select a task to see the details.");
        }
    };
    
    const handleRowClick = (task) => {
        setSelectedTask(task);
    };

    return (
        <>
            <div className="bg-white p-6 md:p-8 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800">Task List</h1>
                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">Refresh</button>
                        <button onClick={handleDetailsClick} className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">Details</button>
                        <button onClick={() => setIsAddModalOpen(true)} className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">Add</button>
                        <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">Delete</button>
                        <button className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">Inactive</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-[#FF9900] text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Description</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Type</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cycle</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Base Time</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Next Time</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Module File</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Active</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {taskData.map((task) => (
                                <tr 
                                    key={task.id} 
                                    onClick={() => handleRowClick(task)}
                                    className={`border-b border-gray-200 cursor-pointer ${selectedTask?.id === task.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                >
                                    <td className="py-3 px-4">{task.id}</td>
                                    <td className="py-3 px-4">{task.description}</td>
                                    <td className="py-3 px-4">{task.type}</td>
                                    <td className="py-3 px-4">{task.cycle}</td>
                                    <td className="py-3 px-4">{task.baseTime}</td>
                                    <td className="py-3 px-4">{task.nextTime}</td>
                                    <td className="py-3 px-4">{task.moduleFile}</td>
                                    <td className="py-3 px-4">
                                        {task.active && <Check className="w-5 h-5 text-green-500" />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <DetailsModal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} data={selectedTask} />
            <AddNewItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </>
    );
};

export default SystemTasks;
