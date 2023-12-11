// UpdateTrainComponent.js
import React, { useState } from "react";
import httpService from "../utils/http.js";
import { endpoints } from "../utils/http.js";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux"; // Import the useSelector hook

const UpdateTrainComponent = () => {
  const [updateDetails, setUpdateDetails] = useState({
    trainid: "", // Include the train ID to uniquely identify the train to be updated
    name: "",
    capacity: "",
    routes: [],
  });

  const jwtToken = useSelector((state) => state.user.jwt);
  console.log(jwtToken);

  const handleInputChange = (e) => {
    if (e.target.name === "routes") {
      // Convert the comma-separated string to an array
      const routeArray = e.target.value.split(",");
      setUpdateDetails({
        ...updateDetails,
        [e.target.name]: routeArray,
      });
    } else {
      setUpdateDetails({
        ...updateDetails,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdateTrain = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.Train.updateTrain,
        base: endpoints.Train.base,
        reqBody: updateDetails,
        successNotif: true,
      });

      if (response) {
        NotificationManager.success(response.message, "Success");
      }
    } catch (error) {
      console.error("Error updating train:", error);
      NotificationManager.error("Error updating train", "Error");
    }
  };

  return (
    <div>
      <h2>Update Train</h2>
      <form>
        <label>
          Train ID:
          <input
            type="text"
            name="trainid"
            value={updateDetails.trainid}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updateDetails.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Capacity:
          <input
            type="text"
            name="capacity"
            value={updateDetails.capacity}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Routes:
          <input
            type="text"
            name="routes"
            value={updateDetails.routes.join(",")}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdateTrain}>
          Update Train
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default UpdateTrainComponent;
