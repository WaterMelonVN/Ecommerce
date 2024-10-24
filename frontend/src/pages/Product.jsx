import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { assets } from "../assets/assets";

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, token, backendUrl } =
        useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0); // Default rating is 0 (not selected)
    const [activeTab, setActiveTab] = useState("description");
    const [loading, setLoading] = useState(true);
    const [warningMessage, setWarningMessage] = useState(""); // State for warning message
    const reviewInputRef = useRef(null);

    // Fetch product data
    const fetchProductData = async () => {
        setLoading(true);
        const foundProduct = products.find((item) => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);

            // Fetch reviews for the product
            try {
                const response = await axios.get(
                    `${backendUrl}/api/review/${productId}`
                );
                if (response.data.success) {
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    const handleAddReview = async () => {
        setWarningMessage(""); // Clear previous warning message
        const newReview = reviewInputRef.current.value.trim();

        if (newReview && rating > 0) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/review/add`,
                    {
                        productId: productData._id,
                        content: newReview,
                        rating: rating, // Send the rating
                    },
                    {
                        headers: { token }, // Include token for authorization
                    }
                );

                if (response.data.success) {
                    setReviews([
                        ...reviews,
                        {
                            content: newReview,
                            rating: rating, // Include the rating in the local state
                            date: new Date().toLocaleDateString(),
                        },
                    ]);
                    reviewInputRef.current.value = ""; // Clear the input after submission
                    setRating(0); // Reset the rating
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // Set warning message if input is invalid
            setWarningMessage("Please provide a rating and review content.");
        }
    };

    const ReviewsSection = () => (
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <h2 className="font-bold text-lg">Customer Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-md bg-gray-50"
                    >
                        <p>{review.content}</p>
                        <small className="text-gray-400">{review.date}</small>
                        <div className="text-yellow-500">
                            {`Rating: ${review.rating} stars`}
                        </div>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to leave a review!</p>
            )}
            <div className="mt-4">
                <textarea
                    className="border w-full p-2 rounded-md resize-none overflow-y-auto focus:outline-none focus:border-black focus:ring-0"
                    placeholder="Write your review..."
                    ref={reviewInputRef}
                    rows="5"
                />
                {/* Star Rating Input */}
                <div className="mt-2 flex">
                    <label className="mr-2">Select Rating: </label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img
                            key={star}
                            src={
                                star <= rating
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt={`${star} star`}
                            className="cursor-pointer w-6 h-6"
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                {warningMessage && (
                    <p className="text-red-500 mt-1">{warningMessage}</p>
                )}
                <button
                    className="bg-black text-white px-4 py-2 mt-2"
                    onClick={handleAddReview}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );

    if (loading) {
        return <div>Loading product details...</div>;
    }

    if (!productData) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="border-t-2 pt-10">
            {/* --- Product Content --- */}
            <div className="flex gap-12 flex-col sm:flex-row">
                {/* --- Product Images --- */}
                <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex overflow-x-auto sm:w-[18.7%] w-full">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className="w-[24%] sm:w-full cursor-pointer"
                                alt="Product"
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w[80%]">
                        <img
                            className="w-full h-auto"
                            src={image}
                            alt="Product"
                        />
                    </div>
                </div>
                {/* --- Product Info --- */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">
                        {productData.name}
                    </h1>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500">
                        {productData.description}
                    </p>
                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 ${
                                        item === size ? "border-orange-500" : ""
                                    }`}
                                    key={index}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="bg-black text-white px-8 py-3 text-sm"
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* --- Description & Review Tabs --- */}
            <div className="mt-20">
                <div className="flex">
                    <b
                        className={`border px-5 py-3 text-sm cursor-pointer ${
                            activeTab === "description" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setActiveTab("description")}
                    >
                        Description
                    </b>
                    <b
                        className={`border px-5 py-3 text-sm cursor-pointer ${
                            activeTab === "reviews" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        Reviews ({reviews.length})
                    </b>
                </div>
                <div className="border px-6 py-6">
                    {activeTab === "description" ? (
                        <p className="text-sm text-gray-500">
                            {productData.description}
                        </p>
                    ) : (
                        <ReviewsSection />
                    )}
                </div>
            </div>

            {/* Related Products */}
            {productData.category && productData.subCategory && (
                <RelatedProducts
                    category={productData.category}
                    subCategory={productData.subCategory}
                />
            )}
        </div>
    );
};

export default Product;
