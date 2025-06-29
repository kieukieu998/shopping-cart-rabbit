import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, fetchAdminProducts } from "../../redux/slices/adminProductSlice"

const ProductManagement = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.adminProducts);

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          dispatch(deleteProduct(id));
        }
    };

    if(loading) return <p>Loading....</p>
    if(error) return <p>Error: {error}....</p>

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-center text-gray-500">
                    <thead>
                        <tr className="bg-gray-100 text-xs uppercase text-gray-700">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Sku</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ? (
                                products.map((product) => {
                                    return (
                                        <tr key={product._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap text-left">{product.name}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.price}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.sku}</td>
                                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                                <Link to={`/admin/products/${product._id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2">Edit</Link>
                                                <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        No Products found.
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

export default ProductManagement
