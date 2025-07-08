import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);

    // Load parcels that are paid and not collected
    const { data: parcels = [], isLoading: loadingParcels, error: parcelError, refetch: refetchParcels } = useQuery({
        queryKey: ['paidUncollectedParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels', {
                params: {
                    paymentStatus: 'paid',
                    deliveryStatus: 'not_collected'
                }
            });
            return res.data;
        }
    });

    // Fetch approved riders for the selected parcel's district
    const { data: riders = [], isLoading: loadingRiders } = useQuery({
        queryKey: ['approvedRiders', selectedParcel?.senderCenter],
        enabled: !!selectedParcel?.senderCenter,
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active', {
                params: { district: selectedParcel.senderCenter }
            });
            return res.data;
        }
    });

    // console.log(riders)

    const handleAssignRider = async (riderId, riderEmail) => {
        try {
            await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, {
                riderId,
                riderEmail,
            });

            Swal.fire('Assigned!', 'Rider assigned to parcel.', 'success');
            setSelectedParcel(null); // Close modal
            refetchParcels(); // Refresh list
        } catch (err) {
            console.log(err)
            Swal.fire('Error!', 'Failed to assign rider.', 'error');
        }
    };

    if (loadingParcels) return <p>Loading parcels...</p>;
    if (parcelError) return <p className="text-red-500">Error: {parcelError.message}</p>;

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
                                    <button
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => setSelectedParcel(parcel)}
                                    >
                                        Assign
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl relative">
                        <h3 className="text-xl font-semibold mb-4">Select Rider for Parcel: {selectedParcel.tracking_id}</h3>
                        <button
                            className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
                            onClick={() => setSelectedParcel(null)}
                        >
                            &times;
                        </button>

                        {loadingRiders ? (
                            <p>Loading riders...</p>
                        ) : (
                            <table className="table w-full border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>District</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riders.length > 0 ? (
                                        riders.map(rider => (
                                            <tr key={rider._id}>
                                                <td>{rider.name}</td>
                                                <td>{rider.email}</td>
                                                <td>{rider.district}</td>
                                                <td>
                                                    <button
                                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                                        onClick={() => handleAssignRider(rider._id, rider.email)}
                                                    >
                                                        Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                                No matching riders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
