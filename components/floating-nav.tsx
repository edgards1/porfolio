"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Languages, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { CvModal } from "@/components/cv-modal";
import { useLanguage } from "@/contexts/language-context";

export function FloatingNav() {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button - fixed in top right corner */}
      {isMobile && (
        <motion.div
          className="fixed top-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-deep-500/20 to-teal-professional-500/20 rounded-full blur opacity-50"></div>
            <Button
              variant="ghost"
              size="icon"
              className="relative p-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg text-zinc-400 hover:text-white hover:bg-zinc-700/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Desktop navigation - centered */}
      {!isMobile && (
        <motion.div
          className={`fixed top-6 z-50 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ left: "50%" }}
          initial={{ x: "-50%", y: -100 }}
          animate={{ x: "-50%", y: isVisible ? 0 : -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
            {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-deep-500/20 to-teal-professional-500/20 rounded-full blur opacity-50"></div> */}
            <div className="relative flex items-center justify-center gap-1">
              {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-3 py-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            onClick={handleNavClick}
          >
            {item.name}
          </Link>
              ))}

              <div className="h-6 w-px bg-zinc-700/50 mx-2"></div>

              {/* Language Dropdown - Desktop */}
              <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-300"
          >
            <Languages className="h-4 w-4" />
            <span className="uppercase font-semibold">{language}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                isLangMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 right-0 w-32 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-lg shadow-xl overflow-hidden"
              >
                <button
            onClick={() => {
              setLanguage("es");
              setIsLangMenuOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              language === "es"
                ? "bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
                >
            <span>Español</span>
            {language === "es" && (
              <span className="text-xs">✓</span>
            )}
                </button>
                <button
            onClick={() => {
              setLanguage("en");
              setIsLangMenuOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              language === "en"
                ? "bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
                >
            <span>English</span>
            {language === "en" && (
              <span className="text-xs">✓</span>
            )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
              </div>

              <div className="h-6 w-px bg-zinc-700/50 mx-2"></div>

              <Button
          onClick={() => setIsResumeModalOpen(true)}
          className="bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 text-white border-0 text-sm"
              >
          {t.about.downloadCV}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile menu overlay */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${
            isOpen ? "block" : "hidden"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-8 py-4 text-2xl font-medium text-white hover:text-blue-deep-400 transition-colors"
                onClick={handleNavClick}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Dropdown - Mobile */}
            <motion.div
              className="mt-8 mb-4 w-64"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-full flex items-center justify-between gap-3 px-6 py-3 bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 text-white"
              >
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-zinc-400" />
                  <span className="text-base font-medium">
                    {language === "es" ? "Español" : "English"}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                    isLangMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 overflow-hidden bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50"
                  >
                    <button
                      onClick={() => {
                        setLanguage("es");
                        setIsLangMenuOpen(false);
                        handleNavClick();
                      }}
                      className={`w-full px-6 py-3 text-left text-base font-medium transition-all duration-200 flex items-center justify-between ${
                        language === "es"
                          ? "bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                      }`}
                    >
                      <span>Español</span>
                      {language === "es" && <span className="text-sm">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setIsLangMenuOpen(false);
                        handleNavClick();
                      }}
                      className={`w-full px-6 py-3 text-left text-base font-medium transition-all duration-200 flex items-center justify-between ${
                        language === "en"
                          ? "bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                      }`}
                    >
                      <span>English</span>
                      {language === "en" && <span className="text-sm">✓</span>}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <Button
              onClick={() => setIsResumeModalOpen(true)}
              className="px-8 py-6 mt-2 bg-gradient-to-r from-blue-deep-600 to-teal-professional-600 hover:from-teal-professional-600 hover:to-blue-deep-600 text-white border-0 shadow-lg shadow-blue-deep-500/20"
            >
              {t.about.downloadCV}
            </Button>
          </div>
        </motion.div>
      )}
      {/* Modal CV */}
      <CvModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
}
