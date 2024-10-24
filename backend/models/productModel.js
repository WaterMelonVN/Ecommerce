import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: [{ type: String, required: true }], // Array of image URLs
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: [{ type: String, required: true }], // Assuming sizes are strings
    quantity: { type: Number, required: true, min: 0 }, // Quantity with a minimum value of 0
    bestseller: { type: Boolean, default: false }, // Default value for bestseller
    date: { type: Date, default: Date.now }, // Date field storing current date
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review model
});

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
