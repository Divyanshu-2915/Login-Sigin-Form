
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import NewUser from "./SignIn";
import LoginUser from "./Login";
import MainPage from "./Main";

function WebForm() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="/SignIn" element={<NewUser />} />
            <Route path="/Login" element={<LoginUser />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default WebForm;