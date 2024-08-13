import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SignContext } from "../Context/SignContext";
import { PetUserContext } from "../Context/PetUserContext";

const SpecificUserForAdmin = () => {
  const { getSomeUserById, someUser, setSomeUser } = useContext(SignContext);
  const {
    savedPetsArray,
    adoptedPetsArray,
    getSavedPetsArray,
    getAdoptedPetsArray,
    renderAdoptedPetsForUser,
    renderSavedPetsForUser,
  } = useContext(PetUserContext);

  const { userId } = useParams();

  useEffect(() => {
    getSomeUserById(userId);
  }, [userId]);

  useEffect(() => {
    async function fetchPets() {
      await getSavedPetsArray();
      await getAdoptedPetsArray();
    }
    fetchPets();
  }, []);

  return (
    <div className="specificUserForAdminWrapperDiv">
      <div className="specificUserForAdminCharacteristicDiv">
        <div className="">user ID:</div>
        <div>{someUser.userId}</div>
      </div>

      <div className="specificUserForAdminCharacteristicDiv">
        <div className="">Full Name:</div>
        <div>{someUser.fullName}</div>
      </div>

      <div className="specificUserForAdminCharacteristicDiv">
        <div className="">Email:</div>
        <div>{someUser.signUpEmail}</div>
      </div>

      <div className="specificUserForAdminCharacteristicDiv">
        <div className="">Admin :</div>
        <div>{someUser.isAdmin ? "Yes" : "No"}</div>
      </div>

      <div>
        <div>
          <h1> Adopted Pets</h1>
          {!adoptedPetsArray.length && <div>User haven't adopted any pets</div>}
          <div className="petsDiv">
            {adoptedPetsArray.length > 0 && renderAdoptedPetsForUser(someUser)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificUserForAdmin;
