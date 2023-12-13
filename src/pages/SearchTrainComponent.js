import React, { useState } from "react";
import httpService from "../utils/http";
import { endpoints } from "../utils/http";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const SearchTrainComponent = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchTrain = async () => {
    try {
      const response = await httpService({
        endpoint: endpoints.Train.searchTrain,
        base: endpoints.Train.base,
        reqBody: { keyword: searchKeyword },
        successNotif: false,
      });
console.log(response)
if(!response){
      NotificationManager.error("No trains available with this keyword", "Error");
}
      if (response) {
        setSearchResult(response);
      }
      console.log(searchResult)
    } catch (error) {
      console.error("Error searching train:", error);
      NotificationManager.error("Error searching train", "Error");
    }
  };

  return (
    <div>
      <h2>Search Train</h2>
      <form>
        <label>
          Keyword:
          <input
            type="text"
            name="searchKeyword"
            value={searchKeyword}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleSearchTrain}>
          Search Train
        </button>
      </form>

      <div>
      
        <ul>
          {searchResult?.map((train) => (
            <li key={train.trainid}>
              Train ID: {train.trainid}, Name: {train.name}, Capacity:{" "}
              {train.capacity}
            </li>
          ))}
        </ul>
      </div>

      <NotificationContainer />
    </div>
  );
};

export default SearchTrainComponent;
