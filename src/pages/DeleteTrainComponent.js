import React, { useState } from "react";
import httpService from "../utils/http";
import { endpoints } from "../utils/http";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const DeleteTrainComponent = () => {
  const [trainId, setTrainId] = useState("");

  const handleInputChange = (e) => {
    setTrainId(e.target.value);
  };

  const handleDeleteTrain = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.Train.deleteTrain,
        base: endpoints.Train.base,
        reqBody: { trainid: trainId },
        successNotif: true,
      });

      if (response) {
        NotificationManager.success(response.message, "Success");
      }
    } catch (error) {
      console.error("Error deleting train:", error);
      NotificationManager.error("Error deleting train", "Error");
    }
  };

  return (
    <div>
      <h2>Delete Train</h2>
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
        <button type="button" onClick={handleDeleteTrain}>
          Delete Train
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default DeleteTrainComponent;
