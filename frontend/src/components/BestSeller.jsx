import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            setBestSeller(bestProduct.slice(0, 5));
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [products]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa, nam.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No best sellers available.
                    </p>
                ) : (
                    bestSeller.map((item) => (
                        <ProductItem
                            key={item._id} // Using the item's unique ID as key
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BestSeller;
