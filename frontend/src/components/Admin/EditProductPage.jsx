import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const {selectedProduct, loading, error} = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false); // Image uploading state

    useEffect(() => {
        if(id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

useEffect(() => {
  if (selectedProduct) {
    setProductData((prevData) => ({
      ...prevData,
      ...selectedProduct,
      images: selectedProduct.images?.length > 0 ? selectedProduct.images : prevData.images,
    }));
  }
}, [selectedProduct]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file); 

        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: {"Content-Type" : "multipart/form-data"},
                }
            ) ;
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, {url: data.imageUrl, allText: ""}],
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
             setUploading(false);
        }
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await dispatch(updateProduct({ id, productData }));
  if (updateProduct.fulfilled.match(result)) {
    navigate("/admin/products");
  } else {
    alert("Update failed");
  }
};

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-3xl font-bold mb-6">Edit product</h2>
            <form onSubmit={handleSubmit}>
                {/* Name  */}
                <div className="mb-6">
                    <label htmlFor="name" className="block font-semibold mb-2">Product Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* Description  */}
                <div className="mb-6">
                    <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                    <textarea
                        id="name"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        rows={4}
                        required
                    />
                </div>
                {/* Price  */}
                <div className="mb-6">
                    <label htmlFor="price" className="block font-semibold mb-2">Price</label>
                    <input type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* Count In Stock  */}
                <div className="mb-6">
                    <label htmlFor="countInStock" className="block font-semibold mb-2">Count In Stock</label>
                    <input type="number"
                        id="countInStock"
                        name="countInStock"
                        value={productData.countInStock}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* SKU  */}
                <div className="mb-6">
                    <label htmlFor="price" className="block font-semibold mb-2">SKU</label>
                    <input type="text"
                        id="sku"
                        name="sku"
                        value={productData.sku}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* Sizes  */}
                <div className="mb-6">
                    <label htmlFor="price" className="block font-semibold mb-2">Sizes (comma-separated)</label>
                    <input type="text"
                        id="size"
                        name="size"
                        value={productData.sizes.join(", ")}
                        onChange={(e) => setProductData({
                            ...productData,
                            sizes: e.target.value.split(", ").map((size) => size.trim()),
                        })}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* Colors  */}
                <div className="mb-6">
                    <label htmlFor="colors" className="block font-semibold mb-2">Colors (comma-separated)</label>
                    <input type="text"
                        id="colors"
                        name="colors"
                        value={productData.colors.join(", ")}
                        onChange={(e) => setProductData({
                            ...productData,
                            colors: e.target.value.split(", ").map((color) => color.trim()),
                        })}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                        required
                    />
                </div>
                {/* Image Upload  */}
                <div className="mb-6">
                    <label htmlFor="images" className="block font-semibold mb-2">Image Upload</label>
                    <input type="file"
                        id="images"
                        name="images"
                        onChange={handleImageUpload}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none"
                    />
                    { uploading && <p>Loading Image.....</p>}
                    <div className="flex gap-4 mt-4">
                        {
                            productData.images.map((image, index) => {
                                return(
                                    <div key={index}>
                                        <img src={image.url} alt={image.allText || "Product Image" } className="w-20 h-20 object-cover rounded-md shadow-md"/>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Update product</button>
            </form>
        </div>
    )
}

export default EditProductPage
