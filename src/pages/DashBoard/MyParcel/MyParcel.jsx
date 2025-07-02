import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels=[] } = useQuery({
        queryKey: ['my-parcel', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?emal=${user.email}`);
            return res.data
        }
    });

    console.log(parcels)
    return (
        <div>
            This  is my Parcel : {parcels.length}
        </div>
    );
};

export default MyParcel;