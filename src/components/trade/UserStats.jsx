import React, { useState, useEffect } from "react";
import { useTrade } from "./TradeProvider";

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(value * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return count.toLocaleString("hi-IN", { style: "currency", currency: "INR" });
};

export const UserStats = () => {
  const { userData } = useTrade();
  const [profit, setProfit] = useState(0);
  const [loss, setLoss] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    if (userData && typeof userData.trades === 'object') {
      let totalProfit = 0;
      let totalLoss = 0;
      let totalPortfolioValue = 0;

      Object.values(userData.trades).forEach(trade => {
        if (trade.TakeProfit !== null) {
          if (trade.TakeProfit > 0) {
            totalProfit += trade.TakeProfit;
          } else if (trade.TakeProfit < 0) {
            totalLoss += trade.TakeProfit;
          }
        }

        if (trade.IsActive) {
          totalPortfolioValue += trade.EntryPrice;
        }
      });

      setProfit(totalProfit);
      setLoss(totalLoss);
      setPortfolioValue(totalPortfolioValue);
    }
  }, [userData]);

  return (
    <div className="container mt-4">
        <h2 className="text-primary mb-3">Your Stats</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-hover mb-0">
            <tbody>
              <tr className="align-middle">
                <td className="fw-medium text-muted">Balance</td>
                <td className="text-end fw-bold">
                  <AnimatedNumber 
                    value={userData.Points ?? 0} 
                    duration={1500} 
                  />
                </td>
              </tr>
              <tr className="align-middle">
                <td className="fw-medium text-muted">Portfolio Value</td>
                <td className="text-end fw-bold">
                  <AnimatedNumber 
                    value={portfolioValue} 
                    duration={1500} 
                  />
                </td>
              </tr>
              <tr className="align-middle">
                <td className="fw-medium text-muted">Total Profit</td>
                <td className="text-end fw-bold text-success">
                  <AnimatedNumber 
                    value={profit} 
                    duration={1500} 
                  />
                </td>
              </tr>
              <tr className="align-middle">
                <td className="fw-medium text-muted">Total Loss</td>
                <td className="text-end fw-bold text-danger">
                  <AnimatedNumber 
                    value={loss} 
                    duration={1500} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserStats;