import React, { useState } from "react";

const NewsletterBox = () => {
    const [email, setEmail] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // Handle the subscription logic here (e.g., API call)
        console.log(`Subscribed with email: ${email}`);
        // Reset the email input after submission
        setEmail("");
    };

    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-gray-800">
                Subscribe now & get 20% off
            </p>
            <p className="text-gray-400 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <form
                onSubmit={onSubmitHandler}
                className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded"
            >
                <input
                    className="w-full sm:flex-1 outline-none border-none py-2 px-3 focus:ring-2 focus:ring-black"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-black text-white text-xs px-10 py-4 rounded hover:bg-gray-800 transition"
                >
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsletterBox;
