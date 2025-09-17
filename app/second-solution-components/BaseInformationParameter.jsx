"use client";
import React, { useState } from "react";

const BranchInformationForm = () => {
  const [formData, setFormData] = useState({
    branchType: "",
    owner: "SONELEC",
    branchCode: "0000",
    region: "Etc/GMT+3",
    currencySymbol: "KMF",
    reportType: "",
    reportServerHost: "",
    reportServerPort: "9003",
    autoBranchCode: false,
    passwordExpiryDay: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleRefresh = () => {
    console.log("Refreshing form data");
    // Add your refresh logic here
  };

  const inputStyle = "flex-grow px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const readOnlyInputStyle = `${inputStyle} bg-gray-100 cursor-not-allowed`;
  const labelClasses = "w-48 text-sm text-gray-600";
  const africanTimezones = [
    "Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", 
    "Africa/Asmara", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", 
    "Africa/Bissau", "Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", 
    "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", 
    "Africa/Dakar", "Africa/Dar_es_Salaam", "Africa/Djibouti"
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-6 text-gray-800">Branch Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 mb-8">
          {/* Branch Type */}
          <div className="flex items-center">
            <label htmlFor="branchType" className={labelClasses}>Branch Type</label>
            <input
              type="text"
              id="branchType"
              name="branchType"
              value={formData.branchType}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Owner */}
          <div className="flex items-center">
            <label htmlFor="owner" className={labelClasses}>Owner</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              className={readOnlyInputStyle}
              readOnly
            />
          </div>

          {/* Branch (Composite) */}
          <div className="flex items-center md:col-span-2">
            <label className={labelClasses}>Branch</label>
            <div className="flex-grow flex items-center gap-4">
              <input
                type="text"
                name="branchCode"
                value={formData.branchCode}
                className={`${readOnlyInputStyle} w-1/4`}
                readOnly
              />
              <input
                type="text"
                name="owner"
                value={formData.owner}
                className={`${readOnlyInputStyle} w-3/4`}
                readOnly
              />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 text-gray-800">Base Info</h2>
        
        <div className="grid grid-cols-1 gap-y-5">
          {/* Region */}
          <div className="flex items-center">
            <label htmlFor="region" className={labelClasses}>Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={inputStyle}
            >
              <option>Etc/GMT+3</option>
              {africanTimezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
          
          {/* Currency Symbol */}
          <div className="flex items-center">
            <label htmlFor="currencySymbol" className={labelClasses}>Currency Symbol</label>
            <input
              type="text"
              id="currencySymbol"
              name="currencySymbol"
              value={formData.currencySymbol}
              className={readOnlyInputStyle}
              readOnly
            />
          </div>
          
          {/* Report Type */}
          <div className="flex items-center">
            <label htmlFor="reportType" className={labelClasses}>Report Type</label>
            <input
              type="text"
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Report Server Host */}
          <div className="flex items-center">
            <label htmlFor="reportServerHost" className={labelClasses}>Report Server Host</label>
            <input
              type="text"
              id="reportServerHost"
              name="reportServerHost"
              value={formData.reportServerHost}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          {/* Report Server Port */}
          <div className="flex items-center">
            <label htmlFor="reportServerPort" className={labelClasses}>Report Server Port</label>
            <input
              type="text"
              id="reportServerPort"
              name="reportServerPort"
              value={formData.reportServerPort}
              className={readOnlyInputStyle}
              readOnly
            />
          </div>

          {/* Auto.Branch Code */}
          <div className="flex items-center">
            <label htmlFor="autoBranchCode" className={labelClasses}>Auto.Branch Code</label>
            <input
              type="checkbox"
              id="autoBranchCode"
              name="autoBranchCode"
              checked={formData.autoBranchCode}
              onChange={handleChange}
              className="h-5 w-5 text-blue-800 border-gray-300 rounded focus:ring-blue-700"
            />
          </div>

          {/* Password Expiry Day */}
          <div className="flex items-center">
            <label htmlFor="passwordExpiryDay" className={labelClasses}>Password Expiry Day</label>
            <input
              type="number"
              id="passwordExpiryDay"
              name="passwordExpiryDay"
              value={formData.passwordExpiryDay}
              onChange={handleChange}
              className={inputStyle}
            />
            <span className="ml-2 text-gray-500">Day(s)</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4 mt-10">
          <button
            type="submit"
            className="px-10 py-2.5 bg-[#0D223F] text-white font-semibold rounded-md hover:bg-[#1c3a64] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D223F] transition duration-200"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-10 py-2.5 bg-[#F59E0B] text-white font-semibold rounded-md hover:bg-[#d97706] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F59E0B] transition duration-200"
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
};

export default BranchInformationForm;
