import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
    /*
     const cartProducts = [
         {
             productId: 1,
             name: "T-shirt",
             size: 'M',
             color: 'Red',
             quantity: 1,
             price: 15,
             image: "https://picsum.photos/200?random=1"
         },
         {
             productId: 2,
             name: "Jeans",
             size: 'L',
             color: 'BLue',
             quantity: 1,
             price: 25,
             image: "https://picsum.photos/200?random=2"
         }
     ]
    */
    const dispatch = useDispatch();
    // Handle adding or substracting to cart
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        if (!productId || !quantity || !size || !color) return;

        const newQuantity = quantity + delta;
        if (newQuantity < 1) return;

        dispatch(updateCartItemQuantity({
            productId,
            quantity: newQuantity,
            guestId,
            userId,
            size,
            color,
        }));
    };


    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({ productId, guestId, userId, size, color }));
    };

    return (
        <div>
            {
                cart.products.map((product, index) => {
                    return (
                        <div key={index} className="flex items-start justify-between py-4 border-b">
                            <div className="flex items-start">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-20 h-24 object-cover mr-4 rounded"
                                />
                                <div>
                                    <h3>{product.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        size: {product.size} | color: {product.color}
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() =>
                                            handleAddToCart(
                                                product.productId,
                                                -1,
                                                product.quantity,
                                                product.size,
                                                product.color)
                                        }
                                            className="border rounded px-2 py-1 text-xl font-medium">-</button>
                                        <span className="mx-4">{product.quantity}</span>
                                        <button onClick={() =>
                                            handleAddToCart(
                                                product.productId,
                                                1,
                                                product.quantity,
                                                product.size,
                                                product.color)
                                        }
                                            className="border rounded px-2 py-1 text-xl font-medium">+</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>$ {product.price.toLocaleString()}</p>
                                <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)} className="w-6 h-6 mt-2 text-red-600">
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CartContent
