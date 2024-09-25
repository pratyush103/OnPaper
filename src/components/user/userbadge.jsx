import React from "react";

const UserBadge = ({ profilePicture, fullName }) => {
  return (
    <div className="btn btn-warning dropdown">
      <button className="dropdown-toggle">
        <img src={profilePicture} alt="User Profile" />
        <h5>{fullName}</h5>
      </button>
      <ul className="dropdown-menu">
        <li><a href="" className="dropdown-item">Profile</a></li>
      </ul>
    </div>
  );
};

export { UserBadge };
