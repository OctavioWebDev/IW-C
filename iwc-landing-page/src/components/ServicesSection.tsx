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

export default function ServicesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const transitionTime = 0;
    const slideInterval = 2000;
    const allServices = [...services, ...services.slice(0, 1)];

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % allServices.length);
        }, slideInterval);
      
        return () => clearInterval(timer);
      }, []);
      
      useEffect(() => {
        if (currentIndex === services.length) {
          const timer = setTimeout(() => {
            setCurrentIndex(0);
          }, transitionTime);
          return () => clearTimeout(timer);
        }
      }, [currentIndex]);
      

    return (
        <section className="bg-sky-950 p-8 border-t border-amber-700">
            <div className="container mx-auto mt-10 mb-10">
                <h2 className="tracking-tighter text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-50 to-sky-300">Our Services</h2>
                <div className="relative overflow-hidden">
                    <div 
                        className="flex transition-transform duration-400 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex % services.length) * 100 / 1}%)`,
                            transitionDuration: currentIndex === services.length ? '0ms' : `${transitionTime}ms`
                        }}
                    >
                        {services.map((service, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2">
                                <div className="bg-sky-900 p-6 shadow-lg aspect-square flex flex-col justify-center">
                                    <h3 className="text-xl text-center font-semibold mb-2 text-amber-50">{service.title}</h3>
                                    <p className="text-sky-100 text-center">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}