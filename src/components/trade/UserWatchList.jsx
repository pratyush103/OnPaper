import React, { useState, useEffect } from "react";
import { useTrade } from "./TradeProvider";

export const UserWatchList = () => {
  const { userData } = useTrade();
  
  useEffect(() => {
    if (userData && typeof userData?.watchlist === 'object') {
        console.log('User watchlist:');
    }
  }, [userData]);

return (
    <div className="container mt-4">
        <h2 className="text-primary mb-3">Watchlist</h2>
        <div className="border rounded p-3 ">
        <h2>Watchlist</h2>
        </div>
        
    </div>
);
};

export default UserWatchList;