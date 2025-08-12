'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, AlertTriangle, CheckCircle, X } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // State for the custom pop-up
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    type: '', // 'success' or 'error'
    title: '',
    message: '',
    lastUsedTime: null,
    currentSystemTime: null,
    currentDisplayedTime: '',
    buttons: [],
  });

  // Effect to update current time in the popup every second
  useEffect(() => {
    let intervalId;
    if (showCustomPopup && popupData.type === 'success' && popupData.currentSystemTime) {
      const [datePart, timePart] = popupData.currentSystemTime.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);
      let currentParsedTime = new Date(year, month - 1, day, hours, minutes, seconds);

      intervalId = setInterval(() => {
        currentParsedTime.setSeconds(currentParsedTime.getSeconds() + 1);
        const updatedHours = String(currentParsedTime.getHours()).padStart(2, '0');
        const updatedMinutes = String(currentParsedTime.getMinutes()).padStart(2, '0');
        const updatedSeconds = String(currentParsedTime.getSeconds()).padStart(2, '0');
        const updatedDayOfWeek = currentParsedTime.toLocaleString('en-US', { weekday: 'long' });
        const updatedDatePart = `${currentParsedTime.getFullYear()}-${String(currentParsedTime.getMonth() + 1).padStart(2, '0')}-${String(currentParsedTime.getDate()).padStart(2, '0')}`;
        
        setPopupData(prev => ({
          ...prev,
          currentDisplayedTime: `${updatedDatePart} ${updatedHours}:${updatedMinutes}:${updatedSeconds} ${updatedDayOfWeek}`
        }));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [showCustomPopup, popupData.type, popupData.currentSystemTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShowCustomPopup(false);

    const formData = new FormData();
    formData.append('USERNAME', username);
    formData.append('PASSWORD', password);

    try {
      const response = await fetch('/checkin', {
        method: 'POST',
        body: formData,
      });

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const messageBox = doc.querySelector('.MessageBox .msg');
      const messageTitle = doc.querySelector('.MessageBox .title');
      const messageContent = doc.querySelector('.MessageBox .content');
      const enterSystemButton = doc.querySelector('input[value="Enter System"]');
      const returnButton = doc.querySelector('input[value="Return"]');
      const reloginButton = doc.querySelector('input[value="Relogin"]');

      let newPopupData = { type: '', title: '', message: '', lastUsedTime: null, currentSystemTime: null, currentDisplayedTime: '', buttons: [] };

      if (messageBox && messageBox.classList.contains('error')) {
        newPopupData.type = 'error';
        newPopupData.title = messageTitle?.textContent || 'Login Failed';
        newPopupData.message = messageContent?.textContent || 'Unknown error occurred';
        newPopupData.buttons.push({
          text: reloginButton?.value || 'Close',
          action: () => setShowCustomPopup(false),
        });
      } else if (messageBox) {
        const lastUsedTimeMatch = messageContent?.textContent.match(/Last used time for the system is: (.*?)\./);
        const headerTime = doc.querySelector('#header_time')?.textContent;
        let headerDate = null;
        const scriptTags = doc.querySelectorAll('script');
        for (const script of scriptTags) {
          if (script.textContent.includes('header_showDate')) {
            const dateMatch = script.textContent.match(/document\.getElementById\("header_date"\)\.innerHTML\s*=\s*"([^"]+)"/);
            if (dateMatch) headerDate = dateMatch[1];
          }
        }
        const currentSystemTime = (headerDate && headerTime) ? `${headerDate} ${headerTime}` : null;
        
        newPopupData.type = 'success';
        newPopupData.title = messageTitle?.textContent || 'Confirmation Time';
        newPopupData.lastUsedTime = lastUsedTimeMatch ? lastUsedTimeMatch[1] : null;
        newPopupData.currentSystemTime = currentSystemTime;
        newPopupData.currentDisplayedTime = currentSystemTime;

        if (enterSystemButton) {
          newPopupData.buttons.push({ text: enterSystemButton.value, action: () => { window.location.href = '/'; } });
        }
        if (returnButton) {
          newPopupData.buttons.push({ text: returnButton.value, action: () => setShowCustomPopup(false) });
        }
      } else {
        newPopupData.type = 'error';
        newPopupData.title = 'Unexpected Response';
        newPopupData.message = 'The server returned an unexpected response.';
        newPopupData.buttons.push({ text: 'Close', action: () => setShowCustomPopup(false) });
      }
      setPopupData(newPopupData);
      setShowCustomPopup(true);
    } catch (err) {
      setPopupData({
        type: 'error',
        title: 'Communication Error',
        message: 'Failed to connect to the server: ' + err.message,
        buttons: [{ text: 'Close', action: () => setShowCustomPopup(false) }],
      });
      setShowCustomPopup(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex w-full max-w-6xl h-full md:h-[80vh] overflow-hidden shadow-2xl rounded-lg">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-[#000D35] mb-2">SECDAIS</h2>
          <p className="text-gray-500 mb-8">Welcome back! Please log in to your account.</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-700 font-semibold text-sm">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="text-gray-700 font-semibold text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-orange-600 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF9900] text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="text-orange-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="relative hidden md:block md:w-1/2 h-full">
          <Image
            src="/images/tower.jpg"
            alt="Signup illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
           <div className="absolute inset-0 bg-gradient-to-t from-[#000D35] via-transparent to-transparent opacity-70"></div>
        </div>
      </div>

      {/* Custom Popup Modal */}
      {showCustomPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className={`bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative border-t-8 ${popupData.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <button onClick={() => setShowCustomPopup(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors" aria-label="Close popup">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center">
              {popupData.type === 'success' ? 
                <CheckCircle size={48} className="text-green-500 mb-4" /> : 
                <AlertTriangle size={48} className="text-red-500 mb-4" />
              }
              <h3 className={`text-2xl font-bold ${popupData.type === 'success' ? 'text-gray-800' : 'text-red-700'}`}>
                {popupData.title}
              </h3>

              {popupData.type === 'error' ? (
                <p className="text-gray-600 mt-2">{popupData.message}</p>
              ) : (
                <div className="text-gray-700 text-sm mt-4 w-full">
                  {popupData.lastUsedTime && (
                    <p className="mb-2">Last used time: <span className="font-medium">{popupData.lastUsedTime}</span></p>
                  )}
                  <p className="mb-2">Current system time:</p>
                  <div className="text-[#FF9900] font-bold text-lg mb-6">
                    <span>{popupData.currentDisplayedTime}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-4 mt-6 w-full">
                {popupData.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.action}
                    className="px-6 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 bg-[#FF9900] text-white hover:bg-orange-600 min-w-[120px]"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
