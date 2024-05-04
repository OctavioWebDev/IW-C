'use client';

import React from 'react';
import Image from 'next/image';
import img1 from '/public/images/Image-IWC1.jpeg';

export default function MainSection() {
    return (
        <section className="bg-sky-950 p-8">
            <div className="container mx-auto mt-10 mb-10 flex flex-col items-center justify-center space-y-4">
                <h1 className="tracking-tighter text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Where Quality and Integrity meet</h1>
                <p className="text-center">
                For we aim at what is honorable not only in the Lord’s sight but also
                 in the sight of man.
                </p>
                <p className="text-center">
                Corinthians 8:21
                </p>
                <p className="text-center">
                    We specialize in providing high-quality solutions tailored to your needs. 
                    Whether youre looking for efficient services or innovative products, 
                    were here to help you achieve your goals.
                </p>
            </div>
        </section>
    );
}

