import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ChatTwin from "./components/ChatTwin";
import { Particles } from "./components/Particles";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      {/* Page-wide starfield. The hero's sky image covers it at the top. */}
      <div className="fixed inset-0 pointer-events-none -z-50" aria-hidden="true">
        <Particles className="size-full" quantity={180} ease={80} color="#ffffff" refresh />
      </div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experiences />
      <Achievements />
      <Contact />
      <Footer />
      <ChatTwin />
    </div>
  );
};

export default App;
