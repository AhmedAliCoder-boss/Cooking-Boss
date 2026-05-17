import React, { useEffect, useState } from "react";
import "../css/offline.css";

const cookingTips = [
  "Always taste your food before serving to adjust seasoning.",
  "Sharpen your knives regularly for cleaner cuts and safer handling.",
  "Let meat rest after cooking to allow juices to redistribute.",
  "Use salt in your pasta water to season it from the inside out.",
  "Preheat your pans before adding food for better searing.",
  "Don't overcrowd the pan when sautéing to ensure proper browning.",
  "Keep your cutting board stable with a damp towel underneath.",
  "Rinse rice until the water runs clear for fluffier results.",
  "Use room temperature ingredients for better baking results.",
  "Toast your spices to enhance their flavor before using them."
];

const Offline = () => {
  const [tip, setTip] = useState(cookingTips[0]);
  const [toastMessage, setToastMessage] = useState('');

  const showRandomTip = () => {
    const randomTip = cookingTips[Math.floor(Math.random() * cookingTips.length)];
    setTip(randomTip);
  };

  const updateConnectionStatus = () => {
    const online = navigator.onLine;
    if (online) {
      setToastMessage('? Connection restored!');
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else {
      setToastMessage('Connection lost. Working offline...');
      setTimeout(() => {
        setToastMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    showRandomTip();
    const tipInterval = setInterval(showRandomTip, 10000);
    updateConnectionStatus();

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    return () => {
      clearInterval(tipInterval);
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, []);

  return (
    <div className="offline-page">
      <div className="offline-container">
        <div className="offline-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
            <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        </div>
        <h1 className="offline-title">Connection Lost</h1>
        <p className="offline-text">
          Looks like you're offline. Don't worry! You can still browse your saved recipes.
          We'll automatically reconnect you when we detect a network connection.
        </p>
        <button className="offline-btn" type="button" onClick={() => window.location.reload()}>
          Retry Connection
          <span aria-hidden="true">?</span>
        </button>
        <div className="offline-tip">
          <strong>Chef's Tip:</strong>
          <span>{tip}</span>
        </div>
      </div>
      {toastMessage && <div className="status-toast">{toastMessage}</div>}
    </div>
  );
};

export default Offline;

