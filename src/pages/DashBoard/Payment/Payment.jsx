import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
// 10.ei ta ekhane daw .env theke publisable key ta 
//11.now got backend .env file okhane secret key ta daw 
//12 got require stirpe and put the env file 

const Payment = () => {

    return (
       <Elements stripe={stripePromise}>
        <PaymentForm ></PaymentForm>
       </Elements>
    );
};

export default Payment;