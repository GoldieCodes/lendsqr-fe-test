import Image from "next/image"

interface iconSrc {
  filename: string
}

export default function Icon({ filename }: iconSrc) {
  return (
    <span className="icon">
      <Image
        src={`/${filename}`}
        alt={`${filename} icon`}
        width={40}
        height={40}
      />
    </span>
  )
}
