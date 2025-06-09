import React, { useEffect, useState } from 'react';

function ProductDetails() {
    const [mainImage, setMainImage] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectedProduct = {
        name: "Stylish Jacket",
        price: 120,
        originalPrice: 150,
        description: "This is a stylish jacket perfect for any occasion",
        brand: "FashionBrand",
        material: "Leather",
        size: ["S", "M", "L", "XL"],
        colors: ["red", "Black"],
        images: [
            {
                url: "https://picsum.photos/500/500?random=2",
                altText: "Stylish Jacket"
            },
            {
                url: "https://picsum.photos/500/500?random=3",
                altText: "Stylish Jacket"
            }
        ]
    };

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left Thumbnail */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="md:w-1/2">
                        <div className="mb-4">
                            <img src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg" />
                        </div>
                    </div>
                    {/* Mobile Thumbnails */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                                onClick={() => setMainImage(image.url)}
                            />
                        ))}
                    </div>
                    {/* Right Side Info */}
                    <div className="md:w-1/2 md:ml-10">
                        <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
                        <p className="text-lg text-gray-600 mb-1 line-through">${selectedProduct.originalPrice}</p>
                        <p className="text-xl text-gray-500 mb-2">${selectedProduct.price}</p>
                        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

                        {/* Color options */}
                        <div className="mb-4">
                            <p className="text-gray-700">Color:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        className="w-8 h-8 rounded-full border"
                                        style={{
                                            backgroundColor: color.toLowerCase(),
                                            filter: "brightness(0.5)",
                                        }}
                                    ></button>
                                ))}
                            </div>
                        </div>

                        {/* Size options */}
                        <div className="mb-4">
                            <p className="text-gray-700">Size:</p>
                            <div className="flex gap-2 mt-2">
                                {selectedProduct.size.map((size, index) => (
                                    <button key={index} className="px-4 py-2 rounded border">{size}</button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity selector */}
                        <div className="mb-6">
                            <p className="text-gray-700">Quantity:</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <button className="px-2 py-1 bg-gray-200 rounded text-lg">-</button>
                                <span className="text-lg">1</span>
                                <button className="px-2 py-1 bg-gray-200 rounded text-lg">+</button>
                            </div>
                        </div>

                        <button className="bg-black text-white py-2 px-6 rounded w-full mb-4">ADD TO CART</button>

                        <div className="mt-10 text-gray-700">
                            <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                            <table className="w-full text-left text-sm text-gray-600">
                                <tbody>
                                    <tr>
                                        <td className="pt-1">Brand</td>
                                        <td className="pt-1">{selectedProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className="pt-1">Material</td>
                                        <td className="pt-1">{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
