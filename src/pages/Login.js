import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/reducers/user.js"; // Import the loginUser action from your Redux store
import httpService, { endpoints } from "../utils/http.js";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cnic: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.User.login,
        base: endpoints.User.base,
        reqBody: formData,
        successNotif: true,
      });

      // console.log(response.token);
      //   console.log(response.isadmin);
      if (response.userDetails.isadmin) {
        // Redirect to the "/admin" page
        navigate("/admin");
      }

      if (!response.userDetails.isadmin) {
        // Redirect to the "/admin" page
        navigate("/user");
      }

      if (!response.userDetails.isadmin) {
        // Redirect to the "/admin" page
        navigate("/user");
      }
      if (response) {
        // Dispatch the loginUser action to update the Redux store with user details
        dispatch(loginUser(response));

        // Optionally, you can redirect to another page after successful login
        // history.push('/dashboard');

        NotificationManager.success("Login successful", "Success");
      }
    } catch (error) {
      console.error("Error during login:", error);
      NotificationManager.error("Error during login", "Error");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Railway Reservation System</h1>
      <div className="login-container">
        <h2 className="login-heading">User Login</h2>
        <form>
          <label className="login-label">
            CNIC:
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              className="login-input"
            />
          </label>
          <br />
          <label className="login-label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="login-input"
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin} className="login-btn">
            Login
          </button>
        </form>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;
