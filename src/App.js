import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import UserDetails from "./components/user-details.component";
import FindUserDetails from "./components/find-user-details.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<FindUserDetails />} />
          <Route path="/userDetails/:username" element={<UserDetails />} />
          <Route path="/edit/:id" element={<EditExercise />} />          
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
