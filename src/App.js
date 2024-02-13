import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import AdvancedSearch from "./Pages/AdvancedSearch";
import PetsList from "./Pages/PetsList";
import axios from "axios";

import SpecificPetForAdmin from "./Pages/SpecificPetForAdmin";
import SpecificUserForAdmin from "./Pages/SpecificUserForAdmin";
import { SpecificPet } from "./Pages/SpecificPet";
import { Admin } from "./Pages/Admin";
import PrivateRoute from "./Components/PrivateRoute";
import MyPets from "./Pages/MyPets";
import Profile from "./Pages/Profile";
import { SignContext } from "./Context/SignContext";

function App() {
  const { token, getSignedUserById } = useContext(SignContext);

  useEffect(() => {
    if (token.length > 0) {
      getSignedUserById();
    }
  }, [token]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />

        <Route path="/advancedsearch" element={<AdvancedSearch />} />

        <Route
          path="/pets"
          element={
            <PrivateRoute>
              <PetsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/mypets"
          element={
            <PrivateRoute>
              <MyPets />
            </PrivateRoute>
          }
        />

        <Route path="/pets/:petId" element={<SpecificPet />} />
        <Route
          path="/Admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/pets/petsforadmin/:petId"
          element={
            <PrivateRoute>
              <SpecificPetForAdmin />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/userforadmin/:userId"
          element={
            <PrivateRoute>
              <SpecificUserForAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
