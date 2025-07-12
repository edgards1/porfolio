"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Download, ExternalLink, Eye, Share2, FileText, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const checkShareSupport = () => {
      setShareSupported(!!navigator.share)
    }
    
    checkMobile()
    checkShareSupport()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      setPdfError(false)
      setDownloadComplete(false)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])
  
  const handleDownload = useCallback(async () => {
    try {
      setIsDownloading(true)
      
      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a')
      link.href = '/documents/Edgar_Eduardo_Delgado_Scott_CV.pdf'
      link.download = 'Edgar_Eduardo_Delgado_Scott_CV.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Simular tiempo de descarga para UX
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setDownloadComplete(true)
      toast({
        title: "¡Descarga completada!",
        description: "El CV se ha descargado correctamente.",
        duration: 3000,
      })
      
      // Auto cerrar en móvil después de descarga exitosa
      if (isMobile) {
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      toast({
        title: "Error en la descarga",
        description: "Hubo un problema al descargar el CV. Inténtalo de nuevo.",
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsDownloading(false)
    }
  }, [isMobile, onClose, toast])

  const handleOpenInNewTab = useCallback(() => {
    window.open('/documents/Edgar_Eduardo_Delgado_Scott_CV.pdf', '_blank', 'noopener,noreferrer')
    toast({
      title: "PDF abierto",
      description: "El CV se ha abierto en una nueva pestaña.",
      duration: 2000,
    })
  }, [toast])

  const handleShare = useCallback(async () => {
    if (shareSupported) {
      try {
        await navigator.share({
          title: 'CV - Edgar Eduardo Delgado Scott',
          text: 'Curriculum Vitae de Edgar Eduardo Delgado Scott - Full Stack Developer',
          url: `${window.location.origin}/documents/Edgar_Eduardo_Delgado_Scott_CV.pdf`
        })
        toast({
          title: "Compartido exitosamente",
          description: "El CV ha sido compartido.",
          duration: 2000,
        })
      } catch (error) {
        // Usuario canceló o error
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(`${window.location.origin}/documents/Edgar_Eduardo_Delgado_Scott_CV.pdf`)
        toast({
          title: "Enlace copiado",
          description: "El enlace del CV se ha copiado al portapapeles.",
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: "Error al copiar",
          description: "No se pudo copiar el enlace. Inténtalo manualmente.",
          variant: "destructive",
          duration: 3000,
        })
      }
    }
  }, [shareSupported, toast])

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className={`fixed bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-2xl z-50 flex flex-col overflow-hidden shadow-2xl ${
              isMobile ? 'inset-4 h-[90vh]' : 'inset-4 md:inset-8 lg:inset-16'
            }`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with enhanced design */}
            <div className="relative p-4 md:p-6 border-b border-zinc-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-deep-500/5 to-teal-professional-500/5"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">Curriculum Vitae</h2>
                    <p className="text-zinc-400 text-sm">Edgar Eduardo Delgado Scott • Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Share button - only show on mobile or if share is supported */}
                  {(isMobile || shareSupported) && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleShare}
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-all duration-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* PDF Viewer with enhanced UX */}
            <div className="flex-1 relative bg-zinc-950 overflow-hidden">
              {isMobile ? (
                // Enhanced mobile view
                <motion.div 
                  className="w-full h-full flex items-center justify-center text-zinc-400 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center max-w-sm">
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-6 bg-zinc-800/50 rounded-2xl flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Eye className="h-10 w-10 text-blue-deep-400" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-3">Vista Optimizada para Móvil</h3>
                    <p className="text-zinc-400 mb-6 leading-relaxed">
                      Para la mejor experiencia visualizando el PDF, te recomendamos usar las opciones a continuación.
                    </p>
                    
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleOpenInNewTab}
                          className="w-full bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 border-0 h-12 text-base font-medium"
                        >
                          <ExternalLink className="h-5 w-5 mr-3" />
                          Abrir en Nueva Pestaña
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={handleDownload}
                          disabled={isDownloading}
                          variant="outline"
                          className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white h-12 text-base font-medium"
                        >
                          {downloadComplete ? (
                            <>
                              <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                              <p class="text-zinc-800">¡Descargado!</p>
                            </>
                          ) : isDownloading ? (
                            <>
                              <div className="w-5 h-5 mr-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                              Descargando...
                            </>
                          ) : (
                            <>
                              <Download className="h-5 w-5 mr-3 text-zinc-900" />
                               <p class="text-zinc-800">Descargar PDF</p>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Enhanced desktop view
                <>
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 border-3 border-blue-deep-500/30 border-t-blue-deep-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-2 border-2 border-teal-professional-500/30 border-b-teal-professional-500 rounded-full animate-spin animate-reverse"></div>
                          </div>
                          <div className="text-center">
                            <p className="text-white font-medium">Cargando CV...</p>
                            <p className="text-zinc-400 text-sm mt-1">Preparando la vista previa</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!pdfError ? (
                    <iframe
                      src="/documents/Edgar_Eduardo_Delgado_Scott_CV.pdf#toolbar=1&navpanes=1&scrollbar=1&view=FitH"
                      className="w-full h-full border-0 transition-opacity duration-500 ease-in-out"
                      title="Edgar Delgado Resume"
                      onLoad={() => setIsLoading(false)}
                      onError={() => {
                        setIsLoading(false)
                        setPdfError(true)
                      }}
                    />
                  ) : (
                    <motion.div 
                      className="w-full h-full flex items-center justify-center text-zinc-400 p-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800/50 rounded-xl flex items-center justify-center">
                          <Eye className="h-8 w-8 text-red-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Error al cargar el PDF</h3>
                        <p className="text-zinc-400 mb-4">No se pudo mostrar la vista previa del documento</p>
                        <Button
                          onClick={handleOpenInNewTab}
                          className="bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 border-0"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Abrir en Nueva Pestaña
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            {/* Enhanced Footer */}
            <motion.div 
              className="p-4 border-t border-zinc-700/50 bg-zinc-900/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Actualizado: {new Date().toLocaleDateString('es-ES')}</span>
                </div>
                
                {!isMobile && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleOpenInNewTab}
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Nueva Pestaña
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}