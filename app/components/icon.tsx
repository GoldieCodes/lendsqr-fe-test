import Image from "next/image"

interface iconSrc {
  filename: string
  onClick?: () => void
  className?: string
}

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
