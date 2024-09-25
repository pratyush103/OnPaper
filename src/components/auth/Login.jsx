// Login.jsx
import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { Link, redirect } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);
  const LoginServiceURL = "https://localhost:7293";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
      return;
    }
  
    try {
      const response = await fetch(`${LoginServiceURL}/Auth/LoginWithEmailPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();

      // const data = JSON.parse(responseText);
      
      
      if (data.error) {
        const errorMessage = data.error.message.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " : " + data.error.code;
        setError({ form: errorMessage });
        throw new Error(data.error.message);
      }

      if (data.idToken) {
        const userInfo = JSON.stringify(data);
        login(data.idToken, userInfo);
        console.log("Login successful");
      } else {
        setError({form: "Login failed. Please check your credentials and try again."});
      }
    } catch (error) {
      setError({form: "Login failed. Please try again."});
      console.error('Error:', error);
    }
  };

  return (
    <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Sign In</h2>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                        <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg className="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                            </svg></div>
                        <form className="text-center " onSubmit={handleSubmit}>
                        {error.form && <div className="alert alert-danger">{error.form}</div>}
                            <div className="mb-3 form-floating">
                              <input className="form-control" type="email" id="em" placeholder="Email" ref={emailRef} />
                              <label htmlFor="em" className="floatingInput">Email</label>
                            </div>
                            
                            <div className="mb-3 form-floating">
                              <input className="form-control" type="password" placeholder="Password" id="pw" ref={passwordRef} />
                              <label htmlFor="pw" className="floatingInput">Password</label>
                            </div>
                            <div className="mb-3">
                              <Link to="/register">Don't have an account?</Link>
                            </div>
                            <div className="me-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  );
};

export default Login;