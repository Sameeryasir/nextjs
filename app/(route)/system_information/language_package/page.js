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
import Addkeyword from "./addkeyword";

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const data = [
    { file: "Common", keyword: "Active...." },
    { file: "Common", keyword: "Add...." },
    { file: "Common", keyword: "Adjust Session...." },
    { file: "Common", keyword: "Adjust Session...." },
  ];

  const handleRefresh = () => {
    setIsFading(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsFading(false);
      setIsLoading(false);
    }, 500);
  };

  const handleExport = () => {
    const csvContent = [
      ["File Name", "Key Word"],
      ...data.map((item) => [item.file, item.keyword]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "keywords_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    const [isDialogOpen, setIsDialogOpen] = useState(false);


  return (
    <>
      <div className="min-h-screen bg-white">
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
          <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
            <section>
              <h1 className="text-xl font-medium text-gray-900 mb-6">
                Base Info
              </h1>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    File Name
                  </label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select File Type
                    </option>
                    <option value="common">Common</option>
                    <option value="function">Function</option>
                    <option value="message_lang">Message_lang</option>
                    <option value="smart_vend_lang">SMART vend_lang</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Key Word</label>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Language</label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Language
                    </option>
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="fr">French</option>
                  </select>
                </div>
            
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Description Is Empty ?
                  </label>
                  <select
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="en">Matching</option>
                    <option value="zh">Accurate Matching</option>
                    <option value="fr">Empty</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Description
                  </label>
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-10 justify-end">
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                  Search
                </button>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                >
                  Add Keyword
                </button>
                {isDialogOpen && (
                  <Addkeyword onClose={() => setIsDialogOpen(false)} />
                )}
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
                >
                  Export
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
                <ChevronFirst className="w-4 h-4 cursor-pointer hover:text-[#FF9900]" />
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-[#FF9900]" />
                <ChevronRight className="w-4 h-4 text-[#FF9900] cursor-pointer" />
                <ChevronLast className="w-4 h-4 text-[#FF9900] cursor-pointer" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600 whitespace-nowrap">
                  Total Records
                </span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Record 1-4, Page 1/1
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Turn To Page
                </span>
                <input
                  type="text"
                  className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                  value="1"
                  readOnly
                />
                <ChevronRight className="w-3 h-3 text-green-500 hover:text-green-600 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">File Name</th>
                  <th className="p-2 sm:p-3 text-left">Key Word</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 sm:p-3 flex items-center gap-2 whitespace-nowrap">
                      <span className="text-lg">📄</span>
                      <span className="truncate">{item.file}</span>
                    </td>
                    <td className="p-2 sm:p-3 whitespace-nowrap">
                      <div className="flex items-center justify-between w-sm">
                        <span className="truncate">{item.keyword}</span>
                        <span className="text-red-500 text-lg cursor-pointer justify-end">
                          ❌
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
