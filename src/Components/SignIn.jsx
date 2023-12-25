import React, { useContext } from "react"
import { SignContext } from "../Context/SignContext"


const SignIn = () => {

    const { signInEmail, setSignInEmail, signInPass, setSignInPass, handleSignIn,
        errorMessage, setErrorMessage, } = useContext(SignContext)


    return (
        <div>


            <div className="error">
                {errorMessage.data}
            </div>
            <div className="formDiv">
                <div className="formInputTitle">
                    Email
                </div>
                <input required type="text" value={signInEmail}
                    onChange={(e) => { setSignInEmail(e.target.value) }
                    }>
                </input>
            </div>

            <div className="formDiv">
                <div className="formInputTitle">
                    Password
                </div>
                <input required type="password" value={signInPass}
                    onChange={(e) => {
                        setSignInPass(e.target.value)
                    }}
                />
            </div>
            <div>
                <button className="formButton" onClick={handleSignIn}>
                    Sign In
                </button>
            </div>
        </div >



    )
}


export default SignIn