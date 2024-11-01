import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const StatisticalChart = ({ token }) => {
    const [chartData, setChartData] = useState({
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Sales (Dozens)",
                data: new Array(12).fill(0),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });

    const fetchStatistics = async () => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${backendUrl}/api/order/statistic`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                const monthlySales =
                    response.data.statistics.monthlySales || [];
                const updatedData = monthlySales.map((sale) =>
                    Math.round(sale / 12)
                );

                setChartData((prev) => ({
                    ...prev,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: updatedData,
                        },
                    ],
                }));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
            toast.error("Could not load statistics. Please try again later.");
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [token]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales Data (Dozens)",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Month",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Sales (Dozens)",
                },
                ticks: {
                    beginAtZero: true,
                    precision: 0,
                },
                grid: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)",
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default StatisticalChart;
