import type { NextConfig } from "next"
import path from "path"

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  /* other config options here */
  webpack: (config, options) => {
    // Keep any existing webpack modifications
    if (typeof nextConfig.webpack === "function") {
      config = nextConfig.webpack(config, options)
    }

    // Add our new resolution settings
    config.resolve.extensions = [
      ".tsx",
      ".ts",
      ".js",
      ".jsx",
      ...config.resolve.extensions,
    ]
    config.resolve.modules = ["node_modules", "./", ...config.resolve.modules]

    return config
  },
}
