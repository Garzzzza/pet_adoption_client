import React, { useEffect, useContext } from "react";
import { Pet } from "../Components/Pet";
import { PetContext } from "../Context/PetContext";
import { PetUserContext } from "../Context/PetUserContext";
import { SignContext } from "../Context/SignContext";
import { v4 as uuidv4 } from "uuid";

const MyPets = () => {
  const { petsArray, setPetsArray, getPetsArray } = useContext(PetContext);
  const { currentUser, getSignedUserById } = useContext(SignContext);

  const {
    savedPetsArray,
    setSavedPetsArray,
    getSavedPetsArray,
    addAdoptedPet,
    getAdoptedPetsArray,
    adoptedPetsArray,
    setAdoptedPetsArray,
    deleteAdoptedPet,
    renderSavedPetsForUser,
    renderAdoptedPetsForUser,
    fosteredPetsArray,
    setFosteredPetsArray,
    addFosteredPet,
    getFosteredPetsArray,
    deleteFosteredPet,
    renderFosteredPetsForUser,
  } = useContext(PetUserContext);

  // useEffect(() => {
  //   getSignedUserById();
  // }, []);
  useEffect(() => {
    async function fetchPets() {
      await getSavedPetsArray();
      await getAdoptedPetsArray();
      await getFosteredPetsArray();
    }
    fetchPets();
  }, []);

  return (
    <div>
      <div>
        <h1>My Saved Pets</h1>
        {!savedPetsArray.length && <div>You haven't saved any pets</div>}
        <div className="petsDiv">
          {savedPetsArray.length > 0 && renderSavedPetsForUser(currentUser)}
        </div>
      </div>

      <div>
        <h1>My Fostered Pets</h1>
        {!fosteredPetsArray.length && <div>You haven't adopted any pets</div>}
        <div className="petsDiv">
          {fosteredPetsArray.length > 0 &&
            renderFosteredPetsForUser(currentUser)}
        </div>
      </div>

      <div>
        <h1>My Adopted Pets</h1>
        {!adoptedPetsArray.length && <div>You haven't adopted any pets</div>}
        <div className="petsDiv">
          {adoptedPetsArray.length > 0 && renderAdoptedPetsForUser(currentUser)}
        </div>
      </div>
    </div>
  );
};

export default MyPets;
