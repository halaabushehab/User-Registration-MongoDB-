import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Login from "./user/Login.jsx";
import Register from "./user/Register.jsx";


const App = () => {
  return (
    <Router>
     
      <div style={{ minHeight: "100vh", paddingBottom: "80px" }}>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>

    </Router>
  );
};

export default App;
