import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } =
        useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    // Memoize cart data to avoid unnecessary recalculations
    const memoizedCartData = useMemo(() => {
        if (products.length > 0) {
            return Object.keys(cartItems).reduce((acc, itemId) => {
                Object.keys(cartItems[itemId]).forEach((size) => {
                    if (cartItems[itemId][size] > 0) {
                        acc.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size],
                        });
                    }
                });
                return acc;
            }, []);
        }
        return [];
    }, [cartItems, products]);

    useEffect(() => {
        setCartData(memoizedCartData);
    }, [memoizedCartData]);

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"CART"} />
            </div>

            {/* Empty Cart State */}
            {cartData.length === 0 ? (
                <p className="text-center text-lg">
                    Your cart is currently empty!
                </p>
            ) : (
                <div>
                    {cartData.map((item) => {
                        const productData = products.find(
                            (product) => product._id === item._id
                        );

                        return (
                            <div
                                key={`${item._id}-${item.size}`}
                                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-start gap-6">
                                    <img
                                        className="w-16 sm:w-20"
                                        src={
                                            productData?.image[0] ||
                                            assets.placeholder_image
                                        }
                                        alt={
                                            productData?.name || "Product Image"
                                        }
                                    />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">
                                            {productData?.name ||
                                                "Product Name"}
                                        </p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>
                                                {currency}
                                                {productData?.price || "0.00"}
                                            </p>
                                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                                {item.size}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantity Input */}
                                <input
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        if (value <= 0 || isNaN(value)) return;
                                        updateQuantity(
                                            item._id,
                                            item.size,
                                            value
                                        );
                                    }}
                                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                    type="number"
                                    min={1}
                                    value={item.quantity} // Control the input value
                                />

                                {/* Remove from Cart Icon */}
                                <button
                                    onClick={() =>
                                        updateQuantity(item._id, item.size, 0)
                                    }
                                    className="w-4 mr-4 sm:w-5 cursor-pointer"
                                    aria-label={`Remove ${
                                        productData?.name || "item"
                                    } from cart`}
                                >
                                    <img
                                        src={assets.bin_icon}
                                        alt="Remove item"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Cart Total and Checkout */}
            {cartData.length > 0 && (
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal />
                        <div className="w-full text-end">
                            <button
                                onClick={() => navigate("/place-order")}
                                className="bg-black text-white text-sm my-8 px-8 py-3"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
