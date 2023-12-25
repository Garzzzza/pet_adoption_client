
import React, { useContext, useEffect } from "react"
import { Pet } from "../Components/Pet"
import PetsList from "../Pages/PetsList"
import { useParams } from "react-router-dom"
import { PetContext } from "../Context/PetContext"
import { SpecificPet } from './SpecificPet'

function SpecificPetForAdmin({ pet }) {
    const { petsArray, setPetsArray, getPetsArray, getPetById, postPet,
        theSpecificPet, setTheSpecificPet,
        petType, setPetType, petName, setPetName, petAdoptionStatus, setPetAdoptionStatus, petPicture, setPetPicture, petHeight, setPetHeight, petWeight, setPetWeight, petColor, setPetColor, petBio, setPetBio, petHypoallergenic, setPetHypoallergenic, petDietary, setPetDietary, petBreed, setPetBreed, setPetId,
        getPetForAdminById, handlePetUpdate } = useContext(PetContext)

    const { petId } = useParams();

    useEffect(() => {
        getPetById(petId)
    }, [petId])


    return (
        <div>

            <div className="formDiv">
                <div className="formInputTitle">
                    type:
                </div>
                <input placeholder={theSpecificPet.type} type="text" value={petType}
                    onChange={
                        (e) => {
                            setPetType(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    name
                </div>
                <input placeholder={theSpecificPet.name} type="text" value={petName}
                    onChange={
                        (e) => {
                            setPetName(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    adoptionStatus
                </div>
                <select
                    required
                    value={petAdoptionStatus}
                    placeholder={theSpecificPet.adoptionStatus}
                    onChange={(e) => { setPetAdoptionStatus(e.target.value) }}
                >
                    <option value="available">Available</option>
                    <option value="foster">Foster</option>
                    <option value="adopted">Adopted</option>
                </select>

            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    picture:
                </div>
                <input required type="file" onChange={(e) => setPetPicture(e.target.files[0])}  >
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    height:
                </div>
                <input placeholder={theSpecificPet.height} type="number" value={petHeight}
                    onChange={
                        (e) => {
                            setPetHeight(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    weight:
                </div>
                <input placeholder={theSpecificPet.weight} type="number" value={petWeight}
                    onChange={
                        (e) => {
                            setPetWeight(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    color:
                </div>
                <input placeholder={theSpecificPet.color} type="number" value={petColor}
                    onChange={
                        (e) => {
                            setPetColor(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    bio
                </div>
                <input placeholder={theSpecificPet.bio} type="text" value={petBio}
                    onChange={
                        (e) => {
                            setPetBio(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    hypoallergenic:
                </div>
                <input placeholder={theSpecificPet.hypoallergenic} type="number" value={petHypoallergenic}
                    onChange={
                        (e) => {
                            setPetHypoallergenic(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    dietary
                </div>
                <input placeholder={theSpecificPet.petDietary} type="text" value={petDietary}
                    onChange={
                        (e) => {
                            setPetDietary(e.target.value)
                        }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    breed
                </div>
                <input placeholder={theSpecificPet.petBreed} type="number" value={petBreed}
                    onChange={
                        (e) => {
                            setPetBreed(e.target.value)
                        }
                    }>
                </input>
            </div>


            <div>
                <button className="formButton" onClick={handlePetUpdate} >
                    Save
                </button>
            </div>
        </div>
    )
}


export default SpecificPetForAdmin;