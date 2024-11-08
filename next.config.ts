import type { NextConfig } from "next"
import path from "path"
const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@use "variables.scss" as *; @use "mixins.scss" as *;`, // Import files here
  },
  /* other config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
