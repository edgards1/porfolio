"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Star, GitFork, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl: string
  repoUrl: string
  stars?: number
  language?: string
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  image, 
  demoUrl, 
  repoUrl,
  stars,
  language 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-teal-professional-500/50 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-deep-500/10 to-teal-professional-500/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative h-full flex flex-col">
          {/* Image Section */}
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            {!imageError ? (
              <img
                src={image}
                alt={title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                <div className="text-center">
                  <Github className="h-12 w-12 mx-auto mb-2 text-zinc-500" />
                  <p className="text-zinc-400 text-sm">{language || 'Project'}</p>
                </div>
              </div>
            )}
            
            {/* GitHub Stats Overlay */}
            {(stars !== undefined || language) && (
              <div className="absolute top-3 left-3 flex gap-2">
                {stars !== undefined && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-white font-medium">{stars}</span>
                  </div>
                )}
                {language && (
                  <div className="px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm">
                    <span className="text-xs text-white font-medium">{language}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6 flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-deep-300 transition-colors">
                {title}
              </h3>
              <p className="text-zinc-400 mb-4 line-clamp-3">{description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tags.slice(0, 4).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 4 && (
                  <Badge 
                    variant="secondary" 
                    className="bg-zinc-700/50 text-zinc-400 text-xs"
                  >
                    +{tags.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-700/50">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-700/50" 
                asChild
              >
                <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Código
                </Link>
              </Button>
              
              {demoUrl && demoUrl !== repoUrl && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 border-0"
                  asChild
                >
                  <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
                    Demo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-3 right-3 z-20">
            <div
              className={`w-3 h-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}