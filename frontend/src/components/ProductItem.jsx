import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img
                    className="hover:scale-110 transition-transform duration-300 ease-in-out"
                    src={image[0]}
                    alt={name} // Improved alt text for accessibility
                    loading="lazy" // Improved performance for images
                />
            </div>
            <p className="pt-3 pb-1 text-sm font-medium">{name}</p>{" "}
            {/* Added font-medium for consistency */}
            <p className="text-sm font-semibold">
                {" "}
                {/* Changed font-medium to font-semibold for price emphasis */}
                {currency}
                {price}
            </p>
        </Link>
    );
};

export default ProductItem;
