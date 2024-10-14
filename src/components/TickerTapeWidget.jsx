// src/components/TickerWidget.jsx
import React, { useEffect } from "react";

const TickerWidget = () => {
  useEffect(() => {
    // This will append the TradingView script to the document body
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: "adaptive",
      colorTheme: "light",
      locale: "en",
    });

    document.querySelector(".tradingview-widget-container__widget").appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.querySelector(".tradingview-widget-container__widget").removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TickerWidget;
