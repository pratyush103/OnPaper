// TradingViewNewsWidget.jsx
import React, { useEffect, useRef } from "react";

const TradingViewNewsWidget = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create the script element for the TradingView widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      feedMode: "all_symbols",
      isTransparent: false,
      displayMode: "adaptive",
      width: "1500",
      height: "1000",
      colorTheme: "light", // Set to "dark" for dark mode
      locale: "en"
    });

    // Append the script to the container
    const container = containerRef.current;
    container.appendChild(script);

    // Cleanup by removing the script on component unmount
    return () => {
      if (container) {
        container.innerHTML = ""; // Clear the container to remove the script
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewNewsWidget;
