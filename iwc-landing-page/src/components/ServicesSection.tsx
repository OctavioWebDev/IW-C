'use client';

import React, { useState, useEffect } from 'react';

const services = [
    {
        title: "Drywall Installation",
        description: "Expert installation of drywall on walls and ceilings, ensuring proper alignment and secure attachment."
    },
    {
        title: "Acoustical and Soundproofing Solutions",
        description: "Installing soundproofing materials and constructing acoustical ceilings and walls for improved sound quality."
    },
    {
        title: "Metal Stud Framing",
        description: "Erecting metal stud frames as structural support for drywall installation, ensuring proper alignment and security."
    },
    {
        title: "Fire-Rated Assemblies",
        description: "Installing fire-resistant drywall systems to enhance building safety and ensure compliance with fire codes."
    },
    {
        title: "Insulation Installation",
        description: "Installing various types of insulation within wall and ceiling cavities to improve energy efficiency."
    },
    {
        title: "Texturing and Finishing",
        description: "Custom texturing and finishing services, offering a range of decorative styles from smooth finishes to intricate designs."
    },
    {
        title: "Specialty Wall Systems",
        description: "Construction of specialty wall systems, including curved walls, partitions, and unique architectural features to enhance any space."
    },
];

// Cards visible at once: 1 on phones, 2 from sm (640px), 3 from lg (1024px).
function useCardsPerView() {
    const [perView, setPerView] = useState(1);
    useEffect(() => {
        const update = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return perView;
}

export default function ServicesSection() {
    const perView = useCardsPerView();
    const lastStart = services.length - perView;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev >= lastStart ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [lastStart, paused]);

    const index = Math.min(currentIndex, lastStart);

    return (
        <section className="bg-sky-950 p-8 border-t border-amber-700">
            <div className="container mx-auto mt-10 mb-10">
                <h2 className="tracking-tighter text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Our Services</h2>
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
                    >
                        {services.map((service) => (
                            <div key={service.title} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                                <div className="bg-sky-900 p-6 shadow-lg aspect-square flex flex-col justify-center">
                                    <h3 className="text-xl text-center font-semibold mb-2 text-amber-50">{service.title}</h3>
                                    <p className="text-sky-100 text-center">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: lastStart + 1 }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Show service ${i + 1}`}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? 'bg-amber-600' : 'bg-sky-700 hover:bg-sky-500'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
