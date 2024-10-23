// Login.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext
import { LoginHandler } from "./ReqResHandler"; // Assuming you have a LoginHandler function
import { useToast } from "../app-status/ToastContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, authToken } = useAuth();
  const { addToast } = useToast(); // Assuming you have a useToast hook



  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    setLoading(true);

    try {
      await LoginHandler(
        emailRef.current.value,
        passwordRef.current.value,
        setError,
        login,
        addToast
      );
    } catch (e) {
      console.error("Login failed:", e);
    } finally {
      setLoading(false);
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
                <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                  <svg
                    className="bi bi-person"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                  </svg>
                </div>
                <form className="text-center" onSubmit={handleSubmit}>
                  {error.form && (
                    <div className="alert alert-danger">{error.form}</div>
                  )}
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="email"
                      id="em"
                      placeholder="Email"
                      ref={emailRef}
                    />
                    <label htmlFor="em" className="floatingInput">
                      Email
                    </label>
                  </div>
                  <div className="mb-3 form-floating">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      id="pw"
                      ref={passwordRef}
                    />
                    <label htmlFor="pw" className="floatingInput">
                      Password
                    </label>
                  </div>
                  <div className="mb-3">
                    <Link to="/register">Don't have an account?</Link>
                  </div>
                  <div className="me-3">
                    <button
                      className="btn btn-primary d-block w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
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
