import React, { useState, createContext, useContext } from "react"
import { SignContext } from "./SignContext"
import { Pet } from "../Components/Pet";
import axios from "axios"
import SpecificPetForAdmin from "../Pages/SpecificPetForAdmin";
const { v4: uuidv4 } = require('uuid');


const PetContext = createContext();

function PetContextProvider({ children }) {

    const [petsArray, setPetsArray] = useState([])
    const [theSpecificPet, setTheSpecificPet] = useState({})

    const [petType, setPetType] = useState("")
    const [petName, setPetName] = useState("")
    const [petAdoptionStatus, setPetAdoptionStatus] = useState("Available")
    const [petPicture, setPetPicture] = useState(null)
    const [petHeight, setPetHeight] = useState(0)
    const [petWeight, setPetWeight] = useState(0)
    const [petColor, setPetColor] = useState("")
    const [petBio, setPetBio] = useState("")
    const [petHypoallergenic, setPetHypoallergenic] = useState(0)
    const [petDietary, setPetDietary] = useState("")
    const [petBreed, setPetBreed] = useState("")
    const [petId, setPetId] = useState("")

    const { token, setToken } = useContext(SignContext)

    function resetPetStates() {

        setPetType(""); setPetName(""); setPetAdoptionStatus("available"); setPetHeight(0); setPetWeight(0); setPetColor(""); setPetBio(""); setPetHypoallergenic(0); setPetDietary(""); setPetBreed(""); setPetPicture(null);
    }

    async function getPetsArray() {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/pets",
                { headers: { Authorization: "Bearer " + token } }

            )
            setPetsArray(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }


    const onSearch = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_SERVER_URL + "/pets?type=" + petType + "&name=" + petName + "&adoptionStatus=" + petAdoptionStatus + "&height=" + petHeight + "&weight=" + petWeight,
                { headers: { Authorization: "Bearer " + token } }
            );
            console.log(response.data);
            setSearchResultsArray(response.data);
            resetPetStates();

        } catch (error) {
            console.log('Error:', error);
        }
    };

    function renderSearchResults() {
        return searchResultsArray.map((result) => {
            return <Pet
                key={result.petId}
                pet={result}
            />
        })
    }
    const [searchResultsArray, setSearchResultsArray] = useState([])


    const getPetById = async (petId) => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/pets/" + petId,
                { headers: { Authorization: "Bearer " + token } }
            );
            setTheSpecificPet(response.data)
            return response.data;
        }
        catch (error) {
            console.log(error)
        }
    }


    async function postPet() {
        try {

            const petToAdd = new FormData()
            petToAdd.append("type", petType)
            petToAdd.append("name", petName)
            petToAdd.append("adoptionStatus", petAdoptionStatus)
            petToAdd.append("picture", petPicture)
            petToAdd.append("height", petHeight)
            petToAdd.append("weight", petWeight)
            petToAdd.append("color", petColor)
            petToAdd.append("bio", petBio)
            petToAdd.append("hypoallergenic", petHypoallergenic)
            petToAdd.append("dietary", petDietary)
            petToAdd.append("breed", petBreed)

            await axios.post(process.env.REACT_APP_SERVER_URL + "/pets/", petToAdd,
                { headers: { Authorization: "Bearer " + token } }
            );

            await getPetsArray();
            resetPetStates()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handlePetUpdate = async () => {
        try {
            const updatedPet = new FormData()


            updatedPet.append("type", petType)
            updatedPet.append("name", petName)
            updatedPet.append("adoptionStatus", petAdoptionStatus)
            updatedPet.append("picture", petPicture)
            updatedPet.append("height", petHeight)
            updatedPet.append("weight", petWeight)
            updatedPet.append("color", petColor)
            updatedPet.append("bio", petBio)
            updatedPet.append("hypoallergenic", petHypoallergenic)
            updatedPet.append("dietary", petDietary)
            updatedPet.append("breed", petBreed)

            await axios.put(process.env.REACT_APP_SERVER_URL + "/pets/" + theSpecificPet.petId,

                updatedPet, {

                headers: { Authorization: "Bearer " + token },

            });

            getPetById(theSpecificPet.petId)

            resetPetStates()

        } catch (err) {
            console.log(err);
        }
    };

    const deletePet = async (petId) => {
        try {
            const res = await axios.delete(process.env.REACT_APP_SERVER_URL + "/pets/" + { petId },
                { headers: { Authorization: "Bearer " + token } }
            );
            if (res.data.ok) {
                const deletedArray = petsArray.filter((pet) => pet.id != petId);
                setPetsArray(deletedArray);
            }
        } catch (err) {
            console.log(err);
        }
    };



    return (
        < PetContext.Provider
            value={{
                petsArray, setPetsArray, getPetsArray, getPetById, postPet,
                theSpecificPet, setTheSpecificPet,
                petType, setPetType, petName, setPetName, petAdoptionStatus, setPetAdoptionStatus, petPicture, setPetPicture, petHeight, setPetHeight, petWeight, setPetWeight, petColor, setPetColor, petBio, setPetBio, petHypoallergenic, setPetHypoallergenic, petDietary, setPetDietary, petBreed, setPetBreed, petId, setPetId,
                handlePetUpdate, resetPetStates,
                onSearch, searchResultsArray, setSearchResultsArray, renderSearchResults,


            }}
        >
            {children}

        </PetContext.Provider>
    )

}
export default PetContextProvider
export { PetContext }
