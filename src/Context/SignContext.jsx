import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignContext = createContext();

const SignContextProvider = ({ children }) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPass, setSignUpPass] = useState("");
  const [reSignUpPass, setReSignUpPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [picture, setPicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(0);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPass, setSignInPass] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [currentUser, setCurrentUser] = useState({});
  const [someUser, setSomeUser] = useState({});

  const [userBio, setUserBio] = useState("");

  const [usersArray, setUsersArray] = useState([]);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function resetSignUpStatesAndUsers() {
    setFullName("");
    setSignUpEmail("");
    setPicture(null);
    setPhoneNumber("");
    setSignUpPass("");
    setReSignUpPass("");
    setSignInEmail("");
    setSignInPass("");
    setCurrentUser({});
    setSomeUser({});
    setIsAdmin(0);
  }

  function setRelevantSignUpStates(relevantUser) {
    setFullName(relevantUser.fullName);
    setSignUpEmail(relevantUser.signUpEmail);
    setPhoneNumber(relevantUser.phoneNumber);
    setSignUpPass(relevantUser.signUpPass);
    setReSignUpPass(relevantUser.reSignUpPass);
    setIsAdmin(relevantUser.isAdmin);
  }

  async function getUsersArray() {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/users",
        { headers: { Authorization: "Bearer " + token } }
      );
      setUsersArray(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignUp(e) {
    try {
      e.preventDefault();
      const userData = new FormData();
      userData.append("fullName", fullName.toLowerCase());
      userData.append("signUpEmail", signUpEmail.toLowerCase());
      userData.append("picture", picture);
      userData.append("signUpPass", signUpPass);
      userData.append("reSignUpPass", reSignUpPass);
      await axios.post(
        process.env.REACT_APP_SERVER_URL + "/users/signup",
        userData
      );

      resetSignUpStatesAndUsers();
      setUsersArray();
      setErrorMessage("");
      navigate("/");
      setShowSignInModal(false);
      setShowSignUpModal(false);
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response);
    }
  }

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/users/login",
        { signInEmail: signInEmail, signInPass: signInPass }
      );
      setToken(result.data.token);
      localStorage.setItem("token", result.data.token);
      resetSignUpStatesAndUsers();
      setErrorMessage("");
      navigate("/");
      setShowSignInModal(false);
      setShowSignUpModal(false);
    } catch (error) {
      console.log(error.response);
      setErrorMessage(error.response);
    }
  };

  async function getSignedUserById() {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/users/profile",
        { headers: { Authorization: "Bearer " + token } }
      );

      setCurrentUser(res.data);
    } catch (err) {
      if (err.response && err.response.data === "Invalid token") {
        handleLogOut();
        return;
      }
      console.log(err);
    }
  }

  async function getSomeUserById(userId) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/users/" + userId,
        { headers: { Authorization: "Bearer " + token } }
      );

      setSomeUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUserUpdate = async () => {
    try {
      const updatedUser = {
        userId: currentUser.userId,
        fullName: fullName,
        signUpEmail: signUpEmail,
        phoneNumber: phoneNumber,
        signUpPass: signUpPass,
      };

      await axios.put(
        process.env.REACT_APP_SERVER_URL + "/users/update",
        updatedUser,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      getSignedUserById(); // To refresh the user info
      resetSignUpStatesAndUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAdmin = async (relevantUser) => {
    try {
      const updatedUser = {
        userId: relevantUser.userId,
        isAdmin: !relevantUser.isAdmin,
      };

      await axios.put(
        process.env.REACT_APP_SERVER_URL + "/users/toggleadmin",
        updatedUser,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      resetSignUpStatesAndUsers();
      getSomeUserById(relevantUser.userId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = async () => {
    navigate("/");
    resetSignUpStatesAndUsers();
    setToken("");
    localStorage.clear();
  };

  return (
    <SignContext.Provider
      value={{
        signUpEmail,
        setSignUpEmail,
        signUpPass,
        setSignUpPass,
        reSignUpPass,
        setReSignUpPass,
        fullName,
        setFullName,
        picture,
        setPicture,
        phoneNumber,
        setPhoneNumber,
        handleSignUp,
        resetSignUpStatesAndUsers,
        setRelevantSignUpStates,
        signInEmail,
        setSignInEmail,
        signInPass,
        setSignInPass,
        handleSignIn,
        token,
        setToken,
        userBio,
        setUserBio,
        usersArray,
        setUsersArray,
        getUsersArray,
        getSignedUserById,
        currentUser,
        setCurrentUser,
        handleUserUpdate,
        getSomeUserById,
        someUser,
        setSomeUser,
        showSignUpModal,
        setShowSignUpModal,
        showSignInModal,
        setShowSignInModal,
        errorMessage,
        setErrorMessage,
        isAdmin,
        setIsAdmin,
        toggleAdmin,
        handleLogOut,
      }}
    >
      {children}
    </SignContext.Provider>
  );
};
export default SignContextProvider;
export { SignContext };
