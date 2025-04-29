"use client";

const TokenGenerator = () => {
const handleprint=()=>{
window.print();
}

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-2xl text-left ml-14 mb-10 space-y-8">
        <section className>
          <h1 className="text-xl font-medium text-gray-900 mb-6">
            Generate Key Changed Token
          </h1>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Meter Num</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Security Module
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Old Key</label>
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="600501-1-255-ELECTRICITE D'ANJOUAN COMORES">
                  600501-1-255-ELECTRICITE D'ANJOUAN COMORES
                </option>
                <option value="600501-1-255-ELECTRICITE D'ANJOUAN COMORES">
                  600501-1-255-ELECTRICITE D'ANJOUAN COMORES
                </option>
                <option value="600501-1-255-MWE">600501-1-255-MWE</option>
                <option value="600501-1-255-MWE">600501-1-255-MWE</option>
                <option value="600501-1-255-SONELEC">
                  600501-1-255-SONELEC
                </option>
                <option value="600501-1-255-SONELEC">
                  600501-1-255-SONELEC
                </option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Old Tarrif Rate
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">New Key</label>
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option value="600501-1-255-ELECTRICITE D'ANJOUAN COMORES">
                  600501-1-255-ELECTRICITE D'ANJOUAN COMORES
                </option>
                <option value="600501-1-255-ELECTRICITE D'ANJOUAN COMORES">
                  600501-1-255-ELECTRICITE D'ANJOUAN COMORES
                </option>
                <option value="600501-1-255-MWE">600501-1-255-MWE</option>
                <option value="600501-1-255-MWE">600501-1-255-MWE</option>
                <option value="600501-1-255-SONELEC">
                  600501-1-255-SONELEC
                </option>
                <option value="600501-1-255-SONELEC">
                  600501-1-255-SONELEC
                </option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Current Tarrif
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Take One</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Take Two</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">Take Three</label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm text-gray-500">
                Rollover Status
              </label>
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
              />
            </div>
          </div>
          <div className="flex flex-1  gap-10 mt-10 justify-center">
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40">
            Generate Token
          </button>
          <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
          onClick={handleprint}>
            Print
          </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TokenGenerator;
