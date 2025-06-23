import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice"

const MyOrderPage = () => {
    // const [orders, setOrders] = useState([]); // mảng rỗng để lưu danh sách các đơn hàng người dùng
    const navigate = useNavigate();
   /*
    useEffect(() => {
        // Simulate fetching orders
        setTimeout(() => {
            const mockOrders = [
                {
                    _id: "12345",
                    createAt: new Date(),
                    shippingAdress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 1",
                            image: "https://picsum.photos/500/500?random=1",
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true,
                },
                {
                    _id: "34567",
                    createAt: new Date(),
                    shippingAdress: { city: "New York", country: "USA" },
                    orderItems: [
                        {
                            name: "Product 2",
                            image: "https://picsum.photos/500/500?random=2",
                        },
                    ],
                    totalPrice: 100,
                    isPaid: true,
                },
            ];

            setOrders(mockOrders);
        }, 1000);
    }, []);
   */

    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    const handleRowClick = (orderID) => {
        navigate(`/order/${orderID}`);
    };

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error {error}</p>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
            <div className="relative shadow-md sm:rounded-lg overflow-hidden">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order ID</th>
                            <th className="py-2 px-4 sm:py-3">Created</th>
                            <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3">Items</th>
                            <th className="py-2 px-4 sm:py-3">Price</th>
                            <th className="py-2 px-4 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => {
                                return (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(order._id)}>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4">
                                           <img
                                            src={order?.orderItems?.[0]?.image}
                                            alt={order?.orderItems?.[0]?.name || "Product"}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                                            {new Date(order.createAt).toLocaleDateString()}{""}&nbsp;{new Date(order.createAt).toLocaleTimeString()}{""}
                                        </td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">{order.shippingAdress ? `${order.shippingAdress.city}, ${order.shippingAdress.country}` : "N/A"}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap"> {order?.orderItems?.length || 0}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">${order.totalPrice}</td>
                                        <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                                            <span className={`${order.isPaid
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`} >
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">You have no orders</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrderPage
