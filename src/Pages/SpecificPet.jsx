import React, { useContext, useEffect } from "react";
import { Pet } from "../Components/Pet";
import PetsList from "../Pages/PetsList";
import { useParams } from "react-router-dom";
import { PetContext } from "../Context/PetContext";
import { PetUserContext } from "../Context/PetUserContext";
import { SignContext } from "../Context/SignContext";

function SpecificPet({ pet }) {
  const { getPetById, theSpecificPet, setTheSpecificPet } =
    useContext(PetContext);
  const { currentUser, getSignedUserById, token } = useContext(SignContext);

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

  const { petId } = useParams();

  useEffect(() => {
    getPetById(petId);
    getSignedUserById();
  }, [savedPetsArray, fosteredPetsArray, adoptedPetsArray]);

  useEffect(() => {
    if (token && currentUser && currentUser.userId) {
      async function fetchPets() {
        await getSavedPetsArray(currentUser.userId);
        await getAdoptedPetsArray(currentUser.userId);
        await getFosteredPetsArray(currentUser.userId);
      }
      fetchPets();
    }
  }, [currentUser]);

  const savedPet = savedPetsArray.some(
    (savedPet) => savedPet.petId == theSpecificPet.petId
  );

  const savedPetByUser = savedPetsArray.some((savedPet) => {
    return (
      savedPet.petId == theSpecificPet.petId &&
      savedPet.userId == currentUser.userId
    );
  });

  const fosteredPet = fosteredPetsArray.some(
    (fosteredPet) => fosteredPet.petId == theSpecificPet.petId
  );

  const fosteredPetByUser = fosteredPetsArray.some((fosteredPet) => {
    return (
      fosteredPet.petId == theSpecificPet.petId &&
      fosteredPet.userId == currentUser.userId
    );
  });

  const adoptedPet = adoptedPetsArray.some(
    (adoptedPet) => adoptedPet.petId == theSpecificPet.petId
  );

  const adoptedPetByUser = adoptedPetsArray.some((adoptedPet) => {
    return (
      adoptedPet.petId == theSpecificPet.petId &&
      adoptedPet.userId == currentUser.userId
    );
  });

  return (
    <div className="petDiv">
      <div className="petCharacteristic">
        <img src={theSpecificPet.picture} />
      </div>

      <div className="petCharacteristic">type: {theSpecificPet.type}</div>
      <div className="petCharacteristic">name: {theSpecificPet.name}</div>
      <div className="petCharacteristic">
        adoptionStatus: {theSpecificPet.adoptionStatus}
      </div>

      <div className="petCharacteristic">height: {theSpecificPet.height}</div>
      <div className="petCharacteristic">weight: {theSpecificPet.weight}</div>
      <div className="petCharacteristic">color: {theSpecificPet.color}</div>
      <div className="petCharacteristic">bio: {theSpecificPet.bio}</div>
      <div className="petCharacteristic">
        hypoallergenic: {theSpecificPet.hypoallergenic}
      </div>
      <div className="petCharacteristic">dietary: {theSpecificPet.dietary}</div>
      <div className="petCharacteristic">breed: {theSpecificPet.breed}</div>
      {token && !savedPetByUser && !adoptedPet && (
        <button
          onClick={() => {
            addSavedPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          Save
        </button>
      )}

      {token && savedPetByUser && !adoptedPet && (
        <button
          onClick={() => {
            deleteSavedPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          UnSave
        </button>
      )}

      {token && !fosteredPet && !adoptedPet && (
        <button
          onClick={() => {
            addFosteredPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          Foster
        </button>
      )}

      {token && fosteredPetByUser && !adoptedPet && (
        <button
          onClick={() => {
            deleteFosteredPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          UnFoster
        </button>
      )}

      {token && !adoptedPet && (
        <button
          onClick={() => {
            addAdoptedPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          Adopt
        </button>
      )}
      {token && adoptedPetByUser && (
        <button
          onClick={() => {
            deleteAdoptedPet(currentUser.userId, theSpecificPet.petId);
          }}
        >
          Return
        </button>
      )}
    </div>
  );
}

export { SpecificPet };
