import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import { useLoaderData } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

// const deliveryData = [
//   {
//     region: 'Dhaka',
//     district: 'Dhaka',
//     city: 'Dhaka',
//     covered_area: ['Uttara', 'Dhanmondi', 'Mirpur', 'Mohammadpur'],
//     status: 'active',
//     flowchart: 'https://example.com/dhaka-flowchart.png',
//     longitude: 90.4125,
//     latitude: 23.8103,
//   },
//   {
//     region: 'Dhaka',
//     district: 'Faridpur',
//     city: 'Faridpur',
//     covered_area: ['Goalanda', 'Boalmari', 'Bhanga'],
//     status: 'active',
//     flowchart: 'https://example.com/faridpur-flowchart.png',
//     longitude: 89.8333,
//     latitude: 23.6,
//   },
//   {
//     region: 'Dhaka',
//     district: 'Gazipur',
//     city: 'Gazipur',
//     covered_area: ['Tongi', 'Kaliakair', 'Sreepur'],
//     status: 'active',
//     flowchart: 'https://example.com/gazipur-flowchart.png',
//     longitude: 90.4203,
//     latitude: 23.9999,
//   }
// ];

const generateTrackingId = () => {
    const timestamp = Date.now().toString(36); // base36 encoded timestamp
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-char random string
    return `TRK-${timestamp}-${randomPart}`;
};

const SendParcel = () => {
    const { user } = useAuth();
    const deliveryData = useLoaderData();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const axiosSecure = useAxiosSecure();
    //   now goto for axios.post 

    const [cost, setCost] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const senderRegion = watch('senderRegion');
    const senderCenter = watch('senderCenter');
    const receiverRegion = watch('receiverRegion');
    const receiverCenter = watch('receiverCenter');
    const type = watch('type');
    const weight = watch('weight');

    const onSubmit = (data) => {
        const calculatedCost = calculateCost(data);
        setCost(calculatedCost);
        setShowConfirm(true);
        toast.success(`Delivery Cost: ৳${calculatedCost}`);

    };

    const confirmSubmission = (data) => {
        const finalData = {
            ...data,
            creation_date: dayjs().format(),
            cost: cost,
            deliveryStatus: 'not_collected',
            paymentStatus: 'unpaid',
            created_by: user.email,
            tracking_id: generateTrackingId(),
        };
        console.log('Saved to DB:', finalData);
        axiosSecure.post('/parcels', finalData)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parcel information saved!',
                        showConfirmButton: false,
                        timer: 1500 // 2 seconds
                    });
                }
            })
            .catch(error=>{
                console.log(error)
            })
        toast.success('Parcel information saved!');
        setShowConfirm(false);

    };

    const calculateCost = ({ type, weight = 0, senderCenter, receiverCenter }) => {
        const sameDistrict = senderCenter === receiverCenter;
        const parsedWeight = parseFloat(weight || 0);

        if (type === 'document') {
            return sameDistrict ? 60 : 80;
        }

        if (parsedWeight <= 3) {
            return sameDistrict ? 110 : 150;
        }

        const extra = (parsedWeight - 3) * 40;
        return sameDistrict ? 110 + extra : 150 + extra + 40;
    };

    const getDistrictsByRegion = (region) => {
        const districts = deliveryData.filter(d => d.region === region).map(d => d.district);
        return [...new Set(districts)];
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold text-center mb-1">📦 Send a Parcel</h2>
            <p className="text-center text-gray-500 mb-6">Fill in the required information to proceed.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <fieldset className="border border-gray-200 p-4 rounded">
                    <legend className="font-semibold text-lg">Parcel Info</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Parcel Type */}
                        <div>
                            <label className="label">Type</label>
                            <div className="flex items-center gap-4">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register('type', { required: true })}
                                        className="radio checked:bg-blue-500"
                                    />
                                    <span className="ml-2">Document</span>
                                </label>
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register('type', { required: true })}
                                        className="radio checked:bg-blue-500"
                                    />
                                    <span className="ml-2">Non-document</span>
                                </label>
                            </div>
                            {errors.type && <span className="text-red-500 text-sm">Type is required</span>}
                        </div>

                        {/* Parcel Title */}
                        <div>
                            <label className="label">Title</label>
                            <input {...register('title', { required: true })} className="input input-bordered w-full" />
                            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
                        </div>

                        {/* Parcel Weight */}
                        <div>
                            <label className="label">Weight (kg)</label>
                            <input
                                type="number"
                                step="0.1"
                                {...register('weight')}
                                disabled={type !== 'non-document'}
                                className="input input-bordered w-full disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border border-gray-200 p-4 rounded">
                    <legend className="font-semibold text-lg">Sender Info</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Sender Name */}
                        <input type="text" {...register('senderName', { required: true })} placeholder="Name" className="input input-bordered" />
                        {/* Sender Contact */}
                        <input type="text" {...register('senderContact', { required: true })} placeholder="Contact" className="input input-bordered" />
                        {/* Sender Region */}
                        <select {...register('senderRegion', { required: true })} className="select select-bordered">
                            <option value="">Select Region</option>
                            {[...new Set(deliveryData.map(d => d.region))].map((region, idx) => (
                                <option key={idx} value={region}>{region}</option>
                            ))}
                        </select>
                        {/* Sender District */}
                        <select {...register('senderCenter', { required: true })} className="select select-bordered">
                            <option value="">Select District</option>
                            {getDistrictsByRegion(senderRegion).map((district, idx) => (
                                <option key={idx} value={district}>{district}</option>
                            ))}
                        </select>
                        {/* Sender Address */}
                        <input type="text" {...register('senderAddress', { required: true })} placeholder="Address" className="input input-bordered" />
                        {/* Pickup Instruction */}
                        <input type="text" {...register('pickupInstruction', { required: true })} placeholder="Pickup Instruction" className="input input-bordered" />
                    </div>
                </fieldset>

                <fieldset className="border border-gray-200 p-4 rounded">
                    <legend className="font-semibold text-lg">Receiver Info</legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {/* Receiver Name */}
                        <input type="text" {...register('receiverName', { required: true })} placeholder="Name" className="input input-bordered" />
                        {/* Receiver Contact */}
                        <input type="text" {...register('receiverContact', { required: true })} placeholder="Contact" className="input input-bordered" />
                        {/* Receiver Region */}
                        <select {...register('receiverRegion', { required: true })} className="select select-bordered">
                            <option value="">Select Region</option>
                            {[...new Set(deliveryData.map(d => d.region))].map((region, idx) => (
                                <option key={idx} value={region}>{region}</option>
                            ))}
                        </select>
                        {/* Receiver District */}
                        <select {...register('receiverCenter', { required: true })} className="select select-bordered">
                            <option value="">Select District</option>
                            {getDistrictsByRegion(receiverRegion).map((district, idx) => (
                                <option key={idx} value={district}>{district}</option>
                            ))}
                        </select>
                        {/* Receiver Address */}
                        <input type="text" {...register('receiverAddress', { required: true })} placeholder="Address" className="input input-bordered" />
                        {/* Delivery Instruction */}
                        <input type="text" {...register('deliveryInstruction', { required: true })} placeholder="Delivery Instruction" className="input input-bordered" />
                    </div>
                </fieldset>

                {!showConfirm ? (
                    <button type="submit" className="btn btn-primary w-full">Calculate Cost & Continue</button>
                ) : (
                    <button type="button" onClick={handleSubmit(confirmSubmission)} className="btn btn-success w-full">
                        Confirm & Submit Parcel (৳{cost})
                    </button>
                )}
            </form>
        </div>
    );
};

export default SendParcel;
