import React, { useState } from "react";
import httpService from "../utils/http.js";
import { endpoints } from "../utils/http.js";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux"; // Import the useSelector hook
const TrainComponent = () => {
  const [trainDetails, setTrainDetails] = useState({
    id: "",
    name: "",
    capacity: "",
    route: [],
  });
const jwtToken = useSelector((state) => state.user.jwt);
const loggedInUser = useSelector((state) => state.user.userDetails);
console.log(loggedInUser)
console.log(jwtToken); 
console.log("heelll")
 console.log(trainDetails);
const handleInputChange = (e) => {
  if (e.target.name === "route") {
    // Convert the comma-separated string to an array
    const routeArray = e.target.value.split(",");
    setTrainDetails({
      ...trainDetails,
      [e.target.name]: routeArray,
    });
  } else {
    setTrainDetails({
      ...trainDetails,
      [e.target.name]: e.target.value,
    });
  }
};

  const handleCreateTrain = async () => {
    try {
    //   const routeArray = Array.isArray(trainDetails.route)
    //     ? trainDetails.route
    //     : trainDetails.route.split(",");

    //     const formattedRoute = `{${routeArray
    //       .map((station) => `"${station.trim()}"`)
    //       .join(",")}}`;
   
      const response = await httpService({
        endpoint: endpoints.Train.inserttrain,
        base: endpoints.Train.base,
        reqBody: trainDetails,
       
        successNotif: true,
        //  jwt: `Bearer ${jwtToken}`,
      });

     // console.log(response)
     // console.log()

      if (response) {
        NotificationManager.success(response.message, "Success");
      }
    } catch (error) {
      console.error("Error creating train:", error);
      NotificationManager.error("Error creating train", "Error");
    }
  };

  return (
    <div>
      <h2>Create New Train</h2>
      <form>
        <label>
          Train ID:
          <input
            type="text"
            name="id"
            value={trainDetails.id}
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
            value={trainDetails.name}
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
            value={trainDetails.capacity}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Route:
          <input
            type="text"
            name="route"
            value={trainDetails.route.join(",")}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateTrain}>
          Create Train
        </button>
      </form>
      <NotificationContainer />
    </div>
  );
};

export default TrainComponent;
