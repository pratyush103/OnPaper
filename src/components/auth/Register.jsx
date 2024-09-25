// Register.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const RegisterServiceURL = "https://onpaper-auth-container-app.yellowmushroom-2be56bac.westus2.azurecontainerapps.io";

  const validateInputs = () => {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const response = await fetch(`${RegisterServiceURL}/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, fullname }),
      });

      const data = await response.json();
      if (data.idToken) {
        login(data.idToken);
      } else {
        setErrors({ form: "Registration failed. Please check your details and try again." });
      }
    } catch (error) {
      setErrors({ form: "Registration failed. Please try again." });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}
      <div className="form-row">
        <div className="col form-floating">
          <input
            type="text"
            className={`form-control ${errors.fullname ? "is-invalid" : fullname ? "is-valid" : ""}`}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full name"
          />
          <label htmlFor="fullname" className="floatingInput">Full Name</label>
          {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-floating">
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : username ? "is-valid" : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
          <label htmlFor="username" className="floatingInput">Username</label>
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-floating">
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : email ? "is-valid" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.org"
          />
          <label htmlFor="email" className="floatingInput">Email</label>
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <label htmlFor="password" className="floatingInput">Password</label>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-floating">
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <label htmlFor="confirmPassword" className="floatingInput">Confirm Password</label>
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
      </div>
      <Link to="/login">Already have an account?</Link>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
  );
};

export default Register;