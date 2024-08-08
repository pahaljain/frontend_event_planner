import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Orders from "./components/Orders";
import AboutUs from "./components/static_pages/Aboutus";
import Contact from "./components/static_pages/Contact";
import Services from "./components/static_pages/Services";

const App = () => {
  // const [userId, setUserId] = useState("");
  const user = localStorage.getItem("userId");
  // useEffect(() => {
  //   setUserId(localStorage.getItem("userId"));
  // }, [userId]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/categories" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
};

export default App;
