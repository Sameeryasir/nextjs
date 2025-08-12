"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, AlertTriangle } from "lucide-react";

// --- Helper Functions ---

// Parses the initial server time from the API's HTML response
const parseInitialTime = (htmlString) => {
    const match = htmlString.match(/new Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
    if (match) {
        const [, year, month, day, hour, minute, second] = match.map(Number);
        // The month in JavaScript's Date constructor is 0-indexed (0-11)
        return new Date(year, month, day, hour, minute, second);
    }
    return new Date(); // Fallback
};

// Parses user data and language options from the API's HTML response
const parseHeaderData = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const baseUrl = "http://localhost:38080";
    
    const data = {
        companyName: doc.querySelector("#banner_text")?.textContent.trim() || "My App",
        user: doc.querySelector("span.user")?.textContent.trim() || "User",
        date: doc.querySelector("#header_date")?.textContent.trim() || "",
        weekDay: doc.querySelector("#header_week")?.textContent.trim() || "",
        languages: []
    };

    doc.querySelectorAll("#first-languages li a").forEach(langLink => {
        const imgSrc = langLink.querySelector('img')?.getAttribute('src');
        if (imgSrc) {
            data.languages.push({
                title: langLink.getAttribute("title"),
                imgSrc: `${baseUrl}${imgSrc}`
            });
        }
    });
    return data;
};

// Clears all cookies for the current domain
const clearAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};

// --- Components ---

// Logout Confirmation Popup Component
const LogoutConfirmPopup = ({ user, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center border-t-8 border-orange-500">
            <AlertTriangle size={48} className="text-orange-500 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">Confirm Logout</h3>
            <p className="text-gray-600 mt-4">
                Hello <span className="font-semibold">{user}</span>.
                <br/>
                Do you really want to logout?
            </p>
            <div className="flex justify-center space-x-4 mt-8">
                <button
                    onClick={onCancel}
                    className="px-8 py-2 rounded-md font-semibold transition-colors duration-200 bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-8 py-2 rounded-md font-semibold transition-colors duration-200 bg-[#FF9900] text-white hover:bg-orange-600"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
);


function Navigation() {
  const router = useRouter();
  const [headerData, setHeaderData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for the logout popup

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const cookieString = document.cookie;
        if (!cookieString || cookieString.trim() === "") {
          router.push("/auth/login");
          return;
        }
        const response = await fetch('/api/navigator-header', {
            method: 'POST',
            headers: { 'Cookie': cookieString }
        });
        const htmlText = await response.text();
        if (!response.ok) throw new Error("Failed to fetch header data");

        const parsedData = parseHeaderData(htmlText);
        const initialTime = parseInitialTime(htmlText);
        
        setHeaderData(parsedData);
        setCurrentTime(initialTime);

      } catch (error) {
        console.error("Error fetching header:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prevTime => new Date(prevTime.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true); // Show the confirmation popup
  };

  const confirmLogout = async () => {
    try {
        const cookieString = document.cookie;
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Cookie': cookieString }
        });
        const data = await response.json();
        if (data.state === 0) {
            clearAllCookies(); // Clear cookies on successful API logout
            router.push("/auth/login");
        } else {
            alert("Logout failed: " + data.message);
        }
    } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred during logout.");
    } finally {
        setShowLogoutConfirm(false);
    }
  };

  if (loading) {
    return <div className="bg-gradient-to-r from-[#000D35] to-[#FF9900] h-[72px]"></div>;
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#000D35] to-[#FF9900] text-white px-8 py-3 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold tracking-wider">{headerData?.companyName}</span>
          </div>
          <div className="flex flex-col items-end text-sm">
            <div className="flex items-center gap-4 bg-[#000D35] px-4 py-1 rounded-md">
              <span>{headerData?.date} {headerData?.weekDay}</span>
              <span>|</span>
              <span>{currentTime.toLocaleTimeString()}</span>
              <span>|</span>
              <span className="font-semibold">{headerData?.user}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              {headerData?.languages.map(lang => (
                <a href="#" key={lang.title} title={lang.title} className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5">
                  <img src={lang.imgSrc} alt={lang.title} className="w-5 h-auto rounded-sm border border-white/20"/>
                  <span className="text-xs">({lang.title.substring(0, 2).toUpperCase()})</span>
                </a>
              ))}
              <button
                onClick={handleLogoutClick}
                className="flex items-center text-sm text-orange-300 hover:text-white transition-colors ml-2"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <LogoutConfirmPopup 
            user={headerData?.user} 
            onConfirm={confirmLogout} 
            onCancel={() => setShowLogoutConfirm(false)} 
        />
      )}
    </>
  );
}

export default Navigation;
