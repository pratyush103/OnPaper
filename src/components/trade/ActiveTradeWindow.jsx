import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./WebSocketManager";
import { Card, Badge, Button, Collapse, Spinner } from "react-bootstrap";
import { TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react";
import { useTrade } from "../trade/TradeProvider";
import { ValidateResponse } from "../auth/ReqResHandler";
import { useToast } from "../app-status/ToastContext";

const ActiveTradeWindow = ({ trade }) => {
  const { stockData, joinSymbol, leaveSymbol } = useContext(WebSocketContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToast } = useToast();
  const {
    StockToken,
    StockCode,
    StockName,
    ExchangeCode,
    EntryPrice,
    EntryTime,
    Quantity,
    IsActive,
    TradeId,
  } = trade;

  useEffect(() => {
    if (IsActive) {
      joinSymbol(StockToken);
      return () => leaveSymbol(StockToken);
    }
  }, [StockToken, IsActive, joinSymbol, leaveSymbol]);

  const data = stockData[StockToken];
  const currentPrice = data?.Last || 0;

  const formatPrice = (price) =>
    price?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp * 1000)).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculatePnL = () => {
    if (!IsActive || !currentPrice) return null;
    return currentPrice * Quantity - EntryPrice;
  };

  const pnl = calculatePnL();

  const { exitTrade, readUser, addToWatchList, removeFromWatchList, userData } = useTrade();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if stock is in watchlist using both StockCode and sanitized StockToken
  useEffect(() => {
    if (userData?.watchlist) {
      const isCodeInWatchlist = StockCode in userData.watchlist;
      const sanitizedToken = StockToken.replace(/[.!#/]/g, "_");
      const isTokenInWatchlist = sanitizedToken in userData.watchlist;
      setIsInWatchlist(isCodeInWatchlist || isTokenInWatchlist);
    }
  }, [userData, StockCode, StockToken]);

  const handleWatchlistToggle = async () => {
    setIsLoading(true);
    try {
      if (isInWatchlist) {
        // Try removing using both StockCode and StockToken
        await removeFromWatchList(StockToken);
        // if (StockCode in (userData?.watchlist || {})) {
        //   await removeFromWatchList(StockCode);
        // }
      } else {
        await addToWatchList(StockCode, StockName, StockToken, ExchangeCode);
      }
      await readUser(); // Refresh user data
    } catch (error) {
      console.error('Failed to update watchlist:', error);
      addToast("error", {
        Header: "Watchlist Update Failed",
        Message: "Failed to update watchlist. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSellStock = async () => {
    const currentTime = new Date();
    // Convert current time to IST
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(currentTime.getTime() + istOffset);
    const istHours = istTime.getUTCHours();
    const istMinutes = istTime.getUTCMinutes();

    // Check if current time is between 8:30 AM and 4:00 PM IST
    const isWithinTradingHours =
      (istHours > 8 || (istHours === 8 && istMinutes >= 30)) &&
      (istHours < 16 || (istHours === 16 && istMinutes === 0));

    if (!isWithinTradingHours) {
      addToast("warning", {
        Header: "Cannot Execute Trade",
        Message: "Stock selling is possible only during trading hours",
      });
      return;
    }

    try {
      let response = await exitTrade(TradeId, currentPrice * Quantity);
      ValidateResponse(response, addToast);
      addToast("success", {
        Header: "Trade Exited",
        Message: "Stock sold successfully",
      });
      readUser();
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error selling stock:", error);
      addToast("danger", {
        Header: "Trade Exit Failed",
        Message: "Failed to sell stock",
      });
    }
  };

  return (
    <Card className="w-100 shadow-lg mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <h3 className="h5 mb-0">{StockCode}</h3>
            <Badge bg={ExchangeCode === "NSE" ? "primary" : "danger"}>
              {ExchangeCode}
            </Badge>
            <Button 
              variant={isInWatchlist ? "outline-secondary" : "outline-primary"}
              onClick={handleWatchlistToggle} 
              disabled={isLoading}
              className="d-flex align-items-center gap-1"
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  {isInWatchlist ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</span>
                </>
              )}
            </Button>
          </div>
          <span className="text-muted">{StockName}</span>
        </div>

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
                <span
                  className={`fw-bold ${
                    pnl >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {formatPrice(Math.abs(pnl))}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <Button variant="danger" onClick={handleSellStock} className="me-2">
            Sell Stock
          </Button>

          <Button
            variant="link"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls="collapse-details"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide Details" : "Show Details"}
          </Button>
        </div>

        <Collapse in={isExpanded}>
          <div id="collapse-details" className="mt-3">
            {data && (
              <Card>
                <Card.Body>
                  <h5>Stock Details</h5>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Symbol</span>
                    <span className="fw-medium">
                      {data.Symbol ? data.Symbol : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Open</span>
                    <span className="fw-medium">
                      {data.Open ? formatPrice(data.Open) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">High</span>
                    <span className="fw-medium">
                      {data.High ? formatPrice(data.High) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Low</span>
                    <span className="fw-medium">
                      {data.Low ? formatPrice(data.Low) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Change</span>
                    <span className="fw-medium">
                      {data.Change ? data.Change : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Last Traded Quantity</span>
                    <span className="fw-medium">
                      {data.LTQ ? data.LTQ : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Average Price</span>
                    <span className="fw-medium">
                      {data.AvgPrice ? formatPrice(data.AvgPrice) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Traded Quantity</span>
                    <span className="fw-medium">
                      {data.TTQ ? data.TTQ : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Buy Quantity</span>
                    <span className="fw-medium">
                      {data.TotalBuyQt ? data.TotalBuyQt : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Sell Quantity</span>
                    <span className="fw-medium">
                      {data.TotalSellQt ? data.TotalSellQt : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Total Traded Value</span>
                    <span className="fw-medium">
                      {data.TTV ? formatPrice(data.TTV) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Trend</span>
                    <span className="fw-medium">
                      {data.Trend ? data.Trend : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Lower Circuit Limit</span>
                    <span className="fw-medium">
                      {data.LowerCktLm ? formatPrice(data.LowerCktLm) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Upper Circuit Limit</span>
                    <span className="fw-medium">
                      {data.UpperCktLm ? formatPrice(data.UpperCktLm) : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Last Trade Time</span>
                    <span className="fw-medium">
                      {data.LTT ? data.LTT : "--"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Close</span>
                    <span className="fw-medium">
                      {data.Close ? formatPrice(data.Close) : "--"}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default ActiveTradeWindow;