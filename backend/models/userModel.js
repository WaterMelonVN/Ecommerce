import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    avatar: { type: String, default: "" }, // Add avatar field
});

// Use capital "User" for the model name
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
