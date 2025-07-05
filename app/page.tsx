"use client"

import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <span className="relative z-10">Software Developer & Creative Developer</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-deep-500/20 to-teal-professional-500/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-deep-400 to-teal-professional-500">
                Edgar Eduardo Delgado Scott
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-[600px]">
              Desarrollador FullStack con sólida formación técnica y una profunda vocación por la innovación
              tecnológica. Me especializo en la arquitectura y desarrollo de soluciones integrales.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="relative me-4 overflow-hidden group bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 border-0">
                <span className="relative z-10 flex items-center">
                  Ver Proyectos <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-professional-600 to-blue-deep-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
              {/* <Button
                variant="outline"
                className="relative overflow-hidden group border-zinc-700 text-zinc-300 bg-transparent hover:border-transparent transition-all duration-300"
              >
                <span className="relative z-10 flex transition-colors duration-300 group-hover:text-white">
                  Hablemos
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-deep-600/20 to-teal-professional-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 border border-transparent bg-gradient-to-r from-blue-deep-500 to-teal-professional-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                <span className="absolute inset-[1px] bg-zinc-900 rounded-[calc(0.375rem-1px)] group-hover:bg-transparent transition-colors duration-300"></span>
              </Button> */}
            <div className="flex gap-4">
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
          <div className="justify-center hidden sm:block">
            <CreativeHero />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
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
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-300">
                  Soy un Desarrollador FullStack con sólida formación técnica y una profunda vocación por la innovación
                  tecnológica. Me especializo en la arquitectura y desarrollo de soluciones integrales, dominando tanto
                  el ecosistema Frontend como Backend.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  Mi enfoque se basa en comprender a fondo la lógica y el flujo entre capas, aplicando buenas prácticas,
                  patrones de diseño y metodologías ágiles, con el propósito de crear productos escalables, eficientes y
                  orientados a la experiencia del usuario.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  Tengo experiencia trabajando con tecnologías como React, Angular, Django, .NET, y bases de datos SQL
                  Server y MySQL. Me apasiona crear interfaces intuitivas y sistemas robustos.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
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
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">Download Resume</Button>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-deep-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          {/* Tabs filter for technologies */}
          <Tabs defaultValue="all" className="w-full">
            <motion.div 
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <TabsList className="grid grid-cols-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="frontend"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white"
                >
                  Frontend
                </TabsTrigger>
                <TabsTrigger 
                  value="backend"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-deep-600 data-[state=active]:to-teal-professional-600 data-[state=active]:text-white"
                >
                  Backend
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <SkillBadge name="JavaScript" level={90} />
                  <SkillBadge name="TypeScript" level={85} />
                  <SkillBadge name="Angular" level={90} />
                  <SkillBadge name="React" level={80} />
                  <SkillBadge name="HTML5" level={95} />
                  <SkillBadge name="CSS3" level={90} />
                  <SkillBadge name="Bootstrap" level={90} />
                  <SkillBadge name="Tailwind CSS" level={80} />
                  <SkillBadge name="C#" level={80} />
                  <SkillBadge name="Python" level={85} />
                  <SkillBadge name=".NET" level={80} />
                  <SkillBadge name="Django" level={85} />
                  <SkillBadge name="Flask" level={75} />
                  <SkillBadge name="Express" level={75} />
                  <SkillBadge name="SQL Server" level={85} />
                  <SkillBadge name="MySQL" level={80} />
                  <SkillBadge name="Docker" level={70} />
                  <SkillBadge name="Git" level={90} />
                </div>
              </TabsContent>

              <TabsContent value="frontend" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <SkillBadge name="JavaScript" level={90} />
                  <SkillBadge name="TypeScript" level={85} />
                  <SkillBadge name="Angular" level={90} />
                  <SkillBadge name="React" level={80} />
                  <SkillBadge name="HTML5" level={95} />
                  <SkillBadge name="CSS3" level={90} />
                  <SkillBadge name="Bootstrap" level={90} />
                  <SkillBadge name="Tailwind CSS" level={80} />
                </div>
              </TabsContent>

              <TabsContent value="backend" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <SkillBadge name="C#" level={80} />
                  <SkillBadge name="Python" level={85} />
                  <SkillBadge name=".NET" level={80} />
                  <SkillBadge name="Django" level={85} />
                  <SkillBadge name="Flask" level={75} />
                  <SkillBadge name="Express" level={75} />
                  <SkillBadge name="SQL Server" level={85} />
                  <SkillBadge name="MySQL" level={80} />
                  <SkillBadge name="Docker" level={70} />
                  <SkillBadge name="Git" level={90} />
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ProjectCard
              title="Plataforma Web Chiquimudi"
              description="Desarrollo de APIs con Django y diseño de base de datos para plataforma web empresarial."
              tags={["Django", "Python", "SQL", "Auth0", "UML"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
            <ProjectCard
              title="Interfaces Web Prestto Solutions"
              description="Desarrollo de interfaces dinámicas con React y Angular, integración de APIs y optimización UX."
              tags={["React", "Angular", "JavaScript", "Figma", "WCAG"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
            <ProjectCard
              title="Plataforma Fidens Insurtech"
              description="Módulos especializados para el sector seguros con Angular y automatización de procesos."
              tags={["Angular", "SQL Server", "C#", "Chattigo", "Windows Services"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
            <ProjectCard
              title="Sistema de Gestión Web"
              description="Aplicación full-stack con autenticación, panel administrativo y API REST."
              tags={[".NET", "C#", "SQL Server", "Bootstrap"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
            <ProjectCard
              title="Chatbot Conversacional"
              description="Desarrollo de chatbot con Chattigo para automatización de atención al cliente."
              tags={["Chattigo", "JavaScript", "API Integration"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
            <ProjectCard
              title="Dashboard Analytics"
              description="Panel de control con visualización de datos y reportes en tiempo real."
              tags={["React", "TypeScript", "Chart.js", "SQL Server"]}
              image="/img/placeholder.svg?height=400&width=600"
              demoUrl="https://example.com"
              repoUrl="https://github.com/edgards1"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-deep-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-professional-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-deep-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-deep-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">edgar_delgado_scott@hotmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-blue-deep-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">www.linkedin.com/in/edgard-s1/</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-blue-deep-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">github.com/edgards1</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Available for freelance work and full-time opportunities</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-deep-400 to-teal-professional-500">
                Edgar
              </span>
              <span className="text-white">Delgado</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Edgar Eduardo Delgado Scott. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
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
            <Link href="https://www.linkedin.com/in/edgar-delgado-scott" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
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
      </footer>
    </div>
  )
}
