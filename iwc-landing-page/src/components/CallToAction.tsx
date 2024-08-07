'use client';

import React from 'react';
import Image from 'next/image';
import backgroundImage from '/public/images/Image-IWC3.jpeg';

export default function CallToActionSection() {
    return (
        <section className="relative">
            <Image
                src={backgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-amber-700 opacity-70"></div>
            <div className="relative z-10 p-12">
                <div className="container mx-auto flex flex-col items-center justify-center space-y-6">
                    <h2 className="tracking-tighter text-4xl font-bold text-sky-50 text-center">Ready to Start Your Project?</h2>
                    <p className="text-xl text-sky-100 text-center max-w-2xl">
                        Let Integrity Wall and Ceiling of Toledo bring quality and excellence to your space. Contact us today for a free consultation.
                    </p>
                </div>
            </div>
        </section>
    );
}