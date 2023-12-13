// BuyTicketComponent.js
import React, { useState } from "react";
import httpService, { endpoints } from "../utils/http";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux"; // Import the useSelector hook

const BuyTicketComponent = ({ trainId, onTicketPurchase }) => {
  const [passengerCnic, setPassengerCnic] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerContactInfo, setPassengerContactInfo] = useState("");
const loggedInUser = useSelector((state) => state.user.userDetails);

  const handlePurchase = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.ticket.buyticket,
        base: endpoints.ticket.base[0],
        reqBody: {
          usersID: loggedInUser.cnic,
          Passengercnic: passengerCnic,
          TrainID: trainId,
          PassengerName: passengerName,
          PassengerContactInfo: passengerContactInfo,
        },
        successNotif: true,
      });

      if (response) {
        NotificationManager.success("Ticket purchased successfully", "Success");
        onTicketPurchase(trainId);
        // Additional logic if needed after successful purchase
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      NotificationManager.error("Error purchasing ticket", "Error");
    }
  };

  return (
    <div>
      <h3>Purchase Ticket</h3>
      <label>Passenger CNIC:</label>
      <input
        type="text"
        value={passengerCnic}
        onChange={(e) => setPassengerCnic(e.target.value)}
        required
      />
      <br />
      <label>Passenger Name:</label>
      <input
        type="text"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
      />
      <br />
      <label>Contact Info:</label>
      <input
        type="text"
        value={passengerContactInfo}
        onChange={(e) => setPassengerContactInfo(e.target.value)}
        required
      />
      <br />
      <button onClick={handlePurchase}>Purchase Ticket</button>
    </div>
  );
};

export default BuyTicketComponent;
