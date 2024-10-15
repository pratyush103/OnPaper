import React, { useEffect, useRef } from "react";

const TradingViewAdvancedChart = ({ symbol = "NASDAQ:AAPL", width = "1500", height = "610" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.type = "text/javascript";
    script.innerHTML = JSON.stringify({
      width: width,
      height: height,
      symbol: symbol,
      timezone: "Asia/Kolkata",
      theme: "light",
      style: "1",
      locale: "en",
      withdateranges: true,
      range: "YTD",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.innerHTML = ""; // Clear previous content
    containerRef.current.appendChild(script); // Add new script

    return () => {
      containerRef.current.innerHTML = ""; // Clean up on unmount
    };
  }, [symbol, width, height]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ width: width, height: height }}
    >
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

export default TradingViewAdvancedChart;
