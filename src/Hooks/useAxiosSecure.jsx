import axios from 'axios';
import React from 'react';


const axiosSecure = axios.create({
    baseURL:`http://localhost:3000`
    // ekhane  jeheto slash dei nai , tar mane use korar somoi slash dhibho 
})

const useAxiosSecure = () => {
    return axiosSecure;
    // eibar eitare send parcel theke call khorbho 
};

export default useAxiosSecure;