import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Members from './components/Members';
import Contact from './components/Contact';

function App() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Members />
      <Contact />
    </main>
  );
}

export default App;