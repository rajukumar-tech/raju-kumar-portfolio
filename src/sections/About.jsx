import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import { SafeWebGL } from "../components/SafeWebGL";

// Shown instead of the 3D globe when WebGL is unavailable.
const GlobeFallback = () => (
  <svg viewBox="0 0 200 200" className="size-[22rem] text-white/25" fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="100" cy="100" r="90" />
    <ellipse cx="100" cy="100" rx="45" ry="90" />
    <ellipse cx="100" cy="100" rx="75" ry="90" />
    <line x1="100" y1="10" x2="100" y2="190" />
    <ellipse cx="100" cy="100" rx="90" ry="30" />
    <ellipse cx="100" cy="100" rx="90" ry="62" />
    <line x1="10" y1="100" x2="190" y2="100" />
    <circle cx="128" cy="92" r="4" fill="#ffffff" stroke="none" />
  </svg>
);
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Raju Kumar Munji</p>
            <p className="subtext">
              Third-year B.Tech CSE (AI/ML) student at Atria University. I build
              full-stack web apps and AI-enabled platforms, from a RAG feature at
              IIT Ropar to AI-driven marketplaces and dashboards.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
              CODE IS CRAFT
            </p>
            <Card
              style={{ rotate: "75deg", top: "30%", left: "20%" }}
              text="RAG"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text="REST APIs"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
              text="Data Structures"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text="Full-Stack"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "10%", left: "38%" }}
              text="OOP"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/python.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%" }}
              image="assets/logos/typescript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "5%", left: "10%" }}
              image="assets/logos/nodejs.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Based in Bengaluru</p>
            <p className="subtext">
              India (IST). Open to internships, on-site or remote.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <SafeWebGL fallback={<GlobeFallback />}>
              <Globe />
            </SafeWebGL>
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Looking for an intern who ships? Let's talk.
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headtext">Tech Stack</p>
            <p className="subtext">
              Python, JavaScript and TypeScript across React, Node.js, databases
              and AI/ML tooling to build robust, scalable applications.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
