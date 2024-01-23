import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SignContext } from "../Context/SignContext";
import { PetContext } from "../Context/PetContext";
import { PetUserContext } from "../Context/PetUserContext";
import { SpecificPet } from "../Pages/SpecificPet";

function Pet({ pet }) {
  const { currentUser, getSignedUserById, token } = useContext(SignContext);
  const { handlePetUpdate, getPetById, theSpecificPet } =
    useContext(PetContext);
  const {
    addSavedPet,
    deleteSavedPet,
    savedPetsArray,
    setSavedPetsArray,
    getSavedPetsArray,
    addAdoptedPet,
    getAdoptedPetsArray,
    adoptedPetsArray,
    setAdoptedPetsArray,
    deleteAdoptedPet,
    fosteredPetsArray,
    setFosteredPetsArray,
    addFosteredPet,
    getFosteredPetsArray,
    deleteFosteredPet,
  } = useContext(PetUserContext);

  useEffect(() => {
    getSignedUserById();
  }, []);

  useEffect(() => {
    async function fetchPets() {
      await getSavedPetsArray();
      await getAdoptedPetsArray();
      await getFosteredPetsArray();
    }
    fetchPets();
  }, [currentUser]);

  const savedPet = savedPetsArray.some(
    (savedPet) => savedPet.petId == pet.petId
  );

  const savedPetByUser = savedPetsArray.some((savedPet) => {
    return savedPet.petId == pet.petId && savedPet.userId == currentUser.userId;
  });

  const fosteredPet = fosteredPetsArray.some(
    (fosteredPet) => fosteredPet.petId == pet.petId
  );

  const fosteredPetByUser = fosteredPetsArray.some((fosteredPet) => {
    return (
      fosteredPet.petId == pet.petId && fosteredPet.userId == currentUser.userId
    );
  });

  const adoptedPet = adoptedPetsArray.some(
    (adoptedPet) => adoptedPet.petId == pet.petId
  );

  const adoptedPetByUser = adoptedPetsArray.some((adoptedPet) => {
    return (
      adoptedPet.petId == pet.petId && adoptedPet.userId == currentUser.userId
    );
  });

  return (
    <div className="petDiv">
      <Link to={"/pets/" + pet.petId}>
        <div className="petCharacteristic">
          <img src={pet.picture} />
        </div>
        <div className="petCharacteristic">Name: {pet.name}</div>
        <div className="petCharacteristic">
          Adoption Status: {pet.adoptionStatus}
        </div>
      </Link>
      <div className="petCharacteristic">
        {token && !savedPetByUser && !adoptedPet && !fosteredPet && (
          <button
            onClick={() => {
              addSavedPet(currentUser.userId, pet.petId);
            }}
          >
            Save
          </button>
        )}

        {token && savedPetByUser && !adoptedPet && (
          <button
            onClick={() => {
              deleteSavedPet(currentUser.userId, pet.petId);
            }}
          >
            UnSave
          </button>
        )}

        {token && !fosteredPet && !adoptedPet && (
          <button
            onClick={() => {
              addFosteredPet(currentUser.userId, pet.petId);
            }}
          >
            Foster
          </button>
        )}

        {token && fosteredPetByUser && !adoptedPet && (
          <button
            onClick={() => {
              deleteFosteredPet(currentUser.userId, pet.petId);
            }}
          >
            UnFoster
          </button>
        )}

        {token && !adoptedPet && (
          <button
            onClick={() => {
              addAdoptedPet(currentUser.userId, pet.petId);
            }}
          >
            Adopt
          </button>
        )}
        {token && adoptedPetByUser && (
          <button
            onClick={() => {
              deleteAdoptedPet(currentUser.userId, pet.petId);
            }}
          >
            Return
          </button>
        )}
      </div>
    </div>
  );
}

export { Pet };
