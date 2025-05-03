import React from 'react'

function page() {
  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">project</h1>

      {/* Status Info Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Status Info</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Branch</li>
          <li>Code</li>
          <li>Description</li>
          <li>Project Type</li>
          <li>Key Method</li>
          <li>Contract Quantity</li>
        </ul>
      </div>

      {/* General Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">General</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>VdT Rate</li>
          <li>Parent Days/Number</li>
          <li>Barrows /Fees & Fee</li>
          <li>Associated Trades</li>
          <li>Active</li>
        </ul>
      </div>

      {/* SCRABC Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">SCRABC</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>CRMS</li>
          <li>Chain Registration</li>
          <li>CREEAL FE</li>
          <li>For Day</li>
        </ul>
      </div>

      {/* Interest Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Interest</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>0.00000%</li>
          <li>0.00</li>
        </ul>
      </div>

      {/* Income Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Income</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>0.00000%</li>
          <li>0.00</li>
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          Sign up to comment, edit, inspect and more.
        </p>
      </div>
    </div>
  );
}

export default page