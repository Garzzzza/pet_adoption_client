import React, { useContext, useEffect } from "react";
import { SignContext } from "../Context/SignContext";

const Home = () => {
  const { currentUser, showSignInModal, token } = useContext(SignContext);

  return (
    <div>
      <div className="welcome">
        <div className="welcomeUser">
          <div>
            <h1>Welcome To The Pet Adoption Agency {currentUser.fullName}</h1>
          </div>
        </div>

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
