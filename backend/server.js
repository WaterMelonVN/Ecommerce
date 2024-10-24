import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloundinary from "./config/cloundinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloundinary();

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRoute); // Add this line for reviews

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT: " + port));
