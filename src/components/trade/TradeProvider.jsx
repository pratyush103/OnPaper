import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ValidateResponse, VerifyToken } from "../auth/ReqResHandler";
import { useToast } from "../app-status/ToastContext";
import { useAuth } from "../auth/AuthContext";

const API_BASE_URL =
  "https://onpaper-trade.wonderfultree-e5f4d080.centralindia.azurecontainerapps.io/trade";

export const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [userData, setUserData] = useState(sessionStorage.getItem("userData"));

  const [apiData, setApiData] = useState(sessionStorage.getItem("apiData"));
  const { addToast } = useToast();
  const { authToken, updateToken, userInfo } = useAuth();
  useEffect(() => {
    if (!apiData || (Date.now() - apiData.TimeStamp * 1000) > 10 * 60 * 60 * 1000) {
      getAPI();
    }

    return () => {
      setApiData(null);
    };
  }, []);
    useEffect(() => {
        if (authToken) {
            readUser();
        }
    }, [authToken]);
  const enterTrade = async (stockCode, stockName, stockToken, exchangeCode, entryPrice, quantity) => {
    try {
      const verifiedToken = await VerifyToken(authToken, updateToken);
      const response = await axios.post(
        `${API_BASE_URL}/EnterTrade`,
        JSON.stringify({ authToken: verifiedToken, userID: userInfo.localId, stockCode: stockCode, stockName: stockName, stockToken: stockToken, exchangeCode: exchangeCode, entryTime: Math.floor(Date.now() / 1000), entryPrice: entryPrice, quantity: quantity }),
        {
          headers: {
        "Content-Type": "application/json",
          },
        }
      );
      const data = await ValidateResponse(response, addToast);
      if (data) {
      }
      addToast(
        "success",
        { Header: "Trade Successful", Message: "This is a success message!" },
        true
      );
      return data;
    } catch (error) {
      console.error("Error entering trade:", error);
      throw error;
    }
  };

  const exitTrade = async (tradeID, exitPrice) => {
    try {
      const verifiedToken = await VerifyToken(authToken, updateToken);
      const response = await axios.post(
        `${API_BASE_URL}/ExitTrade`,
        JSON.stringify({authToken: verifiedToken, userID: userInfo.localId , tradeID: tradeID, exitPrice: exitPrice, exitTime: Math.floor(Date.now() / 1000)}),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await ValidateResponse(response, addToast);
      return data;
    } catch (error) {
      console.error("Error exiting trade:", error);
      throw error;
    }
  };

  const readUser = async () => {
    try {
      const verifiedToken = await VerifyToken(authToken, updateToken); //authToken, authContext
      const response = await axios.get(`${API_BASE_URL}/ReadUser`, {
        params: {
          AuthToken: verifiedToken,
          UserID: userInfo.localId,
        },
      });
      const data = await ValidateResponse(response, addToast);
      setUserData(data);
      sessionStorage.setItem("userData", JSON.stringify(data));
      addToast("success", {
        Header: "Success",
        Message: "User data retrieved successfully",
      });
      return data;
    } catch (error) {
      console.error("Error reading user:", error);
      throw error;
    }
  };

  const getAPI = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/GetAPI`);
      const data = await ValidateResponse(response, addToast);
      setApiData(data);
      sessionStorage.setItem("apiData", JSON.stringify(data));
      addToast("success", {
        Header: "Success",
        Message: "API data retrieved successfully",
      });
      return data;
    } catch (error) {
      console.error("Error getting API:", error);
      throw error;
    }
  };

  const addToWatchList = async (stockCode, stockName, stockToken, exchangeCode) => {
    try {
      const sanitizedStockToken = stockToken.replace(/[.!#/]/g, "_");
      const verifiedToken = await VerifyToken(authToken, updateToken);
      const response = await axios.put(
        `${API_BASE_URL}/AddToWatchList`,
        JSON.stringify({
          authToken: verifiedToken,
          userID: userInfo.localId,
          stockCode: stockCode,
          stockName: stockName,
          stockToken: sanitizedStockToken,
          exchangeCode: exchangeCode,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await ValidateResponse(response, addToast);
      addToast("success", {
        Header: "Success",
        Message: "Stock added to watchlist successfully",
      });
      return data;
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      throw error;
    }
  };

  const removeFromWatchList = async (stockToken) => {
    try {
      const sanitizedStockToken = stockToken.replace(/[.!#/]/g, "_");
      const verifiedToken = await VerifyToken(authToken, updateToken);
      const response = await axios.delete(
        `${API_BASE_URL}/RemoveFromWatch`,
        {
          data: JSON.stringify({
            authToken: verifiedToken,
            userID: userInfo.localId,
            stockToken: sanitizedStockToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      addToast("success", {
        Header: "Success",
        Message: "Stock removed from watchlist successfully",
      });
      return data;
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      throw error;
    }
  };

  return (
    <TradeContext.Provider
      value={{ enterTrade, exitTrade, readUser, getAPI, userData, apiData,addToWatchList, removeFromWatchList }}
    >
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => useContext(TradeContext);

// const TradeHandler = () => {
//     const { enterTrade, exitTrade, readUser, getAPI } = useTrade();

//     const handleEnterTrade = async () => {
//         const tradeData = {
//             authToken: 'your-auth-token',
//             userID: 'user-id',
//             stockCode: 'stock-code',
//             stockName: 'stock-name',
//             stockToken: 'stock-token',
//             exchangeCode: 'exchange-code',
//             entryTime: Date.now(),
//             entryPrice: 100,
//             quantity: 10,
//         };
//         try {
//             const result = await enterTrade(tradeData);
//             console.log('Enter Trade Result:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleExitTrade = async () => {
//         const tradeData = {
//             authToken: 'your-auth-token',
//             userID: 'user-id',
//             tradeID: 'trade-id',
//             exitPrice: 150,
//             exitTime: Date.now(),
//         };
//         try {
//             const result = await exitTrade(tradeData);
//             console.log('Exit Trade Result:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleReadUser = async () => {
//         try {
//             const result = await readUser('your-auth-token', 'user-id');
//             console.log('Read User Result:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleGetAPI = async () => {
//         try {
//             const result = await getAPI();
//             console.log('Get API Result:', result);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleEnterTrade}>Enter Trade</button>
//             <button onClick={handleExitTrade}>Exit Trade</button>
//             <button onClick={handleReadUser}>Read User</button>
//             <button onClick={handleGetAPI}>Get API</button>
//         </div>
//     );
// };

// export default TradeHandler;
