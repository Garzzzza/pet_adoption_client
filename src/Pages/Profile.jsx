import React, { useContext, useEffect } from "react";
import { SignContext } from "../Context/SignContext";

const Profile = () => {
  const {
    setSignUpEmail,
    signUpEmail,
    signUpPass,
    setSignUpPass,
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    handleSignUp,
    reSignUpPass,
    setReSignUpPass,
    handleUserUpdate,
    currentUser,
    getSignedUserById,
    userBio,
    setUserBio,
  } = useContext(SignContext);

  useEffect(() => {
    setFullName(currentUser.fullName);
    setSignUpEmail(currentUser.signUpEmail);
    setPhoneNumber(currentUser.phoneNumber);
    setUserBio(currentUser.userBio);
  }, [currentUser]);

  return (
    <div>
      <div className="formDiv">
        <div className="formInputTitle">Full Name</div>
        <input
          required
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Email</div>
        <input
          required
          type="text"
          value={signUpEmail}
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Phone Number</div>
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Password</div>
        <input
          required
          type="password"
          value={signUpPass}
          onChange={(e) => {
            setSignUpPass(e.target.value);
            setReSignUpPass(e.target.value);
          }}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Bio</div>
        <textarea
          type="text"
          value={userBio}
          onChange={(e) => {
            setUserBio(e.target.value);
          }}
        ></textarea>
      </div>

      <div>
        <button
          className="formButton"
          disabled={!signUpEmail || !signUpPass || !fullName || !phoneNumber}
          onClick={() => {
            handleUserUpdate();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
