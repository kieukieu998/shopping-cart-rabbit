import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios"

const NewArrivals = () => {
    const scrollRef = useRef(null); // Trỏ đến DOM element chứa nội dung cần cuộn
    const [isDragging, setIsDragging] = useState(false);  // Biết được người dùng có đang kéo chuột để cuộn không.  nhấn chuột (mousedown) → true || nhả chuột (mouseup) → false
    const [startX, setStartX] = useState(0); // Tọa độ chuột khi bắt đầu kéo
    const [scrollLeft, setScrollLeft] = useState(0); // Vị trí cuộn ngang ban đầu khi bắt đầu kéo
    const [canScrollLeft, setCanScrollLeft] = useState(false); // Có thể cuộn thêm sang trái khôngg.
    const [canScrollRight, setCanScrollRight] = useState(true); // Có thể cuộn thêm sang phải không.

    // dummy data
    //    const newArrival = [
    //     {
    //         _id: "1",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=9",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "2",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=2",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "3",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=3",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "4",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=4",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "5",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=5",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "6",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=6",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "7",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=7",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     },
    //     {
    //         _id: "8",
    //         name: "Stylish Jacket",
    //         price: 120,
    //         image: [
    //             {
    //                 url: "https://picsum.photos/500/500?random=8",
    //                 allText: "Stylish Jacket"
    //             }
    //         ]
    //     }
    // ];

    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setNewArrivals(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchNewArrivals();
    }, [newArrivals]);

    // bắt đầu thao tác kéo 
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };
    // khi di chuyển chuột, cần tính toán và cập nhật vị trí cuộn 
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };
    //  kết thúc thao tác kéo
    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    }

    /* direction: tham số truyền vào là "left" hoặc "right" (hoặc bạn có thể đặt tùy ý).
       scrollAmount: nếu direction là "left", cuộn sang trái -300 pixel (âm là cuộn sang trái), còn "right" thì cuộn sang phải 300 pixel.
       scrollRef.current: là phần tử DOM bạn muốn cuộn.
       scrollBy: là phương thức DOM để cuộn phần tử theo một khoảng cách tương đối (không phải tuyệt đối).
       { left: scrollAmount, behavior: "smooth" }:
       left: scrollAmount: cuộn ngang theo số pixel đã xác định.
       behavior: "smooth": cuộn có hiệu ứng mượt, không nhảy tức thì.
   */
    const scroll = (direction) => {
        const scrollAmount = direction === "left" ? -300 : 300;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };
    // Update Scroll Buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;

        if (container) {
            const leftScroll = container.scrollLeft;
            const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

            setCanScrollLeft(leftScroll > 0);
            setCanScrollRight(rightScrollable);
        }

        /*console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            containerScrollWidth: container.scrollWidth,

        });*/

    }
    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, []);

    return (
        <section className="py-16 px-4 lg:px-0">
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-xl text-gray-600 mb-8">Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>

                {/* scroll button  */}
                <div className="absolute right-0 bottom-[-30px] flex space-x-2">
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FaChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`p-2 rounded border ${canScrollRight ? "bg-white text-black" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                        <FaChevronRight className="text-2xl" />
                    </button>
                </div>
            </div>
            {/* scrollable content  */}
            <div
                ref={scrollRef}
                className={`container mx-auto overflow-hidden flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
            >
                {newArrivals.map((product) => {
                    return (
                        <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                            <img
                                src={product.images[0]?.url}
                                alt={product.images[0]?.allText || product.name}
                                className="w-full h-[400px] object-cover rounded-lg"
                                draggable="false"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                                <Link to={`/product/${product._id}`} className="block">
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}

export default NewArrivals
