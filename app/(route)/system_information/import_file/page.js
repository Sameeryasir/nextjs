"use client";
import React, { useRef, useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [importedFileName, setImportedFileName] = useState("");

  const fileInputRef = useRef(null);

  const handleRefresh = () => {
    setIsFading(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsFading(false);
      setIsLoading(false);
    }, 500);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportedFileName(file.name);
      console.log("Imported file:", file.name);
      e.target.value = ""; // Reset so the same file can be selected again
    }
  };

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
              <h1 className="text-xl font-medium text-gray-900 mb-10">
                Import Language File 
              </h1>
              <div className="space-y-4">
                {/* File Name Dropdown + Import */}
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    File Name
                  </label>
                  <div className="flex flex-1 items-center gap-3">
                    <select
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700"
                      defaultValue=""
                      disabled={!importedFileName}
                    >
                      <option value="" disabled>
                        Select File Type
                      </option>
                      {importedFileName && (
                        <option value={importedFileName}>
                          {importedFileName}
                        </option>
                      )}
                    </select>
                    <button
                      onClick={handleImportClick}
                      className="px-3 py-2 bg-[#FF9900] text-white rounded-md text-sm whitespace-nowrap w-[100px]"
                    >
                      Import
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".json,.csv,.txt"
                    />
                  </div>
                </div>

                {/* Language Dropdown */}
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
              </div>

              <div className="flex gap-2 mt-10 justify-center">
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                  Search
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
