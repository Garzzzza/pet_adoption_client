import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';




const PetForDashBoard = ({ pet }) => {

    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate("/pets/petsforadmin/" + pet.petId);
    };


    return (

        <tr className="PetForDashBoardRow" onClick={handleRowClick}>
            <td>{pet.type}</td>
            <td>{pet.name}</td>
            <td>{pet.adoptionStatus}</td>
            <td>{pet.picture}</td>
            <td>{pet.height}</td>
            <td>{pet.weight}</td>
            <td>{pet.color}</td>
            <td>{pet.bio}</td>
            <td>{pet.hypoallergenic}</td>
            <td>{pet.dietary}</td>
            <td>{pet.breed}</td>
        </tr>
    )
}

export default PetForDashBoard;
