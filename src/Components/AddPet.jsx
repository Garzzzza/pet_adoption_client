import React, { useContext } from "react"
import { PetContext } from "../Context/PetContext"



const AddPet = () => {

    const { postPet,
        petType, setPetType, petName, setPetName, petAdoptionStatus, setPetAdoptionStatus, petPicture, setPetPicture, petHeight, setPetHeight, petWeight, setPetWeight, petColor, setPetColor, petBio, setPetBio, petHypoallergenic, setPetHypoallergenic, petDietary, setPetDietary, petBreed, setPetBreed, petId, setPetId } = useContext(PetContext)

    return (
        <div>
            <div className="formClause">
                <div className="formInputTitle">
                    type:
                </div>
                <input required value={petType} onChange={(e) => { setPetType(e.target.value) }}>
                </input>
            </div>
            <div className="formClause">
                <div className="formInputTitle">
                    name:
                </div>
                <input required value={petName} onChange={(e) => { setPetName(e.target.value) }}>
                </input>
            </div>
            <div className="formClause">
                <div className="formInputTitle">
                    adoptionStatus:

                </div>
                <select
                    required
                    value={petAdoptionStatus}
                    onChange={(e) => { setPetAdoptionStatus(e.target.value) }}
                >
                    <option value="available">Available</option>
                    <option value="foster">Foster</option>

                    <option value="adopted">Adopted</option>
                </select>
            </div>
            <div className="formClause">
                <div className="formInputTitle">
                    picture:
                </div>
                <input required type="file" onChange={(e) => setPetPicture(e.target.files[0])}  >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    height:
                </div>
                <input required type="number" value={petHeight} onChange={(e) => { setPetHeight(e.target.value) }}  >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    weight:
                </div>
                <input required type="number" value={petWeight} onChange={(e) => { setPetWeight(e.target.value) }}  >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    color:
                </div>
                <input value={petColor} onChange={(e) => { setPetColor(e.target.value) }}   >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    bio:
                </div>
                <input value={petBio} onChange={(e) => { setPetBio(e.target.value) }}   >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    hypoallergenic:
                </div>
                <input value={petHypoallergenic} onChange={(e) => { setPetHypoallergenic(e.target.value) }}  >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    dietary:
                </div>
                <input value={petDietary} onChange={(e) => { setPetDietary(e.target.value) }}     >
                </input>
            </div>

            <div className="formClause">
                <div className="formInputTitle">
                    breed:
                </div>
                <input value={petBreed} onChange={(e) => { setPetBreed(e.target.value) }}    >
                </input>
            </div>


            <button
                disabled={!petType || !petName || !petAdoptionStatus || !petHeight || !petWeight || !petPicture}

                onClick={() => { postPet() }}
            >
                Add Pet
            </button>
        </div >)
}

export default AddPet