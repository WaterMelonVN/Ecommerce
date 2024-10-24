import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        // Get the latest 10 products
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <section className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur in praesentium libero inventore impedit
                    provident doloremque.
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item) => (
                    <ProductItem
                        key={item._id} // Use unique ID instead of index for key prop
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </section>
    );
};

export default LatestCollection;
