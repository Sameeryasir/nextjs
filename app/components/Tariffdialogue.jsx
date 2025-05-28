"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import Newtariffdialogue from "./NewTariffdialogue";
function Tariffdialogue() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    branch1: "",
    branch2: "",
    code: "",
    description: "",
    tariffType: "",
    fee: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    setFormData({
      branch1: "",
      branch2: "",
      code: "",
      description: "",
      tariffType: "",
      fee: "",
      remark: "",
    });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">
          New Tariff
        </h1>

        <div className="space-y-6">
          {/* Branch */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600">
              Branch
            </label>

            <input
              name="branch1"
              value={formData.branch1}
              onChange={handleChange}
              type="text"
              placeholder="Branch 1"
              className="w-full sm:w-[220px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />

            <input
              name="branch2"
              value={formData.branch2}
              onChange={handleChange}
              type="text"
              placeholder="Branch 2"
              className="w-full sm:w-[220px] px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />

            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-[9px] rounded-md hover:bg-[#e08900] transition flex items-center justify-center text-sm w-10 h-[38px]"
              onClick={() => setIsDialogOpen(true)}
            >
              ...
            </button>
            {isDialogOpen && (
              <Newtariffdialogue onClose={() => setIsDialogOpen(false)} />
            )}
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-[9px] rounded-md hover:bg-[#e08900] transition flex items-center justify-center w-10 h-[38px]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Code */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600">Code</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600">
              Description
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Tariff Type */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600">
              Tariff Type
            </label>
            <select
              name="tariffType"
              value={formData.tariffType}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#FF9900]"
            >
              <option value="">Select tariff type</option>
              <option value="Sonelec Ngazidja">Sonelec Ngazidja</option>
              <option value="Agent Sonelec">Agent Sonelec</option>
              <option value="Mosquee">Mosquee</option>
              <option value="Moheli">Moheli</option>
              <option value="Administration">Administration</option>
              <option value="Corps Diplomatique">Corps Diplomatique</option>
              <option value="Agent Sonelec Maitrise">
                Agent Sonelec Maitrise
              </option>
              <option value="Agent Sonelec Cadre">Agent Sonelec Cadre</option>
              <option value="Agent Sonelec Retraite">
                Agent Sonelec Retraite
              </option>
              <option value="Agent Sonelec DG">Agent Sonelec DG</option>
              <option value="Anjouan">Anjouan</option>
            </select>
          </div>

          {/* Fee */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600">Fee</label>
            <input
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {/* Remark */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <label className="w-full sm:w-40 text-sm text-gray-600 pt-1">
              Remark
            </label>
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 h-32 resize-none"
              placeholder="Enter any remarks..."
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-10 justify-start sm:ml-44">
          <button className="bg-[#FF9900] text-white px-5 py-2 rounded-md shadow-md transition hover:opacity-90 w-full sm:w-[120px]">
            Submit
          </button>
          <button
            onClick={handleRefresh}
            className="bg-[#FF9900] text-white px-5 py-2 rounded-md shadow-md transition hover:opacity-90 w-full sm:w-[120px]"
          >
            Refresh
          </button>
          <Link href="/tariff">
            <button className="bg-[#FF9900] text-white px-5 py-2  rounded-md shadow-md transition hover:opacity-90 w-full sm:w-[120px]">
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tariffdialogue;
