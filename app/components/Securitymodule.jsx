import Securitycard from "./Securitycard";
import SecurityForm from "./SecurityForm";
export default function DonutChart() {
  const total = 2000000000;
  const progress = 89054310;
  const percentage = ((progress / total) * 100).toFixed(2);
  const remaining = total - progress;

  // SVG circle parameters
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress / total);

  return (
    <>
      <div className="max-w-4xl p-6 flex flex-row">
        {/* Security Card */}
        <div className="flex-1 justify-left mr-20">
          {" "}
          {/* Added flex and justify-start */}
          <Securitycard />
        </div>

        {/* Donut Chart Container */}
        <div className="flex-1 relative w-64 h-64">
          <h2 className="text-xl font-bold text-black text-center">
            Security Module Management
          </h2>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="fill-none stroke-gray-200"
              strokeWidth="10"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="fill-none stroke-blue-500"
              strokeWidth="10"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-gray-500">20000000</div>
            <div className="text-lg font-semibold text-gray-800">
              2025-06-29
            </div>
            <div className="text-sm text-gray-500">22:00</div>
          </div>
        </div>
    
      </div>
    </>
  );
}
