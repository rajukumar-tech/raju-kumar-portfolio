import { motion } from "motion/react";
import { skillGroups } from "../constants";

const Skills = () => {
  return (
    <section className="c-space section-spacing" id="skills">
      <h2 className="text-heading">Skills</h2>
      <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            className="p-6 border rounded-2xl border-white/10 bg-gradient-to-b from-storm to-indigo"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="mb-4 text-xl font-medium text-white">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-white/5 ring-1 ring-white/10 text-neutral-300 hover:bg-royal hover-animation"
                >
                  {skill.path && (
                    <span className="flex items-center justify-center rounded-sm size-5 bg-white/90 p-0.5">
                      <img src={skill.path} alt="" className="size-full" />
                    </span>
                  )}
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
