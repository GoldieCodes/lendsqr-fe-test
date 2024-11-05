import Image from "next/image"

// THIS DEFINES THE INTERFACE FOR THE CUSTOM ICON COMPONENT USED THROUGHOUT THIS PROJECT
interface iconSrc {
  filename: string
  onClick?: () => void
  className?: string
}

// THE CUSTOM ICON COMPONENT DEFINES A DEPENDABLE STRUCTURE FOR RENDERING SELF-HOSTED ICONS
export default function Icon({ filename, onClick, className }: iconSrc) {
  return (
    <span className={`icon ${className}`} onClick={onClick}>
      <Image
        src={`/${filename}`}
        alt={`${filename} icon`}
        width={40}
        height={40}
      />
    </span>
  )
}
