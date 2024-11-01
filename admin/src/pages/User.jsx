import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Users = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchUsers = async () => {
        if (!token) {
            toast.error("No token provided!");
            setLoading(false); // Stop loading if no token
            return;
        }

        try {
            console.log("Sending request to backend with token:", token);
            const response = await axios.get(
                `${backendUrl}/api/user/all`, // Ensure this matches the backend route
                { headers: { Authorization: `Bearer ${token}` } } // Use Bearer token format
            );

            if (response.data.success) {
                setUsers(response.data.users);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to fetch users. Please try again."
            );
        } finally {
            setLoading(false); // Stop loading in both success and error cases
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {loading ? ( // Show loading message while fetching
                <p className="text-lg">Loading users...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {users.length === 0 ? ( // Check if there are no users
                        <p className="text-lg">No users found.</p>
                    ) : (
                        users.map(
                            (
                                { _id, name, email } // Destructure user properties
                            ) => (
                                <div
                                    className="border p-4 rounded shadow"
                                    key={_id}
                                >
                                    <p className="text-lg font-semibold">
                                        {name}
                                    </p>
                                    <p className="text-sm">{email}</p>
                                </div>
                            )
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Users;
