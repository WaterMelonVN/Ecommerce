import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const InputField = ({ name, value, onChange, placeholder, type = "text" }) => (
    <input
        required
        onChange={onChange}
        name={name}
        value={value}
        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        type={type}
        placeholder={placeholder}
    />
);

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const [loading, setLoading] = useState(false);

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products,
    } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let orderItems = [];

            Object.keys(cartItems).forEach((itemId) => {
                Object.keys(cartItems[itemId]).forEach((size) => {
                    if (cartItems[itemId][size] > 0) {
                        const product = products.find((p) => p._id === itemId);
                        if (product) {
                            const itemInfo = {
                                ...structuredClone(product),
                                size,
                                quantity: cartItems[itemId][size],
                            };
                            orderItems.push(itemInfo);
                        }
                    }
                });
            });

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            let response;
            if (method === "cod") {
                response = await axios.post(
                    `${backendUrl}/api/order/place`,
                    orderData,
                    {
                        headers: { token },
                    }
                );
            } else {
                // Handle other payment methods like Bank Transfer and PayPal
            }

            if (response.data?.success) {
                setCartItems({});
                toast.success("Order placed successfully!");
                navigate("/orders");
            } else {
                toast.error(response.data?.message || "Failed to place order.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:py-14 min-h-[80vh] border-t"
        >
            {/* ------------- Left Side ------------- */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <Title text1="DELIVERY" text2="INFORMATION" />
                <div className="flex gap-3">
                    <InputField
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        placeholder="First name"
                    />
                    <InputField
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        placeholder="Last name"
                    />
                </div>
                <InputField
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    placeholder="Email address"
                />
                <InputField
                    name="street"
                    value={formData.street}
                    onChange={onChangeHandler}
                    placeholder="Street"
                />
                <div className="flex gap-3">
                    <InputField
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        placeholder="City"
                    />
                    <InputField
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        placeholder="State"
                    />
                </div>
                <div className="flex gap-3">
                    <InputField
                        name="zipcode"
                        type="number"
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                        placeholder="Zipcode"
                    />
                    <InputField
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        placeholder="Country"
                    />
                </div>
                <InputField
                    name="phone"
                    type="number"
                    value={formData.phone}
                    onChange={onChangeHandler}
                    placeholder="Phone"
                />
            </div>

            {/* ------------- Right Side ------------- */}
            <div className="mt-8">
                <CartTotal />
                <div className="mt-12">
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div className="flex flex-col gap-3 lg:flex-row">
                        <div
                            onClick={() => setMethod("paypal")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "paypal" ? "bg-green-400" : ""
                                }`}
                            ></p>
                            <img
                                className="h-5"
                                src={assets.paypal} // Make sure to add PayPal logo to your assets
                                alt="PayPal"
                            />
                            <p className="text-gray-500 text-sm font-medium">
                                PayPal
                            </p>
                        </div>
                        <div
                            onClick={() => setMethod("bank")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "bank" ? "bg-green-400" : ""
                                }`}
                            ></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">
                                BANK TRANSFER
                            </p>
                        </div>
                        <div
                            onClick={() => setMethod("cod")}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full ${
                                    method === "cod" ? "bg-green-400" : ""
                                }`}
                            ></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">
                                CASH ON DELIVERY
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full text-end mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-black text-white px-16 py-3 test-sm ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? "Placing Order..." : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
