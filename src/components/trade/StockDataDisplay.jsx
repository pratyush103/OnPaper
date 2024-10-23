import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Card, Form, Button } from 'react-bootstrap';

const StockDataDisplay = () => {
    const [stockData, setStockData] = useState({});
    const [symbol, setSymbol] = useState('507685');
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io("https://livestream.icicidirect.com", {
            auth: {
                user: 'AH613873',
                token: '84892932'
            },
            extraHeaders: {
                "User-Agent": "node-socketio[client]/socket"
            },
            transports: ["websocket"],
        });

        setSocket(newSocket);

        // Clean up on component unmount
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket) {
            // Join the channel for the current symbol
            socket.emit("join", symbol);

            // Set up listener for stock data
            socket.on('stock', (data) => {
                console.log('Stock data:', data);
                setStockData(parseData(data));
            });

            // Clean up listener when symbol changes
            return () => {
                socket.off('stock');
                socket.emit("leave", symbol);
            };
        }
    }, [socket, symbol]);

    const parseData = (data) => {
        // This is a simplified version of the parsing logic
        // You may need to adjust this based on the actual data structure
        return {
            symbol: data[0],
            open: data[1],
            last: data[2],
            high: data[3],
            low: data[4],
            change: data[5],
            bPrice: data[6],
            bQty: data[7],
            sPrice: data[8],
            sQty: data[9],
            ltq: data[10],
            avgPrice: data[11],
            quotes: "Quotes Data",
            ttq: data[12],
            totalBuyQt: data[13],
            totalSellQt: data[14],
            ttv: data[15],
            trend: data[16],
            lowerCktLm: data[17],
            upperCktLm: data[18],
            ltt: new Date(data[19] * 1000).toLocaleString(),
            close: data[20],
            exchange: data.length === 21 ? 'NSE Equity' : 'NSE Futures & Options',
            stock_name: 'Stock Name' // You might need to get this from another source
        };
    };

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (socket) {
            socket.emit("leave", symbol);
            socket.emit("join", symbol);
        }
    };

    const handleDisconnect = () => {
        if (socket) {
            socket.close();
            setIsConnected(false);
        }
    };

    return (
        <div className="p-4">
            <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group controlId="symbolInput">
                    <Form.Control
                        type="text"
                        value={symbol}
                        onChange={handleSymbolChange}
                        placeholder="Enter symbol (e.g., 4.1!1594)"
                        className="mr-2"
                    />
                </Form.Group>
                <Button type="submit" className="mr-2">Change Symbol</Button>
                <Button variant="danger" onClick={handleDisconnect} disabled={!isConnected}>
                    End Connection
                </Button>
            </Form>

            <Card>
                <Card.Header>
                    <Card.Title>{stockData.stock_name || 'Stock Data'}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(stockData).map(([key, value]) => (
                            <div key={key} className="d-flex justify-content-between">
                                <span className="font-weight-bold">{key}:</span>
                                <span>{value}</span>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StockDataDisplay;