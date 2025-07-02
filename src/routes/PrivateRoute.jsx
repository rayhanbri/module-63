import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    // console.log(location.pathname)
    const from = location.pathname
    if(loading){
        return <span className="loading loading-dots loading-2xl"></span>;
    }
    if(!user){
        return <Navigate state={from} to='/login'></Navigate>
        // lest's go to log in page 
    }
    return children;
};

export default PrivateRoute;