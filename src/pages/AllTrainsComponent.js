import React, { useState, useEffect } from "react";
import httpService from "../utils/http";
import { endpoints } from "../utils/http";

const AllTrainsComponent = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchAllTrains = async () => {
      try {
        const response = await httpService({
          endpoint: endpoints.Train.getTrains,
          base: endpoints.Train.base,
          successNotif: false,
        });
         console.log(response)
        if (response) {
          setTrains(response);
        }
      } catch (error) {
        console.error("Error fetching all trains:", error);
      }
    };

    fetchAllTrains();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h2>All Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.trainid}>
            Train ID: {train.trainid}, Name: {train.name}, Capacity:{" "}
            {train.capacity}, Availability: {train.status}, Route: {train.routes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTrainsComponent;
