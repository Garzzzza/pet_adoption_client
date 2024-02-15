import React, { useContext, useEffect } from "react";
import { SignContext } from "../Context/SignContext";

const Home = () => {
  const { getSignedUserById, currentUser, showSignInModal, token } =
    useContext(SignContext);

  return (
    <div>
      <div className="welcome">
        <div className="welcomeUser">
          <h1>Welcome To The Pet Adoption Agency {currentUser.fullName}</h1>

          {currentUser.picture && (
            <div className="profilePic">
              <img src={currentUser.picture} />
            </div>
          )}
        </div>

        <h2>In this site you can adopt pets.</h2>
        <div className="sitePic">
          <img
            className="sitePic"
            src="https://d1g9yur4m4naub.cloudfront.net/images/Article_Images/ImageForArticle_714_16449362895935733.jpg"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Home;
