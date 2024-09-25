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
  const RegisterServiceURL = "https://localhost:7293";

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
      
      // const data = JSON.parse(responseText);
      
      if (data.error) {
        setErrors({ form: data.error.message.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()) +" :"+ data.error.code });
        throw new Error(data.error);
      }

      if (data.idToken) {
        const userInfo = JSON.stringify(data);
        login(data.idToken, userInfo);
        console.log("Registration successful");
      } else {
        setErrors({ form: "Registration failed. Please check your details and try again." });
      }
    } catch (error) {
      setErrors({ form: "Registration failed. Please try again." });
      console.error('Error:', error);
    }
  };

  return (
    <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Sign Up</h2>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg className="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                            </svg></div>
                            <form onSubmit={handleSubmit} noValidate>
      {errors.form && <div className="alert alert-danger">{errors.form}</div>}
      <div className="form-row">
        <div className="mb-3 form-floating">
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
        <div className="mb-3 form-floating">
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
        <div className="mb-3 form-floating">
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
      <div className="row">
        <div className="col mb-3 form-floating">
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <label htmlFor="password" className="floatingInput" style={{ marginLeft: "10px" }}>Password</label>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
      
        <div className="col mb-3 form-floating">
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <label htmlFor="confirmPassword" className="floatingInput" style={{ marginLeft: "10px" }}>Confirm Password</label>
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>
      </div>
      <div className="mb-3">
      <Link to="/login">Already have an account?</Link>
      </div>
      <input type="submit" className="btn btn-primary d-block w-100" value="Register" />
    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
};

export default Register;