import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';



const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    // er por error set kore daw 
    const { parcelId } = useParams();
    const navigate = useNavigate();
    //2 now get the tanstack query for loading data s
    // console.log(parcelId)
    const axiosSecure = useAxiosSecure();

    const { isPending, data: parcelInfo } = useQuery({
        queryKey: ['percels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isPending) {
        return "....loading data"
    }

    // console.log(parcelInfo)
    const amount = parcelInfo.cost
    // 14 nubmber karon er cent e payment nei 
    const amountInCents = amount * 100;
    //15 create a payment intent in handle  submit 
    // console.log(amountInCents)
    // 3 got pay button and show it 

    //  console.log(user.displayName)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        // card na thakleo return kore dhibho 
        if (!card) {
            return;
            // er por er nicher code likbho 
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            // if else likho error  paymentmethod er jonno 
        })

        if (error) {
            // console.log('error', error)
            setError(error.message)
            // abar error tare reset kore daw naile ek jinish bar bar dhekhabe else theke
        }
        else {
            setError('')
            // eibar error ta dhekhia daw 
            console.log('payment method', paymentMethod)
            // erpor test card search korbo
            //ekhon error state set korbo erro message dekhanor jonno 
        }
        console.log(amountInCents)
        // 15 creation payment intent 
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })
        console.log('res from intent', res)
        // 16. got to this api and make some noise

        // 19 
        const clientSecret = res.data.clientSecret;
        //18 ai generate code from it's website ei bar clinet secret tah naw 
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    // 21 er por server e jai payment history banabo
                    name: user.displayName,
                    email: user.email,
                },
            }
        });


        //  20. er por billing details e nam dham set korbo 
        if (result.error) {
            // error  set kore daw must and reset o kore dhibho
            setError(result.error.message);
        } else {
            setError('')
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
            }
            //i am 22
            // parcelId: new ObjectId(parcelId),
            //         amount,
            //         transactionId,
            //         email,
            //         paymentMethod,
            //         paid_at: new Date().toISOString(),
            //         paid_At: new Date()
            const paymentDAta = {
                parcelId,
                email: user.email,
                amount,
                transactionId: result.paymentIntent.id,
                paymentMethod: result.paymentIntent.payment_method_types
            }

            const paymentRes = await axiosSecure.post('/payments', paymentDAta)
            console.log(paymentRes.data)
            if (paymentRes.data.message === "Payment status updated and payment history saved") {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    html: `<b>Transaction ID:</b> ${result.paymentIntent.id}`,
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/dashBoard/myparcels');
                });
            }

        }


    }
    return (
        <div className="flex justify-center items-center min-h-[40vh]">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-center mb-4">Payment Details</h2>
                <div className="mb-4">
                    {/* button carde element  er baire hobe  */}
                    <CardElement className="p-3 border rounded focus:outline focus:ring-2 focus:ring-blue-400 transition" />
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Pay ${amount}
                    {/* 4 tar stripe website  server e giy ai k jigges kore backend er code generate kore naw. er por oit backend e paste kore daw  */}
                </button>
                {
                    error && <p className='text-red-600 transition'>{error}</p>
                    //1 now get the parcel id  with params

                }
            </form>
        </div>
    );
};

export default PaymentForm;