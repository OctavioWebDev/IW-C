'use client'

import React from 'react';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <h1 className="text-lg font-bold">Your Logo Here</h1>
                </div>
            </div>
        </header>
    );
}

