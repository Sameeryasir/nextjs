"use client";
import React, { useState } from "react";
import Link from "next/link";

function Page() {
  // State for all form fields
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    mainRole: "",
    department: "",
    isVender: false,
    bindIP: false,
    isLDAP: false,
    loginDisabledAccessControl: false,
    disableExamineOperatorList: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false); // New state for fade effect

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Refresh function - resets all form fields
  const handleRefresh = () => {
    setIsFading(true); // Start fade out
    setIsLoading(true);

    // After fade out completes (300ms), reset form and fade back in
    setTimeout(() => {
      setFormData({
        code: "",
        name: "",
        description: "",
        mainRole: "",
        department: "",
        isVender: false,
        bindIP: false,
        isLDAP: false,
        loginDisabledAccessControl: false,
        disableExamineOperatorList: false,
      });

      setIsFading(false); // Fade back in
      setIsLoading(false);
    }, 500);
  };

  // Handle form submission
const handleSubmit = () => {
  setIsFading(true); // Start fade out
  setIsLoading(true);

  setTimeout(() => {
    console.log("Form submitted:", formData);
    // Simulate API call success and then reset
    setFormData({
      code: "",
      name: "",
      description: "",
      mainRole: "",
      department: "",
      isVender: false,
      bindIP: false,
      isLDAP: false,
      loginDisabledAccessControl: false,
      disableExamineOperatorList: false,
    });
    setIsFading(false);
    setIsLoading(false);
  }, 1000); // Simulate 1 second submission delay
};


  return (
    <div className="min-h-screen bg-white">
      {isLoading && (
        <div className="fixed inset-0 bg-transparent pl-40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
        </div>
      )}

      <div
        className={`max-w-1xl mx-auto space-y-8 ml-8 transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Basic Information
        </h1>

        <div className="space-y-8">
          {/* Transaction Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Main Role
              </label>
              <select
                name="mainRole"
                value={formData.mainRole}
                onChange={handleInputChange}
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled={isLoading}
              >
                <option value="">Select a role</option>
                <option value="Administrator">Administrator</option>
                <option value="Vender">Vender</option>
                <option value="Manager">Manager</option>
                <option value="Third-Part">Third-Part</option>
                <option value="Browse">Browse</option>
                <option value="CAISSE PRINCIPALE">CAISSE PRINCIPALE</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled={isLoading}
              >
                <option value="">Select a department</option>
                <option value="DIRECTION GENERALE">DIRECTION GENERALE</option>
                <option value="CAISSE 1 MORONI">CAISSE 1 MORONI</option>
                <option value="CAISSE 2 MORONI">CAISSE 2 MORONI</option>
                <option value="BAMBAO">BAMBAO</option>
                <option value="DIMANI">DIMANI</option>
                <option value="WACHILI">WACHILI</option>
                <option value="KOIMBANI">KOIMBANI</option>
                <option value="MITSAMIOULI">MITSAMIOULI</option>
                <option value="MITSAMIOULI MDJINI">MITSAMIOULI MDJINI</option>
                <option value="TSANDZENI">TSANDZENI</option>
                <option value="MOIADJA">MOIADJA</option>
              </select>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8 mt-10">
              Authority
            </h1>
            <div className="flex items-center gap-20">
              <label className="w-48 text-sm font-medium text-gray-700">
                Is Vender
              </label>
              <input
                type="checkbox"
                name="isVender"
                checked={formData.isVender}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-20">
              <label className="w-48 text-sm font-medium text-gray-700">
                Bind IP
              </label>
              <input
                type="checkbox"
                name="bindIP"
                checked={formData.bindIP}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-20">
              <label className="w-48 text-sm font-medium text-gray-700">
                Is LDAP
              </label>
              <input
                type="checkbox"
                name="isLDAP"
                checked={formData.isLDAP}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-20">
              <label className="w-48 text-sm font-medium text-gray-700">
                Login Disabled Access Control
              </label>
              <input
                type="checkbox"
                name="loginDisabledAccessControl"
                checked={formData.loginDisabledAccessControl}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center gap-20">
              <label className="w-48 text-sm font-medium text-gray-700">
                Disable to examine operator List
              </label>
              <input
                type="checkbox"
                name="disableExamineOperatorList"
                checked={formData.disableExamineOperatorList}
                onChange={handleInputChange}
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 ml-53">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-[#FF9900] hover:cursor-pointer text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md transition w-32 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`bg-[#FF9900] hover:cursor-pointer text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md transition w-32 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
          <Link href="/system_information/operation">
            <button
              disabled={isLoading}
              className={`bg-[#FF9900] hover:cursor-pointer text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md transition w-32 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
