import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();

    // ✅ Load only parcels that are paid and not_collected
    const { data: parcels = [], isLoading, isError, error } = useQuery({
        queryKey: ['paidUncollectedParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels', {
                params: {
                    paymentStatus: 'paid',
                    deliveryStatus: 'not_collected',
                },
            });
            return res.data;
        },
    });

    if (isLoading) return <p>Loading parcels...</p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Assign Rider</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Tracking ID</th>
                            <th>Type</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map(parcel => (
                            <tr key={parcel._id}>
                                <td>{parcel.tracking_id}</td>
                                <td>{parcel.type}</td>
                                <td>{parcel.senderName}</td>
                                <td>{parcel.receiverName}</td>
                                <td>{parcel.senderCenter}, {parcel.senderRegion}</td>
                                <td>{parcel.receiverCenter}, {parcel.receiverRegion}</td>
                                <td>
                                    <span className="bg-yellow-200 px-2 py-1 rounded text-xs">
                                        Not Collected
                                    </span>
                                </td>
                                <td>
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded">
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignRider;
