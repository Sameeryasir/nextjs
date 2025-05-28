import React from "react";

function Customerdialogue() {
  return (
    <div className="max-w-3xl  px-4 py-6 sm:px-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Base info</h1>

      {/* Form */}
      <form className="space-y-5">
        {/* Code */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label
            htmlFor="code"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Code
          </label>
          <input
            id="code"
            type="text"
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
        </div>

        {/* Meter Mode */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label
            htmlFor="meterMode"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Meter Mode
          </label>
          <select
            id="meterMode"
            name="meterMode"
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-gray-900"
            defaultValue=""
          >
            <option value="" disabled>
              Select Meter Mode
            </option>
            <option value="General Monophase">General Monophase</option>
            <option value="General Tripphase">General Tripphase</option>
            <option value="Compteur HT">Compteur HT</option>
          </select>
        </div>

        {/* Tariff */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label
            htmlFor="tariff"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Tariff
          </label>
          <select
            id="tariff"
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>Select Tariff</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
            <option>01 00001 - SONELEC NGAZIDJA</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label
            htmlFor="description"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
        </div>

        {/* Maximum Load Threshold */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label
            htmlFor="maxLoad"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Maximum Load Threshold
          </label>
          <input
            id="maxLoad"
            type="text"
            className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
          />
        </div>

        {/* Active Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-4">
          <label
            htmlFor="active"
            className="w-full sm:w-40 text-sm text-gray-700 font-medium"
          >
            Active
          </label>
          <input
            id="active"
            type="checkbox"
            className="h-5 w-5 accent-[#FF9900] cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Customerdialogue;
