import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CreateOrder from "./CreateOrder"; // تأكد من المسار الصحيح
import Navbar from "./Navbar.jsx";
import Login from "./user/Login.jsx";
import Register from "./user/Register.jsx";

const App = () => {
  const [userId, setUserId] = useState(null); // تعريف حالة userId

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pb-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUserId={setUserId} />} /> {/* تمرير setUserId */}
            <Route path="/orders" element={<CreateOrder userId={userId} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;