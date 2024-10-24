// MyProfile.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const MyProfile = () => {
    const { token, backendUrl, navigate, setToken } = useContext(ShopContext);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        cartData: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch user profile data
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/user/my-profile`,
                    {
                        headers: { token },
                    }
                );

                if (response.data.success) {
                    setProfileData(response.data.user);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch profile data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [token, backendUrl, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        try {
            const response = await axios.post(
                `${backendUrl}/api/user/my-profile`,
                profileData,
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("Profile updated successfully!");
                setProfileData(response.data.user); // Update local state with new user data
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto my-10 p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                        setProfileData({
                            ...profileData,
                            email: e.target.value,
                        })
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    disabled // Typically, you may not want to allow users to update their email
                />
            </div>
            <button
                onClick={handleUpdateProfile}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                    isUpdating ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUpdating}
            >
                {isUpdating ? "Updating..." : "Update Profile"}
            </button>
            <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
                Logout
            </button>
        </div>
    );
};

export default MyProfile;
