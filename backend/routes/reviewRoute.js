import express from "express";
import reviewModel from "../models/reviewModel.js"; // Adjust the path as necessary
import authUser from "../middleware/auth.js"; // Ensure you have auth middleware for protection

const router = express.Router();

// POST: Add a review
router.post("/add", authUser, async (req, res) => {
    const { productId, content, rating } = req.body; // Include rating here
    const userId = req.body.userId; // Get userId from the auth middleware

    if (!productId || !content || rating === undefined) {
        // Check if rating is included
        return res.status(400).json({
            success: false,
            message: "Product ID, content, and rating are required.",
        });
    }

    try {
        const newReview = new reviewModel({
            productId,
            userId,
            content,
            rating,
        }); // Include rating
        await newReview.save();
        return res
            .status(201)
            .json({ success: true, message: "Review added successfully." });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});

// GET: Get reviews for a product
router.get("/:productId", async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await reviewModel
            .find({ productId })
            .populate("userId", "name"); // Assuming you want user details
        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error." });
    }
});

export default router;
