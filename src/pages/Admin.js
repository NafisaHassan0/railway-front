import React, { useState } from "react";
import TrainComponent from "./TrainComponent";
import UpdateTrainComponent from "./UpdateTrainComponent";
import DeleteTrainComponent from "./DeleteTrainComponent";
import AllTrainsComponent from "./AllTrainsComponent";
import SearchTrainComponent from "./SearchTrainComponent";
import CancelTrainComponent from "./CancelTrainComponent";
import BanUserComponent from "./BanUserComponent";
import ViewUsersComponent from "./ViewUsersComponent";
const Admin = () => {
  const [showCreateTrain, setShowCreateTrain] = useState(true);
  const [showUpdateTrain, setShowUpdateTrain] = useState(false);
  const [showDeleteTrain, setShowDeleteTrain] = useState(false);
  const [showCancelTrain, setShowCancelTrain] = useState(false);
  const [showSearchTrain, setShowSearchTrain] = useState(false);
  const [showTrainsModal, setShowTrainsModal] = useState(false);
 const [showBanUser, setShowBanUser] = useState(false);
 const [showUsers, setShowUsers] = useState(false)
  const handleShowCreateTrain = () => {
    setShowUpdateTrain(true);
    setShowCreateTrain(true);
    setShowDeleteTrain(false);
    setShowCancelTrain(false);
    setShowSearchTrain(false);
    setShowTrainsModal(false);
    setShowBanUser(false);
  };

  const handleShowUpdateTrain = () => {
    setShowCreateTrain(false);
    setShowDeleteTrain(false);
    setShowCancelTrain(false);
    setShowSearchTrain(false);
    setShowTrainsModal(false);
    setShowBanUser(false);
  };

  const handleShowDeleteTrain = () => {
    setShowCreateTrain(false);
    setShowDeleteTrain(true);
    setShowCancelTrain(false);
    setShowSearchTrain(false);
    setShowTrainsModal(false);
    setShowBanUser(false);
  };

  const handleShowCancelTrain = () => {
    setShowCreateTrain(false);
    setShowDeleteTrain(false);
    setShowCancelTrain(true);
    setShowSearchTrain(false);
    setShowTrainsModal(false);
    setShowBanUser(false);
  };

  const handleShowSearchTrain = () => {
    setShowCreateTrain(false);
    setShowDeleteTrain(false);
    setShowCancelTrain(false);
    setShowSearchTrain(true);
    setShowTrainsModal(false);
    setShowBanUser(false);

  };

  const handleShowTrainsModal = () => {
    console.log("Showing Trains Modal");
    setShowCreateTrain(false);
    setShowDeleteTrain(false);
    setShowCancelTrain(false);
    setShowSearchTrain(false);
    setShowTrainsModal(true);
    setShowUpdateTrain(false)
    setShowBanUser(false);
    setShowUsers(false)
  };
   const handleShowBanUser = () => {
     console.log("Showing Ban User");
     setShowBanUser(true);
     // Optionally, you can hide other components when displaying the BanUserComponent
     setShowCreateTrain(false);
     setShowUpdateTrain(false);
     setShowDeleteTrain(false);
     setShowCancelTrain(false);
     setShowSearchTrain(false);
     setShowTrainsModal(false);
   };

const handleShowUsers=()=>{
  setShowUsers(true);
   setShowBanUser(false);
   // Optionally, you can hide other components when displaying the BanUserComponent
   setShowCreateTrain(false);
   setShowUpdateTrain(false);
   setShowDeleteTrain(false);
   setShowCancelTrain(false);
   setShowSearchTrain(false);
   setShowTrainsModal(false);
}

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <button onClick={handleShowCreateTrain}>Create New Train</button>
        <button onClick={handleShowUpdateTrain}>Update Train</button>
        <button onClick={handleShowDeleteTrain}>Delete Train</button>
        <button onClick={handleShowCancelTrain}>Cancel Train</button>
        <button onClick={handleShowSearchTrain}>Search Train</button>
        <button onClick={handleShowTrainsModal}>Show Trains</button>
        <button onClick={handleShowBanUser}>Ban User</button>
        <button onClick={handleShowUsers}>See Users</button>
      </div>

      {showCreateTrain ? (
        <TrainComponent />
      ) : showDeleteTrain ? (
        <DeleteTrainComponent />
      ) : showCancelTrain ? (
        <CancelTrainComponent />
      ) : showSearchTrain ? (
        <SearchTrainComponent />
      ) : showBanUser ? (
        <BanUserComponent />
      ) : showUpdateTrain ? (
        <>
          <UpdateTrainComponent />
        </>
      ) :showUsers ? (
        <ViewUsersComponent/>
      ): (
        <>
          <AllTrainsComponent />
        </>
      )}

      {/* {showTrainsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseTrainsModal}>
              &times;
            </span>
            <AllTrainsComponent />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Admin;

// import React, { useState } from "react";
// import TrainComponent from "./TrainComponent";
// import UpdateTrainComponent from "./UpdateTrainComponent";
// import DeleteTrainComponent from "./DeleteTrainComponent";
// import AllTrainsComponent from "./AllTrainsComponent";
// import SearchTrainComponent from "./SearchTrainComponent";
// import CancelTrainComponent from "./CancelTrainComponent";

// const Admin = () => {
//   const [showCreateTrain, setShowCreateTrain] = useState(true);
//   const [showDeleteTrain, setShowDeleteTrain] = useState(false);
//   const [showCancelTrain, setShowCancelTrain] = useState(false);
//   const [showSearchTrain, setShowSearchTrain] = useState(false);

//   const handleShowCreateTrain = () => {
//     setShowCreateTrain(true);
//     setShowDeleteTrain(false);
//     setShowCancelTrain(false);
//     setShowSearchTrain(false);
//   };

//   const handleShowUpdateTrain = () => {
//     setShowCreateTrain(false);
//     setShowDeleteTrain(false);
//     setShowCancelTrain(false);
//     setShowSearchTrain(false);
//   };

//   const handleShowDeleteTrain = () => {
//     setShowCreateTrain(false);
//     setShowDeleteTrain(true);
//     setShowCancelTrain(false);
//     setShowSearchTrain(false);
//   };

//   const handleShowCancelTrain = () => {
//     setShowCreateTrain(false);
//     setShowDeleteTrain(false);
//     setShowCancelTrain(true);
//     setShowSearchTrain(false);
//   };

//   const handleShowSearchTrain = () => {
//     setShowCreateTrain(false);
//     setShowDeleteTrain(false);
//     setShowCancelTrain(false);
//     setShowSearchTrain(true);
//   };

//   return (
//     <div>
//       <h1>Admin Page</h1>
//       <div>
//         <button onClick={handleShowCreateTrain}>Create New Train</button>
//         <button onClick={handleShowUpdateTrain}>Update Train</button>
//         <button onClick={handleShowDeleteTrain}>Delete Train</button>
//         <button onClick={handleShowCancelTrain}>Cancel Train</button>
//         <button onClick={handleShowSearchTrain}>Search Train</button>
//       </div>

//       {showCreateTrain ? (
//         <TrainComponent />
//       ) : showDeleteTrain ? (
//         <DeleteTrainComponent />
//       ) : showCancelTrain ? (
//         <CancelTrainComponent />
//       ) : showSearchTrain ? (
//         <SearchTrainComponent />
//       ) : (
//         <>
//           <UpdateTrainComponent />
//           <AllTrainsComponent />
//         </>
//       )}
//     </div>
//   );
// };

// export default Admin;
