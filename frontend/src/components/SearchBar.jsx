import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } =
        useContext(ShopContext);

    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Show the search bar only on the collection page
        setVisible(location.pathname.includes("collection"));
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // You can add any search functionality here
        console.log("Searching for:", search);
    };

    return showSearch && visible ? (
        <div className="mt-16">
            <div className="border-t border-b bg-gray-50 text-center transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                <form
                    onSubmit={handleSearch}
                    className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 transition-all duration-300 ease-in-out transform hover:shadow-lg"
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 outline-none bg-inherit text-sm transition duration-300 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-300"
                        type="text"
                        placeholder="Search"
                        aria-label="Search Products" // Accessibility improvement
                    />
                    <button type="submit">
                        <img
                            className="w-4 cursor-pointer"
                            src={assets.search_icon}
                            alt="Search Icon"
                        />
                    </button>
                </form>
                <img
                    onClick={() => setShowSearch(false)}
                    className="inline w-3 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={assets.cross_icon}
                    alt="Close Search"
                />
            </div>
        </div>
    ) : null;
};

export default SearchBar;
