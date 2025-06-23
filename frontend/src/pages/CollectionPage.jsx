import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SoftOption from "../components/Products/SoftOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const CollectionPage = () => {
    const { collection } = useParams();
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    useEffect(() => {
        dispatch(fetchProductsByFilters({collection, ...queryParams}));
    }, [dispatch, collection, searchParams]);

    const sidebarRef = useRef(null);
    const [isSiderbarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSiderbarOpen);
    }

    const handleClickOutside = (e) => {
        // CLose siderbar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        // add event listener for click
        document.addEventListener("mousedown", handleClickOutside);
        // Clean event listerner
       return () => {
         document.removeEventListener("mousedown", handleClickOutside);
       }
    }, []);

   /*
    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=2",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 2,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=3",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 3,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=4",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 4,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=5",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 5,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=6",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 6,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=7",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 7,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=8",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
                {
                    _id: 8,
                    name: "Product01",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=9",
                            allText: "Stylish Jacket"
                        }
                    ]
                },
            ];
            setProducts(fetchedProducts)
        }, 1000);
    }, []);
   */
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile Filter button  */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
                <FaFilter className="mr-2" /> Filters
            </button>
            {/* Filter Sidebar  */}
            <div ref={sidebarRef} className={`${isSiderbarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar />
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4"> All collection</h2>
                {/* Soft Option */}
                <SoftOption />
                {/* Product Grid  */}
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
        </div>
    )
}

export default CollectionPage
