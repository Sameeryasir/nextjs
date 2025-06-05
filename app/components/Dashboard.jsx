"use client";
import { useState } from "react";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allAreaData = [
  [
    { year: "2016", value: 5000 },
    { year: "2017", value: 10000 },
    { year: "2018", value: 35000 },
    { year: "2019", value: 55000 },
    { year: "2020", value: 7000 },
    { year: "2021", value: 30000 },
    { year: "2022", value: 60000 },
    { year: "2023", value: 95000 },
  ],
  [
    { year: "2016", value: 15000 },
    { year: "2017", value: 18000 },
    { year: "2018", value: 28000 },
    { year: "2019", value: 49000 },
    { year: "2020", value: 8000 },
    { year: "2021", value: 10000 },
    { year: "2022", value: 40000 },
    { year: "2023", value: 85000 },
  ],
  [
    { year: "2016", value: 25000 },
    { year: "2017", value: 20000 },
    { year: "2018", value: 30000 },
    { year: "2019", value: 50000 },
    { year: "2020", value: 10000 },
    { year: "2021", value: 12000 },
    { year: "2022", value: 50000 },
    { year: "2023", value: 100000 },
  ],
];

const allBarData = [
  [
    { date: "10", value: 45 },
    { date: "11", value: 90 },
    { date: "12", value: 65 },
    { date: "13", value: 80 },
    { date: "14", value: 45 },
  ],
  [
    { date: "15", value: 50 },
    { date: "16", value: 70 },
    { date: "17", value: 40 },
    { date: "18", value: 90 },
    { date: "19", value: 60 },
  ],
  [
    { date: "20", value: 30 },
    { date: "21", value: 75 },
    { date: "22", value: 85 },
    { date: "23", value: 55 },
    { date: "24", value: 95 },
  ],
];

const allDonutData = [
  [
    { name: "Option A", value: 60, color: "#01143C" },
    { name: "Option B", value: 20, color: "#F8C9C9" },
    { name: "Option C", value: 20, color: "#FFA500" },
  ],
  [
    { name: "Option A", value: 40, color: "#01143C" },
    { name: "Option B", value: 30, color: "#F8C9C9" },
    { name: "Option C", value: 30, color: "#FFA500" },
  ],
];

export default function Dashboard() {
  const [areaPage, setAreaPage] = useState(0);
  const areaData = allAreaData[areaPage];

  const handleAreaPrev = () => {
    setAreaPage((prev) => Math.max(prev - 1, 0));
  };

  const handleAreaNext = () => {
    setAreaPage((prev) => Math.min(prev + 1, allAreaData.length - 1));
  };

  const [page, setPage] = useState(0);
  const barData = allBarData[page];

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, allBarData.length - 1));
  };

  const [donutIndex, setDonutIndex] = useState(0);
  const donutData = allDonutData[donutIndex];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        {/* Top Stats */}
        <div className="flex flex-wrap gap-4 h-[250px] max-w-[1090px]">
          <div className="bg-[#000D35] text-white p-6 rounded-xl shadow-md w-[350px]">
            <h2 className="text-sm uppercase">Total Expenses</h2>
            <p className="text-2xl font-bold mt-2">$95.595</p>
          </div>

          <div className="bg-[#FFA500] text-white p-6 rounded-xl shadow-md w-[350px]">
            <h2 className="text-sm uppercase">Total Expenses</h2>
            <p className="text-2xl font-bold mt-2">$12.789</p>
          </div>

          <div className="bg-[#F8C9C9] text-gray-800 p-6 rounded-xl shadow-md w-[350px]">
            <h2 className="text-sm uppercase">New Users</h2>
            <p className="text-2xl font-bold mt-2">13.984K</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          {/* Area Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1 max-w-md min-w-[600px]">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleAreaPrev}
                disabled={areaPage === 0}
                className="text-gray-500 hover:text-black disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold">Growth</h2>
                <span className="text-sm text-gray-500">Yearly</span>
              </div>
              <button
                onClick={handleAreaNext}
                disabled={areaPage === allAreaData.length - 1}
                className="text-gray-500 hover:text-black disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  strokeDasharray="2 2"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md flex-1 max-w-md min-w-[468px]">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className="text-gray-500 hover:text-black disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold text-center">March 2023</h2>
              <button
                onClick={handleNext}
                disabled={page === allBarData.length - 1}
                className="text-gray-500 hover:text-black disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={barData} barCategoryGap={50}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={6}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === barData.length - 1 ? "#FFA500" : "#000D35"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 text-sm text-gray-800">
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Today</span>
                <span>${barData[barData.length - 1].value.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Best</span>
                <span>
                  ${Math.max(...barData.map((d) => d.value)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold">Average</span>
                <span>
                  $
                  {(
                    barData.reduce((acc, curr) => acc + curr.value, 0) /
                    barData.length
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white p-6 shadow-md max-w-md min-w-[1085px] h-[447px]">
            <h2 className="font-semibold mb-4">City Order Statistics</h2>
            <div className="w-full h-64 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4">
        {/* Dynamic Donut Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md w-sm h-[450px] flex flex-col justify-between mr-20">
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setDonutIndex(Math.max(donutIndex - 1, 0))}
                className="text-gray-500 hover:text-black disabled:opacity-30"
                disabled={donutIndex === 0}
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-center font-semibold text-sm">March 2023</h2>
              <button
                onClick={() =>
                  setDonutIndex(
                    Math.min(donutIndex + 1, allDonutData.length - 1)
                  )
                }
                className="text-gray-500 hover:text-black disabled:opacity-30"
                disabled={donutIndex === allDonutData.length - 1}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <PieChart width={200} height={200} className="mx-auto">
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <ul className="mt-2 text-xs text-gray-600 space-y-1">
            {donutData.map((item, i) => (
              <li key={i}>
                <span
                  className="inline-block w-2.5 h-2.5 mr-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name} - {item.value}%
              </li>
            ))}
          </ul>
        </div>

        {/* Top Companies */}
        <div className="bg-white p-6 rounded-xl shadow-md w-sm min-w-[240px] h-[618px]">
          <h2 className="font-semibold mb-2">Top Companies</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {[...Array(8)].map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className={`w-4 h-4 rounded-full ${
                    i % 2 === 0 ? "bg-[#000D35]" : "bg-[#FFA500]"
                  }`}
                ></span>
                <span>Aaaaaa</span>
                <span className="ml-auto text-xs text-gray-500">Online</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
