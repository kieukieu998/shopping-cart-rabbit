import React from 'react'
import { useSearchParams } from "react-router-dom";

const SoftOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();  

  const handleSoftChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        name="sort"
        id="sort"
        onChange={handleSoftChange}
        value={searchParams.get("sortBy") || ""}
        className="border p-2 rounded-md focus:outline-none">
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">popularity</option>
      </select>
    </div>
  )
}

export default SoftOption
