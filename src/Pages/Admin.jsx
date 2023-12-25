import React, { useContext } from "react"
import { PetContext } from "../Context/PetContext"
import AddPet from "../Components/AddPet"
import DashBoard from "../Components/DashBoard"

function Admin() {

    const { } = useContext(PetContext)

    return (
        <div>

            <AddPet />
            <DashBoard />
        </div>

    )


}


export { Admin }
