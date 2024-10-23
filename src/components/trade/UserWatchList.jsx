import React, { useEffect } from "react";
import { useTrade } from "./TradeProvider";
import UserWatchItem from "./UserWatchItem";

export const UserWatchList = () => {
  const { userData } = useTrade();
  
  useEffect(() => {
    if (userData && typeof userData?.watchlist === 'object') {
        console.log('User watchlist:', userData.watchlist);
    }
  }, [userData]);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Watchlist</h2>
      <div className="border rounded p-3">
        {userData && userData.watchlist && Object.keys(userData.watchlist).length > 0 ? (
          Object.keys(userData.watchlist).map((key, index) => (
            <UserWatchItem key={index} stock={userData.watchlist[key]} />
          ))
        ) : (
          <p>No items in the watchlist. Look Up Stocks to add.</p>
        )}
      </div>
    </div>
  );
};

export default UserWatchList;