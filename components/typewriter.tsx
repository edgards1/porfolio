"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  loop?: boolean
  className?: string
  lineClassName?: string[]
  mode?: "single" | "multi"
  cursor?: boolean
  cursorChar?: string
  onComplete?: () => void
}

export function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = false,
  className = "",
  lineClassName = [],
  mode = "multi",
  cursor = true,
  cursorChar = "|",
  onComplete,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleTyping = useCallback(() => {
    const fullText = texts[currentTextIndex]

    if (isPaused) return

    if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullText.length) {
        setCurrentText(fullText.substring(0, currentText.length + 1))
      } else {
        // Finished typing current text
        if (mode === "multi" && currentTextIndex === texts.length - 1) {
          // Last text in multi mode - always stop (run only once)
          setIsComplete(true)
          onComplete?.()
          return
        }

        if (!loop && mode === "single" && currentTextIndex === texts.length - 1) {
          // Last text in single mode without loop
          setIsComplete(true)
          onComplete?.()
          return
        }

        // Pause before deleting or moving to next
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          if (mode === "single") {
            setIsDeleting(true)
          } else {
            // Move to next text without deleting
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
            setCurrentText("")
          }
        }, pauseDuration)
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
      } else {
        // Finished deleting
        setIsDeleting(false)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, mode, loop, pauseDuration, onComplete])

  useEffect(() => {
    if (isComplete && !loop) return

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timeout)
  }, [handleTyping, isDeleting, deleteSpeed, speed, isComplete, loop])

  // Render for multi-line mode
  if (mode === "multi") {
    return (
      <div className={className}>
        {texts.map((text, index) => {
          const isCurrentLine = index === currentTextIndex
          const isPreviousLine = index < currentTextIndex
          const lineClass = lineClassName[index] || ""

          return (
            <div key={index} className={`relative ${lineClass}`}>
              {/* Invisible text to reserve space */}
              <span className="invisible" aria-hidden="true">
                {text}
              </span>
              
              {/* Animated text overlay */}
              {(isPreviousLine || isCurrentLine) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {isPreviousLine ? (
                    text
                  ) : isCurrentLine ? (
                    <span className="inline-flex items-center">
                      {currentText}
                      {cursor && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                          className="ml-0.5"
                        >
                          {cursorChar}
                        </motion.span>
                      )}
                    </span>
                  ) : null}
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Render for single-line mode
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className={lineClassName[currentTextIndex] || ""}>
        {currentText}
      </span>
      {cursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="ml-0.5"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  )
}