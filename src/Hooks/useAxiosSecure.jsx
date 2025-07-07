import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
    // ekhane  jeheto slash dei nai , tar mane use korar somoi slash dhibho 
})

const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate();
    // console.log(user.accessToken)
    // 1.jwt verification start here 
    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        //2 ekhon ei ta network tab e dhekhabhe 
        //3 now go to backend payment e jaw 
        return config
    }, error => {
        return Promise.reject(error);
    })

    //  axios interceptor 
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        console.log('req interceptor', error.status)
        const status = error.status;
        if (status === 403) {
            return navigate('/forbidden')
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                    navigate('/login')
                })
                .catch(()=>{})
                // eigula chech korte back end e verify admin e forcefully code change khore 
        }
        return Promise.reject(error)
    })



    return axiosSecure;
    // eibar eitare send parcel theke call khorbho 
};

export default useAxiosSecure;