import { useState, useEffect } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Scotty B's LEDs transformed our event space with incredible custom lighting. Their attention to detail and creative designs made all the difference.",
    author: "Alex Johnson",
    image: "/images/testimonial1.jpg"
  },
  {
    quote: "We ordered a custom sign for our cafe, and the result was stunning. Scotty B's LEDs not only delivered high-quality work but also excellent customer service.",
    author: "Samantha Bloom",
    image: "/images/testimonial2.jpg"
  },
  {
    quote: "The digital signs from Scotty B's LEDs have been game-changers for our retail business. The quality is unmatched, and they really know how to make a business shine.",
    author: "Michael Reyes",
    image: "/images/testimonial3.jpg"
  },
];

const HeroCarousel = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change the testimonial every 4 seconds

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  return (
    <div className="testimonial-carousel -z-50 relative w-full">
      <div className="testimonial-item text-center px-4 py-8">
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className={`text-xl italic font-semibold text-gray-900 dark:text-white transition-opacity duration-700 ease-in-out ${index === currentTestimonialIndex ? 'opacity-100' : 'opacity-0 absolute'}`}>
            <img src={testimonial.image} alt={`Image of ${testimonial.author}`} className="w-full h-48 object-cover rounded-lg mb-4"/>
            <p>{testimonial.quote}</p>
            <footer className="blockquote-footer">{testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;


