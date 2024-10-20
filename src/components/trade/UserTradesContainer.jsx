import React, { useState, useEffect } from "react";
import UserTrade from "./UserTrade";
import { useTrade } from "./TradeProvider";

export const UserTradesContainer = () => {
  const { userData } = useTrade();
  const [isActiveFilter, setIsActiveFilter] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // This effect will run whenever userData changes
  }, [userData]);

  const renderPointsCard = (points) => (
    <div className="container py-4">
      <div className="card">
        <div className="card-body">
          <div className="row text-center">
            <div className="col-12">
              <div className="small text-muted">Total Portfolio Value</div>
              <div className="h3 mb-0">
                {points?.toLocaleString("hi-IN", { style: "currency", currency: "INR" }) ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (!userData) {
      return (
        <div className="container py-5">
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div>Problem fetching UserData</div>
          </div>
        </div>
      );
    }

    // If we have userData but no trades, show at least the points
    if (!userData.trades) {
      return (
        <div className="container py-5">
          {renderPointsCard(userData.Points)}
          <div className="alert alert-info d-flex align-items-center mt-4" role="alert">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>No trades to show</div>
          </div>
        </div>
      );
    }

    const filteredTrades = Object.values(userData.trades)
      .filter((trade) => trade.IsActive === isActiveFilter)
      .filter((trade) =>
        trade.StockCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const timeA = a.ExitTime ? a.ExitTime : a.EntryTime;
        const timeB = b.ExitTime ? b.ExitTime : b.EntryTime;
        return timeB - timeA;
      });

    return (
      <div className="container py-4">
        {/* Points Display */}
        {/* {renderPointsCard(userData.Points)} */}

        {/* Header Section */}
        <div className="row mb-4 mt-4">
          <div className="col-12">
            <h2 className="text-primary mb-3">Trade Overview</h2>
            <div className="card">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="activeTradesFilter"
                        checked={isActiveFilter}
                        onChange={() => setIsActiveFilter(!isActiveFilter)}
                      />
                      <label className="form-check-label" htmlFor="activeTradesFilter">
                        Active Trades Only
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by stock code"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 text-end">
                    <span className="badge bg-primary">
                      Total Trades: {filteredTrades.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trades List */}
        <div className="row">
          <div className="col-12">
            {filteredTrades.length > 0 ? (
              <div className="trade-list">
                {filteredTrades.map((trade) => (
                  <div key={trade.TradeId} className="mb-3 hover">
                    <UserTrade trade={trade} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info text-center">
                <i className="bi bi-info-circle me-2"></i>
                No trades found matching your criteria
              </div>
            )}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-6">
                    <div className="small text-muted">Active Trades</div>
                    <div className="h5 mb-0">
                      {Object.values(userData.trades).filter(t => t.IsActive).length}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="small text-muted">Completed Trades</div>
                    <div className="h5 mb-0">
                      {Object.values(userData.trades).filter(t => !t.IsActive).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};