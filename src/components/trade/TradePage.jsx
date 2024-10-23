// TradePage.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import TradingViewAdvancedChart from './TradingViewWidget';
import TradeCard from './UserTrade';
import ActiveTradeWindow from './ActiveTradeWindow';
import ClosedTradeWindow from './ClosedTradeWindow';
import BuyStockWindow from './BuyStockWindow';
import TradePageCharts from './TradePageCharts';

const TradePage = () => {
    const location = useLocation();
    const { trade } = location.state;
    console.log(trade);

    const windowWidth = window.innerWidth;
    const chartWidth = Math.floor(windowWidth * 0.6);

    return (
        <>
            {(trade?.NS && trade?.Stock_Tocken) ? (
                <div className="trade-page d-flex">            
                    <div className="news-widget-container">
                        <TradePageCharts symbol={trade?.EC+':'+trade?.NS} width={chartWidth} />
                    </div>
                    <div className="trade-details-container flex-grow-1">
                        <div className="alert alert-success" role="alert">
                            <h2>Buy</h2> 
                        </div>
                        <BuyStockWindow trade={trade} />
                    </div>
                </div>
            ) : (
                <div className="trade-page d-flex">            
                    <div className="news-widget-container">
                        <TradePageCharts symbol={trade?.ExchangeCode+':'+trade?.StockCode} width={chartWidth} />
                    </div>
                    <div className="trade-details-container flex-grow-1">
                        {trade.IsActive ? (
                            <>
                                <div className="alert alert-danger" role="alert">
                                    <h2>Sell</h2> 
                                </div>
                                <ActiveTradeWindow trade={trade} />
                            </>
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