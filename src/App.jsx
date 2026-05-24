import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import Home from "./components/Home";
import Service from './components/Service';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading screen — sirf tab tak render hogi jab tak complete na ho */}
      {isLoading && (
        <Loading onComplete={() => setIsLoading(false)} />
      )}

      {/* 
        Baaki content pehle se DOM mein mount rahegi (video, fonts, images sab preload honge)
        Loading ke dauran sirf invisible rahegi — pointer events bhi band
      */}
      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          opacity: isLoading ? 0 : 1,
          pointerEvents: isLoading ? 'none' : 'auto',
          transition: 'opacity 0.8s ease',
        }}
      >
        <Navbar />
        <main className="relative z-10">
          <Home />
          <Service />
          <Gallery />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;