"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Parametes() {
  const router = useRouter();

  const handleReload = () => {
    window.location.reload();
  };

  const handleSubmit = () => {
    router.push("/stockin");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-1xl mx-auto space-y-8 ml-8">
        {/* Main Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Parameters</h1>

        {/* Form Sections */}
        <div className="space-y-8">
          {/* General Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Time Zone
              </label>
              <select className="w-56 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                <option value="Etc/GMT+12">Etc/GMT+12</option>
                <option value="Etc/GMT+11">Etc/GMT+11</option>
                <option value="Etc/GMT+10">Etc/GMT+10</option>
                <option value="Etc/GMT+9">Etc/GMT+9</option>
                <option value="Etc/GMT+8">Etc/GMT+8</option>
                <option value="Etc/GMT+7">Etc/GMT+7</option>
                <option value="Etc/GMT+6">Etc/GMT+6</option>
                <option value="Etc/GMT+5">Etc/GMT+5</option>
                <option value="Etc/GMT+4">Etc/GMT+4</option>
                <option value="Etc/GMT+3">Etc/GMT+3</option>
                <option value="Etc/GMT+2">Etc/GMT+2</option>
                <option value="Etc/GMT+1">Etc/GMT+1</option>
                <option value="Etc/GMT">Etc/GMT</option>
                <option value="Etc/GMT-1">Etc/GMT-1</option>
                <option value="Etc/GMT-2">Etc/GMT-2</option>
                <option value="Etc/GMT-3">Etc/GMT-3</option>
                <option value="Etc/GMT-4">Etc/GMT-4</option>
                <option value="Etc/GMT-5">Etc/GMT-5</option>
                <option value="Etc/GMT-6">Etc/GMT-6</option>
                <option value="Etc/GMT-7">Etc/GMT-7</option>
                <option value="Etc/GMT-8">Etc/GMT-8</option>
                <option value="Etc/GMT-9">Etc/GMT-9</option>
                <option value="Etc/GMT-10">Etc/GMT-10</option>
                <option value="Etc/GMT-11">Etc/GMT-11</option>
                <option value="Etc/GMT-12">Etc/GMT-12</option>
                <option value="Etc/GMT-13">Etc/GMT-13</option>
                <option value="Etc/GMT-14">Etc/GMT-14</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Full Name of Customer
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Currency Type
              </label>
              <input
                type="text"
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* Transaction Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Transaction Interval
              </label>
              <input
                type="text"
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Default Transaction Token
              </label>
              <input
                type="text"
                className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Show Transaction Token
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Transaction Cancel Day
              </label>
              <input
                type="text"
                className="w-56 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* Report Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Report Type
              </label>
              <input
                type="text"
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Report Host Address
              </label>
              <input
                type="text"
                className="flex-1 max-w-md px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Report Search Day
              </label>
              <input
                type="text"
                className="w-56 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>

          {/* Meter Settings */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Auto Branch Code
              </label>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 accent-[#FF9900] hover:cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Default TI for Meter
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Vending By Kwh
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                SGC
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                BankNote Value
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Coin Value
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Password Expiry Day
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <span className="text-gray-400">Day</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                短信服务器IP和端口
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <span className="text-gray-400">The format must be IP|PORT</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                System Registe Alarm
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <span className="text-gray-400">Day</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Branch Auth. Alarm
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <span className="text-gray-400">Day</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                邮件服务器IP和端口
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <span className="text-gray-400">The format must be IP|PORT</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                邮箱号
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                SM Warning Object
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-48 text-sm font-medium text-gray-700">
                Alarm Threshold of SM
              </label>
              <input
                type="text"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 ml-53">
          <button
            onClick={handleSubmit}
            className="bg-[#FF9900] hover:cursor-pointer text-white px-4 py-2 rounded-md flex items-center justify-center shadow-md transition w-32 "
          >
            Submit
          </button>
         
        </div>
      </div>
    </div>
  );
}

export default Parametes;
