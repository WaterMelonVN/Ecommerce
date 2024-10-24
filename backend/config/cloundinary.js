import { v2 as cloundinary } from "cloudinary";

const connectCloundinary = async () => {
    cloundinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SERECT_KEY,
    });
};

export default connectCloundinary;
