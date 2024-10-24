import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
    return (
        <div>
            <section className="text-2xl text-center pt-8 border-t">
                <Title text1={"ABOUT"} text2={"US"} />
            </section>

            <section className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    className="w-full sm:max-w-[450px]"
                    src={assets.about_img}
                    alt="Team working on a project"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aliquam, ex dolores doloribus assumenda libero vitae a
                        corrupti, ratione quaerat est atque alias enim facere
                        fugit, rem quam cupiditate illo. Deserunt.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aspernatur voluptatem obcaecati laudantium illum
                        alias eligendi quos explicabo est! Hic ea minima, ipsa
                        rem culpa tempore expedita nemo temporibus? Optio, eius?
                    </p>
                    <h3 className="text-gray-800 text-lg font-bold">
                        Our Mission
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maiores officia itaque, hic suscipit porro eaque
                        inventore laboriosam sequi autem doloremque nulla unde
                        nisi iusto, saepe fugiat illo. Deleniti, natus tenetur?
                    </p>
                </div>
            </section>

            <section className="text-xl py-4">
                <Title text1={"WHY"} text2={"CHOOSE US"} />
            </section>

            <section className="flex flex-col md:flex-row text-sm mb-20 gap-6">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h4 className="font-bold">Quantity Assurance</h4>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Culpa itaque adipisci ut architecto provident vel vero
                        consectetur quas vitae. Eos reprehenderit adipisci natus
                        sapiente quas pariatur ea repudiandae, ad nobis!
                    </p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h4 className="font-bold">Convenience</h4>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Ullam, omnis. Sint nulla quod, sit, iure dicta
                        unde eligendi commodi tenetur laudantium amet veritatis
                        quam beatae. Optio eaque totam officiis est?
                    </p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <h4 className="font-bold">Exceptional Customer Service</h4>
                    <p className="text-gray-600">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aut vitae porro error unde rerum qui quibusdam!
                        Eos dolorum repudiandae neque rerum cupiditate, repellat
                        maiores ad nam delectus architecto, consectetur culpa.
                    </p>
                </div>
            </section>

            <NewsletterBox />
        </div>
    );
};

export default About;
