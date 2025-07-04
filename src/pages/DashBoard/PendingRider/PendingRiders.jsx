import React, { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

// const dummyRiders = [
//     {
//         _id: '1',
//         name: 'John Doe',
//         email: 'john@example.com',
//         region: 'Dhaka',
//         district: 'Gazipur',
//         age: 25,
//         nid: '1234567890',
//         bikeRegNumber: 'DHA-12345',
//         licenseNumber: 'DL-9999',
//     },
//     // Add more dummy riders if needed
// ];

const PendingRiders = () => {
    // const [riders, setRiders] = useState([]);
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxios();


    // Use React Query to fetch pending riders
    const { data: riders = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['pendingRiders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/pendingRiders')
            return (res.data)
        }
    })

    if (isLoading) return <p>Loading pending riders...</p>;
    if (isError) return <p>Error: {error.message}</p>;


    const handleApprove = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to approve this rider?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // API call to update status
                    await axiosSecure.patch(`/riders/${id}`, { status: 'approved' });

                    Swal.fire(
                        'Approved!',
                        'The rider has been approved.',
                        'success'
                    );

                    // Refetch data to update UI
                    refetch();
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Failed to approve the rider.',
                        'error'
                    );
                }
            }
        });
    };

    const handleCancel = (id) => {
        console.log('Cancelled rider:', id);
        
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Region</th>
                            <th>District</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.region}</td>
                                <td>{rider.district}</td>
                                <td>{rider.age}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleApprove(rider._id)}
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleCancel(rider._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rider Details Modal */}
            {selectedRider && (
                <div className="fixed inset-0 flex items-center justify-center z-50"
                    style={{
                        backgroundColor: 'rgb(234, 250, 250)', // softer black with 50% opacity
                        backdropFilter: 'blur(4px)',          // subtle blur behind modal
                        WebkitBackdropFilter: 'blur(4px)',   // Safari support
                        transition: 'background-color 0.3s ease', // smooth fade
                    }}>
                    <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl"
                            onClick={() => setSelectedRider(null)}
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Rider Details</h3>
                        <p><strong>Name:</strong> {selectedRider.name}</p>
                        <p><strong>Email:</strong> {selectedRider.email}</p>
                        <p><strong>Region:</strong> {selectedRider.region}</p>
                        <p><strong>District:</strong> {selectedRider.district}</p>
                        <p><strong>Age:</strong> {selectedRider.age}</p>
                        <p><strong>NID:</strong> {selectedRider.nid}</p>
                        <p><strong>Bike Reg:</strong> {selectedRider.bikeRegNumber}</p>
                        <p><strong>License:</strong> {selectedRider.licenseNumber}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
