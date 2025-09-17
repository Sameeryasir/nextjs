"use client";
import React, { useState } from 'react';
import { Folder, RefreshCw, Link as LinkIcon, X, Minus } from 'lucide-react';

// The list of items to be displayed in the data list.
const dataListItems = [
  "Cancellation Reason Of Branch",
  "Branch Type",
  "Account Alarm Limit",
  "Server Type",
  "POS Type",
  "POS Events",
  "Auth Key",
];

// Mock data for the tables
const cancellationReasons = [
  { code: '0001', description: 'Cancellation Reason 01' },
  { code: '0002', description: 'Cancellation Reason 02' },
];

const branchTypes = [
  { code: '00', description: 'Owner' },
  { code: '01', description: 'Agent' },
  { code: '02', description: 'SMS' },
  { code: '03', description: 'POS Terminal' },
  { code: '04', description: 'Point Of Sale' },
];

const accountAlarmLimits = [
    { level: '1', description: 'Less Than 30%', percent: '30', alarmType: '1'},
    { level: '2', description: 'Less Than 20%', percent: '20', alarmType: '1'},
    { level: '3', description: 'Less Than 10% Of Last Balance', percent: '10', alarmType: '1'},
    { level: '4', description: 'Less Than 5% Of Last Balance', percent: '05', alarmType: '3'},
];

const serverTypes = [
    { level: '1', description: 'SAPHIR' },
    { level: '2', description: 'SMARTVIEW' },
];

const posTypes = [
    { level: '1', description: 'POS Terminal' },
    { level: '2', description: 'PC Terminal' },
    { level: '3', description: 'SMS Terminal' },
    { level: '4', description: 'AVM' },
];

const posEvents = [
    { code: '0101', description: 'Cash Box Full', smsAlert: '', mailAlert: '' },
    { code: '0102', description: 'No Cash Box', smsAlert: '', mailAlert: '' },
    { code: '0103', description: 'SSP initializing Failed', smsAlert: '', mailAlert: '' },
    { code: '0104', description: 'SSP initializing Success', smsAlert: '', mailAlert: '' },
    { code: '0201', description: 'The Printer Has Run Out Of Paper', smsAlert: '', mailAlert: '' },
    { code: '0202', description: 'The Printer Initializing Failed', smsAlert: '', mailAlert: '' },
    { code: '0203', description: 'The Printer Has All Right', smsAlert: '', mailAlert: '' },
    { code: '0301', description: 'Upgrade Start', smsAlert: '', mailAlert: '' },
    { code: '0302', description: 'Upgrade Success Old Version:[KEY_OLDVER] New Version:[KEY_NEWVER]', smsAlert: '', mailAlert: '' },
    { code: '0303', description: 'Upgrade Failed', smsAlert: '', mailAlert: '' },
    { code: '0401', description: 'AVM Start', smsAlert: '', mailAlert: '' },
    { code: '0402', description: 'AVM Restart', smsAlert: '', mailAlert: '' },
];

const authKeys = [];


/**
 * Component for the "Add New Item" modal popup (for POS Events)
 */
const AddNewItemModule = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg border">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Add New Items</h3>
                    <div className="flex items-center space-x-3">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <Minus size={22} />
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X size={22} />
                        </button>
                    </div>
                </div>
                <div className="space-y-6 pt-6">
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Code</label>
                        <input type="text" value="1" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Sequence</label>
                        <input type="text" value="0" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-start">
                        <label className="w-28 text-sm font-medium text-gray-700 pt-2">Description</label>
                        <textarea rows="4" className="flex-grow px-4 py-2 border border-gray-300 rounded-md">POS Terminal</textarea>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button className="px-8 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">
                        OK
                    </button>
                    <button onClick={onClose} className="px-8 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Component for the "Add Data Items" modal popup (for Auth Key)
 */
const AddDataItemsModule = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg border">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Add Data Items</h3>
                    <div className="flex items-center space-x-3">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <Minus size={22} />
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X size={22} />
                        </button>
                    </div>
                </div>
                <div className="space-y-6 pt-6">
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Code</label>
                        <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-center">
                        <label className="w-28 text-sm font-medium text-gray-700">Sequence</label>
                        <input type="text" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex items-start">
                        <label className="w-28 text-sm font-medium text-gray-700 pt-2">Description</label>
                        <textarea rows="4" className="flex-grow px-4 py-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                    <button className="px-8 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">
                        OK
                    </button>
                    <button onClick={onClose} className="px-8 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


