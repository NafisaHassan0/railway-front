import React, { useState } from "react";
import httpService from "../utils/http";
import { endpoints } from "../utils/http";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const CancelTrainComponent = () => {
  const [trainId, setTrainId] = useState("");

  const handleInputChange = (e) => {
    setTrainId(e.target.value);
  };

  const handleCancelTrain = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.Train.canceltrain,
        base: endpoints.Train.base,
        reqBody: { trainId: trainId },
        successNotif: true,
      });

      if (response) {
        NotificationManager.success(response.message, "Success");
      }
    } catch (error) {
      console.error("Error canceling train:", error);
      NotificationManager.error("Error canceling train", "Error");
    }
  };

  return (
    <div>
      <h2>Cancel Train</h2>
      <form>
        <label>
          Train ID:
          <input
            type="text"
            name="trainId"
            value={trainId}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleCancelTrain}>
          Cancel Train
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default CancelTrainComponent;
