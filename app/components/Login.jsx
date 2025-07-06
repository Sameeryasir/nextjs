'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null); // Used for inline display, can be removed if not needed
  const [error, setError] = useState(null); // Used for inline error, can be removed if not needed

  // State for the custom pop-up content
  const [showCustomPopup, setShowCustomPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    type: '', // 'success' or 'error'
    title: '',
    message: '',
    lastUsedTime: null,
    currentSystemTime: null, // Initial system time from server
    currentDisplayedTime: '', // State for the live clock in popup
    buttons: [], // Array of { text, action }
  });

  // Effect to update current time in the popup every second
  useEffect(() => {
    let intervalId;
    if (showCustomPopup && popupData.type === 'success' && popupData.currentSystemTime) {
      // Parse the date and time from the initial currentSystemTime
      // Example: "2025-06-02 20:19:57"
      const [datePart, timePart] = popupData.currentSystemTime.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      // Create a Date object from the parsed components
      // Note: month is 0-indexed in JavaScript Date constructor (0 for January, 11 for December)
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
    setResponseData(null);
    setShowCustomPopup(false); // Close any existing custom popup

    console.log('Form submitted with:', { username, password });

    const formData = new FormData();
    formData.append('USERNAME', username);
    formData.append('PASSWORD', password);

    console.log('FormData prepared:', Object.fromEntries(formData));

    try {
      const response = await fetch('/checkin', {
        method: 'POST',
        body: formData,
      });

      console.log('API response status:', response.status, response.statusText);

      const html = await response.text();
      console.log('API response HTML:', html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const messageBox = doc.querySelector('.MessageBox .msg');
      const messageTitle = doc.querySelector('.MessageBox .title');
      const messageContent = doc.querySelector('.MessageBox .content');

      // Buttons
      const enterSystemButton = doc.querySelector('input[value="Enter System"]');
      const returnButton = doc.querySelector('input[value="Return"]');
      const reloginButton = doc.querySelector('input[value="Relogin"]');

      let newPopupData = {
        type: '',
        title: '',
        message: '',
        lastUsedTime: null,
        currentSystemTime: null,
        currentDisplayedTime: '',
        buttons: [],
      };

      if (messageBox && messageBox.classList.contains('error')) {
        const errorMessage = messageContent?.textContent || 'Unknown error occurred';
        const errorTitle = messageTitle?.textContent || 'Login Failed';

        newPopupData.type = 'error';
        newPopupData.title = errorTitle;
        newPopupData.message = errorMessage;
        newPopupData.buttons.push({
          text: reloginButton?.value || 'Close',
          action: () => { window.location.href = '/auth/login'; }, // Changed to /auth/login
        });

      } else if (messageBox) { // Assuming success message box
        const successTitle = messageTitle?.textContent || 'Confirmation Time';

        const lastUsedTimeMatch = messageContent?.textContent.match(/Last used time for the system is: (.*?)\./);
        const lastUsedTime = lastUsedTimeMatch ? lastUsedTimeMatch[1] : null;
        
        // Extract current system time from parsed HTML
        const headerTime = doc.querySelector('#header_time')?.textContent;
        let headerDate = null;
        const scriptTags = doc.querySelectorAll('script');
        for (const script of scriptTags) {
          if (script.textContent.includes('header_showDate')) {
            const dateMatch = script.textContent.match(/document\.getElementById\("header_date"\)\.innerHTML\s*=\s*"([^"]+)"/);
            if (dateMatch) {
              headerDate = dateMatch[1];
            }
          }
        }
        const currentSystemTime = (headerDate && headerTime) ? `${headerDate} ${headerTime}` : null;
        
        newPopupData.type = 'success';
        newPopupData.title = successTitle;
        newPopupData.lastUsedTime = lastUsedTime;
        newPopupData.currentSystemTime = currentSystemTime; // Store for live clock
        newPopupData.currentDisplayedTime = currentSystemTime; // Initialize displayed time

        if (enterSystemButton) {
          newPopupData.buttons.push({
            text: enterSystemButton.value,
            action: () => { window.location.href = 'general/mainframe.php'; },
          });
        }
        if (returnButton) {
          newPopupData.buttons.push({
            text: returnButton.value,
            action: () => { window.location.href = '/auth/login'; }, // Changed to /auth/login
          });
        }

      } else {
        // Fallback for unexpected responses
        newPopupData.type = 'error';
        newPopupData.title = 'Unexpected Response';
        newPopupData.message = 'The server returned an unexpected response. Please check the browser console for details.';
        newPopupData.buttons.push({ text: 'Close', action: () => setShowCustomPopup(false) });
      }

      setPopupData(newPopupData);
      setShowCustomPopup(true);

    } catch (err) {
      console.error('API call failed:', err.message);
      setError('Error: ' + err.message); // Keep inline error
      
      // Also show popup for fetch/parsing errors
      setPopupData({
        type: 'error',
        title: 'Communication Error',
        message: 'Failed to connect to the server or process its response: ' + err.message,
        lastUsedTime: null,
        currentSystemTime: null,
        currentDisplayedTime: '',
        buttons: [{ text: 'Close', action: () => setShowCustomPopup(false) }],
      });
      setShowCustomPopup(true);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex w-full max-w-5xl h-full md:h-[80vh] overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">SECDAIS</h2>
          <p className="text-gray-500 mb-6">Create your free account</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-700 font-medium text-sm">Username</label>
              <input
                type="text"
                placeholder="Ruben"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium text-sm">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✈️
                </span>
              </div>
              <div className="text-right mt-1">
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Forgot password
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>

          {/* You can optionally remove this inline display if the popup is sufficient */}
          {responseData && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h4 className="text-lg font-semibold text-blue-900">Confirmation Time (Inline)</h4>
              {responseData.lastUsedTime && (
                <p className="text-gray-700">Last used time: {responseData.lastUsedTime}</p>
              )}
              {responseData.currentSystemTime && (
                <p className="text-gray-700">Current system time: {responseData.currentSystemTime}</p>
              )}
              {responseData.message && (
                <p className="text-gray-700">{responseData.message}</p>
              )}
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Right Side - Image */}
        <div className="mt-20 relative hidden md:block md:w-1/2 h-[600px]">
          <Image
            src="/images/tower.jpg"
            alt="Signup illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Custom Popup Modal */}
      {showCustomPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full relative transform transition-transform duration-300 scale-95 animate-zoom-in border-t-4 border-blue-500"> {/* Added blue border top */}
            {/* Close Button */}
            <button
              onClick={() => setShowCustomPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors text-2xl font-bold"
              aria-label="Close popup"
            >
              &times;
            </button>

            {/* Title with Info Icon */}
            <div className="flex items-center justify-center mb-4 mt-4"> {/* Adjusted margin-top */}
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <h3 className="text-xl font-semibold text-blue-800"> {/* Slightly smaller title font size */}
                {popupData.title}
              </h3>
            </div>

            {/* Message Content */}
            {popupData.type === 'error' ? (
              <p className="text-red-600 text-center mb-6 px-2"> {/* Added px-2 for padding */}
                {popupData.message}
              </p>
            ) : (
              <div className="text-gray-700 text-center text-sm"> {/* Changed to text-center and text-sm */}
                {popupData.lastUsedTime && (
                  <p className="mb-2">Last used time for the system is: <span className="font-medium">{popupData.lastUsedTime}</span> .</p>
                )}
                <p className="mb-2">The current system time is:</p>
                <div className="text-orange-500 font-bold text-lg mb-6 flex justify-center items-center"> {/* Orange-500 for time */}
                  <span className="inline-block">{popupData.currentDisplayedTime.split(' ')[0]}</span>&nbsp;
                  <span className="inline-block">{popupData.currentDisplayedTime.split(' ')[1]}</span>&nbsp;&nbsp;&nbsp;
                  <span className="inline-block">{popupData.currentDisplayedTime.split(' ')[2]}</span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className={`flex ${popupData.buttons.length > 1 ? 'justify-center' : 'justify-center'} space-x-4 mt-4`}> {/* Centered buttons */}
              {popupData.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => {
                    button.action(); // Execute the action
                    // Removed setShowCustomPopup(false) here, as the action might navigate away
                    // and closing the popup before navigation isn't always necessary or desirable.
                    // If the action doesn't navigate, you might want to re-add it.
                  }}
                  className="px-6 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                  bg-orange-400 text-white hover:bg-orange-500
                  min-w-[120px]"
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;