

import React, { useState, createContext, useContext } from "react"

import axios from "axios"
import { Pet } from "../Components/Pet";
import SpecificPetForAdmin from "../Pages/SpecificPetForAdmin";
import { PetContext } from "./PetContext";
import { SignContext } from "./SignContext"

const { v4: uuidv4 } = require('uuid');


const PetUserContext = createContext();

function PetUserContextProvider({ children }) {

    const { token, setToken, currentUser } = useContext(SignContext)
    const { petsArray, setPetsArray, getPetsArray, handlePetUpdate, theSpecificPet } = useContext(PetContext)

    const [savedPetsArray, setSavedPetsArray] = useState([])
    const [adoptedPetsArray, setAdoptedPetsArray] = useState([])
    const [fosteredPetsArray, setFosteredPetsArray] = useState([])



    async function addSavedPet(userId, petId) {

        try {
            const response = await axios.post
                (process.env.REACT_APP_SERVER_URL + "/savedpets/" + userId + "/" + petId,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray()

        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    async function getSavedPetsArray() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/savedpets",
                { headers: { Authorization: "Bearer " + token } }

            );
            setSavedPetsArray(response.data);

        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    const deleteSavedPet = async (userId, petId) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_SERVER_URL + "/savedpets/" + userId + "/" + petId,
                { headers: { Authorization: "Bearer " + token } }
            );
            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray();
        } catch (err) {
            console.log(err);
        }
    };


    async function addFosteredPet(userId, petId) {
        try {
            deleteSavedPet(userId, petId);


            const updatedPet = {
                adoptionStatus: "fostered",
            };

            const postResponse = await axios.post
                (process.env.REACT_APP_SERVER_URL + "/fosteredpets/" + userId + "/" + petId,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

            const putResponse = await axios.put(process.env.REACT_APP_SERVER_URL + "/pets/" + petId, updatedPet, {
                headers: { Authorization: "Bearer " + token },
            });

            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray();

        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    async function getFosteredPetsArray() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/fosteredpets",
                { headers: { Authorization: "Bearer " + token } }

            );
            setFosteredPetsArray(response.data);

        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    const deleteFosteredPet = async (userId, petId) => {
        try {
            deleteSavedPet(userId, petId);

            const updatedPet = {
                adoptionStatus: "available",
            };
            const putResponse = await axios.put(process.env.REACT_APP_SERVER_URL + "/pets/" + petId, updatedPet, {
                headers: { Authorization: "Bearer " + token },
            });

            const deleteResponse = await axios.delete(process.env.REACT_APP_SERVER_URL + "/fosteredpets/" + userId + "/" + petId,
                { headers: { Authorization: "Bearer " + token } }
            );

            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray();
        } catch (err) {
            console.log(err);
        }
    };




    async function addAdoptedPet(userId, petId) {
        try {
            deleteFosteredPet(null, petId);
            deleteSavedPet(null, petId);

            const updatedPet = {
                adoptionStatus: "adopted",
            };

            const postResponse = await axios.post
                (process.env.REACT_APP_SERVER_URL + "/adoptedpets/" + userId + "/" + petId,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

            const putResponse = await axios.put(process.env.REACT_APP_SERVER_URL + "/pets/" + petId, updatedPet, {
                headers: { Authorization: "Bearer " + token },
            });

            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray();

        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    async function getAdoptedPetsArray() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/adoptedpets",
                { headers: { Authorization: "Bearer " + token } }

            );
            setAdoptedPetsArray(response.data);
            getPetsArray();


        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    const deleteAdoptedPet = async (userId, petId) => {
        try {
            const updatedPet = {
                adoptionStatus: "available",
            };
            const putResponse = await axios.put(process.env.REACT_APP_SERVER_URL + "/pets/" + petId, updatedPet, {
                headers: { Authorization: "Bearer " + token },
            });

            const deleteResponse = await axios.delete(process.env.REACT_APP_SERVER_URL + "/adoptedpets/" + userId + "/" + petId,
                { headers: { Authorization: "Bearer " + token } }
            );

            getAdoptedPetsArray();
            getSavedPetsArray();
            getFosteredPetsArray();

        } catch (err) {
            console.log(err);
        }
    };

    function renderSavedPetsForUser(relevantUser) {
        return savedPetsArray.filter((pet) => pet.userId == relevantUser.userId)
            .map((pet) => {
                return <Pet
                    key={pet.petId}
                    pet={pet}
                />
            })
    }

    function renderFosteredPetsForUser(relevantUser) {
        return fosteredPetsArray.filter((pet) => pet.userId == relevantUser.userId)
            .map((pet) => {
                return <Pet
                    key={pet.petId}
                    pet={pet}
                />
            })
    }

    function renderAdoptedPetsForUser(relevantUser) {
        return adoptedPetsArray.filter((pet) => pet.userId == relevantUser.userId)
            .map((pet) => {
                return <Pet
                    key={pet.petId}
                    pet={pet}
                />
            })
    }

    return (
        < PetUserContext.Provider
            value={{
                addSavedPet, getSavedPetsArray,
                savedPetsArray, setSavedPetsArray,
                deleteSavedPet,
                addAdoptedPet, getAdoptedPetsArray, adoptedPetsArray, setAdoptedPetsArray, deleteAdoptedPet,
                fosteredPetsArray, setFosteredPetsArray, addFosteredPet, getFosteredPetsArray, deleteFosteredPet,
                renderSavedPetsForUser, renderAdoptedPetsForUser, renderFosteredPetsForUser,
            }}
        >
            {children}

        </PetUserContext.Provider>
    )

}
export default PetUserContextProvider
export { PetUserContext }
