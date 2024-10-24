import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const UpdateProduct = ({ token }) => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
    });

    const fetchProduct = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/product/single`,
                { productId: id }
            );

            if (response.data.success) {
                setProduct(response.data.product);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("productId", id);
        formData.append("name", product.name);
        formData.append("category", product.category);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity); // Ensure quantity is included

        // Log the FormData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value); // Check the quantity here
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/product/update`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data", token },
                }
            );

            // Log the response for debugging
            console.log("Response from update:", response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Update Product</h2>

            <input
                type="text"
                name="name"
                value={product.name || ""}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="border p-2 rounded"
            />
            <input
                type="text"
                name="category"
                value={product.category || ""}
                onChange={handleChange}
                placeholder="Category"
                required
                className="border p-2 rounded"
            />
            <input
                type="number"
                name="price"
                value={product.price || ""}
                onChange={handleChange}
                placeholder="Price"
                required
                className="border p-2 rounded"
            />
            <input
                type="number"
                name="quantity"
                value={product.quantity || ""}
                onChange={handleChange}
                placeholder="Quantity"
                required
                className="border p-2 rounded"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
            >
                Update Product
            </button>
        </form>
    );
};

export default UpdateProduct;
