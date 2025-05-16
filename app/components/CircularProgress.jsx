import React, { useState, useEffect, useCallback } from "react";

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 200,
  strokeWidth = 12,
  circleColor = "#E5E7EB",
  progressColor = "#4285F4",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={circleColor}
        strokeWidth={strokeWidth}
      />

      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-200 ease-linear"
      />
    </svg>
  );
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const SecurityModule: React.FC = () => {
  const [currentCode, setCurrentCode] = useState < string > "";
  const [nextCode, setNextCode] = useState < string > "";
  const [expiryTime, setExpiryTime] = useState < Date > new Date();
  const [progress, setProgress] = useState < number > 100;
  const [isTransitioning, setIsTransitioning] = useState < boolean > false;

  // Generate a random code
  const generateSecurityCode = useCallback((): string => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }, []);

  // Calculate the next expiry time (30 seconds from now)
  const calculateExpiryTime = useCallback((): Date => {
    const now = new Date();
    // Set to the next 30 second interval
    const seconds = now.getSeconds();
    const secondsToAdd = seconds < 30 ? 30 - seconds : 60 - seconds;

    return new Date(now.getTime() + secondsToAdd * 1000);
  }, []);

  // Initialize codes and expiry time
  useEffect(() => {
    setCurrentCode(generateSecurityCode());
    setNextCode(generateSecurityCode());
    setExpiryTime(calculateExpiryTime());
  }, [generateSecurityCode, calculateExpiryTime]);

  // Update progress and handle code rotation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeRemaining = expiryTime.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        // Time to rotate codes
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentCode(nextCode);
          setNextCode(generateSecurityCode());
          setExpiryTime(calculateExpiryTime());
          setIsTransitioning(false);
        }, 300);
      } else {
        // Update progress (30 seconds = 30000ms total duration)
        const newProgress = (timeRemaining / 30000) * 100;
        setProgress(Math.max(0, newProgress));
      }
    }, 100);

    return () => clearInterval(timer);
  }, [expiryTime, nextCode, generateSecurityCode, calculateExpiryTime]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <div className="p-8 flex flex-col items-center">
        <div className="relative mb-6">
          <CircularProgress progress={progress} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {expiryTime.toLocaleDateString()}
            </p>
            <p className="text-xl text-gray-700">{formatTime(expiryTime)}</p>
          </div>
        </div>

        <div className="w-full text-center">
          <div
            className={`text-5xl font-mono font-bold text-gray-900 tracking-wider mb-4 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentCode}
          </div>
        </div>
      </div>
    </div>
  );
};
