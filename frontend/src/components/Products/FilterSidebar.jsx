import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"

function FilterSidebar() {
    /**
     * searchParams: Dùng để đọc giá trị tham số truy vấn
     * setSearchParams: Dùng để cập nhật query params trên URL
     */
    const [searchParams, setSearchParams] = useSearchParams();  

    const navigation = useNavigate();
    // x.com/?a=1&b=2
    // khai báo state, lưu trữ bộ lọc
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });
    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = ["Top Wear", "Bottom Wear"];
    const colors = [
        "Red",
        "Blue",
        "Black",
        "Green",
        "Yellow",
        "Gray",
        "White",
        "Pink",
        "Beige",
        "Navy",
    ];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const materials = [
        "Cotton",
        "Wool",
        "Denim",
        "Polyester",
        "Silk",
        "Linen",
        "Viscose",
        "Fleece",
    ];
    const brands = [
        "Urban Threads",
        "Modern Fit",
        "Street Style",
        "Beach Breeze",
        "Fashionista",
        "ChicStyle",
    ];
    const genders = ["Men", "Women"];

    // đồng bộ các tham số URL (searchParams) với state lọc (filters)
    useEffect(() => {
        const params = Object.fromEntries([...searchParams]); // chuyển các query params thành object JS >>Ví dụ: URL: ...?category=Top Wear&size=M,L → params = { category: "Top Wear", size: "M,L" }
        //cập nhật state filters dựa trên các giá trị từ URL.
        setFilters({ 
            category: params.category || "",
            gender: params.gender || "",
            color: params.color || "",
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [], 
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 100,
        });
        setPriceRange([0, params.maxPrice || 100]);
    }, [searchParams]);

const handleFilterChange = (e) => {
  const { name, value, checked, type } = e.target;

  let newFilters = { ...filters };

  if (type === "checkbox") {
    if (checked) {
      newFilters[name] = [...(newFilters[name] || []), value];
    } else {
      newFilters[name] = (newFilters[name] || []).filter((item) => item !== value);
    }
  } else {
    newFilters[name] = value;
  }

  setFilters(newFilters);
  updateURLParams(newFilters);
};


    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(",")); // "XS,S"
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigation(`?${params.toString()}`); // ?category=Bottom+Wear&size=XS%2CS
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice]);

        const newFilters = {
            ...filters,
            minPrice: 0,
            maxPrice: newPrice
        };

        setFilters(newFilters);
        updateURLParams(newFilters); // Cập nhật URL với filters mới
    };
    return (
        <div className="p-4">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
            {/* Category Filter  */}
            <div className="mb-6">
                <label htmlFor="category" className="block text-gray-600 font-medium mb-2">Category</label>
                {
                    categories.map((category) => {
                        return (
                            <div key={category} className="flex items-center mb-1">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    onChange={handleFilterChange}
                                    checked={filters.category === category}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <span className="text-gray-700">{category}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* Gender Filter  */}
            <div className="mb-6">
                <label htmlFor="gender" className="block text-gray-600 font-medium mb-2">Gender</label>
                {
                    genders.map((gender) => {
                        return (
                            <div key={gender} className="flex items-center mb-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={gender}
                                    onChange={handleFilterChange}
                                    checked={filters.gender === gender}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <span className="text-gray-700">{gender}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* Color Filter  */}
            <div className="mb-6">
                <label htmlFor="color" className="block text-gray-600 font-medium mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {
                        colors.map((color) => {
                            return (
                                <button key={color} name="color"
                                    value={color}
                                    onClick={handleFilterChange}
                                    className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "right-2 ring-blue-500" : ""}`}
                                    style={{ backgroundColor: color.toLowerCase() }}>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            {/* Size Filter  */}
            <div className="mb-6">
                <label htmlFor="size" className="block text-gray-600 font-medium mb-2">Size</label>
                {
                    sizes.map((size) => {
                        return (
                            <div key={size} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    name="size"
                                    value={size}
                                    onChange={handleFilterChange}
                                    checked={filters.size.includes(size)}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                                <span className="text-gray-700">{size}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* Material Filter  */}
            <div className="mb-6">
                <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">Material</label>
                {
                    materials.map((material) => {
                        return (
                            <div key={material} className="flex items-center mb-1">
                                <input type="checkbox"
                                    name="material"
                                    value={material}
                                    onChange={handleFilterChange}
                                    checked={filters.material.includes(material)}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                                <span className="text-gray-700">{material}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* Brand Filter  */}
            <div className="mb-6">
                <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">Brand</label>
                {
                    brands.map((brand) => {
                        return (
                            <div key={brand} className="flex items-center mb-1">
                                <input type="checkbox"
                                    name="brand"
                                    value={brand}
                                    onChange={handleFilterChange}
                                    checked={filters.brand.includes(brand)}
                                    className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300" />
                                <span className="text-gray-700">{brand}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* Price  */}
            <div className="mb-8">
                <label htmlFor="brand" className="block text-gray-600 font-medium mb-2">Price Range</label>
                <input
                    type="range"
                    name="priceRanger"
                    min={0}
                    max={100}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
