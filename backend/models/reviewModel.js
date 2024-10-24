import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }, // Correct reference to User model
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;
