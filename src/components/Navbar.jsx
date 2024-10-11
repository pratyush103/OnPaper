import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { UserBadge } from "./user/userbadge";
import { AuthContext } from "./auth/AuthContext";

const Navbar = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <nav
        id="mainNav"
        className="navbar navbar-expand-md sticky-top py-3 navbar-dark"
      >
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span>OnPaper</span>
          </Link>         
            {userInfo ? (
              <UserBadge profilePicture={userInfo.profilePicture} fullName={userInfo.displayName} />
            ) : (
              <Link className="btn btn-primary shadow" role="button" to="/login">
                Login
              </Link>
            )}
          </div>
      </nav>
  );
};

export default Navbar;
