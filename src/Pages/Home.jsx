import React, { useContext, useEffect } from "react";
import { SignContext } from "../Context/SignContext";

const Home = () => {
  const { getSignedUserById, currentUser, showSignInModal } =
    useContext(SignContext);

  useEffect(() => {
    getSignedUserById();
    console.log(currentUser);
  }, [showSignInModal]);

  return (
    <div>
      <div className="welcome">
        Welcome To The Pet Adoption Agency {currentUser.fullName}
      </div>
      <div className="welcomeText">In this site you can adopt pets.</div>
      <div className="homePic">
        <img
          className="homePic"
          src="https://d1g9yur4m4naub.cloudfront.net/images/Article_Images/ImageForArticle_714_16449362895935733.jpg"
        ></img>
      </div>
    </div>
  );
};

export default Home;
