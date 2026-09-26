import { mySocials, profile } from "../constants";
const Footer = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-3">
        {mySocials.map((social) => (
          <a href={social.href} key={social.name} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
            <img src={social.icon} className="w-5 h-5" alt={social.name} />
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
    </section>
  );
};

export default Footer;
