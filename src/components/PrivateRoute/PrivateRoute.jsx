import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading, isLoggedIn} = useContext(AuthContext)

    

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