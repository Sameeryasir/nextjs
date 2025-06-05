"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";

const Folder = ({ name, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-2">
    
      <div
        className={`cursor-pointer flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
          open ? "font-medium text-gray-900" : "text-gray-700"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className="mr-2 text-lg">{open ? "📂" : "📁"}</span>
        <span className="text-sm">{name}</span>
      </div>
      {open && (
        <div className="ml-6 transition-all duration-200 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleRefresh = () => {
    setIsFading(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsFading(false);
      setIsLoading(false);
    }, 500);
  };

  const handleExcelDownload = () => {
    const csvContent = `data:text/csv;charset=utf-8,Code,Name,Description,Department,Role,Region,Operator
USR001,Alice Johnson,Manages daily operations,Secdias,Operator,NGAZIDJA,Yes
USR002,Bob Smith,Oversees customer support,Secdias,Support Lead,NGAZIDJA,Yes`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "operator_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex bg-white p-6 gap-20">
      {/* Folder Tree Section */}
      
      <div className="w-1/3 max-w-xs">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Department List
        </h2>
        <div className="space-y-1">
          <Folder name="Secdias">
            <Folder name="02 - NGAZIDJA">
              <Folder name="0201 - AGENCE BAMBAO" />
              <Folder name="0202 - AGENCE MORONI" />
              <Folder name="0203 - AGENCE HAMANVU" />
              <Folder name="0204 - AGENCE ITSANDRA" />
              <Folder name="0205 - AGENCE MBENI" />
              <Folder name="0206 - AGENCE KOIMBANI" />
              <Folder name="0207 - AGENCE MITSOUDJE" />
              <Folder name="0208 - AGENCE SINGANI" />
              <Folder name="0209 - AGENCE DEMBENI" />
              <Folder name="0210 - AGENCE FOUBOUNI" />
              <Folder name="0211 - AGENCE OUZIONI" />
              <Folder name="0212 - AGENCE MITSAMIOULI" />
              <Folder name="0213 - AGENCE NTSAWENI" />
              <Folder name="0214 - AGENCE MTSANGADJOU" />
              <Folder name="0215 - AGENCE CHEZANI" />
              <Folder name="0216 - AGENCE DOMBA" />
            </Folder>
            <Folder name="03 - MOHELI" />
            <Folder name="04 - ANJOUAN" />
            <Folder name="07 - MA-MWE" />
            <Folder name="99 - USSD" />
          </Folder>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1">
        {isLoading && (
          <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
          </div>
        )}
        <div
          className={`w-full bg-white mt-10 transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col pb-4 mb-4 gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                Operator List
              </h1>
              <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleRefresh}
                  className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition text-sm sm:text-base hover:cursor-pointer"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <Link href="/system_information/operation/new_operation">
                  <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-auto sm:w-[110px] hover:cursor-pointer ">
                    <Plus size={16} />
                    <span className="hidden sm:inline ml-1">New</span>
                  </button>
                </Link>
                <button
                  onClick={handleExcelDownload}
                  className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-auto sm:w-[110px] hover:cursor-pointer"
                >
                  <span className="hidden sm:inline ml-3">Excel</span>
                </button>
              </div>
            </div>
            <p className="text-sm font-bold text-gray-800">
              Searching Conditions
            </p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
            <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <ChevronFirst className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
                  <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-[#FF9900]" />
                  <ChevronRight className="w-5 h-5 text-[#FF9900] cursor-pointer" />
                  <ChevronLast className="w-5 h-5 text-[#FF9900] cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-sm">
                  <span className="text-gray-600">Total 1 Records</span>
                  <span className="text-gray-600 hidden sm:inline">|</span>
                  <span className="text-gray-600">Record 1-1, Page 1/1</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600">Turn To Page</span>
                  <input
                    type="text"
                    defaultValue="1"
                    className="w-12 border rounded px-2 py-1 text-center text-sm"
                  />
                  <ChevronRight className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-[#FF9900] text-white">
                  <tr>
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Name of Customer</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Region</th>
                    <th className="p-3 text-left">Operator</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">USR001</td>
                    <td className="p-3">Alice Johnson</td>
                    <td className="p-3">Manages daily operations</td>
                    <td className="p-3">Secdias</td>
                    <td className="p-3">Operator</td>
                    <td className="p-3">NGAZIDJA</td>
                    <td className="p-3">Yes</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">USR002</td>
                    <td className="p-3">Bob Smith</td>
                    <td className="p-3">Oversees customer support</td>
                    <td className="p-3">Secdias</td>
                    <td className="p-3">Support Lead</td>
                    <td className="p-3">NGAZIDJA</td>
                    <td className="p-3">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
