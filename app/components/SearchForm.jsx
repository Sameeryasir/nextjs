import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    subscribeType: "",
    recipient: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", formData);
  };

  return (
    <div className="w-full max-w-1xl mx-auto p-6  mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Subscription</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Description"
            />
          </div>

          <div>
            <input
              type="text"
              name="subscribeType"
              value={formData.subscribeType}
              onChange={handleChange}
              className="w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Subscribe Type"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Recipient"
            />
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-2.5 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default SearchForm;
