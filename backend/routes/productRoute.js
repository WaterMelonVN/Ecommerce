import express from "express";
import {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
    updateProduct, // Import the updateProduct function
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Add a new product
productRouter.post(
    "/add",
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    addProduct
);

// Remove a product
productRouter.post("/remove", adminAuth, removeProduct);

// Get details of a single product
productRouter.post("/single", singleProduct);

// List all products
productRouter.get("/list", listProducts);

// Update an existing product
productRouter.post(
    "/update",
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ]),
    updateProduct
);

export default productRouter;
