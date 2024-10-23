import React, {useState, useEffect} from "react";
import { Button, Card, Badge, Spinner } from "react-bootstrap";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useTrade } from "./TradeProvider";


const ClosedTradeWindow = ({ trade }) => {
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
    TakeProfit,
  } = trade;

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
        if (StockCode in (userData?.watchlist || {})) {
          await removeFromWatchList(StockCode);
        }
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

  const formatPrice = (price) =>
    price?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  const formatTime = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateHoldingPeriod = () => {
    const entry = new Date(parseInt(EntryTime));
    const exit = new Date(parseInt(ExitTime));
    const diff = exit - entry;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <Card className="w-100 shadow-lg mb-4">
      <Card.Body>
        {/* Header Section */}
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
              <span
                className={`fw-bold ${
                  TakeProfit >= 0 ? "text-success" : "text-danger"
                }`}
              >
                {formatPrice(TakeProfit)}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Holding Period</span>
              <span className="fw-medium">{calculateHoldingPeriod()}</span>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClosedTradeWindow;
