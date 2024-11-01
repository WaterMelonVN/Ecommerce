import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    const location = useLocation();
    return (
        <div className="w-[18%] min-h-screen border-r-2">
            <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
                            isActive || location.pathname === "/"
                                ? "bg-gray-200"
                                : ""
                        }`
                    }
                    to="/statistical"
                >
                    <img className="w-5 h-5" src={assets.stats_icon} alt="" />
                    <p className="hidden md:block">Statistical</p>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
                            isActive ? "bg-gray-200" : ""
                        }`
                    }
                    to="/add"
                >
                    <img className="w-5 h-5" src={assets.add_icon} alt="" />
                    <p className="hidden md:block">Add Items</p>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
                            isActive ? "bg-gray-200" : ""
                        }`
                    }
                    to="/list"
                >
                    <img className="w-5 h-5" src={assets.order_icon} alt="" />
                    <p className="hidden md:block">List Items</p>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
                            isActive ? "bg-gray-200" : ""
                        }`
                    }
                    to="/orders"
                >
                    <img className="w-5 h-5" src={assets.order_icon} alt="" />
                    <p className="hidden md:block">Orders</p>
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
                            isActive ? "bg-gray-200" : ""
                        }`
                    }
                    to="/users"
                >
                    <img className="w-5 h-5" src={assets.user_icon} alt="" />
                    <p className="hidden md:block">Users</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
