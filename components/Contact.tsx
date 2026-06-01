import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, CheckCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xjkdlopn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          _subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`
        })
      });

      if (response.ok) {
        setFormStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        setFormStatus('error');
        setErrorMessage(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="bg-maroon-900 border-t border-maroon-800 scroll-mt-24">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Get In Touch</h2>
          <h3 className="font-serif text-4xl text-white">Book Heavens Harmony</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-10 text-center lg:text-left">
             <p className="text-maroon-100 font-light text-lg">
               We are exclusively available for church events and charity events. Contact us today to discuss your event's musical needs.
             </p>
             
             <div className="space-y-6">
                <div className="flex flex-col lg:flex-row items-center gap-4 text-white group cursor-pointer">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-gold-500 group-hover:text-maroon-950 transition-colors">
                    <Phone size={20} />
                  </div>
                  <span className="font-serif text-xl tracking-wide">(304) 839-1314</span>
                </div>
                
                <div className="flex flex-col lg:flex-row items-center gap-4 text-white group cursor-pointer">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-gold-500 group-hover:text-maroon-950 transition-colors">
                    <Mail size={20} />
                  </div>
                  <span className="font-serif text-xl tracking-wide">heavensharmonygroup@gmail.com</span>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-4 text-white group cursor-pointer">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full group-hover:bg-gold-500 group-hover:text-maroon-950 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <span className="font-serif text-xl tracking-wide">Martinsburg, WV</span>
                </div>
             </div>

             <div className="pt-8 flex justify-center lg:justify-start gap-6">
               <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-maroon-300 hover:text-white transition-colors"><Instagram size={28} /></a>
               <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-maroon-300 hover:text-white transition-colors"><Facebook size={28} /></a>
               <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-maroon-300 hover:text-white transition-colors"><Youtube size={28} /></a>
             </div>
          </div>

          {/* Form */}
          <div className="bg-maroon-950/50 p-8 border border-maroon-800/50">
            {formStatus === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mb-6 text-maroon-950">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-2xl font-serif text-white mb-2">Message Sent!</h4>
                <p className="text-maroon-200">Thank you for contacting Heavens Harmony.<br/>We will be in touch shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-sm text-gold-500 hover:text-white uppercase tracking-widest underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formStatus === 'error' && errorMessage && (
                  <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded">
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-6">
                  <input 
                    required 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name" 
                    className="w-full bg-maroon-950 border border-maroon-800 p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" 
                  />
                  <input 
                    required 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name" 
                    className="w-full bg-maroon-950 border border-maroon-800 p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" 
                  />
                </div>
                <input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address" 
                  className="w-full bg-maroon-950 border border-maroon-800 p-4 text-white focus:outline-none focus:border-gold-500 transition-colors" 
                />
                <textarea 
                  required 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..." 
                  className="w-full bg-maroon-950 border border-maroon-800 p-4 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-white text-maroon-950 font-bold uppercase tracking-widest py-4 hover:bg-gold-500 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <div className="py-8 border-t border-maroon-950 bg-maroon-950 text-center text-maroon-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Heavens Harmony. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
