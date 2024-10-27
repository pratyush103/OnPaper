import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from "./WebSocketManager";
import { Card, Badge } from "react-bootstrap";
import { TrendingUp, TrendingDown } from "lucide-react";

const UserWatchItem = ({ stock }) => {
  const { joinSymbol, leaveSymbol, stockData } = useContext(WebSocketContext);
  const [stockInfo, setStockInfo] = useState(null);

  const navigate = useNavigate();
    const restoredToken = stock.StockToken.replace('_', '.').replace('_', '!')
  const trade = {
    SN: stock.StockName,
    NS: stock.StockCode,
    EC: stock.ExchangeCode,
    Stock_Tocken: restoredToken,
  };

  useEffect(() => {
    if (stock && stock.StockToken) {
      joinSymbol(restoredToken);
    }

    return () => {
      if (stock && stock.StockToken) {
        leaveSymbol(restoredToken);
      }
    };
  }, [stock, joinSymbol, leaveSymbol]);

  useEffect(() => {
    if (stock && stock.StockToken && stockData[restoredToken]) {
      setStockInfo(stockData[restoredToken]);
    }
  }, [stock, stockData]);

  if (!stock) return null;

  const badgeColor = stock.ExchangeCode === "BSE" ? "danger" : "primary";
  const closeColor =
    stockInfo && stockInfo.Change > 0 ? "green" : "red";

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
            <>
            <h5
              className={
                closeColor === "green" ? "text-success" : "text-danger"
              }
            >
              {closeColor === "green" ? <TrendingUp /> : <TrendingDown />}
              {formatPrice(stockInfo.Last)}
            </h5>
            <small className="text-muted ">LTQ: {stockInfo.TTQ}</small>
            </>
          )}
        </div>
      </Card.Header>
    </Card>
  );
};

export default UserWatchItem;
