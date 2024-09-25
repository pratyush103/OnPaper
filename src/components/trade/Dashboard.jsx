// Dashboard.jsx
import React from "react";

const Dashboard = ({ userInfo }) => {
  return (
    <div>
      <h1>Welcome {userInfo.email}</h1>
    </div>
  );
};

export default Dashboard;
