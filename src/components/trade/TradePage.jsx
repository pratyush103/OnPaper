// TradePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import TradingViewAdvancedChart from './TradingViewWidget';
import TradeCard from './UserTrade';
import ActiveTradeWindow from './ActiveTradeWindow';
import ClosedTradeWindow from './ClosedTradeWindow';
import BuyStockWindow from './BuyStockWindow';

const TradePage = () => {
    const location = useLocation();
    const { trade } = location.state;
    console.log(trade);

    const windowWidth = window.innerWidth;
    const chartWidth = windowWidth * 0.5;

    return (
        <>
            {(trade?.NS && trade?.Stock_Tocken) ? (
                <div className="trade-page d-flex">            
                    <div className="news-widget-container">
                        <TradingViewAdvancedChart symbol={trade?.EC+':'+trade?.NS} width={chartWidth} />
                    </div>
                    <div className="trade-details-container flex-grow-1">
                        <BuyStockWindow trade={trade} />
                    </div>
                </div>
            ) : (
                <div className="trade-page d-flex">            
                    <div className="news-widget-container">
                        <TradingViewAdvancedChart symbol={trade?.ExchangeCode+':'+trade?.StockCode} width={chartWidth} />
                    </div>
                    <div className="trade-details-container flex-grow-1">
                        {trade.IsActive ? (
                            <ActiveTradeWindow trade={trade} />
                        ) : (
                            <ClosedTradeWindow trade={trade} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TradePage;