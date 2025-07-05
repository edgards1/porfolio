"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "FullStack Developer",
    company: "Fidens® Insurtech as a Service",
    period: "Marzo 2024 - Actualidad",
    description: [
      "🔧 Desarrollo y mantenimiento de interfaces web dinámicas utilizando Angular, aplicando principios de diseño responsivo y buenas prácticas de desarrollo de componentes.",
      "🧩 Construcción de módulos especializados para plataformas del sector de seguros, alineados con requerimientos funcionales y técnicos complejos.",
      "⚙️ Automatización de procesos operativos mediante servicios Windows, orientados a aumentar la eficiencia, reducir errores manuales y optimizar flujos internos.",
      "🗄️ Optimización de procedimientos almacenados en SQL Server con enfoque en el rendimiento de consultas y la integridad de datos.",
      "🤖 Diseño y desarrollo de chatbots utilizando Chattigo, integrando funcionalidades conversacionales para mejorar la experiencia del usuario y automatizar la atención al cliente."
    ],
  },
  {
    title: "Front-End Developer",
    company: "Prestto Solutions",
    period: "Junio 2023 – Febrero 2024",
    description: [
      "🖥️ Diseño y desarrollo de interfaces web mediante tecnologías como HTML5, CSS3 y JavaScript moderno, utilizando frameworks como React y Angular para la creación de componentes dinámicos y reutilizables.",
      "🔌 Integración de librerías externas y APIs para mejorar la funcionalidad y rendimiento de las aplicaciones, priorizando buenas prácticas y arquitectura modular.",
      "🎨 Implementación de prototipos y diseños UI/UX elaborados en Figma, asegurando fidelidad visual y consistencia con la identidad del producto.",
      "📱 Optimización de la experiencia de usuario (UX) en aplicaciones web escalables, garantizando la responsividad en distintos dispositivos y navegadores.",
      "♿ Aplicación de principios de accesibilidad web (WCAG) para el diseño de interfaces inclusivas, asegurando una navegación intuitiva y fluida para todos los usuarios."
    ]
  },
  {
    title: "Back-End Developer",
    company: "Chiquimudi S.A",
    period: "Noviembre 2022 – Febrero 2023",
    description: [
      "📐 Modelado UML: Elaboración de diagramas de clases, casos de uso y secuencia para representar la arquitectura lógica y funcional de la plataforma.",
      "🗃️ Diseño de Base de Datos: Colaboración en la definición de tablas, relaciones y esquemas de datos, asegurando integridad referencial y escalabilidad.",
      "🔗 Desarrollo de APIs REST con Django: Implementación de endpoints para facilitar la comunicación entre el frontend y el backend, siguiendo principios RESTful.",
      "🌐 Gestión de Rutas y Controladores: Configuración de rutas y desarrollo de controladores para manejar solicitudes HTTP (GET, POST, PUT, DELETE).",
      "🔐 Seguridad y Autenticación: Participación en la integración de Auth0 para la autenticación y autorización de usuarios, garantizando el acceso seguro a los recursos de la aplicación."
    ]
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
                <ul className="text-zinc-300 space-y-2">
                  {Array.isArray(experience.description) ? (
                    experience.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        {/* <span className="text-teal-professional-500 mr-2">•</span> */}
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className="text-teal-professional-500 mr-2">•</span>
                      <span>{experience.description}</span>
                    </li>
                  )}
                </ul>
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
