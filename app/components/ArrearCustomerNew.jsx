"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import SearchCustomerModal from "./SearchCustomerModel"; // Adjust the path if needed
import SearchProjectModel from "./SearchProjectmodel";
export default function NewCustomerContract() {
  const [formData, setFormData] = useState({
    nameOfCustomer: "",
    fullName: "",
    projects: "",
    payMethod: "per day",
    interestMethod: "Included",
    totalAmount: "",
    amount: "",
    payValue: "0",
    payingDate: "2025-05-28",
  });

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const[showProjectModal,setProjectModal]=useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleRefresh = () => {
    setFormData({
      nameOfCustomer: "",
      fullName: "",
      projects: "",
      payMethod: "per day",
      interestMethod: "Included",
      totalAmount: "",
      amount: "",
      payValue: "0",
      payingDate: "2025-05-28",
    });
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-semibold text-gray-800">New Customer Contract</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4 mt-7">
          {/* Name of Customer */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2 whitespace-nowrap">Name of Customer</label>
            <input
              type="text"
              name="nameOfCustomer"
              value={formData.nameOfCustomer}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
            <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
              onClick={() => setShowCustomerModal(true)}
            >
              ...
            </button>
          </div>

          {/* Full Name */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          {/* Projects */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Projects</label>
            <input
              type="text"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
             <button
              type="button"
              className="bg-[#FF9900] text-white px-3 py-2 rounded ml-2"
              onClick={() => setProjectModal(true)}
            >
              ...
            </button>
          </div>

          {/* Payment Method */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Pay Method</label>
            <select
              name="payMethod"
              value={formData.payMethod}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            >
              <option value="per day">Per Day</option>
              <option value="per week">Per Week</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Interest Method */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Interest Method</label>
            <select
              name="interestMethod"
              value={formData.interestMethod}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            >
              <option value="Included">Included</option>
              <option value="Excluded">Excluded</option>
            </select>
          </div>

          {/* Total Amount */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Total Amount</label>
            <input
              type="text"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          {/* Amount */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          {/* Pay Value */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Pay Value</label>
            <input
              type="text"
              name="payValue"
              value={formData.payValue}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          {/* Paying Date */}
          <div className="flex items-center">
            <label className="w-40 text-gray-500 mr-2">Paying Date</label>
            <input
              type="date"
              name="payingDate"
              value={formData.payingDate}
              onChange={handleChange}
              className="w-96 px-3 py-2 border border-gray-200 rounded-md bg-gray-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button type="submit" className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40">
              Submit
            </button>
            <button type="button" onClick={handleRefresh} className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button type="button" className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40">
              Return
            </button>
          </div>
        </div>
      </form>

      {/* Search Customer Modal */}
      <SearchCustomerModal isOpen={showCustomerModal} onClose={() => setShowCustomerModal(false)} />
          {/* Search Customer Modal */}
      <SearchProjectModel isOpen={showProjectModal} onClose={() => setProjectModal(false)} />
        
    </div>
  );
}
