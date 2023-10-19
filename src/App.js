import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import UserDetails from "./components/user-details.component";
import LoginSignup from "./components/login-signup.component";

function App() {
  const loggedin_username = localStorage.getItem('username');

  if(loggedin_username){
    return (
      <div className="container">
        <Router>
          <br />
          <Routes>
            <Route path="/" element={<UserDetails username={loggedin_username}/>} />
            <Route path="/create" element={<CreateExercise username={loggedin_username}/>} />
            <Route path="/edit/:id" element={<EditExercise username={loggedin_username}/>} />
          </Routes>
        </Router>
      </div>
    );
  }
  else{
    return(
      <div className="container">
        <Router>
          <br />
          <Routes>
          <Route path="/" element={<LoginSignup />} />
          </Routes>
        </Router>
      </div>
    );
  }      
}

export default App;
