import React, { useContext } from "react";
import { SignContext } from "../Context/SignContext";

const SignUp = () => {
  const {
    setSignUpEmail,
    signUpEmail,
    signUpPass,
    setSignUpPass,
    fullName,
    setFullName,

    handleSignUp,
    reSignUpPass,
    setReSignUpPass,
    picture,
    setPicture,
    errorMessage,
    setErrorMessage,
  } = useContext(SignContext);

  return (
    <div>
      <div className="error">{errorMessage.data}</div>
      <div className="formDiv">
        <div className="formInputTitle">Full Name</div>
        <input
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
          type="text"
          value={signUpEmail}
          onChange={(e) => {
            setSignUpEmail(e.target.value);
          }}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Picture</div>
        <input
          required
          type="file"
          onChange={(e) => setPicture(e.target.files[0])}
        ></input>
      </div>

      <div className="formDiv">
        <div className="formInputTitle">Password</div>
        <input
          type="password"
          value={signUpPass}
          onChange={(e) => {
            setSignUpPass(e.target.value);
          }}
        ></input>
      </div>
      <div className="formDiv">
        <div className="formInputTitle">RePassword</div>
        <input
          type="password"
          value={reSignUpPass}
          onChange={(e) => {
            setReSignUpPass(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button className="formButton" onClick={handleSignUp}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default SignUp;
