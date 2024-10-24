// routes/statisticsRoute.js
import express from "express";
import Product from "../models/product.js";
import Review from "../models/reviewModel.js"; // Import Review model if you have one

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Total number of products
        const totalProducts = await Product.countDocuments();

        // Number of bestseller products
        const bestsellerCount = await Product.countDocuments({
            bestseller: true,
        });

        // Category distribution
        const categoryDistribution = await Product.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
        ]);

        // Min and Max prices
        const minPrice = await Product.find()
            .sort({ price: 1 })
            .limit(1)
            .select("price");
        const maxPrice = await Product.find()
            .sort({ price: -1 })
            .limit(1)
            .select("price");

        // Average rating and total reviews (if you store ratings in reviews)
        const productsWithReviews = await Product.find().populate("reviews");
        const totalReviews = productsWithReviews.reduce(
            (acc, product) => acc + product.reviews.length,
            0
        );
        const averageRating = totalReviews
            ? productsWithReviews.reduce((acc, product) => {
                  const totalRatingForProduct = product.reviews.reduce(
                      (sum, review) => sum + review.rating,
                      0
                  );
                  return acc + totalRatingForProduct;
              }, 0) / totalReviews
            : 0;

        // Format the category distribution data
        const formattedCategoryDistribution = categoryDistribution.reduce(
            (acc, item) => {
                acc[item._id] = item.count;
                return acc;
            },
            {}
        );

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                bestsellerCount,
                categoryDistribution: formattedCategoryDistribution,
                priceRange: {
                    min: minPrice[0]?.price || 0,
                    max: maxPrice[0]?.price || 0,
                },
                totalReviews,
                averageRating: averageRating.toFixed(2), // Return with 2 decimal places
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch statistics",
        });
    }
});

export default router;
