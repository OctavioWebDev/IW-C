'use client';

import React from 'react';
import Image from 'next/image';
import mainImage from '/public/images/Image-IWC6.jpeg';

export default function MainSection() {
    return (
        <section className="bg-sky-950 p-8 border-t border-amber-700">
            <div className="container mx-auto mt-10 mb-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 bg-sky-900 overflow-hidden shadow-lg relative">
                        <Image
                            src={mainImage}
                            alt="Integrity Wall and Ceiling"
                            width={800}
                            height={600}
                            objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-amber-700 opacity-60"></div>
                    </div>

                    <div className="md:w-1/2 bg-sky-900 overflow-hidden shadow-lg p-8">
                        <h1 className="tracking-tighter text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Where Quality and Integrity meet</h1>
                        <p className="text-sky-100 mb-4">
                            For we aim at what is honorable not only in the Lord's sight but also in the sight of man.
                        </p>
                        <p className="text-sky-100 mb-4">
                            Corinthians 8:21
                        </p>
                        <p className="text-sky-100">
                            We specialize in providing high-quality solutions tailored to your needs.
                            Whether you're looking for efficient services or innovative products,
                            we're here to help you achieve your goals.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}