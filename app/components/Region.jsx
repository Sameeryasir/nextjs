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

export default function FolderTree() {
  return (
    <div className="bg-white w-full max-w-md rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Branch Structure
      </h2>
      <div className="space-y-1">
        <Folder name="001 - Area">
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
  );
}
