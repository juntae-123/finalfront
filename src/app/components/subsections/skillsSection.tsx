"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaJava, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiTailwindcss,
  SiMysql,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

const skills = [
  { icon: <FaReact className="w-12 h-12" />, name: "React", color: "#61DAFB" },
  {
    icon: <SiNextdotjs className="w-12 h-12" />,
    name: "Next.js",
    color: "#ffffff",
  },
  {
    icon: <SiNestjs className="w-12 h-12" />,
    name: "Nest.js",
    color: "#E0234E",
  },
  { icon: <FaJava className="w-12 h-12" />, name: "Java", color: "#007396" },
  {
    icon: <SiTailwindcss className="w-12 h-12" />,
    name: "Tailwind",
    color: "#38B2AC",
  },
  { icon: <SiHtml5 className="w-12 h-12" />, name: "HTML5", color: "#E34F26" },
  { icon: <SiCss3 className="w-12 h-12" />, name: "CSS3", color: "#1572B6" },
  {
    icon: <SiJavascript className="w-12 h-12" />,
    name: "JavaScript",
    color: "#F7DF1E",
  },
  {
    icon: <SiTypescript className="w-12 h-12" />,
    name: "TypeScript",
    color: "#3178C6",
  },
  { icon: <SiMysql className="w-12 h-12" />, name: "MySQL", color: "#4479A1" },
  { icon: <FaGitAlt className="w-12 h-12" />, name: "Git", color: "#F05032" },
  {
    icon: <FaNodeJs className="w-12 h-12" />,
    name: "Node.js",
    color: "#339933",
  },
];

const SkillsSection = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="mb-4"
                style={{ color: skill.color }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {skill.icon}
              </motion.div>
              <span className="text-white font-medium text-lg">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
