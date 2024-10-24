import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
    return (
        <div>
            <section className="text-center text-2xl pt-10 border-t">
                <Title text1={"CONTACT"} text2={"US"} />
            </section>

            <section className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
                <img
                    className="w-full md:max-w-[480px]"
                    src={assets.contact_img}
                    alt="Store front with contact information"
                    loading="lazy"
                />
                <address className="flex flex-col justify-center items-start gap-6 not-italic">
                    <p className="font-semibold text-xl text-gray-600">
                        Our Store
                    </p>
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet. <br /> Lorem ipsum dolor
                        sit.
                    </p>
                    <p className="text-gray-500">
                        Tel: <a href="tel:+14155550132">0918780789</a> <br />
                        Email:
                        <a href="mailto:admin@forever.com">admin@gmail.com</a>
                    </p>
                    <p className="font-semibold text-xl text-gray-600">
                        Careers at Forever
                    </p>
                    <p className="text-gray-500">
                        Learn more about our teams and job openings.
                    </p>
                    <button
                        className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
                        aria-label="Explore job opportunities at Forever"
                    >
                        Explore Jobs
                    </button>
                </address>
            </section>

            <NewsletterBox />
        </div>
    );
};

export default Contact;
