import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relevant");

    // Toggle category filters
    const toggleCategory = ({ target: { value } }) => {
        setCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Toggle subcategory filters
    const toggleSubCategory = ({ target: { value } }) => {
        setSubCategory((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Memoized filtered products
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        if (showSearch && search) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category.length > 0) {
            filtered = filtered.filter((item) =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            filtered = filtered.filter((item) =>
                subCategory.includes(item.subCategory)
            );
        }

        return filtered;
    }, [category, subCategory, search, showSearch, products]);

    // Sort products by the selected sorting method
    const sortedProducts = useMemo(() => {
        let sorted = [...filteredProducts];

        switch (sortType) {
            case "low-high":
                return sorted.sort((a, b) => a.price - b.price);
            case "high-low":
                return sorted.sort((a, b) => b.price - a.price);
            default:
                return sorted;
        }
    }, [sortType, filteredProducts]);

    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            {/* Filter Options */}
            <div className="min-w-60">
                <p
                    onClick={() => setShowFilter(!showFilter)}
                    className="my-2 text-xl flex items-center cursor-pointer gap-2 "
                >
                    FILTERS
                    <img
                        className={`h-3 sm:hidden ${
                            showFilter ? "rotate-90" : ""
                        }`}
                        src={assets.dropdown_icon}
                        alt="Filter dropdown toggle"
                    />
                </p>
                {/* Category Filter */}
                <div
                    className={`border border-gray-300 pl-5 mt-6 py-3 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Men", "Women", "Kids"].map((cat) => (
                            <p key={cat} className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value={cat}
                                    onChange={toggleCategory}
                                />
                                {cat}
                            </p>
                        ))}
                    </div>
                </div>
                {/* Subcategory Filter */}
                <div
                    className={`border border-gray-300 pl-5 my-5 py-3 ${
                        showFilter ? "" : "hidden"
                    } sm:block`}
                >
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {["Topwear", "Bottomwear", "Winterwear"].map(
                            (subCat) => (
                                <p key={subCat} className="flex gap-2">
                                    <input
                                        className="w-3"
                                        type="checkbox"
                                        value={subCat}
                                        onChange={toggleSubCategory}
                                    />
                                    {subCat}
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* Product Sort */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {/* Map Products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {sortedProducts.map((item, index) => (
                        <ProductItem
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            alt={`Image of ${item.name}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
