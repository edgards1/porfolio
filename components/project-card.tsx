"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Star, ExternalLink } from "lucide-react"
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
  language: lang,
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
        className="relative h-full overflow-hidden rounded-lg border border-[#27272A] bg-[#18181B] transition-all duration-300 group-hover:border-cyan-500/30 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-full flex flex-col">
          <div className="relative overflow-hidden h-48 bg-[#1f1f23]">
            {!imageError ? (
              <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Github className="h-10 w-10 text-[#52525B]" />
              </div>
            )}

            {(stars !== undefined || lang) && (
              <div className="absolute top-3 left-3 flex gap-2">
                {stars !== undefined && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-black/70">
                    <Star className="h-3 w-3 text-cyan-400" />
                    <span className="text-xs font-mono text-[#FAFAFA]">{stars}</span>
                  </div>
                )}
                {lang && (
                  <div className="px-2 py-1 rounded bg-black/70">
                    <span className="text-xs font-mono text-[#A1A1AA]">{lang}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-5 flex-grow flex flex-col">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2 text-[#FAFAFA] group-hover:text-cyan-400 transition-colors">
                {title}
              </h3>
              <p className="text-sm text-[#A1A1AA] mb-4 line-clamp-3 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {tags.slice(0, 4).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#1f1f23] text-[#A1A1AA] text-xs border border-[#27272A] hover:bg-[#27272A] font-mono"
                  >
                    {tag}
                  </Badge>
                ))}
                {tags.length > 4 && (
                  <Badge variant="secondary" className="bg-[#1f1f23] text-[#52525B] text-xs border border-[#27272A] font-mono">
                    +{tags.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex justify-end items-center pt-4 border-t border-[#27272A]">
              <Button
                // variant="ghost"
                size="sm"
                className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                asChild
              >
                <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-3.5 w-3.5" />
                  <span className="text-xs">Code</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
