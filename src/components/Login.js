import React, { useState } from "react";
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/admin/login', { email, password });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center w-100">
      <div className="bg-white shadow rounded-3 p-4 w-100" style={{ maxWidth: "400px" }}>
        <h1 className="h3 mb-4 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              className="form-control"
              type="email"
              placeholder="your@gmail.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password Input with Eye Icon */}
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-group">
              <input
                id="password"
                className="form-control"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button className="w-100 btn btn-dark" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
