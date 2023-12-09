import React, { useState } from "react";
import httpService from "../utils/http.js";
import { endpoints } from "../utils/http.js";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications"; // Import NotificationManager
import "react-notifications/lib/notifications.css"; // Import notification styles

const Register = () => {
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
      console.log(response)
         if (response) {
           NotificationManager.success(
             "User registered successfully",
             "Success"
           );
         }
    } catch (error) {
      console.error("Error during registration:", error);
      NotificationManager.error("Error during registration", "Error");
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form>
        <label>
          CNIC:
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Contact Info:
          <input
            type="text"
            name="contactinfo"
            value={formData.contactinfo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Is Admin:
          <input
            type="checkbox"
            name="isadmin"
            checked={formData.isadmin}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default Register;
