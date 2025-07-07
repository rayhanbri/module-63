import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Fetch all active riders
  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ['activeRiders', searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders/active', {
        params: { name: searchTerm },
      });
      return res.data;
    },
  });

  // ✅ Handle deactivate rider
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to deactivate this rider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/riders/${id}`, { status: 'inactive' });

        Swal.fire('Success', 'Rider deactivated!', 'success');
        refetch(); // Refresh table
      } catch (error) {
        Swal.fire('Error', 'Failed to deactivate rider.', 'error');
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading active riders...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* ✅ Search box */}
      <input
        type="text"
        placeholder="Search by name"
        className="mb-4 p-2 border w-full md:w-1/3 rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ✅ Riders Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Region</th>
              <th>District</th>
              <th>Age</th>
              <th>Bike Reg</th>
              <th>License</th>
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
                <td>{rider.bikeRegNumber}</td>
                <td>{rider.licenseNumber}</td>
                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {riders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No active riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
