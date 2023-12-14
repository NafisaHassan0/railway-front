import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useNavigate } from "react-router-dom";
import httpService, { endpoints } from "../utils/http.js";
import "./register.css"; // Import register.css for styling

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    contactinfo: "",
    password: "",
    isadmin: false,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.User.register,
        base: endpoints.User.base,
        reqBody: formData,
        successNotif: true,
      });

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      NotificationManager.error("Error during registration", "Error");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Railway Reservation System</h1>
      <div className="register-container">
        <h2 className="register-heading">User Registration</h2>
        <form>
          <label className="form-label">
            CNIC:
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Contact Info:
            <input
              type="text"
              name="contactinfo"
              value={formData.contactinfo}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
          <br />
          <label className="form-label">
            Is Admin:
            <input
              type="checkbox"
              name="isadmin"
              checked={formData.isadmin}
              onChange={handleCheckboxChange}
              className="form-checkbox"
            />
          </label>
          <br />
          <button
            type="button"
            onClick={handleRegister}
            className="register-btn"
          >
            Register
          </button>
        </form>
        <NotificationContainer />
      </div>
    </div>
  );
};

export default Register;
