// Dashboard.jsx
import React from "react";
import StockDataDisplay from "./StockDataDisplay";
import { useToast } from '../app-status/ToastContext';
import { Button } from 'react-bootstrap';
import { UserTradesContainer } from './UserTradesContainer';
import { UserStats } from "./UserStats";
import { UserWatchList } from './UserWatchList';

const Dashboard = ({ userInfo }) => {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast('success', { Header: 'Success', Message: 'This is a success message!' }, false);
  };
  return (
    <div>
      <h1>Welcome <img src={userInfo.profilePicture} alt="User Profile" width="3%" className="rounded-circle mr-2"/>
      <span>{userInfo?.displayName}</span></h1>
      {/* <Button onClick={handleClick}>Show Toast</Button> */}
      <div className="container">
        <div className="row">
          <div className="col">
            <UserWatchList />
          </div>
          <div className="col">
            <UserStats />
          </div>
        </div>
      </div>

      <br />

      {/* <StockDataDisplay /> */}
      <UserTradesContainer />
    </div>
  );
};

export default Dashboard;
