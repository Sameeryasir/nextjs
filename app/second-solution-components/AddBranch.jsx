"use client";

import { useState } from 'react';
import { MoreHorizontal, Building2, X, Minus, Square } from 'lucide-react';

// --- Modal Component Defined in the Same File ---
const SelectDepartmentModal = ({ isOpen, onClose, onConfirm }) => {
  // Internal state to manage the modal's own size
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) {
    return null;
  }

  // Conditionally set the classes for the modal panel based on its state
  const modalContainerClasses = isMaximized
    ? 'w-[95vw] h-[95vh]' // Classes for maximized state
    : 'w-full max-w-2xl'; // Classes for default state

  const modalBodyClasses = isMaximized 
    ? 'flex-grow' // Allow body to expand in maximized view
    : 'h-72'; // Fixed height in default view

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out ${modalContainerClasses}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 border-b border-gray-200 py-2 px-4 rounded-t-lg flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Select Department</h3>
        <div className="flex items-center space-x-2">
          {/* Minimize button now closes the modal */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Minus size={20} />
          </button>
          {/* Maximize button toggles the size */}
          <button onClick={() => setIsMaximized(prev => !prev)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <Square size={20} />
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={`p-6 space-y-2 overflow-y-auto ${modalBodyClasses}`}>
        {/* Active Item */}
        <div className="flex items-center p-3 bg-yellow-500/10 border-2 border-yellow-500 rounded-md cursor-pointer">
          <Building2 className="w-5 h-5 text-yellow-600 mr-4 shrink-0" />
          <span className="font-semibold text-gray-800">SECDAIS</span>
        </div>
        {/* Inactive Items */}
        <div className="flex items-center p-3 border-2 border-transparent rounded-md cursor-pointer hover:bg-gray-100">
            <Building2 className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <span className="font-medium text-gray-600">Human Resources</span>
        </div>
        <div className="flex items-center p-3 border-2 border-transparent rounded-md cursor-pointer hover:bg-gray-100">
            <Building2 className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <span className="font-medium text-gray-600">Finance Department</span>
        </div>
        <div className="flex items-center p-3 border-2 border-transparent rounded-md cursor-pointer hover:bg-gray-100">
            <Building2 className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <span className="font-medium text-gray-600">IT & Technology</span>
        </div>
        <div className="flex items-center p-3 border-2 border-transparent rounded-md cursor-pointer hover:bg-gray-100">
            <Building2 className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <span className="font-medium text-gray-600">Marketing & Sales</span>
        </div>
         <div className="flex items-center p-3 border-2 border-transparent rounded-md cursor-pointer hover:bg-gray-100">
            <Building2 className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
            <span className="font-medium text-gray-600">Operations</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center p-4 space-x-3 bg-gray-100 border-t border-gray-200 rounded-b-lg flex-shrink-0">
        <button
          onClick={onConfirm}
          className="bg-[#FF9900] text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="bg-gray-700 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};


// --- Main Form Component ---
export default function AddBranchForm() {
  const [activeTab, setActiveTab] = useState('general');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Add Branch form...');
  };

  const handleDepartmentSelect = () => {
    console.log("Department confirmed!");
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="bg-white p-6 md:p-8 w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-8">
          Branch Information
        </h1>

        <form onSubmit={handleSubmit} className="max-w-xl space-y-5">

          <div className="flex items-center">
            <label htmlFor="departments" className="w-36 text-sm font-medium text-gray-700 shrink-0">Departments</label>
            <div className="flex flex-grow items-center gap-2">
              <input
                type="text"
                id="departments"
                name="departments"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition"
              />
              <input
                type="text"
                name="departments-sub"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="bg-[#FF9900] text-white p-2 rounded-md hover:bg-orange-600 shrink-0"
              >
                <MoreHorizontal size={22} />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <label htmlFor="type" className="w-36 text-sm font-medium text-gray-700 shrink-0">Type</label>
            <select
              id="type"
              name="type"
              defaultValue="owner"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition"
            >
              <option value="owner">Owner</option>
              <option value="franchise">Franchise</option>
            </select>
          </div>

          <div className="flex items-center">
            <label htmlFor="code" className="w-36 text-sm font-medium text-gray-700 shrink-0">Code</label>
            <input
              type="text"
              id="code"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="description" className="w-36 text-sm font-medium text-gray-700 shrink-0">Description</label>
            <input
              type="text"
              id="description"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition"
            />
          </div>

          <div className="pt-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-bold text-sm ${
                    activeTab === 'general'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('advance')}
                  className={`whitespace-nowrap py-3 px-1 border-b-2 font-bold text-sm ${
                    activeTab === 'advance'
                      ? 'border-gray-800 text-gray-800'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Advance
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'general' && (
            <div className="space-y-5 pt-4">
              <h2 className="text-xl font-bold text-gray-800">Base Info</h2>
              <div className="flex items-center">
                  <label htmlFor="contact" className="w-36 text-sm font-medium text-gray-700 shrink-0">Contact</label>
                  <input id="contact" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition" />
              </div>
              <div className="flex items-center">
                  <label htmlFor="mobile" className="w-36 text-sm font-medium text-gray-700 shrink-0">Mobile</label>
                  <input id="mobile" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition" />
              </div>
              <div className="flex items-center">
                  <label htmlFor="phone" className="w-36 text-sm font-medium text-gray-700 shrink-0">Phone</label>
                  <input id="phone" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition" />
              </div>
              <div className="flex items-center">
                  <label htmlFor="fax" className="w-36 text-sm font-medium text-gray-700 shrink-0">Fax</label>
                  <input id="fax" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition" />
              </div>
              <div className="flex items-center">
                  <label htmlFor="address" className="w-36 text-sm font-medium text-gray-700 shrink-0">Address</label>
                  <input id="address" type="text" className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#FF9900] focus:border-[#FF9900] transition" />
              </div>
              <div className="flex items-center">
                <label htmlFor="active" className="w-36 text-sm font-medium text-gray-700 shrink-0">Active</label>
                <input type="checkbox" id="active" name="active" className="h-4 w-4 rounded border-gray-300 text-[#FF9900] focus:ring-[#FF9900]" />
              </div>
            </div>
          )}

          {activeTab === 'advance' && (
            <div className="text-center py-10 text-gray-500">Advance settings will be shown here.</div>
          )}

          <div className="flex items-center space-x-4 pt-4">
            <div className="w-36 shrink-0" />
            <button type="submit" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition">Submit</button>
            <button type="button" className="px-8 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition">Refresh</button>
            <button type="button" className="bg-[#FF9900] text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-600 transition">Return</button>
          </div>
        </form>
      </div>

      {/* Renders the modal when isModalOpen is true */}
      <SelectDepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDepartmentSelect}
      />
    </>
  );
}