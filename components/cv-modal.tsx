"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Download, ExternalLink, Eye, Share2, FileText, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CvModal({ isOpen, onClose }: ResumeModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [pdfError, setPdfError] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [shareSupported, setShareSupported] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    setShareSupported(!!navigator.share)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setPdfError(false)
      setDownloadComplete(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true)
      const link = document.createElement("a")
      link.href = "/documents/Edgar-Delgado-CV.pdf"
      link.download = "Edgar-Delgado-CV.pdf"
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setDownloadComplete(true)
      toast({
        title: "Download complete!",
        description: "CV has been downloaded successfully.",
        duration: 3000,
      })
      if (isMobile) setTimeout(() => onClose(), 2000)
    } catch {
      toast({
        title: "Download error",
        description: "There was a problem downloading the CV. Try again.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsDownloading(false)
    }
  }, [isMobile, onClose, toast])

  const handleOpenInNewTab = useCallback(() => {
    window.open("/documents/Edgar-Delgado-CV.pdf", "_blank", "noopener,noreferrer")
    toast({
      title: "PDF opened",
      description: "CV opened in a new tab.",
      duration: 2000,
    })
  }, [toast])

  const handleShare = useCallback(async () => {
    if (shareSupported) {
      try {
        await navigator.share({
          title: "CV - Edgar Eduardo Delgado Scott",
          text: "Curriculum Vitae de Edgar Eduardo Delgado Scott - Full Stack Developer",
          url: `${window.location.origin}/documents/Edgar-Delgado-CV.pdf`,
        })
        toast({ title: "Shared successfully", description: "CV has been shared.", duration: 2000 })
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/documents/Edgar-Delgado-CV.pdf`
        )
        toast({ title: "Link copied", description: "CV link copied to clipboard.", duration: 2000 })
      } catch {
        toast({
          title: "Error copying",
          description: "Could not copy the link. Try manually.",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }, [shareSupported, toast])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <motion.div
            className={`fixed bg-[#18181B]/95 border border-[#27272A] rounded-2xl z-50 flex flex-col overflow-hidden shadow-2xl ${
              isMobile ? "inset-4 h-[90vh]" : "inset-4 md:inset-8 lg:inset-16"
            }`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="relative p-4 md:p-6 border-b border-[#27272A]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-[#FAFAFA]">Curriculum Vitae</h2>
                    <p className="text-[#A1A1AA] text-sm">Edgar Eduardo Delgado Scott &bull; Full Stack Developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(isMobile || shareSupported) && (
                    <Button
                      onClick={handleShare}
                      variant="ghost"
                      size="icon"
                      className="text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] rounded-full"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] rounded-full transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 relative bg-[#09090B] overflow-hidden">
              {isMobile ? (
                <motion.div
                  className="w-full h-full flex items-center justify-center text-[#A1A1AA] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center max-w-sm">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 bg-[#18181B] rounded-2xl flex items-center justify-center border border-[#27272A]"
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <Eye className="h-10 w-10 text-cyan-400" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-[#FAFAFA] mb-3">Mobile Optimized View</h3>
                    <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                      For the best PDF viewing experience, use one of the options below.
                    </p>

                    <div className="space-y-3">
                      <Button
                        onClick={handleOpenInNewTab}
                        className="w-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 h-12 text-base font-medium"
                      >
                        <ExternalLink className="h-5 w-5 mr-3" />
                        Open in New Tab
                      </Button>

                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        variant="outline"
                        className="w-full border-[#27272A] text-[#A1A1AA] hover:bg-[#27272A] hover:text-[#FAFAFA] h-12 text-base font-medium"
                      >
                        {downloadComplete ? (
                          <>
                            <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                            Downloaded!
                          </>
                        ) : isDownloading ? (
                          <>
                            <div className="w-5 h-5 mr-3 border-2 border-[#A1A1AA] border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="h-5 w-5 mr-3" />
                            Download PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-[#09090B]/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                          <div className="text-center">
                            <p className="text-[#FAFAFA] font-medium">Loading CV...</p>
                            <p className="text-[#A1A1AA] text-sm mt-1">Preparing preview</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!pdfError ? (
                    <iframe
                      src="/documents/Edgar-Delgado-CV.pdf#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
                      className="w-full h-full border-0 transition-opacity duration-500"
                      title="Edgar Delgado Resume"
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsLoading(false)
                        setPdfError(true)
                      }}
                    />
                  ) : (
                    <motion.div
                      className="w-full h-full flex items-center justify-center text-[#A1A1AA] p-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[#18181B] rounded-xl flex items-center justify-center border border-[#27272A]">
                          <Eye className="h-8 w-8 text-red-400" />
                        </div>
                        <h3 className="text-lg font-medium text-[#FAFAFA] mb-2">Error loading PDF</h3>
                        <p className="text-[#A1A1AA] mb-4">Could not display the document preview</p>
                        <Button
                          onClick={handleOpenInNewTab}
                          className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            <div className="p-4 border-t border-[#27272A] bg-[#18181B]/80">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs md:text-sm text-[#52525B]">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Updated: {new Date().toLocaleDateString("es-ES")}</span>
                </div>

                {!isMobile && (
                  <Button
                    onClick={handleOpenInNewTab}
                    variant="ghost"
                    size="sm"
                    className="text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    New Tab
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
