import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import AddUser from "./Components/Add Users/AddUser";
import UserDetails from "./Components/User Deatils/UserDetails";
import UpdateUsers from "./Components/Update User/UpdateUsers";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ContactUs from "./Components/Contact Us/ContactUs";
import SendPDF from "./Components/Send PDF/SendPDF";
import ImageUploader from "./Components/Image Uploader/ImageUploader";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdetails/:id" element={<UpdateUsers />} />
          <Route path="/uploadimg" element={<ImageUploader />} />
          <Route path="/sendpdf" element={<SendPDF />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
