import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments = [], isLoading, error } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div>Loading payment history...</div>;
    if (error) return <div>Error loading payment history.</div>;

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, idx) => (
                        <tr key={payment._id || idx}>
                            <td>{idx + 1}</td>
                            <td>{payment.parcelId}</td>
                            <td>৳{payment.amount}</td>
                            <td>{payment.transactionId}</td>
                            <td>{Array.isArray(payment.paymentMethod) ? payment.paymentMethod.join(', ') : payment.paymentMethod}</td>
                            <td>{payment.paid_at ? new Date(payment.paid_at).toLocaleString() : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;