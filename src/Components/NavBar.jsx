import React, { useContext, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import Modal from "./Modal"
import SignUp from "./SignUp"


import SignIn from "./SignIn"
import { SignContext } from "../Context/SignContext"

const NavBar = () => {
    const { handleLogOut, token, getSignedUserById, currentUser, showSignUpModal, setShowSignUpModal, showSignInModal, setShowSignInModal, } = useContext(SignContext)

    useEffect((

    ) => { getSignedUserById() }, [])

    const location = useLocation();
    const currentPath = location.pathname;

    const getClassName = (path) => {
        return currentPath === path ? "PageTab active" : "PageTab";
    }


    return (
        <div className='NavBar'>

            {!token &&

                <div className="PageTab" onClick={() => setShowSignUpModal(true)}>
                    Sign Up
                </div>
            }
            {!token && showSignUpModal && <Modal onClose={() => setShowSignUpModal(false)}>
                <SignUp />
            </Modal>
            }

            {!token &&
                <div className="PageTab" onClick={() => setShowSignInModal(true)}>
                    Sign In
                </div>
            }
            {!token && showSignInModal &&
                <Modal onClose={() => setShowSignInModal(false)}>
                    <SignIn />
                </Modal>

            }

            {
                token &&
                <Link className={getClassName('/')} to='/'>Home</Link>

            }
            {
                token &&
                <Link className={getClassName('/profile')} to='/profile'>Profile</Link>

            }




            {
                token &&
                <Link className={getClassName('/pets')} to='/pets'>Pets</Link>

            }
            {
                token &&
                <Link className={getClassName('/mypets')} to='/mypets'>My Pets  </Link>

            }
            <Link className={getClassName('/search')} to='/search'>Search</Link>
            {
                token && currentUser.isAdmin === 1 &&
                <Link className={getClassName('/admin')} to='/admin'>Admin</Link>
            }
            {
                token &&
                <div className="PageTab" onClick={handleLogOut}>  LogOut</div>

            }

        </div >
    )
}

export default NavBar