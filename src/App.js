// import './App.css';
// import Dashboard from './pages/Dashboard';
// import Register from './pages/Register'
// function App() {
//   return (
//     // <Dashboard />
//     < Register/>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store/index";
import TrainComponent from "./pages/TrainComponent"

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/train" element={<TrainComponent />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

