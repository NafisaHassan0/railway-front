// ViewUsersComponent.js
import React, { useState, useEffect } from "react";
import httpService from "../utils/http";
import { endpoints } from "../utils/http";

const ViewUsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await httpService({
          endpoint: endpoints.User.viewusers,
          base: endpoints.User.base,
          successNotif: false,
        });
           console.log(response)
        if (response) {
          setUsers(response);
        }
        console.log(response.isbanned)
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            CNIC: {user.cnic}, Name: {user.name}, Contact info:{" "}
            {user.contactinfo}, isBanned: ,{" "}
            {user.isbanned.toString()}
    
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUsersComponent;
