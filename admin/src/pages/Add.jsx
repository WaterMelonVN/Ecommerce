import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
    const [images, setImages] = useState([null, null, null, null]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [quantity, setQuantity] = useState(""); // New state for quantity
    const [loading, setLoading] = useState(false); // Loading state

    const onsubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true

        // Basic validation
        if (price < 0 || quantity < 1) {
            toast.error(
                "Price must be positive and quantity must be at least 1."
            );
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("quantity", quantity); // Add quantity to form data

            images.forEach((image, index) => {
                if (image) {
                    formData.append(`image${index + 1}`, image);
                }
            });

            const { data } = await axios.post(
                backendUrl + "/api/product/add",
                formData,
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                // Reset form fields
                setName("");
                setDescription("");
                setImages([null, null, null, null]);
                setPrice("");
                setQuantity("");
                setSizes([]);
                setBestseller(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response
                ? error.response.data.message
                : "An error occurred.";
            toast.error(errorMessage);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleImageChange = (index) => (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            // Check for max file size (2MB)
            toast.error("File size must be less than 2MB.");
            return;
        }
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = file;
            return newImages;
        });
    };

    return (
        <form
            onSubmit={onsubmitHandler}
            className="flex flex-col w-full items-start gap-3"
        >
            <div>
                <p className="mb-2">Upload Images</p>
                <div className="flex gap-2">
                    {images.map((image, index) => (
                        <label key={index} htmlFor={`image${index + 1}`}>
                            <img
                                className="w-20"
                                src={
                                    !image
                                        ? assets.upload_area
                                        : URL.createObjectURL(image)
                                }
                                alt={`Preview of image ${index + 1}`}
                            />
                            <input
                                onChange={handleImageChange(index)}
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                                accept="image/*" // Only allow image files
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full max-w-[500px] px-3 py-2"
                    type="text"
                    placeholder="Type here"
                    required
                />
            </div>

            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="w-full max-w-[500px] px-3 py-2"
                    placeholder="Write content here"
                    required
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Sub Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="25"
                        min="0"
                        required
                    />
                </div>

                <div>
                    <p className="mb-2">Product Quantity</p>
                    <input
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        className="w-full px-3 py-2 sm:w-[120px]"
                        type="number"
                        placeholder="Enter quantity"
                        min="1"
                        required
                    />
                </div>
            </div>

            <div>
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((item) => item !== size)
                                        : [...prev, size]
                                )
                            }
                        >
                            <p
                                className={`${
                                    sizes.includes(size)
                                        ? "bg-pink-100"
                                        : "bg-slate-200"
                                } px-3 py-1 cursor-pointer`}
                            >
                                {size}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    onChange={() => setBestseller((prev) => !prev)}
                    checked={bestseller}
                    type="checkbox"
                    id="bestseller"
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                    Add to Bestseller
                </label>
            </div>

            <button
                type="submit"
                className="w-28 py-3 mt-4 bg-black text-white"
                disabled={loading} // Disable button during loading
            >
                {loading ? "Adding..." : "ADD"} {/* Show loading text */}
            </button>
        </form>
    );
};

export default Add;
