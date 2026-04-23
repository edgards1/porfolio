"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Twitter, Code2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactSection } from "@/components/contact-section"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { ContactIcon } from "@/components/contact-icon"
import { GitHubProjects } from "@/components/services/github-proyects"
import { Typewriter } from "@/components/typewriter"
import { CvModal } from "@/components/cv-modal"

export default function Portfolio() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <motion.section className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-deep-600 via-teal-professional-500 to-amber-accent-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative px-6 py-2.5 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-200"></span>
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-400"></span>
                    </div>
                    <span className="text-sm font-medium bg-gradient-to-r from-blue-deep-400 via-teal-professional-400 to-amber-accent-400 bg-clip-text text-transparent">
                      <Typewriter
                        texts={["Software Developer", "Creative Developer", "FullStack Developer"]}
                        speed={80}
                        deleteSpeed={40}
                        pauseDuration={2000}
                        loop={true}
                        mode="single"
                        cursor={true}
                        cursorChar="|"
                      />
                    </span>
                  </div>
                </div>
              </motion.div>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-deep-500/20 to-teal-professional-500/20 animate-pulse"></span>
              </div>
            </div>
            <motion.h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              >
              <span className="block">Hola, soy</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-deep-400 to-teal-professional-500">
                Edgar Eduardo Delgado Scott
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-lg sm:text-xl text-zinc-400 max-w-[600px] mx-auto lg:mx-0">
                Desarrollador <Code2 className="w-5 h-5 inline" /> FullStack con +5 años de experiencia, sólida formación técnica y una profunda vocación por la innovación
                tecnológica. Me especializo en la arquitectura y desarrollo de soluciones integrales.
              </p>
            </motion.div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full sm:w-auto flex justify-center lg:justify-start"
              >
                <Link href="#projects">
                  <Button className="relative overflow-hidden group bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 border-0 text-white hover:from-teal-professional-600 hover:to-blue-deep-600">
                    <span className="relative z-10 flex items-center">
                      Ver Proyectos{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-teal-professional-600 to-blue-deep-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </Link>
              </motion.div>

              <div className="flex gap-4 justify-center lg:justify-start">
                <Link href="https://github.com/edgards1" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/edgard-s1" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:edgar_delgado_scott@hotmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
            <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-deep-400 to-teal-professional-500 bg-clip-text text-transparent">
              5+
              </div>
              <p className="text-sm text-zinc-400">Años de Experiencia</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-accent-400 to-teal-professional-500 bg-clip-text text-transparent">
              4+
              </div>
              <p className="text-sm text-zinc-400">Proyectos Freelance Finalizados</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-accent-400 to-teal-professional-500 bg-clip-text text-transparent">
              8K+
              </div>
              <p className="text-sm text-zinc-400">Horas Trabajadas</p>
            </motion.div>
            </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </motion.section>

      {/* Modal CV */}
      <CvModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* About Section */}
      <motion.section 
        id="about" 
        className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto">
          <SectionHeading title="Sobre mi" subtitle="Mi trayectoria" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-12 sm:mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-deep-500/20 to-teal-professional-500/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src="/img/perfil.jpg"
                  alt="Edgar Delgado Scott"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Disponible</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-base sm:text-lg text-zinc-300">
                  Soy un Desarrollador FullStack con sólida formación técnica y una profunda vocación por la innovación
                  tecnológica. Me especializo en la arquitectura y desarrollo de soluciones integrales, dominando tanto
                  el ecosistema Frontend como Backend.
                </p>
                <p className="text-base sm:text-lg text-zinc-300 mt-4">
                  Mi enfoque se basa en comprender a fondo la lógica y el flujo entre capas, aplicando buenas prácticas,
                  patrones de diseño y metodologías ágiles, con el propósito de crear productos escalables, eficientes y
                  orientados a la experiencia del usuario.
                </p>
                <p className="text-base sm:text-lg text-zinc-300 mt-4">
                  Tengo experiencia trabajando con tecnologías como React, Angular, Django, .NET, y bases de datos SQL
                  Server y MySQL. Me apasiona crear interfaces intuitivas y sistemas robustos.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Nombre</div>
                    <p className="font-medium">Edgar Eduardo Delgado Scott</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <p className="font-medium">edgar_delgado_scott@hotmail.com</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Ubicación</div>
                    <p className="font-medium">Guayaquil, Ecuador</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Teléfono</div>
                    <p className="font-medium">0995658194</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    onClick={() => setIsResumeModalOpen(true)}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 text-white border-0"
                  >
                    Descargar CV
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-deep-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto">
          <SectionHeading title="My Skills" subtitle="Tecnologías en las que me desempeño" />

          <motion.div
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {[
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
                { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
                { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
                { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
                { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
                { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 group-hover:border-blue-deep-500/50 group-hover:bg-zinc-800/50 transition-all duration-300">
                    <img 
                      src={skill.icon} 
                      alt={skill.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="text-xs font-medium text-zinc-400 whitespace-nowrap bg-zinc-800 px-2 py-1 rounded">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
      
        <div className="container relative z-10 max-w-7xl mx-auto">
          <SectionHeading title="Proyectos Destacados" subtitle="Mis repositorios más recientes de GitHub" />
          
          {/* Badge indicando conexión con GitHub */}
          <motion.div
            className="flex justify-center mb-8 mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-zinc-300">Conectado con GitHub</span>
              <Github className="h-4 w-4 text-zinc-400" />
            </div>
          </motion.div>
      
          <GitHubProjects />
          
          {/* Call to action para ver más */}
          <motion.div
            className="text-center mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-zinc-400 mb-4">¿Te interesa ver más proyectos?</p>
            <Button
              variant="outline"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              asChild
            >
              <Link 
                href="https://github.com/edgards1" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                Ver todos en GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-deep-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10 max-w-7xl mx-auto">
          <SectionHeading title="Experiencia Laboral" subtitle="Mi trayectoria profesional" />
          <div className="mt-12 sm:mt-16">
            <Timeline />
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Edgar Eduardo Delgado Scott. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
