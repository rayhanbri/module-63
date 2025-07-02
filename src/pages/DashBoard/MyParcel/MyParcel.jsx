import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcel', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data
        }
    });

    // console.log(parcels)

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // console.log(result.isConfirmed)
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        console.log(res.data.message)
                        if (res.data.message === 'Parcel deleted successfully') {
                            Swal.fire(
                                'Deleted!',
                                'Your parcel has been deleted.',
                                'success'
                            );
                            // Optionally, refetch your data here
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error!', 'Failed to delete parcel.', 'error');
                    });
            }
        });
    };


    const getStatusColor = (status) => {
        if (status === 'paid') return 'text-green-600 font-bold';
        if (status === 'unpaid') return 'text-red-600 font-bold';
        return 'text-gray-600';
    };

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th >Document Title</th>
                        <th>Document Type</th>
                        <th>Creation Date</th>
                        <th>Cost</th>
                        <th>Payment Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, idx) => (
                        <tr key={parcel._id}>
                            <td>{idx + 1}</td>
                            <td>{parcel.title}</td>
                            <td>{parcel.type}</td>
                            <td>{new Date(parcel.creation_date).toLocaleDateString()}</td>
                            <td>৳{parcel.cost}</td>
                            <td>
                                <span className={getStatusColor(parcel.paymentStatus)}>
                                    {parcel.paymentStatus}
                                </span>
                            </td>
                            <td>
                                <div className="flex gap-1">
                                    <button className="btn btn-xs btn-info">View</button>
                                    <button className="btn btn-xs btn-success">Payment</button>
                                    <button onClick={() => handleDelete(parcel._id)} className="btn btn-xs btn-error">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcel;