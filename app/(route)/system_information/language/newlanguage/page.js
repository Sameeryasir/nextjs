"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
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
  return (
    <div className="min-h-screen bg-white ">
      {" "}
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
        {" "}
        <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
          <section className>
            <h1 className="text-xl font-medium text-gray-900 mb-6">
              Base Info
            </h1>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Name</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">IOS Code</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Activated</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-500">Activated</label>
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                />
              </div>
            </div>
            <div className="flex  gap-2 mt-10 justify-end">
              <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                Submit
              </button>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
              >
                Refresh
              </button>
              <Link href='/system_information/language'>
                <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                  Return
                </button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
