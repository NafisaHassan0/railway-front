// BanUserComponent.js
import { useState } from "react";
import httpService, { endpoints } from "../utils/http";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
const BanUserComponent = () => {
  const [cnic, setCnic] = useState("");

  const handleCnicChange = (e) => {
    setCnic(e.target.value);
  };

  const handleBanUser = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.User.banuser,
        base: endpoints.User.base,
        reqBody: { cnic: cnic },
        successNotif: true,
        description: "User banned successfully",
      });
console.log(response)
      if (response){
NotificationManager.success(response.message, "Success");
             // You can perform additional actions or update the UI as needed
      }
    } catch (error) {
      console.error("Error banning user:", error);
      // Handle error and display a notification if needed
    }
  };

  return (
    <div>
      <h2>Ban User</h2>
      <label>
        CNIC:
        <input
          type="text"
          name="cnic"
          value={cnic}
          onChange={handleCnicChange}
          required
        />
      </label>
      <br />
      <button type="button" onClick={handleBanUser}>
        Ban User
      </button>
      <NotificationContainer />
      {/* ${isBanned ? "<p>User has been banned successfully.</p>" : ""} */}
    </div>
  );
    
};

export default BanUserComponent;
