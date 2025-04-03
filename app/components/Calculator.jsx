import React, { useState } from "react";

function TransactionCalculator() {
  const [input, setInput] = useState("0");
  const [kwh, setKwh] = useState("0");
  const [kmf, setKmf] = useState("0");

  const handleNumberClick = (value) => {
    if (input === "0" && value !== ".") {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput("0");
  };

  const handlePresetAmount = (amount) => {
    setInput(amount);
  };

  const calculateValues = () => {
    const numericInput = parseFloat(input);
    if (!isNaN(numericInput)) {
      setKwh((numericInput / 5).toFixed(2));
      setKmf(numericInput.toFixed(2));
    }
  };

  const handleCalculate = () => {
    calculateValues();
  };

  return (
<div className="w-sm mx-auto p-1 bg-gray-800 rounded shadow-sm border-2 border-gray-700">      
<h1 className="text-sm font-bold mb-1 text-center text-white">
        Calculator
      </h1>

      {/* Display Area */}
      <div className="mb-1 p-1 bg-gray-50 rounded border">
        <div className="text-right text-base font-mono">{input}</div>
        <div className="flex justify-between text-xxs text-gray-600">
          <span>Kwh: {kwh}</span>
          <span>Kmf: {kmf}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0.5 mb-0.5">
        {/* Header Row */}
        <div className="bg-gray-100 p-0.5 text-xxs font-medium text-center">
          Kwh
        </div>
        <div className="bg-gray-100 p-0.5 text-xxs font-medium text-center">
          Kmf
        </div>
        <div className="bg-gray-100 p-0.5 text-xxs font-medium text-center">
          5
        </div>

        {/* Number Pad */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-white hover:bg-gray-50 p-0.5 border rounded text-xxs"
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => handleNumberClick("0")}
          className="bg-white hover:bg-gray-50 p-0.5 border rounded text-xxs"
        >
          0
        </button>
        <button
          onClick={() => (input.includes(".") ? null : handleNumberClick("."))}
          className="bg-white hover:bg-gray-50 p-0.5 border rounded text-xxs"
        >
          .
        </button>
        <button
          onClick={handleClear}
          className="bg-red-100 hover:bg-red-200 p-0.5 border rounded text-xxs"
        >
          C
        </button>
      </div>

      {/* Preset Amounts */}
      <div className="grid grid-cols-3 gap-0.5 mt-1">
        {[
          "Min.",
          "1.00",
          "2.00",
          "5.00",
          "10.00",
          "20.00",
          "50.00",
          "100.00",
          "200.00",
        ].map((amount) => (
          <button
            key={amount}
            onClick={() => {
              if (amount === "Min.") {
                handlePresetAmount("1.00");
              } else {
                handlePresetAmount(amount);
              }
              calculateValues();
            }}
            className="bg-blue-50 hover:bg-blue-100 p-0.5 border rounded text-xxs"
          >
            {amount}
          </button>
        ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="w-full mt-1 bg-green-500 hover:bg-green-600 text-white py-0.5 rounded text-xxs"
      >
        Calculate
      </button>
    </div>
  );
}

export default TransactionCalculator;
