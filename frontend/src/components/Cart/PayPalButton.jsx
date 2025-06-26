import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("PayPal client ID is missing in .env");
    return <p className="text-red-500">Payment system not configured</p>;
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: parseFloat(amount).toFixed(2) },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order.capture();
              onSuccess(details);
            } catch (err) {
              console.error("Capture error:", err);
              onError(err);
            }
          }}
          onError={(err) => {
            console.error("PayPal Error:", err);
            if (typeof onError === "function") onError(err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
