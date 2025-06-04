"use client";
import Image from "next/image";
import React, { useState } from "react";

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
  const [topIconPreview, setTopIconPreview] = useState(null);

  const handleTopIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTopIconPreview(URL.createObjectURL(file));
    }
  };
  return (
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
        <div className="max-w-2xl ml-14 mb-10 space-y-10">
          <section>
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              IE Explorer
            </h1>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                Main Interface
              </h2>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">Top Title</label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-start gap-4">
                <label className="w-32 text-sm text-gray-600 mt-2">
                  Top Icon
                </label>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTopIconChange}
                    className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-[#FF9900] file:text-white
              hover:file:cursor-pointer"
                  />
                  {topIconPreview && (
                    <Image
                      src={topIconPreview}
                      alt="Top Icon Preview"
                      className="mt-3 h-16 w-16 object-contain border rounded-md"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">
                  Width of Top Icon
                </label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">
                  Height of Top Icon
                </label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">
                  Status Bar of Middle Words
                </label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                Notice Text
              </h2>

              <div className="flex items-center gap-4">
                <label className="w-32 text-sm text-gray-600">
                  Notice Text
                </label>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div className="flex gap-8 justify-center mt-10">
              <button  className="px-6 py-2 bg-[#FF9900] text-white font-medium rounded-md hover:bg-[#e28800] transition w-40 hover:cursor-pointer">
                Submit
              </button>
              <button
                onClick={handleRefresh}
                className="px-6 py-2 bg-[#FF9900] text-white font-medium rounded-md hover:bg-[#e28800] transition w-40 cursor-pointer"
              >
                Refresh
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
