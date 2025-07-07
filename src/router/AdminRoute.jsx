import React from 'react';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
     const { user, loading } = useAuth();
     const { role, isLoading } = useUserRole();

     if(loading || isLoading){
        return <span>loadin .........</span>
     }

     if(!user ||  role !== 'admin' ){
        return <Navigate to='/forbidden'></Navigate>
     }
    return children
};

export default AdminRoute;