import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("❌ PayPal client ID is missing in environment variables");
    return <p className="text-red-500">Payment system not configured</p>;
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={{
        "client-id": clientId,
        currency: "USD",        // ✅ REQUIRED
        intent: "capture",      // ✅ REQUIRED for most simple payments
        components: "buttons",  // ✅ safe to declare components explicitly
      }}>
        <PayPalButtons
          style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(amount).toFixed(2), // ✅ must be string
                    currency_code: "USD",                 // ✅ optional but safe
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order.capture();
              onSuccess(details);
            } catch (err) {
              console.error("❌ Capture error:", err);
              if (typeof onError === "function") onError(err);
            }
          }}
          onError={(err) => {
            console.error("❌ PayPal Error:", err);
            if (typeof onError === "function") onError(err);
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
