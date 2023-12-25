import { useContext } from 'react'
import { SignContext } from "../Context/SignContext"
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { token } = useContext(SignContext)
    return (
        <div>{token ? children : <Navigate to='/' />}</div>
    )
}

export default PrivateRoute