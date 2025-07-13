import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {orderId} = useParams();
    console.log(orderId)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const {user} = useAuth();
  
    // console.log(orderId)
    const [error, setError] = useState(" ");
                // tanstack query diye orderInfo nitechi
    const {data:orderInfo = {}, isPending} = useQuery({
        queryKey:['orders', orderId],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/orders/${orderId}`)
            return res.data;
        }
    })
    if (isPending){
        <Loading></Loading>
    }
    console.log(orderInfo);
    const amount = orderInfo.totalAmount;
    const amountInCents = parseFloat(amount)*100;
    console.log("amountInCents:", amountInCents)

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // payment method or card er data na thakle return kore dibe
        if(!stripe || !elements){
            return;
        }
        
         // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
        const card = elements.getElement(CardElement);
                        // step-1: validate the card(taka jei account theke katbo seta thik ache kina)
        if(!card){
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card});
        if(error){
            console.log("error", error);
            setError(error.message);
        }
        else{
            setError(" ")
            console.log("payment Method", paymentMethod);
                // step:2--create payment intent (taka sothik sthane joma hocche kina), eta dekhbo stripe er secret key diye
            const res = await axiosSecure.post('/create-payment-intent',{amountInCents,orderId})
                            // server e secret key sothik hoile individual client er jonno ClienSecretKey dibe 
            const clientSecret = res.data.clientSecret;
            console.log(clientSecret)
                        // step:3-- confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                    name: user.displayName,
                    email: user.email
                    },
                },
                });
                if (result.error) {
                    setError(result.error.message);
                } 
                else {
                        setError(" ")
                    if (result.paymentIntent.status === 'succeeded') {
                        console.log('Payment succeeded!');
                        console.log(result);
                        const transactionId = result.paymentIntent.id;
                                //step:4- mark parcel paid also create payment history
                                // const { orderId, amount,userEmail, paymentMethod, transactionId } = req.body;
                        const paymentData = {
                            orderId, 
                            amount,
                            userEmail:orderInfo.userEmail,
                            paymentMethod:result.paymentIntent.payment_method_types,
                            transactionId:transactionId,
                        }
                        const paymentRes = await axiosSecure.post("/payments",paymentData);
                        console.log(paymentRes)
                        if(paymentRes.data.insertedId){
                            console.log("payment successfully done...");
                             Swal.fire({
                                        icon: 'success',
                                        title: 'Payment Successful!',
                                        html: `<p>Your payment was successful.</p><p><strong>Transaction ID:</strong> ${transactionId}</p>`,
                                        confirmButtonText: 'Go to Invoice Page',
                                        }).then( async(result) => {
                                            if (result.isConfirmed) {
                                                navigate(`/invoice/${orderId}`);
                                            }
                                        })
                        }
                    }
                }
        }         
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'>
                   
                </CardElement>
                <button type='submit' 
                    className='btn btn-primary w-full text-black'
                    disabled={!stripe}>
                        Pay ৳ {amount}
                </button>
                { error && <p className='text-sm text-red-800 font-semibold'> {error}</p>}
            </form>
          
        </div>
    );
};

export default PaymentForm;