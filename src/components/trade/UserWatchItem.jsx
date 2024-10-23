import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from "./WebSocketManager";
import { Card, Badge } from "react-bootstrap";
import { TrendingUp, TrendingDown } from "lucide-react";

const UserWatchItem = ({ stock }) => {
  const { joinSymbol, leaveSymbol, stockData } = useContext(WebSocketContext);
  const [stockInfo, setStockInfo] = useState(null);

  const navigate = useNavigate();

  const trade = {
    SN: stock.StockName,
    NS: stock.StockCode,
    EC: stock.ExchangeCode,
    Stock_Tocken: stock.StockToken,
  };

  useEffect(() => {
    if (stock && stock.StockToken) {
      joinSymbol(stock.StockToken);
    }

    return () => {
      if (stock && stock.StockToken) {
        leaveSymbol(stock.StockToken);
      }
    };
  }, [stock, joinSymbol, leaveSymbol]);

  useEffect(() => {
    if (stock && stock.StockToken && stockData[stock.StockToken]) {
      setStockInfo(stockData[stock.StockToken]);
    }
  }, [stock, stockData]);

  if (!stock) return null;

  const badgeColor = stock.ExchangeCode === "BSE" ? "danger" : "primary";
  const closeColor =
    stockInfo && stockInfo.Close > stockInfo.Open ? "green" : "red";

  const formatPrice = (price) =>
    price?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

    const handleClick = () => {
        navigate('/trade/TradePage', { state: { trade } });
    };

  return (
    <Card className="mb-3 card-hover" onClick={handleClick}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <h6>
            {stock.StockName}{" "}
            <Badge bg={badgeColor}>{stock.ExchangeCode}</Badge>
          </h6>
          <small className="text-muted">{stock.StockCode}</small>
        </div>
        <div>
          {stockInfo && (
            <h5
              className={
                closeColor === "green" ? "text-success" : "text-danger"
              }
            >
              {closeColor === "green" ? <TrendingUp /> : <TrendingDown />}
              {formatPrice(stockInfo.Close)}
            </h5>
          )}
        </div>
      </Card.Header>
    </Card>
  );
};

export default UserWatchItem;
