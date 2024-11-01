import React, { useEffect, useState, useContext } from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { FaPen } from "react-icons/fa";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordChangeVisible, setIsPasswordChangeVisible] =
        useState(false);
    const { backendUrl, token } = useContext(ShopContext);

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/user/my-profile`,
                    {
                        headers: { token },
                    }
                );
                if (response.data.success) {
                    setUser(response.data.user);
                    setName(response.data.user.name);
                    setEmail(response.data.user.email);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError(
                    err.response?.data?.message || "Error fetching profile"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [backendUrl, token]);

    const updateUserProfile = async () => {
        try {
            const formData = new FormData();
            if (avatarFile) formData.append("avatar", avatarFile); // Include avatar file if present
            formData.append("name", name); // Include name
            formData.append("email", email); // Include email

            const response = await axios.put(
                `${backendUrl}/api/user/update-profile`,
                formData,
                { headers: { token, "Content-Type": "multipart/form-data" } }
            );

            if (response.data.success) {
                setUser(response.data.user); // Update user state with the new user data
                setIsEditing(false);
                setAvatarFile(null);
                setError(null);
            } else {
                setError(response.data.message); // Handle errors
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error updating profile"); // Catch and display errors
        }
    };

    const changePassword = async () => {
        if (!newPassword || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.put(
                `${backendUrl}/api/user/change-password`,
                { password: newPassword },
                { headers: { token } }
            );
            if (response.data.success) {
                setNewPassword("");
                setConfirmPassword("");
                setError(null);
                alert("Password changed successfully!");
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error changing password");
        }
    };

    const togglePasswordChange = () => {
        setIsPasswordChangeVisible((prev) => !prev);
        setError(null); // Reset errors when toggling
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error)
        return <div className="text-red-500 text-center">Error: {error}</div>;

    return (
        <div className="flex flex-col items-center">
            <section className="text-2xl text-center pt-8 border-t">
                <Title text1="MY" text2="PROFILE" />
            </section>
            <section className="my-10 flex flex-col md:flex-row items-center justify-center gap-16">
                <div className="flex justify-center mb-4 md:mb-0 md:w-1/4">
                    {user.avatar && (
                        <div className="relative group">
                            <img
                                className="w-100 sm:max-w-[200px] h-100 sm:h-[200px] rounded-full shadow-lg"
                                src={user.avatar}
                                alt="User Avatar"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setAvatarFile(e.target.files[0])
                                }
                                className="mt-4"
                            />
                            <button
                                onClick={updateUserProfile}
                                className="bg-blue-500 text-white rounded p-2 mt-2"
                            >
                                Change Profile Picture
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center md:w-3/4 text-gray-600 text-center">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border rounded p-2 mb-2 w-full"
                                placeholder="Enter name"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border rounded p-2 mb-2 w-full"
                                placeholder="Enter email"
                            />
                            <button
                                onClick={updateUserProfile}
                                className="bg-blue-500 text-white rounded p-2 mt-2"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-bold">
                                Name: {user.name}{" "}
                                <FaPen
                                    className="inline cursor-pointer ml-2"
                                    onClick={() => setIsEditing(true)}
                                />
                            </h2>
                            <p>
                                Email: {user.email}{" "}
                                <FaPen
                                    className="inline cursor-pointer ml-2"
                                    onClick={() => setIsEditing(true)}
                                />
                            </p>
                        </>
                    )}
                    <button
                        onClick={togglePasswordChange}
                        className="text-blue-500 underline mt-4"
                    >
                        {isPasswordChangeVisible
                            ? "Cancel Password Change"
                            : "Change Password"}
                    </button>
                    {isPasswordChangeVisible && (
                        <div className="mt-4">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border rounded p-2 mb-2 w-full"
                                placeholder="New Password"
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="border rounded p-2 mb-2 w-full"
                                placeholder="Confirm New Password"
                            />
                            <button
                                onClick={changePassword}
                                className="bg-blue-500 text-white rounded p-2 mt-2"
                            >
                                Change Password
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MyProfile;
