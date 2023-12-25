import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { SignContext } from "../Context/SignContext";




const UserForDashBoard = ({ user }) => {

    const { getSomeUserById, currentUser,
        someUser, setSomeUser,
        fullName, setFullName,
        signUpEmail, setSignUpEmail,
        phoneNumber, setPhoneNumber,
        signUpPass, setSignUpPass,
        reSignUpPass, setReSignUpPass,
        isAdmin, setIsAdmin, toggleAdmin,
        handleUserUpdate,
        setRelevantSignUpStates,
    } = useContext(SignContext)

    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate("/users/userforadmin/" + user.userId);

    };



    return (
        <tr className="userRow">
            <td onClick={handleRowClick}>{user.userId}</td>
            <td onClick={handleRowClick}>{user.fullName}</td>
            <td onClick={handleRowClick}>{user.signUpEmail}</td>
            <td onClick={handleRowClick}>{user.phoneNumber}</td>
            <td>
                <button onClick={() => {
                    getSomeUserById(user.userId);
                    console.log(someUser);
                }}>
                    Admin Status
                </button>

                {Object.keys(someUser).length > 0 && someUser.userId === user.userId &&

                    <button onClick={() => {
                        toggleAdmin(someUser);
                    }}>
                        {someUser.isAdmin ? "Revoke Admin" : "Make Admin"}
                    </button>
                }

            </td>
        </tr>
    );

}

export default UserForDashBoard

