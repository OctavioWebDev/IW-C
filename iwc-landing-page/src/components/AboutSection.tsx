'use client';

import React from 'react';
import Image from 'next/image';
import aboutImage from '/public/images/Image-IWC8.jpeg';

const scrollToContact = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
};

export default function AboutSection() {
    return (
        <section className="bg-sky-950 p-8 border-t border-amber-700">
            <div className="container mx-auto mt-10 mb-10">
                <div className="bg-sky-900 overflow-hidden shadow-lg">
                    <div className="p-8">
                        <h2 className="tracking-tighter text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">About Integrity Wall and Ceiling</h2>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 pr-4">
                                <p className="text-sky-100 mb-4">
                                    At Integrity Wall and Ceiling of Toledo, we pride ourselves on delivering top-quality craftsmanship and unparalleled service. With years of experience in the industry, our team of skilled professionals is dedicated to bringing your vision to life.
                                </p>
                                <p className="text-sky-100 mb-6">
                                    We specialize in a wide range of services including drywall installation, ceiling repairs, texturing, and more. Our commitment to integrity means that we always prioritize honesty, transparency, and customer satisfaction in every project we undertake.
                                </p>
                                <button
                                    onClick={scrollToContact}
                                    className="bg-amber-700 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Contact Us
                                </button>
                            </div>
                            <div className="md:w-1/2 mt-6 md:mt-0 relative h-64 md:h-auto">
                                <Image
                                    src={aboutImage}
                                    alt="About Integrity Wall and Ceiling"
                                    layout="fill"
                                    objectFit="cover"
                                />
                                {/* <div className="absolute inset-0 bg-white opacity-50"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}