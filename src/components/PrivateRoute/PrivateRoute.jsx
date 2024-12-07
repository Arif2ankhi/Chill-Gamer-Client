import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading, isLoggedIn} = useContext(AuthContext)

   
        // const isLoggedIn = localStorage.getItem("authToken"); // Example: Use token to check if the user is logged in
        // return isLoggedIn ? children : <Navigate to="/login" />;
  
    

    if(loading){
        return <span className="loading loading-infinity loading-lg"></span>

    }
    
    if (user || isLoggedIn) {
        return children;
    }
    return (
        <Navigate to="/login"></Navigate>
    );

   
 
};

export default PrivateRoute;