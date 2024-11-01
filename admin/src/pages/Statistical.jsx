import React, { useEffect, useState } from "react";
import axios from "axios";
import StatisticalChart from "../components/StatisticalChart";
import { backendUrl } from "../App";

const Statistical = ({ token }) => {
    const [statistics, setStatistics] = useState({
        totalItems: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatistics = async () => {
        if (!token) {
            setError("Token not available. Please log in.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${backendUrl}/api/order/statistic`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setStatistics({
                    totalItems: response.data.statistics.totalItems,
                    totalOrders: response.data.statistics.totalOrders,
                    totalRevenue: response.data.statistics.totalAmountSpent,
                });
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
            setError("Failed to fetch statistics. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Statistical Overview</h1>
            {loading ? (
                <p>Loading statistics...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="border p-4 rounded shadow">
                            <h2 className="text-xl">Total Items</h2>
                            <p className="text-3xl font-semibold">
                                {statistics.totalItems}
                            </p>
                        </div>
                        <div className="border p-4 rounded shadow">
                            <h2 className="text-xl">Total Orders</h2>
                            <p className="text-3xl font-semibold">
                                {statistics.totalOrders}
                            </p>
                        </div>
                        <div className="border p-4 rounded shadow">
                            <h2 className="text-xl">Total Revenue</h2>
                            <p className="text-3xl font-semibold">
                                ${statistics.totalRevenue}
                            </p>
                        </div>
                    </div>
                    <StatisticalChart token={token} />
                </div>
            )}
        </div>
    );
};

export default Statistical;
