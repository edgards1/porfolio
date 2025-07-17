"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { motion } from "framer-motion"
import { Loader2, AlertTriangle } from "lucide-react"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
}

interface ProjectData {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  repoUrl: string
  stars: number
  language: string
}

const GITHUB_USERNAME = "edgards1"

// Mapeo de repositorios para agregar información adicional
const repoEnhancements: Record<string, Partial<ProjectData>> = {
  "portfolio": {
    title: "Portfolio Personal",
    description: "Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS. Incluye animaciones con Framer Motion y diseño responsive.",
    image: "/img/portfolio-preview.jpg"
  },
  "ecommerce-app": {
    title: "E-commerce Application",
    description: "Aplicación de comercio electrónico con React, Node.js y MongoDB. Incluye autenticación, carrito de compras y pasarela de pagos.",
    image: "/img/ecommerce-preview.jpg"
  },
  "task-manager": {
    title: "Gestor de Tareas",
    description: "Aplicación para gestión de tareas con Angular y .NET Core. Incluye autenticación JWT y base de datos SQL Server.",
    image: "/img/taskmanager-preview.jpg"
  },
  "weather-app": {
    title: "Weather Dashboard",
    description: "Dashboard del clima con React y TypeScript. Utiliza APIs externas para mostrar pronósticos en tiempo real.",
    image: "/img/weather-preview.jpg"
  },
  "chat-application": {
    title: "Chat en Tiempo Real",
    description: "Aplicación de chat con Socket.io, Node.js y React. Incluye salas privadas y notificaciones en tiempo real.",
    image: "/img/chat-preview.jpg"
  },
  "blog-cms": {
    title: "Sistema de Blog CMS",
    description: "CMS para blogs desarrollado con Django y Python. Incluye panel administrativo y editor WYSIWYG.",
    image: "/img/blog-preview.jpg"
  }
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    
    const repos: GitHubRepo[] = await response.json()
    
    // Filtrar repositorios relevantes (excluir forks, repos privados, etc.)
    return repos.filter(repo => 
      !repo.name.includes('fork') && 
      repo.description && 
      !repo.name.includes('config') &&
      !repo.name.includes('dotfiles') &&
      repo.stargazers_count >= 0 // Mostrar todos por ahora
    )
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

function transformRepoToProject(repo: GitHubRepo): ProjectData {
  const enhancement = repoEnhancements[repo.name] || {}
  
  // Generar tags basados en el lenguaje, topics y palabras clave
  const tags = [
    repo.language && repo.language,
    ...repo.topics,
    ...getTagsFromDescription(repo.description || ""),
    ...getTagsFromName(repo.name)
  ].filter(Boolean).slice(0, 6) // Limitar a 6 tags

  return {
    title: enhancement.title || formatRepoName(repo.name),
    description: enhancement.description || repo.description || "Proyecto desarrollado con las mejores prácticas de programación.",
    tags: [...new Set(tags)], // Eliminar duplicados
    image: enhancement.image || generatePlaceholderImage(repo.name),
    demoUrl: repo.homepage || `https://${GITHUB_USERNAME}.github.io/${repo.name}`,
    repoUrl: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language || "Multiple"
  }
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getTagsFromDescription(description: string): string[] {
  const techKeywords = [
    'react', 'angular', 'vue', 'nextjs', 'nodejs', 'express', 'django', 
    'flask', 'laravel', 'mongodb', 'mysql', 'postgresql', 'typescript',
    'javascript', 'python', 'java', 'csharp', 'php', 'api', 'rest',
    'graphql', 'websocket', 'docker', 'kubernetes', 'aws', 'azure',
    'firebase', 'tailwind', 'bootstrap', 'sass', 'webpack', 'vite'
  ]
  
  return techKeywords.filter(keyword => 
    description.toLowerCase().includes(keyword)
  )
}

function getTagsFromName(name: string): string[] {
  const nameKeywords = {
    'app': 'Mobile App',
    'web': 'Web App',
    'api': 'API',
    'bot': 'Bot',
    'chat': 'Chat',
    'blog': 'Blog',
    'cms': 'CMS',
    'dashboard': 'Dashboard',
    'ecommerce': 'E-commerce',
    'portfolio': 'Portfolio',
    'weather': 'Weather',
    'task': 'Task Manager',
    'todo': 'To-Do',
    'auth': 'Authentication',
    'payment': 'Payments'
  }
  
  return Object.entries(nameKeywords)
    .filter(([key]) => name.toLowerCase().includes(key))
    .map(([, value]) => value)
}

function generatePlaceholderImage(repoName: string): string {
  // Generar un color basado en el hash del nombre
  const hash = repoName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  const colors = ['blue', 'purple', 'green', 'orange', 'red', 'teal']
  const color = colors[Math.abs(hash) % colors.length]
  
  return `/img/placeholder-${color}.svg?height=400&width=600`
}

export function GitHubProjects() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)
        setError(null)
        
        const repos = await fetchGitHubRepos()
        
        if (repos.length === 0) {
          throw new Error("No se encontraron repositorios públicos")
        }
        
        const transformedProjects = repos
          .slice(0, 6) // Mostrar solo los 6 más recientes
          .map(transformRepoToProject)
        
        setProjects(transformedProjects)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar proyectos")
        // Cargar proyectos de respaldo
        setProjects(getFallbackProjects())
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-deep-500" />
          <p className="text-zinc-400">Cargando proyectos desde GitHub...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-lg font-medium text-white mb-2">Error al cargar proyectos</h3>
        <p className="text-zinc-400 mb-6">{error}</p>
        <p className="text-sm text-zinc-500">Mostrando proyectos de respaldo</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.repoUrl}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            demoUrl={project.demoUrl}
            repoUrl={project.repoUrl}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Proyectos de respaldo en caso de error con la API
function getFallbackProjects(): ProjectData[] {
  return [
    {
      title: "Portfolio Personal",
      description: "Portfolio personal desarrollado con Next.js, TypeScript y Tailwind CSS.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "/img/placeholder.svg?height=400&width=600",
      demoUrl: "https://edgar-portfolio.vercel.app",
      repoUrl: "https://github.com/edgards1/portfolio",
      stars: 0,
      language: "TypeScript"
    },
    {
      title: "Plataforma Web Empresarial",
      description: "Desarrollo de APIs con Django y diseño de base de datos para plataforma web empresarial.",
      tags: ["Django", "Python", "SQL", "Auth0", "UML"],
      image: "/img/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com",
      repoUrl: "https://github.com/edgards1",
      stars: 0,
      language: "Python"
    },
    {
      title: "Interfaces Web Dinámicas",
      description: "Desarrollo de interfaces dinámicas con React y Angular, integración de APIs y optimización UX.",
      tags: ["React", "Angular", "JavaScript", "Figma", "WCAG"],
      image: "/img/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com",
      repoUrl: "https://github.com/edgards1",
      stars: 0,
      language: "JavaScript"
    }
  ]
}