import type { SVGProps } from 'react'

/** Line-art heart illustration — chambers and vessels suggested, not literal anatomy. Inherits `currentColor`. */
export function AnatomicalHeartIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M100 178 C40 138 20 98 28 68 C34 44 58 32 78 44 C88 50 96 60 100 72 C104 60 112 50 122 44 C142 32 166 44 172 68 C180 98 160 138 100 178 Z" />
        <path d="M100 72 L100 110" opacity={0.6} />
        <path d="M76 86 C84 92 92 98 100 104" opacity={0.5} />
        <path d="M124 86 C116 92 108 98 100 104" opacity={0.5} />
        <path d="M100 40 C96 28 88 18 76 16" opacity={0.45} />
        <path d="M100 40 C104 26 116 16 132 18" opacity={0.45} />
      </g>
    </svg>
  )
}
