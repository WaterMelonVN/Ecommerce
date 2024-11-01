import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary"; // Corrected the import from "cloundinary" to "cloudinary"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Corrected "isMath" to "isMatch"

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password",
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Route for updating user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, email, password } = req.body;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const updateData = {};
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "image",
                });
                updateData.avatar = result.secure_url; // Set the new avatar URL
            } catch (uploadError) {
                console.error("Error uploading avatar:", uploadError);
                return res
                    .status(500)
                    .json({ success: false, message: "Avatar upload failed" });
            }
        }
        if (name) updateData.name = name;
        if (email && email !== user.email) {
            const emailExists = await userModel.findOne({ email });
            if (emailExists) {
                return res.json({
                    success: false,
                    message: "Email already in use",
                });
            }
            updateData.email = email;
        }
        if (email && !validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true } // Return the updated user
        );

        if (updatedUser) {
            return res.json({
                success: true,
                message: "Profile updated successfully",
                user: updatedUser,
            });
        } else {
            return res.json({
                success: false,
                message: "Failed to update profile",
            });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const { userId } = req.body; // Assuming userId is attached to req after authentication middleware

        // Find the user by userId
        const user = await userModel.findById(userId).select("-password"); // Exclude password from the returned user data

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            message: "Profile retrieved successfully",
            user, // Send the user data (without password)
        });
    } catch (error) {
        console.error("Error retrieving profile:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving profile",
        });
    }
};

export { loginUser, registerUser, adminLogin, updateUserProfile, getMyProfile };
