"use client";
import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const ControlPanel = () => {
    // Initial data for the backup menu items
    const initialBackupItems = [
        'Parameters', 'Dictionary', 'Region', 'Stamo Tax', 'Register Information',
        'Department', 'Roles/Permissions', 'Screen', 'Language', 'Import File',
        'System Log', 'System Information', 'System Tasks', 'Control Panel'
    ];

    // State for the two lists
    const [shortcutItems, setShortcutItems] = useState([]);
    const [backupItems, setBackupItems] = useState(initialBackupItems);

    // State for selected items in each list
    const [selectedShortcutItems, setSelectedShortcutItems] = useState([]);
    const [selectedBackupItems, setSelectedBackupItems] = useState([]);

    // Handle selection in the shortcut list
    const handleSelectShortcut = (item) => {
        setSelectedShortcutItems(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    // Handle selection in the backup list
    const handleSelectBackup = (item) => {
        setSelectedBackupItems(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };
    
    // Move selected items from backup to shortcut list
    const moveFromBackupToShortcut = () => {
        setShortcutItems(prev => [...prev, ...selectedBackupItems].sort());
        setBackupItems(prev => prev.filter(item => !selectedBackupItems.includes(item)));
        setSelectedBackupItems([]);
    };

    // Move selected items from shortcut to backup list
    const moveFromShortcutToBackup = () => {
        setBackupItems(prev => [...prev, ...selectedShortcutItems].sort());
        setShortcutItems(prev => prev.filter(item => !selectedShortcutItems.includes(item)));
        setSelectedShortcutItems([]);
    };


    return (
        <div className="bg-white p-6 md:p-8 min-h-screen grid grid-cols-1 md:grid-cols-3 gap-x-8">
            {/* Left Column: Settings Menu */}
            <div className="col-span-1">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-[#FF9900] text-white p-3 rounded-t-md">Interface Setting</h2>
                        <div className="bg-gray-50 p-3 rounded-b-md border border-t-0 border-gray-200">
                            <p className="text-sm font-medium text-gray-700 cursor-pointer p-2 bg-gray-200 rounded-md">Menu Shortcut</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 bg-[#FF9900] text-white p-3 rounded-t-md">Account And Safety</h2>
                        <div className="bg-gray-50 p-3 rounded-b-md border border-t-0 border-gray-200 space-y-2">
                            <p className="text-sm font-medium text-gray-700 cursor-pointer p-2 hover:bg-gray-200 rounded-md">Change Password</p>
                            <p className="text-sm font-medium text-gray-700 cursor-pointer p-2 hover:bg-gray-200 rounded-md">Safety Log</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Menu Shortcut Details */}
            <div className="col-span-2">
                <h1 className="text-xl font-bold text-gray-800 mb-6">Menu Short Cut</h1>
                <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-4">Sequence</p>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                        {/* Menu Shortcut Group Item */}
                        <div className="text-center">
                            <h3 className="font-semibold mb-2">Menu Shortcut Group Item</h3>
                            <div className="border border-gray-300 rounded-md h-64 bg-white overflow-y-auto p-2">
                                <ul className="text-left">
                                    {shortcutItems.map((item, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => handleSelectShortcut(item)}
                                            className={`p-1.5 rounded-md cursor-pointer text-sm ${selectedShortcutItems.includes(item) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setSelectedShortcutItems(shortcutItems)} className="mt-4 px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                                All Select
                            </button>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <div className="p-2 border rounded-md flex gap-2">
                                <ArrowLeftRight size={20} className="cursor-pointer hover:text-gray-600" onClick={moveFromBackupToShortcut} />
                                <ArrowLeftRight size={20} className="cursor-pointer hover:text-gray-600 transform -scale-x-100" onClick={moveFromShortcutToBackup} />
                            </div>
                        </div>

                        {/* Backup Menu Item */}
                        <div className="text-center">
                             <h3 className="font-semibold mb-2">Backup Menu Item</h3>
                            <div className="border border-gray-300 rounded-md h-64 bg-white overflow-y-auto p-2">
                                <ul className="text-left">
                                    {backupItems.map((item, index) => (
                                        <li 
                                            key={index}
                                            onClick={() => handleSelectBackup(item)} 
                                            className={`p-1.5 rounded-md cursor-pointer text-sm ${selectedBackupItems.includes(item) ? 'bg-blue-200' : 'hover:bg-gray-100'}`}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                             <button onClick={() => setSelectedBackupItems(backupItems)} className="mt-4 px-6 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                                All Select
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        When Click Bar, Can Mix CTRL Or SHIFT Keys For Multi Chosen
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="px-8 py-2 bg-[#FF9900] text-white font-semibold rounded-md hover:bg-[#E68A00]">
                            Refresh
                        </button>
                        <button className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
