"use client";
import React, { useState } from "react";

const Folder = ({ name, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ml-2">
      <div
        className={`cursor-pointer flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${
          open ? "font-medium text-gray-900" : "text-gray-700"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className="mr-2 text-lg">{open ? "📂" : "📁"}</span>
        <span className="text-sm">{name}</span>
      </div>
      {open && (
        <div className="ml-6 transition-all duration-200 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex bg-white p-6 gap-100">
      {/* Folder Tree Section */}
      <div className="w-1/3 max-w-xs">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Department List
        </h2>
        <div className="space-y-1">
          <Folder name="Secdias">
            <Folder name="02 - NGAZIDJA">
              <Folder name="0201 - AGENCE BAMBAO" />
              <Folder name="0202 - AGENCE MORONI" />
              <Folder name="0203 - AGENCE HAMANVU" />
              <Folder name="0204 - AGENCE ITSANDRA" />
              <Folder name="0205 - AGENCE MBENI" />
              <Folder name="0206 - AGENCE KOIMBANI" />
              <Folder name="0207 - AGENCE MITSOUDJE" />
              <Folder name="0208 - AGENCE SINGANI" />
              <Folder name="0209 - AGENCE DEMBENI" />
              <Folder name="0210 - AGENCE FOUBOUNI" />
              <Folder name="0211 - AGENCE OUZIONI" />
              <Folder name="0212 - AGENCE MITSAMIOULI" />
              <Folder name="0213 - AGENCE NTSAWENI" />
              <Folder name="0214 - AGENCE MTSANGADJOU" />
              <Folder name="0215 - AGENCE CHEZANI" />
              <Folder name="0216 - AGENCE DOMBA" />
            </Folder>
            <Folder name="03 - MOHELI" />
            <Folder name="04 - ANJOUAN" />
            <Folder name="07 - MA-MWE" />
            <Folder name="99 - USSD" />
          </Folder>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1">
        <div className="bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-900">
              Details of Department
            </h1>
          </div>

          <div className="max-w-2xl text-left ml-1 mb-14 space-y-8">
            <section className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Code</label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Telephone
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Fax</label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Supervisor
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">
                    Management Scope
                  </label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Region</label>
                  <div className="flex gap-4 flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-32 text-sm text-gray-500">Address</label>
                  <input
                    type="text"
                    className="w-[400px] px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
