import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
    return (
        <div>
            <PayPalScriptProvider options={{ "client-id": "ATamCPxrDaYDPsONiGW2GWk5ZA7NzzuyFGaTrMu1wmPPDQ6vOZgbgakW_Bbrw7edSCaSy-z032dacAgM" }} >
                <PayPalButtons
                    style={{layout: "vertical"}}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{ amount: { value: amount } }]
                        })
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(onSuccess);
                    }}
                    
                    onError={onError}
                />
            </PayPalScriptProvider>
        </div>
    )
}

export default PayPalButton
