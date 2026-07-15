"use client"

import { motion } from "framer-motion"

const skillCategories = [
  {
    title: "FRONTEND",
    color: "border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
    textColor: "text-cyan-400",
    skills: [
      { name: "JavaScript", icon: "/img/javascript.svg" },
      { name: "TypeScript", icon: "/img/typescript.svg" },
      { name: "React", icon: "/img/react.svg" },
      { name: "Angular", icon: "/img/angular.svg" },
      { name: "Next.js", icon: "/img/nextjs.svg" },
      { name: "HTML5", icon: "/img/html5.svg" },
      { name: "CSS3", icon: "/img/css-3.svg" },
      { name: "Tailwind", icon: "/img/tailwind.svg" },
      { name: "Bootstrap", icon: "/img/Bootstrap.svg" },
    ],
  },
  {
    title: "BACKEND",
    color: "border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    skills: [
      { name: "NodeJS", icon: "/img/nodejs.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "/img/python.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "Django", icon: "/img/django.svg" },
      { name: "C#", icon: "/img/C-sharp.svg" },
      { name: ".NET", icon: "/img/dotnet.svg" },
      { name: ".NET Core", icon: "/img/NETcore.svg" },
      { name: "FastAPI", icon: "/img/FastAPI.svg" },
    ],
  },
  {
    title: "DEVOPS & TOOLS",
    color: "border-violet-500/30",
    bgColor: "bg-violet-500/5",
    textColor: "text-violet-400",
    skills: [
      { name: "SQL Server", icon: "/img/sql-server.svg" },
      { name: "MySQL", icon: "/img/mysql.svg" },
      { name: "PostgreSQL", icon: "/img/postgresql.svg" },
      { name: "MongoDB", icon: "/img/mongo.svg" },
      { name: "Redis", icon: "/img/Redis.svg" },
      { name: "Claude Code", icon: "/img/ClaudeCode.svg" },
      { name: "Postman", icon: "/img/Postman.svg" },
      { name: "Docker", icon: "/img/Docker.svg" },
      { name: "Git", icon: "/img/Git.svg" },
    ],
  },
]

export function SkillsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {skillCategories.map((category, catIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: catIndex * 0.1 }}
          viewport={{ once: true }}
          className={`rounded-lg border ${category.color} ${category.bgColor} p-5`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className={`text-xs font-mono uppercase tracking-[0.2em] ${category.textColor}`}>
              {category.title}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.03 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center gap-1 p-2 rounded-md hover:bg-black/20 transition-all duration-200"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>
                <span className="text-[10px] font-mono text-[#52525B] group-hover:text-[#A1A1AA] text-center transition-colors duration-200 leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
