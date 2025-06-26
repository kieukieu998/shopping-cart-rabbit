import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";
const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);


    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ id: orderId, status }));
    };

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error: {error}</p>
    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-center text-gray-500">
                    <thead>
                        <tr className="bg-gray-100 text-xs uppercase text-gray-700">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Total Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length > 0 ? (
                                orders.map((order) => {
                                    return (
                                        <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap"> {order.user?.name || "Unknown"}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">${typeof order.totalPrice === "number"
                                                ? order.totalPrice.toFixed(2)
                                                : parseFloat(order.totalPrice || 0).toFixed(2)}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="text-center bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg block mx-auto p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                                                    onClick={() => handleStatusChange(order._id, "Delivered")}
                                                    disabled={order.status === "Delivered"}
                                                >
                                                    Mark as Delivered
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-gray-500">
                                        No Orders found.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManagement
