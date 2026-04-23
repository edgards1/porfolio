export const translations = {
  es: {
    // Hero Section
    roles: [
      "Desarrollador de Software",
      "Desarrollador Creativo",
      "Ingeniero FullStack",
      "Ingeniero Frontend",
    ],
    hero: {
      greeting: "Hola, soy",
      name: "Edgar Delgado Scott",
      description: "Desarrollador FullStack con sólida formación técnica y una profunda vocación por la innovación tecnológica.",
      cta: "Ver Proyectos",
    },
    
    // Navigation
    nav: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
    },
    
    // About Section
    about: {
      title: "Sobre mí",
      subtitle: "Lo que hago",
      description1: "Me especializo en diseñar y desarrollar soluciones integrales de software, con dominio tanto del ecosistema Frontend como Backend, aplicando arquitecturas modernas y escalables.",
      description2: "Me apasiona crear interfaces intuitivas y sistemas robustos. Mi enfoque se basa en comprender a fondo la lógica y el flujo entre capas, aplicando buenas prácticas, patrones de diseño y metodologías ágiles con el propósito de crear productos escalables, eficientes y orientados a la experiencia del usuario.",
      description3: "Tengo experiencia trabajando con tecnologías como",
      technologies: "React, Angular, Next.js, Django, .NET, Express",
      databases: "y bases de datos SQL Server y MySQL.",
      name: "Nombre",
      email: "Email",
      location: "Ubicación",
      locationValue: "Guayaquil, Ecuador",
      phone: "Teléfono",
      downloadCV: "Descargar CV",
      available: "Disponible",
    },
    
    // Skills Section
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Mis competencias",
    },
    
    // Projects Section
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Mis repositorios más recientes de GitHub",
      connectedBadge: "Conectado con GitHub",
      viewMore: "¿Te interesa ver más proyectos?",
      viewAllGitHub: "Ver todos en GitHub",
    },
    
    // Experience Section
    experience: {
      title: "Experiencia Laboral",
      subtitle: "Mi trayectoria profesional",
    },
    
    // Contact Section
    contact: {
      title: "Contáctame",
      subtitle: "Trabajemos juntos",
      infoTitle: "Información de Contacto",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      status: "Estado actual",
      availableFreelance: "Disponible para trabajos freelance",
      availableFulltime: "Abierto a oportunidades tiempo completo",
      responseTime: "Tiempo de respuesta: Dentro de 24 horas",
      otherContact: "Otras formas de contacto?",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      discord: "Discord",
    },
    
    // Footer
    footer: {
      rights: "Todos los derechos reservados.",
    },
  },
  
  en: {
    // Hero Section
    roles: [
      "Software Developer",
      "Creative Developer",
      "FullStack Engineer",
      "Frontend Engineer",
    ],
    hero: {
      greeting: "Hello, I'm",
      name: "Edgar Delgado Scott",
      description: "FullStack Developer with solid technical training and a deep passion for technological innovation.",
      cta: "View Projects",
    },
    
    // Navigation
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    
    // About Section
    about: {
      title: "About Me",
      subtitle: "What I do",
      description1: "I specialize in designing and developing comprehensive software solutions, with expertise in both Frontend and Backend ecosystems, applying modern and scalable architectures.",
      description2: "I'm passionate about creating intuitive interfaces and robust systems. My approach is based on deeply understanding the logic and flow between layers, applying best practices, design patterns, and agile methodologies with the purpose of creating scalable, efficient, and user-experience-oriented products.",
      description3: "I have experience working with technologies such as",
      technologies: "React, Angular, Next.js, Django, .NET, Express",
      databases: "and SQL Server and MySQL databases.",
      name: "Name",
      email: "Email",
      location: "Location",
      locationValue: "Guayaquil, Ecuador",
      phone: "Phone",
      downloadCV: "Download CV",
      available: "Available",
    },
    
    // Skills Section
    skills: {
      title: "Technical Skills",
      subtitle: "My competencies",
    },
    
    // Projects Section
    projects: {
      title: "Featured Projects",
      subtitle: "My latest GitHub repositories",
      connectedBadge: "Connected to GitHub",
      viewMore: "Interested in seeing more projects?",
      viewAllGitHub: "View all on GitHub",
    },
    
    // Experience Section
    experience: {
      title: "Work Experience",
      subtitle: "My professional journey",
    },
    
    // Contact Section
    contact: {
      title: "Contact Me",
      subtitle: "Let's work together",
      infoTitle: "Contact Information",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      status: "Current Status",
      availableFreelance: "Available for freelance work",
      availableFulltime: "Open to full-time opportunities",
      responseTime: "Response time: Within 24 hours",
      otherContact: "Other ways to contact?",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      discord: "Discord",
    },
    
    // Footer
    footer: {
      rights: "All rights reserved.",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.es