/**
 * Component for the "Modify Safe Module" modal popup
 */
const ModifySafeModule = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg border">
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Modify Safe Module</h3>
          <div className="flex items-center space-x-3">
             <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <Minus size={22} />
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <X size={22} />
            </button>
          </div>
        </div>

        {/* Modal Body (Form) */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center">
            <label className="w-28 text-sm font-medium text-gray-700">Code</label>
            <input type="text" value="00" readOnly className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" />
          </div>
          <div className="flex items-center">
            <label className="w-28 text-sm font-medium text-gray-700">Sequence</label>
            <input type="text" value="0" className="flex-grow px-4 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="flex items-start">
            <label className="w-28 text-sm font-medium text-gray-700 pt-2">Description</label>
            <textarea rows="4" className="flex-grow px-4 py-2 border border-gray-300 rounded-md">Owner</textarea>
          </div>
        </div>

        {/* Modal Footer (Buttons) */}
        <div className="flex justify-end space-x-4 mt-8">
          <button className="px-8 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition duration-200">
            OK
          </button>
          <button onClick={onClose} className="px-8 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D223F] transition duration-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Component to display the details for "Cancellation Reason Of Branch"
 */
const CancellationReasonDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Cancellation Reason Of Branch</h2>
        <div className="flex space-x-2">
          <button
            className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition duration-200"
          >
            Refresh
          </button>
          <button
            className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D223F] transition duration-200"
          >
            New
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
          <div className="w-1/4">Code</div>
          <div className="w-3/4">Description</div>
        </div>
        {/* Table Body */}
        <ul className="divide-y divide-gray-200">
          {cancellationReasons.map(reason => (
            <li key={reason.code} className="flex items-center p-3 hover:bg-gray-50">
              <div className="w-1/4 flex items-center text-sm text-gray-700">
                <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                <span>{reason.code}</span>
              </div>
              <div className="w-3/4 text-sm text-gray-700">
                {reason.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Component to display the details for "Branch Type"
 */
const BranchTypeDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Branch Type</h2>
        <div className="flex space-x-2">
          <button
            className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition duration-200"
          >
            Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D223F] transition duration-200"
          >
            Modify
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
          <div className="w-1/4">Code</div>
          <div className="w-3/4">Description</div>
        </div>
        {/* Table Body */}
        <ul className="divide-y divide-gray-200">
          {branchTypes.map(type => (
            <li key={type.code} className="flex items-center p-3 hover:bg-gray-50">
              <div className="w-1/4 flex items-center text-sm text-gray-700">
                <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                <span>{type.code}</span>
              </div>
              <div className="w-3/4 text-sm text-gray-700">
                {type.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <ModifySafeModule isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

/**
 * Component to display the details for "Account Alarm Limit"
 */
const AccountAlarmLimitDetails = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Account Alarm Limit</h2>
        <div className="flex space-x-2">
          <button
            className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition duration-200"
          >
            Refresh
          </button>
          <button
            className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D223F] transition duration-200"
          >
            New
          </button>
        </div>
      </div>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
          <div className="w-1/4">Level</div>
          <div className="w-1/2">Description</div>
          <div className="w-1/4">Percent</div>
          <div className="w-1/4">Alarm Type</div>
        </div>
        {/* Table Body */}
        <ul className="divide-y divide-gray-200">
          {accountAlarmLimits.map(limit => (
            <li key={limit.level} className="flex items-center p-3 hover:bg-gray-50">
              <div className="w-1/4 flex items-center text-sm text-gray-700">
                 <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                <span>{limit.level}</span>
              </div>
              <div className="w-1/2 text-sm text-gray-700">{limit.description}</div>
              <div className="w-1/4 text-sm text-gray-700">{limit.percent}</div>
              <div className="w-1/4 text-sm text-gray-700">{limit.alarmType}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Component to display the details for "Server Type"
 */
const ServerTypeDetails = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Server Type</h2>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
            <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">New</button>
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Modify</button>
            <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">Delete</button>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
            <div className="w-1/2">Level</div>
            <div className="w-1/2">Description</div>
          </div>
          {/* Table Body */}
          <ul className="divide-y divide-gray-200">
            {serverTypes.map(type => (
              <li key={type.level} className="flex items-center p-3 hover:bg-gray-50 bg-orange-100">
                <div className="w-1/2 flex items-center text-sm text-gray-700">
                   <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{type.level}</span>
                </div>
                <div className="w-1/2 text-sm text-gray-700">{type.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

/**
 * Component to display the details for "POS Type"
 */
const POSTypeDetails = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">POS Type</h2>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
            <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">New</button>
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Modify</button>
            <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">Delete</button>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
            <div className="w-1/2">Level</div>
            <div className="w-1/2">Description</div>
          </div>
          {/* Table Body */}
          <ul className="divide-y divide-gray-200">
            {posTypes.map(type => (
              <li key={type.level} className="flex items-center p-3 hover:bg-gray-50 bg-orange-100">
                <div className="w-1/2 flex items-center text-sm text-gray-700">
                   <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{type.level}</span>
                </div>
                <div className="w-1/2 text-sm text-gray-700">{type.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

/**
 * Component to display the details for "POS Events"
 */
const POSEventsDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">POS Events</h2>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">New</button>
            <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Modify</button>
            <button className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">Delete</button>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
            <div className="w-1/4">Code</div>
            <div className="w-1/2">Description</div>
            <div className="w-1/4">SMS Alert</div>
            <div className="w-1/4">Mail Alert</div>
          </div>
          {/* Table Body */}
          <ul className="divide-y divide-gray-200">
            {posEvents.map(event => (
              <li key={event.code} className="flex items-center p-3 hover:bg-gray-50">
                <div className="w-1/4 flex items-center text-sm text-gray-700">
                   <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{event.code}</span>
                </div>
                <div className="w-1/2 text-sm text-gray-700">{event.description}</div>
                 <div className="w-1/4 text-sm text-gray-700">{/* Checkbox can go here */}</div>
                <div className="w-1/4 text-sm text-gray-700">{/* Checkbox can go here */}</div>
              </li>
            ))}
          </ul>
        </div>
        <AddNewItemModule isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
};

/**
 * Component to display the details for "Auth Key"
 */
const AuthKeyDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Auth Key</h2>
                <div className="flex space-x-2">
                    <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
                    <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64]">New</button>
                </div>
            </div>
            <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="bg-[#F59E0B] text-white p-3 flex font-semibold">
                    <div className="w-1/2">Code</div>
                    <div className="w-1/2">Description</div>
                </div>
                {/* Table Body */}
                <ul className="divide-y divide-gray-200 min-h-[200px]">
                    {authKeys.length === 0 && (
                        <li className="text-center text-gray-500 p-4">No data available</li>
                    )}
                    {authKeys.map(key => (
                        <li key={key.code} className="flex items-center p-3 hover:bg-gray-50">
                            <div className="w-1/2 flex items-center text-sm text-gray-700">
                                <LinkIcon className="w-4 h-4 mr-3 text-gray-400" />
                                <span>{key.code}</span>
                            </div>
                            <div className="w-1/2 text-sm text-gray-700">{key.description}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <AddDataItemsModule isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};


const BaseInformationDictionary = () => {
  const [selectedItem, setSelectedItem] = useState("Cancellation Reason Of Branch");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  /**
   * Renders the content for the right pane based on the selected item.
   */
  const renderRightPane = () => {
    if (!selectedItem) {
      return <p className="text-sm text-gray-500">Select an item from the list to see details.</p>;
    }
    
    switch (selectedItem) {
      case "Cancellation Reason Of Branch":
        return <CancellationReasonDetails />;
      case "Branch Type":
        return <BranchTypeDetails />;
      case "Account Alarm Limit":
        return <AccountAlarmLimitDetails />;
      case "Server Type":
        return <ServerTypeDetails />;
      case "POS Type":
        return <POSTypeDetails />;
      case "POS Events":
        return <POSEventsDetails />;
      case "Auth Key":
        return <AuthKeyDetails />;
      default:
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">{selectedItem}</h2>
              <button className="px-6 py-2 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706]">Refresh</button>
            </div>
            <div className="bg-white rounded-md border border-gray-200 p-4 min-h-[300px]">
              <p className="text-sm text-gray-600 mt-2">
                Details for {selectedItem} will be shown here.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
        {/* Left Data List */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Data List</h2>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <ul className="space-y-3">
              {dataListItems.map((item, index) => (
                <li 
                  key={index} 
                  className={`flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded-md ${selectedItem === item ? 'bg-gray-200' : ''}`}
                  onClick={() => handleItemClick(item)}
                >
                  <Folder className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-sm font-medium text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Details Pane */}
        <div className="col-span-2">
          {renderRightPane()}
        </div>
      </div>
    </div>
  );
};

export default BaseInformationDictionary;
