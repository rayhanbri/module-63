import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL:`http://localhost:3000`
    // ekhane  jeheto slash dei nai , tar mane use korar somoi slash dhibho 
})

const useAxiosSecure = () => {
    const {user} = useAuth()
    console.log(user.accessToken)
     // 1.jwt verification start here 
    axiosSecure.interceptors.request.use(config =>{
        config.headers.Authorization =`Bearer ${user.accessToken}`
        //2 ekhon ei ta network tab e dhekhabhe 
        //3 now go to backend payment e jaw 
        return config
    },error =>{
           return Promise.reject(error);
    })
    return axiosSecure;
    // eibar eitare send parcel theke call khorbho 
};

export default useAxiosSecure;