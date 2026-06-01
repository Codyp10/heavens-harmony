import React from 'react';
import { MEMBERS } from '../constants';

const Members: React.FC = () => {
  return (
    <section id="members" className="py-24 bg-maroon-900 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">The Ensemble</h2>
          <h3 className="font-serif text-4xl text-white">Meet the Voices</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERS.map((member) => (
            <div key={member.id} className="group relative overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-gold-500 font-serif italic text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.role}</p>
                <h4 className="text-white text-xl font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Members;