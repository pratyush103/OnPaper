// import React, { useEffect, useContext } from 'react';
// import { WebSocketContext } from './WebSocketManager';

// const UserTrade = ({ trade }) => {
//   const { stockData, joinSymbol, leaveSymbol } = useContext(WebSocketContext);
//   const { StockToken, StockName, StockCode, EntryTime, EntryPrice } = trade;

//   useEffect(() => {
//     joinSymbol(StockToken);
//     return () => {
//       leaveSymbol(StockToken);
//     };
//   }, [StockToken, joinSymbol, leaveSymbol]);

//   const data = stockData[StockToken];

// return (
//     <div className="user-trade card-horizontal">
//         <div className="card-header">
//             <h3>{StockName} ({StockCode})</h3>
//         </div>
//         <div className="card-body">
//             <p><strong>Entry Time:</strong> {new Date(EntryTime).toLocaleString()}</p>
//             <p><strong>Entry Price:</strong> {EntryPrice}</p>
//             {data && (
//                 <div className="stock-data">
//                     <p><strong>Last Price:</strong> {data.Last}</p>
//                     <p><strong>High:</strong> {data.High}</p>
//                     <p><strong>Low:</strong> {data.Low}</p>
//                     <p><strong>Change:</strong> {data.Change}</p>
//                     {/* Add more stock data fields as needed */}
//                 </div>
//             )}
//         </div>
//     </div>
// );
// };

// export default UserTrade;
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from './WebSocketManager';
import { Card, Badge } from 'react-bootstrap';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TradeCard = ({ trade }) => {
    const { stockData, joinSymbol, leaveSymbol } = useContext(WebSocketContext);
    const navigate = useNavigate();
    const {
        StockToken,
        StockCode,
        StockName,
        ExchangeCode,
        EntryPrice,
        EntryTime,
        ExitPrice,
        ExitTime,
        Quantity,
        IsActive,
        TakeProfit
    } = trade;

    useEffect(() => {
        if (IsActive) {
            joinSymbol(StockToken);
            return () => leaveSymbol(StockToken);
        }
    }, [StockToken, IsActive, joinSymbol, leaveSymbol]);

    const data = stockData[StockToken];
    const currentPrice = data?.Last || 0;
    //maximumFractionDigits: 2,
    // minimumFractionDigits: 2,
    const formatPrice = (price) => price?.toLocaleString('en-IN', {
        
        style: "currency", 
        currency: "INR"
    });

    const formatTime = (timestamp) => {
        return new Date(parseInt(timestamp)*1000).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculatePnL = () => {
        if (!IsActive || !currentPrice) return null;
        return currentPrice * Quantity - EntryPrice;
    };

    const pnl = calculatePnL();

    const handleClick = () => {
        navigate('/trade/TradePage', { state: { trade } });
    };

    return (
        <Card className="w-100 shadow-lg mb-4" onClick={handleClick}>
            <Card.Body>
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4" >
                    <div className="d-flex align-items-center gap-2">
                        <h3 className="h5 mb-0">{StockCode}</h3>
                        <Badge 
                            bg={ExchangeCode === 'NSE' ? 'primary' : 'danger'}
                        >
                            {ExchangeCode}
                        </Badge>
                    </div>
                    <span className="text-muted">{StockName}</span>
                </div>

                {/* Trade Details */}
                <div className="mb-2">
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">Entry Price</span>
                        <span className="fw-medium">{formatPrice(EntryPrice)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">Quantity</span>
                        <span className="fw-medium">{Quantity}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="text-muted">Entry Time</span>
                        <span className="fw-medium">{formatTime(EntryTime)}</span>
                    </div>
                </div>

                {/* Active Trade Section */}
                {IsActive && currentPrice > 0 && (
                    <div className="border-top pt-2 mt-2">
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Current Price</span>
                            <span className="fw-medium">{formatPrice(currentPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <span className="text-muted">P/L</span>
                            <div className="d-flex align-items-center gap-1">
                                {pnl > 0 ? (
                                    <TrendingUp className="text-success" />
                                ) : (
                                    <TrendingDown className="text-danger" />
                                )}
                                <span className={`fw-bold ${pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {formatPrice(Math.abs(pnl))}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Closed Trade Section */}
                {!IsActive && (
                    <div className="border-top pt-2 mt-2">
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Exit Price</span>
                            <span className="fw-medium">{formatPrice(ExitPrice)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Exit Time</span>
                            <span className="fw-medium">{formatTime(ExitTime)}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span className="text-muted">Take Profit</span>
                            <span className={`fw-bold ${TakeProfit >= 0 ? 'text-success' : 'text-danger'}`}>{formatPrice(TakeProfit)}</span>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default TradeCard;
