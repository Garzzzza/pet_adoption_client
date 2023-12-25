import React, { useEffect, useContext } from "react"
import { Pet } from "../Components/Pet"
import { PetContext } from "../Context/PetContext"

const PetsList = () => {

    const { petsArray, setPetsArray, getPetsArray } = useContext(PetContext)

    useEffect(() => {
        getPetsArray();

    }, [])

    function renderPets() {
        return petsArray.map((pet) => {
            return <Pet
                key={pet.petId}
                pet={pet}
            />
        })
    }


    return (
        <div>
            <h1>The Adoption Agency's Pets</h1>
            <div className="petsDiv">
                {renderPets()}
            </div>
        </div>
    )

}

export default PetsList
