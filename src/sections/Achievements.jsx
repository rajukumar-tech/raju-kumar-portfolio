import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { achievements } from "../constants";

const firstRow = achievements.slice(0, achievements.length / 2);
const secondRow = achievements.slice(achievements.length / 2);

const AchievementCard = ({ icon, title, org, body }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-72 overflow-hidden rounded-xl border p-4 border-gray-50/[.1] bg-gradient-to-r bg-indigo to-storm hover:bg-royal hover-animation"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <span className="flex items-center justify-center text-xl rounded-full size-10 bg-white/10">
          {icon}
        </span>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {title}
          </figcaption>
          <p className="text-xs font-medium text-white/50">{org}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-sm text-neutral-300">{body}</blockquote>
    </figure>
  );
};

export default function Achievements() {
  return (
    <section className="items-start mt-25 md:mt-35 c-space" id="achievements">
      <h2 className="text-heading">Achievements & Certifications</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((item, i) => (
            <AchievementCard key={i} {...item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((item, i) => (
            <AchievementCard key={i} {...item} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </section>
  );
}
