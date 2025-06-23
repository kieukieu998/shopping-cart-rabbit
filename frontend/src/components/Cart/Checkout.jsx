import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from "axios";

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });

    // Ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Paypal",
                    totalPrice: cart.totalPrice,
                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id); // set checkout ID checkout was successful
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "paid", paymentDetail: details },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful
        } catch (error) {
            console.error(error);
        }
    };
    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            navigate("/order-confirmation");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p>Loading cart...</p>
    if (error) return <p>Error: {error} </p>
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
            {/* Left Section  */}
            <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl uppercase mb-6">Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg mb-4">Contact Details</h3>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                        <input type="email" id="email" name="email" value={user ? user.email : ""} className="w-full p-2 border rounded  outline-none" disabled />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstname" className="block text-gray-700 mb-2">First Name</label>
                            <input type="text" id="firstname" name="firstname"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    firstName: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-gray-700 mb-2">Last Name</label>
                            <input type="text" id="lastname" name="lastname"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    lastName: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-gray-700 mb-2">address</label>
                        <input type="text" id="address" name="address"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({
                                ...shippingAddress,
                                address: e.target.value,
                            })}
                            className="w-full p-2 border rounded outline-none required" />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                            <input type="text" id="city" name="city"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    city: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-gray-700 mb-2">Postal code</label>
                            <input type="text" id="postalCode" name="postalCode"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({
                                    ...shippingAddress,
                                    postalCode: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                        <input type="text" id="country" name="country"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({
                                ...shippingAddress,
                                country: e.target.value,
                            })}
                            className="w-full p-2 border rounded outline-none required" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                        <input type="number" id="phone" name="phone"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({
                                ...shippingAddress,
                                phone: e.target.value,
                            })}
                            className="w-full p-2 border rounded outline-none required" />
                    </div>
                    {/* button check  */}
                    <div className="mt-6">
                        {!checkoutId ? (
                            <button type="submit" className="w-full bg-black text-white py-3 rounded">Continue to Payment</button>
                        ) : (
                            <div>
                                <h3 className="text-lg mb-4">Pay width Paypal</h3>
                                {/* Paypal component  */}
                                <PayPalButton
                                    amount={cart.totalPrice}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(err) => alert("Payment failed. Try again")} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
            {/* Right section  */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {
                        cart.products.map((product, index) => {
                            return (
                                <div key={index} className="flex items-start justify-between py-2 border-b">
                                    <div className="flex items-start">
                                        <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4" />
                                        <div>
                                            <h3 className="text-md">{product.name}</h3>
                                            <p className="text-gray-500">Size: {product.size}</p>
                                            <p className="text-gray-500">Color: {product.color}</p>
                                        </div>
                                    </div>
                                    <p className="text-xl">$ {product.price?.toLocaleString()}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex justify-between items-center text-lg mb-4">
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center text-lg">
                    <p>Shipping:</p>
                    <p>Free</p>
                </div>
                <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout
