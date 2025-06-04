import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchToggle = () => {
        setIsOpen(!isOpen); // Đảo trạng thái
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("SearchItem:", searchTerm);
        setIsOpen(false);
    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
            {isOpen ? (
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center justify-center w-full">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // cập nhật state khi người dùng gõ vào ô input
                            className="bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 tranform -translate-y-1/2 text-gray-600 hover:text-black">
                            <CiSearch className="h-6 w-6 text-gray-700" />
                        </button>
                    </div>
                    {/* close button  */}
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:text-gray-800"
                        onClick={handleSearchToggle}
                    >
                        <IoMdClose className="h-6 w-6 text-gray-700" />
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <CiSearch className="h-6 w-6 text-gray-700" />
                </button>
            )}
        </div>
    )
}

export default SearchBar
