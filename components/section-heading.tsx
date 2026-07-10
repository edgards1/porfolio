"use client"

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center space-y-3">
      {subtitle && (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#52525B]">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tight text-[#FAFAFA]">
        {title}
      </h2>
    </div>
  )
}
