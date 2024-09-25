import React,{ useContext } from "react";
import PropTypes from "prop-types";
import Dropdown  from "react-bootstrap/Dropdown";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const UserBadge = ({ profilePicture, fullName }) => {
  const { logout } = useContext(AuthContext);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="userBadge">
        <img src={profilePicture} alt="User Profile" width="10%" className="rounded-circle mr-2"/>
        <span>{fullName}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
        <Dropdown.Item variant="danger" onClick={() => {if(confirm("Do you want to Logout?"))logout()}}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

UserBadge.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};

export { UserBadge };
