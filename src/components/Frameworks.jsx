import { OrbitingCircles } from "./OrbitingCircles";
import { orbitInner, orbitOuter } from "../constants";

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {orbitOuter.map((skill) => (
          <Icon key={skill} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {orbitInner.map((skill) => (
          <Icon key={skill} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, alt }) => (
  <img src={src} alt={alt} className="duration-200 rounded-sm hover:scale-110" />
);
