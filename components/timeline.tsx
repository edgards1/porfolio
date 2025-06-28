"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Frontend Developer",
    company: "Fidens® Insurtech as a Service",
    period: "Marzo 2024 - Actualidad",
    description:
      "Desarrollo y mantenimiento de interfaces web dinámicas utilizando Angular. Construcción de módulos especializados para plataformas del sector de seguros. Automatización de procesos operativos mediante servicios Windows y optimización de procedimientos almacenados en SQL Server.",
  },
  {
    title: "Front-End Developer",
    company: "Prestto Solutions",
    period: "Junio 2023 – Febrero 2024",
    description:
      "Diseño y desarrollo de interfaces web con HTML5, CSS3 y JavaScript moderno, utilizando React y Angular. Integración de APIs, implementación de prototipos UI/UX de Figma, y aplicación de principios de accesibilidad web (WCAG).",
  },
  {
    title: "Back-End Developer",
    company: "Chiquimudi S.A",
    period: "Noviembre 2022 – Febrero 2023",
    description:
      "Elaboración de modelos UML, colaboración en diseño de base de datos, desarrollo de APIs con Django, implementación de rutas y controladores, y sistemas de autenticación con Auth0.",
  },
  {
    title: "Estudiante",
    company: "Instituto Tecnológico Superior Guayaquil",
    period: "2020 - 2024",
    description:
      "Tecnólogo Superior en Desarrollo de Software. Formación en programación, bases de datos, desarrollo web y metodologías ágiles.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-teal-professional-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-deep-500/10 to-teal-professional-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
