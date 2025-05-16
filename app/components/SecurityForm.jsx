  "use client";
  import React, { useState } from "react";
  import DonutChart from "./Securitymodule";
  import Modifydialogue from "./Modifydialogue";
  function SecurityForm() {
    const [showdialogue,setshowdialogue]=useState(false);
    const handlereload=()=>{
      window.location.reload();
    }
    return (
      <>
        {" "}
        <div className="bg-white">
          <div className="flex justify-end space-x-4">
            <button 
            onClick={()=>handlereload()}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
              Refresh
            </button>
            <button
              className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
              onClick={() => setshowdialogue(true)}
            >
              Modify
            </button>
          </div>

          {/* Popup - Now outside the flex container */}
          {showdialogue && (
            <div className="fixed inset-0 z-50">
              {/* Semi-transparent overlay */}
              <div
                className="absolute inset-0 bg-transparent bg-opacity-50"
                onClick={() => setshowdialogue(false)}
              />

              {/* Centered dialog */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Modifydialogue onClose={() => setshowdialogue(false)} />
              </div>
            </div>
          )}
          <div className="flex gap-10 items-start">
            {/* Donut Chart */}
            <div className="flex-1">
              <DonutChart />
            </div>

            {/* Customer Information Form */}
            <div className="flex-1 text-left space-y-8  mt-7">
              {/* Customer Information Section */}
              <section className="mt-10">
                <div className="space-y-6">
                  {/* Code + Other Code - Unified Row */}
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-sm text-gray-600">Agent</label>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50 max-w-sm"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-32 text-sm text-gray-600">
                      IP & Port
                    </label>
                    <div className="flex gap-4 flex-1">
                      <input
                        type="text"
                        className="max-w-[200px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                      />
                      <input
                        type="text"
                        className="max-w-[200px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="w-32 text-sm text-gray-600">
                      ServerType
                    </label>
                    <input
                      type="text"
                      className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-32 text-sm text-gray-600">Status</label>
                    <input
                      type="text"
                      className="w-[280px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-8 space-x-4 ">
                  <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                    Apply New Key
                  </button>
                  <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                    Load Key
                  </button>
                  <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
                    Key Comparison
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default SecurityForm;
