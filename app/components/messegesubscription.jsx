"use client";
import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";
import Messegetable from "./Messegetable";
import SearchForm from "./SearchForm";
function  Messegesubscription() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(1);

  // Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  const [formData, setFormData] = useState({
    code: "",
    description: "",
  });
  const [showmessege, setshowmessege] = useState(false);
  return (
    <div className="min-h-screen bg-white ">
     
      <SearchForm/>
      <Messegetable/>
    </div>
  );
}

export default Messegesubscription;
