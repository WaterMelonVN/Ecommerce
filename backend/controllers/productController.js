import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
            quantity, // Added quantity field
        } = req.body;

        // Extracting uploaded images
        const images = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0],
        ].filter(Boolean); // Filters out undefined images

        // Upload images to Cloudinary
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                try {
                    let result = await cloudinary.uploader.upload(item.path, {
                        resource_type: "image",
                    });
                    return result.secure_url;
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    throw new Error("Image upload failed");
                }
            })
        );

        // Validate and ensure quantity is a number
        if (!quantity || isNaN(quantity) || Number(quantity) < 0) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid quantity" });
        }

        // Construct product data
        const productData = {
            name,
            description,
            category,
            price: Number(price), // Ensure price is a number
            subCategory,
            bestseller: Boolean(bestseller), // Convert bestseller to boolean
            sizes: JSON.parse(sizes), // Assuming sizes is a JSON string of an array
            image: imageUrl, // Array of image URLs from Cloudinary
            quantity: Number(quantity), // Ensure quantity is a number
            date: Date.now(), // Current date
        };

        // Save the product to the database
        const product = new productModel(productData);
        await product.save();

        // Send success response
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log("Error adding product:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to list all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log("Error listing products:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to remove a product by ID
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body; // Ensure ID is provided in the request body
        console.log("Request body:", req.body); // Log the request body for debugging
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error deleting product:", error); // Log detailed error
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Function to get details of a single product by ID
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // Extract productId from request body
        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching single product:", error); // Log detailed error
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body; // Extract the product ID and quantity from the request body
        console.log("Received product ID:", productId);
        console.log("Received quantity:", quantity); // Log the received quantity for debugging

        const updateData = {}; // Prepare an object to hold the updates

        // Check if the product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle image updates if new images are uploaded
        const images = [
            req.files?.image1?.[0],
            req.files?.image2?.[0],
            req.files?.image3?.[0],
            req.files?.image4?.[0],
        ].filter(Boolean); // Filter out any undefined images

        let newImageUrls = []; // Array to store new image URLs

        if (images.length > 0) {
            // Upload new images to Cloudinary
            newImageUrls = await Promise.all(
                images.map(async (item) => {
                    try {
                        let result = await cloudinary.uploader.upload(
                            item.path,
                            {
                                resource_type: "image",
                            }
                        );
                        return result.secure_url; // Get the secure URL of the uploaded image
                    } catch (uploadError) {
                        console.error("Error uploading image:", uploadError);
                        throw new Error("Image upload failed");
                    }
                })
            );
        }

        // Construct update data, preserving existing images
        if (req.body.name) updateData.name = req.body.name;
        if (req.body.description) updateData.description = req.body.description;
        if (req.body.price) updateData.price = Number(req.body.price);
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.subCategory) updateData.subCategory = req.body.subCategory;
        if (req.body.bestseller)
            updateData.bestseller = Boolean(req.body.bestseller);
        if (req.body.sizes) updateData.sizes = JSON.parse(req.body.sizes);

        // Include the quantity in the update data
        if (quantity !== undefined) {
            if (!isNaN(quantity) && Number(quantity) >= 0) {
                updateData.quantity = Number(quantity); // Ensure quantity is a number
            } else {
                return res
                    .status(400)
                    .json({ success: false, message: "Invalid quantity" });
            }
        }

        // If new images were uploaded, add them to the existing images
        if (newImageUrls.length > 0) {
            updateData.image = [...product.image, ...newImageUrls]; // Append new image URLs to existing ones
        } else {
            updateData.image = product.image; // Retain existing images if no new uploads
        }

        // Update product data in the database
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true } // Return the updated product
        );

        if (updatedProduct) {
            return res.json({
                success: true,
                message: "Product updated successfully",
                product: updatedProduct,
            });
        } else {
            return res.json({
                success: false,
                message: "Failed to update product",
            });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
    updateProduct,
};
