import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SignContext } from "../Context/SignContext";

const UserForDashBoard = ({ user }) => {
  const {
    getSomeUserById,
    currentUser,
    someUser,

    toggleAdmin,
  } = useContext(SignContext);

  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate("/users/userforadmin/" + user.userId);
  };

  return (
    <tr className="userRow">
      <td onClick={handleRowClick}>{user.userId}</td>
      <td onClick={handleRowClick}>{user.fullName}</td>
      <td onClick={handleRowClick}>{user.signUpEmail}</td>
      <td>
        <button
          onClick={() => {
            getSomeUserById(user.userId);
          }}
        >
          Admin Status
        </button>

        {Object.keys(someUser).length > 0 &&
          someUser.userId === user.userId && (
            <button
              onClick={() => {
                toggleAdmin(someUser);
              }}
            >
              {someUser.isAdmin ? "Revoke Admin" : "Make Admin"}
            </button>
          )}
      </td>
    </tr>
  );
};

export default UserForDashBoard;
