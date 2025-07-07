import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user: currentUser } = useAuth();
    const [searchEmail, setSearchEmail] = useState('');
    const [queryEmail, setQueryEmail] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setQueryEmail(searchEmail.trim());
    };

    const { data: foundUsers = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['searchedUsers', queryEmail],
        enabled: !!queryEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/search?email=${queryEmail}`);
            return res.data;
        },
    });

    const handleToggleRole = async (email, currentRole) => {
        const isPromote = currentRole !== 'admin';
        const nextRole = isPromote ? 'admin' : 'user';

        Swal.fire({
            title: isPromote ? 'Make Admin?' : 'Remove Admin?',
            text: `Are you sure you want to ${isPromote ? 'make this user an admin' : 'remove admin role'}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isPromote ? '#3085d6' : '#d33',
            cancelButtonColor: '#999',
            confirmButtonText: isPromote ? 'Yes, make admin' : 'Yes, remove admin'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch('/make-admin', { email, role: nextRole });
                    Swal.fire('Success!', `User role updated to ${nextRole}.`, 'success');
                    refetch();
                } catch (err) {
                    Swal.fire('Error!', 'Failed to update user role.', 'error');
                }
            }
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Make Admin</h2>

            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    placeholder="Search by email (partial match)"
                    className="flex-grow border p-2 rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </form>

            {isLoading && <p>Loading users...</p>}
            {isError && <p className="text-red-500">Error: {error.message}</p>}

            {foundUsers.length > 0 ? (
                <table className="table w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foundUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{user.role || 'user'}</td>
                                <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</td>
                                <td>
                                    <button
                                        onClick={() => handleToggleRole(user.email, user.role)}
                                        className={`${user.role === 'admin' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                            } text-white px-3 py-1 rounded flex items-center gap-2`}
                                    >
                                        {user.role === 'admin' ? (
                                            <>
                                                <FaUserTimes />
                                                Remove Admin
                                            </>
                                        ) : (
                                            <>
                                                <FaUserShield />
                                                Make Admin
                                            </>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                queryEmail && <p className="text-gray-500">No users found.</p>
            )}
        </div>
    );
};

export default MakeAdmin;
