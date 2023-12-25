
import React, { useEffect, useContext } from "react"
import { SignContext } from "../Context/SignContext"
import { PetContext } from "../Context/PetContext"
import UserForDashBoard from "./UserForDashBoard"
import PetForDashBoard from "./PetForDashBoard"

const DashBoard = () => {

    const { usersArray, getUsersArray, } = useContext(SignContext)
    const { setPetsArray, petsArray, getPetsArray } = useContext(PetContext)

    useEffect(() => {
        getUsersArray();
        getPetsArray();

    }, [])

    function renderUsers() {
        return usersArray.map((user) => {
            return <UserForDashBoard
                key={user.userId}
                user={user}
            />
        })
    }

    function renderPets() {
        return petsArray.map((pet) => {
            return <PetForDashBoard
                key={pet.petId}
                pet={pet}
            />
        })
    }

    return (
        <div>


            <table className="usersTable">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th> Admin Status</th>
                    </tr>
                </thead>
                <tbody>
                    {petsArray && renderUsers()}
                </tbody>
            </table>

            <table className="petsTable">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Adoption Status</th>
                        <th>Picture</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Color</th>
                        <th>Bio</th>
                        <th>Hypoallergenic</th>
                        <th>Dietary Restrictions</th>
                        <th>Breed</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPets()}
                </tbody>
            </table>
        </div>
    );


}


export default DashBoard
