import React from 'react';
import { ABOUT_IMAGE_URL } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-10 md:py-24 bg-maroon-950 relative scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-16 items-center">
        
        <div className="order-2 md:order-1 relative">
           <img 
            src={ABOUT_IMAGE_URL} 
            alt="Choir singing" 
            className="w-full h-[250px] sm:h-[300px] md:h-[500px] object-cover object-center md:object-center rounded-lg md:rounded-none filter grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity duration-500 shadow-lg md:shadow-none"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Who We Are</h2>
          <h3 className="font-serif text-3xl md:text-5xl text-white mb-6 md:mb-8">Voices United in <br/>Perfect Accord</h3>
          
          <div className="space-y-4 md:space-y-6 text-maroon-100 font-light leading-relaxed text-sm md:text-base">
            <p>
              Heaven’s Harmony is a ministry dedicated to lifting up the name of God through the beauty of blended voices. Formed out of a shared calling to use music for His glory, we combine timeless choral foundations with fresh, spirit-led arrangements that point every listener toward Christ.
            </p>
            <p>
              Whether we’re singing classic hymns, heartfelt gospel, or contemporary worship, our purpose stays the same: to create moments where hearts are stirred, faith is strengthened, and God is honored. Every note we sing is meant to direct attention back to Him.
            </p>
            <p>
              Our vocalists have trained and performed across the country, but our true identity is found in serving together as a family committed to worship, humility, and excellence for the Kingdom.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;