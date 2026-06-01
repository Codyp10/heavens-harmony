import React, { useState } from 'react';
import { generateSetlist } from '../services/geminiService';
import { Sparkles, Loader2, Music } from 'lucide-react';

const SetlistGenerator: React.FC = () => {
  const [eventType, setEventType] = useState('');
  const [mood, setMood] = useState('Uplifting');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType) return;

    setLoading(true);
    const suggestion = await generateSetlist(eventType, mood);
    setResult(suggestion);
    setLoading(false);
  };

  return (
    <div id="repertoire" className="py-24 bg-maroon-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-maroon-900 to-transparent opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div>
            <h2 className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">AI Curator</h2>
            <h3 className="font-serif text-4xl text-white mb-6">Design Your Event</h3>
            <p className="text-maroon-100 mb-8 font-light">
              Not sure what music fits your occasion? Use our AI Setlist Curator (powered by Gemini) to visualize the perfect musical atmosphere for your event.
            </p>

            <form onSubmit={handleGenerate} className="space-y-6 bg-white/5 p-8 border border-white/10 backdrop-blur-sm">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-500 mb-2">Event Type</label>
                <input 
                  type="text" 
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g. Summer Wedding, Corporate Gala, Christmas Service"
                  className="w-full bg-maroon-900/50 border border-maroon-700 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gold-500 mb-2">Mood</label>
                <select 
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-maroon-900/50 border border-maroon-700 text-white p-4 focus:outline-none focus:border-gold-500 transition-colors"
                >
                  <option>Uplifting</option>
                  <option>Solemn</option>
                  <option>Romantic</option>
                  <option>Energetic</option>
                  <option>Classical</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={loading || !eventType}
                className="w-full bg-gold-600 hover:bg-gold-500 disabled:bg-gray-600 text-maroon-950 font-bold uppercase tracking-widest py-4 transition-all flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                {loading ? 'Curating...' : 'Generate Setlist'}
              </button>
            </form>
          </div>

          <div className="mt-8 lg:mt-0">
             {result ? (
               <div className="h-full bg-white text-maroon-950 p-8 md:p-12 shadow-2xl relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-white p-3 rounded-full shadow-lg">
                    <Music size={24} />
                  </div>
                  <h4 className="font-serif text-2xl mb-2 text-center border-b-2 border-maroon-100 pb-4">Suggested Repertoire</h4>
                  <p className="text-center text-maroon-600 text-sm italic mb-6">For a {mood.toLowerCase()} {eventType}</p>
                  <div className="whitespace-pre-line font-serif text-lg leading-loose text-center">
                    {result}
                  </div>
               </div>
             ) : (
               <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-maroon-800 p-12 text-center text-maroon-400">
                 <Music size={48} className="mb-4 opacity-50" />
                 <p className="font-light">Enter your event details to see a curated list of songs performed by Heavens Harmony.</p>
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SetlistGenerator;