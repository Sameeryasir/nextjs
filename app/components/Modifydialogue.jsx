"use client";
import React, { useState } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

function Modifydialogue({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };


  const handleClose = () => {
    // This would typically close the dialog
    // For this example, we'll just reset the states
    setIsMinimized(false);
    setIsVisible(false);
    if (onClose) onClose(); // Call the onClose prop if provided

    setIsMaximized(false);
    // In a real app, you might want to call onClose prop here
    console.log("Dialog closed");
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-transparent ">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Modify Safe Module
          </span>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsMinimized(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isMaximized ? "fixed inset-0 m-0 w-full h-full" : "max-w-md mx-auto"
      } p-6 bg-white rounded-lg shadow-md`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Modify Safe Module</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleMinimize}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Minimize"
          >
            <Minus size={20} />
          </button>
          <button
            onClick={handleMaximize}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <Maximize2 size={18} />
          </button>
          <button
            onClick={handleClose}
            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-32 text-gray-700">Description</label>
          <input
            type="text"
            defaultValue="00000000-STS0"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <label className="w-32 text-gray-700">Server Host</label>
            <label className="text-xs text-gray-500 w-32">/ Server Port</label>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              defaultValue="00.00.0.00"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="mx-2 text-gray-500">:</span>
            <input
              type="text"
              defaultValue="5100"
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
              Check
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-gray-700">Code</label>
          <input
            type="text"
            defaultValue="00000000"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 text-gray-700">Module Type</label>
          <div className="flex-1 px-3 py-2 bg-gray-100 rounded-md">
            Vending Module
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-gray-700">F/W Version</label>
          <div className="flex-1 px-3 py-2 bg-gray-100 rounded-md">
            STS64V13
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-32 text-gray-700">Status</label>
          <div className="flex-1 px-3 py-2 bg-gray-100 rounded-md font-semibold text-green-600">
            ACTIVE
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={handleClose}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
          Ok
        </button>
      </div>
    </div>
  );
}

export default Modifydialogue;
