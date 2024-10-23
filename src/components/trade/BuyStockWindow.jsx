import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "./WebSocketManager";
import { Card, Badge, Button, Form } from "react-bootstrap";
import { useTrade } from "../trade/TradeProvider";
import { useToast } from "../app-status/ToastContext";

const BuyStockWindow = ({ trade }) => {
  const { stockData, joinSymbol, leaveSymbol } = useContext(WebSocketContext);
  const [quantity, setQuantity] = useState(1);
  const { enterTrade, readUser } = useTrade();
  const { addToast } = useToast();

  const {
    Stock_Tocken: StockToken,
    NS: StockCode,
    SN: StockName,
    EC: ExchangeCode,
  } = trade;

  useEffect(() => {
    joinSymbol(StockToken);
    return () => leaveSymbol(StockToken);
  }, [StockToken, joinSymbol, leaveSymbol]);

  const data = stockData[StockToken];
  const currentPrice = data?.Last || 0;

  const formatPrice = (price) =>
    price?.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });

  const handleBuyStock = async (e) => {
    e.preventDefault();
    try {
      await enterTrade(
        StockCode,
        StockName,
        StockToken,
        ExchangeCode,
        currentPrice*quantity,
        quantity
      );
      addToast("success", {
        Header: "Trade Entered",
        Message: "Stock bought successfully",
      });
      readUser();
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error buying stock:", error);
      addToast("danger", {
        Header: "Trade Entry Failed",
        Message: "Failed to buy stock",
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
          </div>
          <span className="text-muted">{StockName}</span>
        </div>

        {currentPrice > 0 && (
          <div className="border-top pt-2 mt-2">
            <div className="d-flex justify-content-between">
              <span className="text-muted">Current Price</span>
              <span className="fw-medium">{formatPrice(currentPrice)}</span>
            </div>
          </div>
        )}

        <Form onSubmit={handleBuyStock} className="mt-3">
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <span className="text-muted">Amount Payable</span>
            <span className="fw-medium">
              {formatPrice(currentPrice * quantity)}
            </span>
          </div>
          <Button variant="success" type="submit" className="mt-3">
            Buy Stock
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BuyStockWindow;
