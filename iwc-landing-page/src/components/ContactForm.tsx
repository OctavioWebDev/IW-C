'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        isError: false,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitStatus({ message: '', isError: false });

        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID || "",
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "",
            event.currentTarget,
            process.env.REACT_APP_EMAILJS_USER_ID || ""
        )
            .then((result) => {
                console.log('Email successfully sent!', result.text);
                setSubmitStatus({ message: 'Your request has been sent successfully!', isError: false });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
                event.currentTarget.reset();
            }, (error) => {
                console.log('Failed to send the email:', error.text);
                setSubmitStatus({ message: 'Failed to send request. Please try again.', isError: true });
            });
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg">
            <h1 className="text-white text-2xl mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-white mb-2">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full p-2 rounded"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder='First Name'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-white mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full p-2 rounded"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder='Last Name'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-white mb-2">Last Name:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full p-2 rounded"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder='Phone Number'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 rounded"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-white mb-2">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        className="w-full p-2 rounded"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Send
                </button>
            </form>

            {submitStatus.message && (
                <p className={`mt-4 text-sm ${submitStatus.isError ? 'text-red-500' : 'text-green-500'}`}>
                    {submitStatus.message}
                </p>
            )}
        </div>
    );
}


