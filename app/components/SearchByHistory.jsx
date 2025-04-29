"use client";
import React, { useState } from 'react';
import { X, Minimize2, Copy, ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

function SearchByHistory({onClose}) {
  const [meterNum, setMeterNum] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const mockData = [
    {
      meterNum: '00041001669',
      code: '00041001669',
      accountNo: '02111935k',
      fullName: 'Aaaaaaaaaaaaa...',
      installDate: '2022-06-05',
      uninstallDate: '2022-06-05',
      operator: 'INJECTION'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for meter number:', meterNum);
  };

  return (
    <div className="pl-40 fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] max-w-[1400px] mx-auto p-4">
        {" "}
        {/* Increased max-width */}
        <div className="bg-gray-100 rounded-lg shadow-xl">
          {" "}
          {/* Added shadow-xl for better depth */}
          {/* Header */}
          <div className="flex justify-between items-center p-4 ">
            <h2 className="text-base font-normal">
              Select Choose History Information
            </h2>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-gray-200 rounded">
                <Minimize2 size={18} />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Copy size={18} />
              </button>
              <button
                className="p-1 hover:bg-gray-200 rounded"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>
          </div>
          {/* Search Form */}
          <div className="p-4">
            <form onSubmit={handleSearch} className="max-w-md">
              <label className="block text-sm text-gray-600 mb-1">
                Meter Num
              </label>
              <input
                type="text"
                value={meterNum}
                onChange={(e) => setMeterNum(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none mb-2"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#001233] text-white text-sm rounded hover:bg-blue-900"
              >
                Search
              </button>
            </form>
          </div>
          {/* Pagination Info */}
          <div className="px-4 py-2 flex items-center gap-2 text-sm bg-gray-50">
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronFirst size={16} />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronRight size={16} className="text-[#FF9900]" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded">
              <ChevronLast size={16} className="text-[#FF9900]"/>
            </button>
            <span className="text-sm">
              Total 38545 Records, Record 1-10, Page1/3855, Turn To Page
            </span>
            <input
              type="text"
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            />
            <button className="p-1 text-green-600 hover:bg-gray-200 rounded">
              <ChevronRight size={16} />
            </button>
          </div>
          {/* Table - Now with more width */}
          <div className="px-4 pb-4">
            <div className="bg-white border-gray-300 rounded overflow-x-auto">
              <table className="w-full text-sm min-w-[1200px]">
                {" "}
                {/* Increased min-width */}
                <thead>
                  <tr className="bg-[#001233] text-white">
                    <th className="py-2 px-4 text-left min-w-[150px]">
                      Meter Num.
                    </th>
                    <th className="py-2 px-4 text-left min-w-[150px]">Code</th>
                    <th className="py-2 px-4 text-left min-w-[150px]">
                      Account No.
                    </th>
                    <th className="py-2 px-4 text-left min-w-[200px]">
                      Full Name
                    </th>
                    <th className="py-2 px-4 text-left min-w-[150px]">
                      Install Date
                    </th>
                    <th className="py-2 px-4 text-left min-w-[150px]">
                      Uninstall Date
                    </th>
                    <th className="py-2 px-4 text-left min-w-[150px]">
                      Operator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((record, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-300 hover:bg-gray-50"
                    >
                      <td className="py-2 px-4 flex items-center gap-1">
                        <Copy
                          size={14}
                          className="text-gray-500 cursor-pointer"
                        />
                        {record.meterNum}
                      </td>
                      <td className="py-2 px-4">{record.code}</td>
                      <td className="py-2 px-4">{record.accountNo}</td>
                      <td className="py-2 px-4">{record.fullName}</td>
                      <td className="py-2 px-4">{record.installDate}</td>
                      <td className="py-2 px-4">{record.uninstallDate}</td>
                      <td className="py-2 px-4">{record.operator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Footer */}
          <div className="p-4 border-t flex justify-end gap-2">
            <button className="px-6 py-1.5 bg-[#001233] text-white text-sm rounded hover:bg-blue-900">
              Ok
            </button>
            <button
              className="px-6 py-1.5 border border-gray-300 text-sm rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchByHistory;
