import React, { useContext, useEffect } from "react";
import { SignContext } from "../Context/SignContext";

const Profile = () => {
  const {
    setSignUpEmail,
    signUpEmail,

    fullName,
    setFullName,

    picture,
    setPicture,

    handleUserUpdate,
    currentUser,
    userBio,
    setUserBio,
  } = useContext(SignContext);

  useEffect(() => {
    setFullName(currentUser.fullName);
    setSignUpEmail(currentUser.signUpEmail);

    setUserBio(currentUser.userBio);
    setPicture(currentUser.picture);
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

      {/* <div className="formDiv">
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
      </div> */}

      <div className="formDiv">
        <div className="formInputTitle">Picture</div>
        <div className="profilePic">
          {currentUser.picture && <img src={currentUser.picture} />}
          <input
            required
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
          ></input>
        </div>
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
          disabled={!signUpEmail || !fullName}
          onClick={handleUserUpdate}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Profile;
