'use client';

import React from 'react';

export default function MainSection() {
    return (
        <section className="bg-gray-800 text-white p-8">
            <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Welcome to Our Website!</h1>
                <p className="text-center">
                    We specialize in providing high-quality solutions tailored to your needs. 
                    Whether you're looking for efficient services or innovative products, 
                    we're here to help you achieve your goals.
                </p>
                <div className="w-full flex justify-center">
                    <img src="/images/your-image.jpg" alt="Your Service" className="max-w-xs md:max-w-lg rounded shadow-lg"/>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Learn More
                </button>
            </div>
        </section>
    );
}

