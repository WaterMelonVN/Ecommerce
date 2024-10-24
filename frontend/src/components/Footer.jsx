import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="mt-40">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
                {/* Logo and Description Section */}
                <div>
                    <img
                        src={assets.logo}
                        className="mb-5 w-32"
                        alt="Company Logo"
                    />
                    <p className="w-full md:w-2/3 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Expedita sit eos totam rem eligendi placeat dignissimos?
                        Ea iusto tempora porro quo, nostrum atque, explicabo
                        minus culpa cumque, animi accusantium necessitatibus!
                    </p>
                </div>

                {/* Company Links Section */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>
                            <a href="/" className="hover:underline">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/delivery" className="hover:underline">
                                Delivery
                            </a>
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                className="hover:underline"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Information Section */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>
                            <a
                                href="tel:+84793501081"
                                className="hover:underline"
                            >
                                +84-793-501-081
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:contact@foreveryou.com"
                                className="hover:underline"
                            >
                                contact@foreveryou.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    &copy; 2024 ForeverYou - All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
