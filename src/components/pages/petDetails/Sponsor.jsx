import React, { useEffect, useState } from 'react';
import { addSponsorToPet } from '../../../api/petsApi';

const Sponsor = ({petId}) => {
    // const [paymentDisplay,setPaymentDisplay] = useState('unset');
    const [paymentDisplay,setPaymentDisplay] = useState('none');
    const [amount,setAmount] = useState('10.00');

    useEffect(() => {
        if (document.getElementById("paypal-sdk")) return; // Prevent multiple script injections

        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=ARyjgbVPY96EwSQxjqOrGiKwfR5SkkW0JC7Aqm8vwtRzw6k4vEmaBl9DFBTN60W3-Arav24oGUDyvXVE&currency=USD";
        script.id = "paypal-sdk"; // Unique ID for tracking
        script.async = true;
        script.onload = () => {
            if (window.paypal) {
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    value: amount, // Change this to dynamic amount if needed
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions) => {
                        const details = await actions.order.capture();
                        // console.log("Transaction successful:", details);
                        console.log("Transaction successful:", details);
                        console.log("payer info:", details.payer.name.given_name);

                        await addSponsorToPet(petId,details,amount);
                        alert(`Thank you for your donation, ${details.payer.name.given_name}!`);
                    },
                    onError: (err) => {
                        console.error("PayPal transaction error:", err);
                        alert("Something went wrong with the payment.");
                    }
                }).render("#paypal-button-container");
            }
        };
        document.body.appendChild(script);
    }, []);


    return (
        <>
            <button className='secondary-btn' onClick={() => setPaymentDisplay('unset')}>Sponsor</button>
            <div>
                <h2>Support Us with a Donation</h2>
                <div id="paypal-button-container" style={{display:paymentDisplay}}></div>
            </div>
        </>
    );
}

export default Sponsor;
