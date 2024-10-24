import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext"; // Adjust the import path as needed
import Title from "./Title"; // Ensure you have a Title component

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount();
    const total = subtotal + delivery_fee;

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={"CART"} text2={"TOTALS"} />
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                        {currency}{" "}
                        {subtotal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>
                        {currency}{" "}
                        {delivery_fee.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <strong>Total</strong>
                    <strong>
                        {currency}{" "}
                        {total.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;
