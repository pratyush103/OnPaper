import React, { useEffect, useState } from 'react';
import TradePage from './TradePage';

const TradePageCharts = ({ symbol, width }) => {

    const [theme, setTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light');
        
        mediaQuery.addEventListener('change', handleChange);
        
        return () => {
        mediaQuery.removeEventListener('change', handleChange);
        };
    }, [theme]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": width || "450",
      "height": "600",
      "symbol": symbol || "NASDAQ:AAPL",  // Default to NASDAQ:AAPL if no symbol is provided
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "2",
      "locale": "en",
      "backgroundColor": theme==='light' ? "rgba(255, 255, 255, 1)" : "#212529",
      "gridColor": "rgba(66, 66, 66, 0.06)",
      "hide_top_toolbar": true,
      "hide_legend": true,
      "withdateranges": true,
      "allow_symbol_change": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": true,
      "support_host": "https://www.tradingview.com"
    });

    document.getElementById('tradingview-widget').appendChild(script);

    return () => {
      // Clean up to avoid memory leaks
      const container = document.getElementById('tradingview-widget');
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [symbol, width, theme]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview-widget" className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradePageCharts;