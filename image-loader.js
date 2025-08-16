export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  // Handle external URLs
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src
  }

  // Handle your actual logo images
  if (src.includes("compsoft-logo.jpg")) {
    return `${basePath}/images/compsoft-logo.jpg`
  }

  if (src.includes("partners.jpg")) {
    return `${basePath}/images/partners.jpg`
  }

  if (src.includes("clients.jpg")) {
    return `${basePath}/images/clients.jpg`
  }

  // Handle placeholder images
  if (src.includes("placeholder.svg")) {
    return `https://via.placeholder.com/${width}x${Math.round(width * 0.6)}/1e293b/22d3ee?text=Logo`
  }

  // Handle local images
  return `${basePath}${src}`
}
