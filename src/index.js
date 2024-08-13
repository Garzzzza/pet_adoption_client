import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PetContextProvider from "./Context/PetContext";
import SignContextProvider from "./Context/SignContext";
import PetUserContextProvider from "./Context/PetUserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SignContextProvider>
      <PetContextProvider>
        <PetUserContextProvider>
          <App />
        </PetUserContextProvider>
      </PetContextProvider>
    </SignContextProvider>
  </BrowserRouter>
);
