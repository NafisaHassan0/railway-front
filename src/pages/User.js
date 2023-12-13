import React, { useState } from "react";
import httpService, { endpoints } from "../utils/http";
import BuyTicketComponent from "./BuyTicketComponent"; // Import the BuyTicketComponent

const SearchTrain = () => {
  const [date, setDate] = useState("");
  const [sourceStation, setSourceStation] = useState("");
  const [destinationStation, setDestinationStation] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [selectedTrains, setSelectedTrains] = useState([]);
  const [selectedTrainId, setSelectedTrainId] = useState(null); // Track the selected train for booking

  const handleSearch = async () => {
    const response = await httpService({
      endpoint: endpoints.booking.searchtrain,
      base: endpoints.booking.base,
      reqBody: { date, sourceStation, destinationStation },
      successNotif: true,
    });

    if (response) {
      setSearchResult(response);
    }
  };

  const handleToggleTrain = (trainId) => {
    const isSelected = selectedTrains.includes(trainId);
    if (isSelected) {
      setSelectedTrains(selectedTrains.filter((id) => id !== trainId));
    } else {
      setSelectedTrains([...selectedTrains, trainId]);
    }
  };

  const handleBookTrain = (trainId) => {
    // Check if the train is selected before booking
    if (selectedTrains.includes(trainId)) {
      // Set the selected train ID
      setSelectedTrainId(trainId);
    } else {
      console.log(`Train ${trainId} is not selected.`);
    }
  };

  return (
    <div>
      <h2>Search Train</h2>
      <label>Date:</label>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <br />
      <label>Source Station:</label>
      <input
        type="text"
        value={sourceStation}
        onChange={(e) => setSourceStation(e.target.value)}
      />
      <br />
      <label>Destination Station:</label>
      <input
        type="text"
        value={destinationStation}
        onChange={(e) => setDestinationStation(e.target.value)}
      />
      <br />
      <button onClick={handleSearch}>Search</button>

      {searchResult && (
        <div>
          <h3>Search Result</h3>

          <table>
            <thead>
              <tr>
                <th>Train ID</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Train Name</th>
                <th>Status</th>
                <th>Available</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.traindepartureTimes.map((train) => (
                <tr key={train.trainId}>
                  <td>{train.trainId}</td>
                  <td>{train.departureTime}</td>
                  <td>{train.arrivalTime}</td>
                  <td>{train.name}</td>
                  <td>{train.status}</td>
                  <td>
                    {train.status === "available" && (
                      <input
                        type="checkbox"
                        onChange={() => handleToggleTrain(train.trainId)}
                        checked={selectedTrains.includes(train.trainId)}
                      />
                    )}
                  </td>
                  <td>
                    {train.status === "available" && (
                      <button onClick={() => handleBookTrain(train.trainId)}>
                        Book Train
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Conditionally render BuyTicketComponent */}
      {selectedTrainId && (
        <BuyTicketComponent
          trainId={selectedTrainId}
          onTicketPurchase={() => {
            setSelectedTrainId(null); // Reset selected train ID after purchase
            // Additional logic after ticket purchase if needed
          }}
        />
      )}
    </div>
  );
};

export default SearchTrain;

// import React, { useState } from "react";
// import httpService, { endpoints } from "../utils/http";

// const SearchTrain = () => {
//   const [date, setDate] = useState("");
//   const [sourceStation, setSourceStation] = useState("");
//   const [destinationStation, setDestinationStation] = useState("");
//   const [searchResult, setSearchResult] = useState(null);

//   const handleSearch = async () => {
//     const response = await httpService({
//       endpoint: endpoints.booking.searchtrain,
//       base: endpoints.booking.base,
//       reqBody: { date, sourceStation, destinationStation },
//       successNotif: true,
//     });

//     // Handle the response from the backend
//     if (response) {
//       setSearchResult(response);
//     }
//   };

//   return (
//     <div>
//       <h2>Search Train</h2>
//       <label>Date:</label>
//       <input
//         type="text"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <br />
//       <label>Source Station:</label>
//       <input
//         type="text"
//         value={sourceStation}
//         onChange={(e) => setSourceStation(e.target.value)}
//       />
//       <br />
//       <label>Destination Station:</label>
//       <input
//         type="text"
//         value={destinationStation}
//         onChange={(e) => setDestinationStation(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSearch}>Search</button>

//       {searchResult && (
//         <div>
//           <h3>Search Result</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>Train ID</th>
//                 <th>Departure Time</th>
//                 <th>Arrival Time</th>
//                 <th>Train Name</th>
//                 <th>Status</th>
//                 <th>Available</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchResult.traindepartureTimes.map((train) => (
//                 <tr key={train.trainId}>
//                   <td>{train.trainId}</td>
//                   <td>{train.departureTime}</td>
//                   <td>{train.arrivalTime}</td>
//                   <td>{train.name}</td>
//                   <td>{train.status}</td>
//                   <td>
//                     {train.status === "available" && <input type="checkbox" />}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchTrain;

// import React, { useState } from "react";
// import httpService, { endpoints } from "../utils/http";

// const SearchTrain = () => {
//   const [date, setDate] = useState("");
//   const [sourceStation, setSourceStation] = useState("");
//   const [destinationStation, setDestinationStation] = useState("");
//   const [searchResult, setSearchResult] = useState(null);
//   const [selectedTrains, setSelectedTrains] = useState([]);

//   const handleSearch = async () => {
//     const response = await httpService({
//       endpoint: endpoints.booking.searchtrain,
//       base: endpoints.booking.base,
//       reqBody: { date, sourceStation, destinationStation },
//       successNotif: true,
//     });

//     // Handle the response from the backend
//     if (response) {
//       setSearchResult(response);
//     }
//   };

//   const handleToggleTrain = (trainId) => {
//     const isSelected = selectedTrains.includes(trainId);
//     if (isSelected) {
//       setSelectedTrains(selectedTrains.filter((id) => id !== trainId));
//     } else {
//       setSelectedTrains([...selectedTrains, trainId]);
//     }
//   };

//   const handleBookTrain = (trainId) => {
//     // Check if the train is selected before booking
//     if (selectedTrains.includes(trainId)) {
//       // Handle booking the train with the provided trainId
//       console.log(`Book Train ${trainId}`);
//       // Add your booking logic here
//     } else {
//       console.log(`Train ${trainId} is not selected.`);
//     }
//   };

//   return (
//     <div>
//       <h2>Search Train</h2>
//       <label>Date:</label>
//       <input
//         type="text"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//       <br />
//       <label>Source Station:</label>
//       <input
//         type="text"
//         value={sourceStation}
//         onChange={(e) => setSourceStation(e.target.value)}
//       />
//       <br />
//       <label>Destination Station:</label>
//       <input
//         type="text"
//         value={destinationStation}
//         onChange={(e) => setDestinationStation(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSearch}>Search</button>

//       {searchResult && (
//         <div>
//           <h3>Search Result</h3>

//           <table>
//             <thead>
//               <tr>
//                 <th>Train ID</th>
//                 <th>Departure Time</th>
//                 <th>Arrival Time</th>
//                 <th>Train Name</th>
//                 <th>Status</th>
//                 <th>Available</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {searchResult.traindepartureTimes.map((train) => (
//                 <tr key={train.trainId}>
//                   <td>{train.trainId}</td>
//                   <td>{train.departureTime}</td>
//                   <td>{train.arrivalTime}</td>
//                   <td>{train.name}</td>
//                   <td>{train.status}</td>
//                   <td>
//                     {train.status === "available" && (
//                       <input
//                         type="checkbox"
//                         onChange={() => handleToggleTrain(train.trainId)}
//                         checked={selectedTrains.includes(train.trainId)}
//                       />
//                     )}
//                   </td>
//                   <td>
//                     {train.status === "available" && (
//                       <button onClick={() => handleBookTrain(train.trainId)}>
//                         Book Train
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchTrain;
