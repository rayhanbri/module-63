import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

// const serviceCenters = [
//     { region: 'Dhaka', district: 'Gazipur' },
//     { region: 'Dhaka', district: 'Narsingdi' },
//     { region: 'Chattogram', district: 'Comilla' },
//     { region: 'Chattogram', district: 'Cox\'s Bazar' },
//     { region: 'Khulna', district: 'Jessore' },
//     { region: 'Khulna', district: 'Khulna' },
// ];

const BeARider = () => {
    const { user } = useAuth();
    const serviceCenters = useLoaderData();
    const axiosSecure = useAxios();
    // console.log(serviceCenters)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [selectedRegion, setSelectedRegion] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            status: 'pending',
            appliedAt: new Date().toISOString(),
        };
        axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Application Submitted!',
                        text: 'Your rider request is under review.',
                        icon: 'success',
                        timer: 2000, // 🔥 2 seconds
                        showConfirmButton: false,
                        timerProgressBar: true,
                    });
                }
            })
        console.log("Submitting rider application:", riderData);

        // reset();
    };

    useEffect(() => {
        const districts = serviceCenters
            .filter((s) => s.region === selectedRegion)
            .map((s) => s.district);
        setFilteredDistricts([...new Set(districts)]);
    }, [serviceCenters, selectedRegion]);

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">Apply to Be a Rider</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                        {...register('name')}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                        {...register('email')}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Region</label>
                    <select
                        className="w-full border p-2 rounded"
                        {...register('region', { required: 'Region is required' })}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">Select Region</option>
                        {[...new Set(serviceCenters.map((s) => s.region))].map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    {errors.region && <p className="text-red-600 text-sm">{errors.region.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">District</label>
                    <select
                        className="w-full border p-2 rounded"
                        {...register('district', { required: 'District is required' })}
                    >
                        <option value="">Select District</option>
                        {filteredDistricts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    {errors.district && <p className="text-red-600 text-sm">{errors.district.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Age</label>
                    <input
                        type="number"
                        {...register('age', {
                            required: 'Age is required',
                            min: { value: 18, message: 'You must be at least 18 years old' }
                        })}
                        className="w-full border p-2 rounded"
                        placeholder="Your age"
                    />
                    {errors.age && <p className="text-red-600 text-sm">{errors.age.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">National ID Card Number</label>
                    <input
                        type="text"
                        {...register('nid', { required: 'NID number is required' })}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your NID number"
                    />
                    {errors.nid && <p className="text-red-600 text-sm">{errors.nid.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Bike Registration Number</label>
                    <input
                        type="text"
                        {...register('bikeRegNumber', { required: 'Bike registration number is required' })}
                        className="w-full border p-2 rounded"
                        placeholder="Bike Reg. No"
                    />
                    {errors.bikeRegNumber && <p className="text-red-600 text-sm">{errors.bikeRegNumber.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Driving License Number</label>
                    <input
                        type="text"
                        {...register('licenseNumber', { required: 'Driving license number is required' })}
                        className="w-full border p-2 rounded"
                        placeholder="DL Number"
                    />
                    {errors.licenseNumber && <p className="text-red-600 text-sm">{errors.licenseNumber.message}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default BeARider;
