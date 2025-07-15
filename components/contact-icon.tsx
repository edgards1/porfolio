'use client'

import Image from 'next/image'

interface ContactIconProps {
  icon: string
  alt: string
  className?: string
}

export const ContactIcon = ({ icon, alt, className = "w-5 h-5" }: ContactIconProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={icon}
        alt={alt}
        width={20}
        height={20}
        className={`object-contain ${className} group-hover:opacity-100 transition-opacity duration-300`}
        priority={false}
      />
    </div>
  )
}
