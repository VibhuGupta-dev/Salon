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
      {isLoading ? (
        <Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen overflow-hidden">
 
          <Navbar />

          {/* Main Content */}
          <main className="relative z-10">
            <Home />
            <Service/>
            <Gallery />
            <Contact />
            <Footer />
            {/* Add more sections later */}
          </main>
        </div>
      )}
    </>
  );
}

export default App;