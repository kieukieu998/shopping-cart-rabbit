import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
    products: [
        {
            name: "Stylish Jacket",
            size: "M",
            color: "Black",
            price: 120,
            image: "https://picsum.photos/150?random=1",
        },
        {
            name: "Casual Sneakers",
            size: "42",
            color: "White",
            price: 75,
            image: "https://picsum.photos/150?random=2",
        },
    ],
    totalPrice: 195,
};

const Checkout = () => {
    const navigate = useNavigate();
    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAdress, setShippingAdress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123)
    };

    const handlePaymentSuccess = (details) => {
        console.log("payment successful", details);
        navigate("/order-confirmation");
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
                        <input type="email" id="email" name="email" defaultValue="user@example.com" className="w-full p-2 border rounded disabled outline-none" />
                    </div>
                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstname" className="block text-gray-700 mb-2">First Name</label>
                            <input type="text" id="firstname" name="firstname"
                                value={shippingAdress.firstName}
                                onChange={(e) => setShippingAdress({
                                    ...shippingAdress,
                                    firstName: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block text-gray-700 mb-2">Last Name</label>
                            <input type="text" id="lastname" name="lastname"
                                value={shippingAdress.lastName}
                                onChange={(e) => setShippingAdress({
                                    ...shippingAdress,
                                    lastName: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="adress" className="block text-gray-700 mb-2">Adress</label>
                        <input type="text" id="adress" name="adress"
                            value={shippingAdress.address}
                            onChange={(e) => setShippingAdress({
                                ...shippingAdress,
                                address: e.target.value,
                            })}
                            className="w-full p-2 border rounded outline-none required" />
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                            <input type="text" id="city" name="city"
                                value={shippingAdress.city}
                                onChange={(e) => setShippingAdress({
                                    ...shippingAdress,
                                    city: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-gray-700 mb-2">Postal code</label>
                            <input type="text" id="postalCode" name="postalCode"
                                value={shippingAdress.postalCode}
                                onChange={(e) => setShippingAdress({
                                    ...shippingAdress,
                                    postalCode: e.target.value,
                                })}
                                className="w-full p-2 border rounded outline-none required:" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-gray-700 mb-2">Country</label>
                        <input type="text" id="country" name="country"
                            value={shippingAdress.country}
                            onChange={(e) => setShippingAdress({
                                ...shippingAdress,
                                country: e.target.value,
                            })}
                            className="w-full p-2 border rounded outline-none required" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                        <input type="number" id="phone" name="phone"
                            value={shippingAdress.phone}
                            onChange={(e) => setShippingAdress({
                                ...shippingAdress,
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
                                    amount={100}
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
