import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import PageTitle from "./PageTitle";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};

    if (!input.name.trim()) {
      validationError.name = "Name is required";
    }
    if (!input.email.trim()) {
      validationError.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      validationError.email = "Invalid email address";
    }

    if (!input.password.trim()) {
      validationError.password = "Password is required";
    } else if (input.password.length < 9) {
      validationError.password = "Password must be at least 9 characters long";
    }

    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/register",
          input
        );
        if (response.status === 200) {
          navigate("/login");
          alert("User registered successfully");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setError({ apiError: error.response.data.message });
        } else {
          setError({ apiError: "An error occurred. Please try again later." });
        }
      }
    }
  };

  return (
    <div className="form-signin text-center">
      <PageTitle title="Register" />
      <form onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="https://via.placeholder.com/72x57"
          alt="Logo"
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input
            name="name"
            value={input.name}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="floatingInputName"
            placeholder="Name"
          />
          {error.name && <span className="error">{error.name}</span>}
          <label htmlFor="floatingInputName">Enter name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type="text"
            className="form-control"
            id="floatingInputEmail"
            placeholder="name@example.com"
          />
          {error.email && <span className="error">{error.email}</span>}
          <label htmlFor="floatingInputEmail">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          {error.password && <span className="error">{error.password}</span>}
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {error.apiError && <span className="error">{error.apiError}</span>}

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-3">
          Already Registered? <a href="/login">Login here</a>
        </p>
        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
      </form>
    </div>
  );
};

export default Register;
