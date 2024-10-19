import React, { useState, useEffect, useCallback, createContext } from 'react';
import io from 'socket.io-client';
import { useTrade } from './TradeProvider';

export const WebSocketContext = createContext();

export const WebSocketManager = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [stockData, setStockData] = useState({});
  const { apiData: contextApiData } = useTrade() || {};
  
  // Get apiData from context or sessionStorage
  const getApiData = useCallback(() => {
    if (contextApiData) {
      return contextApiData;
    }
    
    const storedData = sessionStorage.getItem("apiData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error("Error parsing stored apiData:", error);
        return null;
      }
    }
    
    return null;
  }, [contextApiData]);

  useEffect(() => {
    const currentApiData = getApiData();
    
    if (!currentApiData) {
      console.log('No API data available');
      return;
    }

    const { UserId, SessionToken } = currentApiData;
    
    if (!UserId || !SessionToken) {
      console.log('Missing UserId or SessionToken');
      return;
    }

    console.log('Connecting with credentials:', { UserId, SessionToken });

    const newSocket = io("https://livestream.icicidirect.com", {
      auth: {
        user: UserId,
        token: SessionToken
      },
      extraHeaders: {
        "User-Agent": "node-socketio[client]/socket"
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket event handlers
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket:', reason);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    newSocket.on('stock', (data) => {
      try {
        const parsedData = parseData(data);
        setStockData(prevData => ({
          ...prevData,
          [parsedData.Symbol]: parsedData
        }));
      } catch (error) {
        console.error('Error processing stock data:', error);
      }
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        console.log('Cleaning up socket connection');
        newSocket.disconnect();
      }
    };
  }, [getApiData]);

  const joinSymbol = useCallback((symbol) => {
    if (socket && socket.connected) {
      console.log(`Joining symbol: ${symbol}`);
      socket.emit("join", symbol);
    } else {
      console.warn('Socket not connected. Cannot join symbol:', symbol);
    }
  }, [socket]);

  const leaveSymbol = useCallback((symbol) => {
    if (socket && socket.connected) {
      console.log(`Leaving symbol: ${symbol}`);
      socket.emit("leave", symbol);
    } else {
      console.warn('Socket not connected. Cannot leave symbol:', symbol);
    }
  }, [socket]);

  const parseData = (data) => {
    try {
      return {
        Symbol: data[0],
        Open: parseFloat(data[1]) || 0,
        Last: parseFloat(data[2]) || 0,
        High: parseFloat(data[3]) || 0,
        Low: parseFloat(data[4]) || 0,
        Change: parseFloat(data[5]) || 0,
        BPrice: parseFloat(data[6]) || 0,
        BQty: parseInt(data[7]) || 0,
        SPrice: parseFloat(data[8]) || 0,
        SQty: parseInt(data[9]) || 0,
        LTQ: parseInt(data[10]) || 0,
        AvgPrice: parseFloat(data[11]) || 0,
        TTQ: parseInt(data[12]) || 0,
        TotalBuyQt: parseInt(data[13]) || 0,
        TotalSellQt: parseInt(data[14]) || 0,
        TTV: parseFloat(data[15]) || 0,
        Trend: data[16],
        LowerCktLm: parseFloat(data[17]) || 0,
        UpperCktLm: parseFloat(data[18]) || 0,
        LTT: new Date(data[19] * 1000).toLocaleString(),
        Close: parseFloat(data[20]) || 0,
        Exchange: data[0].startsWith('4.') ? 'NSE' : 'Other',
      };
    } catch (error) {
      console.error('Error parsing stock data:', error, data);
      return null;
    }
  };

  return (
    <WebSocketContext.Provider value={{ 
      stockData, 
      joinSymbol, 
      leaveSymbol,
      isConnected: socket?.connected || false 
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};