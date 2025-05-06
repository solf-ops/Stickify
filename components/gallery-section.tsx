"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

const galleryImages = [
  {
    id: 1,
    src: "/images/r15.png",
    alt: "Character with half red face and cigar",
    name: "@KayTheDoc",
    description: "Business & pleasure",
  },
  {
    id: 2,
    src: "/images/r17.png",
    alt: "Dark character in rain with sword",
    name: "@runitbackghost",
    description: "Brooding in the storm",
  },
  {
    id: 3,
    src: "/images/r12.png",
    alt: "Green character with cap drinking",
    name: "@PortaPog",
    description: "Always caffeinated",
  },
  {
    id: 4,
    src: "/images/r14.png",
    alt: "Character with red tentacles",
    name: "@TheSolstice",
    description: "Business with a twist",
  },
  {
    id: 5,
    src: "/images/r13.png",
    alt: "Character smoking with bottle",
    name: "@MarcellxMarcell",
    description: "Living the night",
  },
  {
    id: 6,
    src: "/images/r16.png",
    alt: "Red haired character with halo",
    name: "@SOLFisTooShort",
    description: "Innocent troublemaker",
  },
  {
    id: 7,
    src: "/images/r200.png",
    alt: "Black character with blue floppy disk",
    name: "@traderpow",
    description: "Digital nostalgia",
  },
  {
    id: 8,
    src: "/images/r19.png",
    alt: "Green frog character with McDonald's hat",
    name: "@Gake",
    description: "Fast food enthusiast",
  },
]

// Duplicate the array to create a seamless loop
const extendedGalleryImages = [...galleryImages, ...galleryImages]

export default function GallerySection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [isClient, setIsClient] = useState(false)

  // Force re-render on client side to ensure hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Start the conveyor belt animation
  useEffect(() => {
    if (!isClient) return

    const startAnimation = async () => {
      // Calculate the total width to move (width of all original items)
      const itemWidth = 280 // Width of each item
      const gapWidth = 24 // Gap between items (6 * 4)
      const totalWidth = galleryImages.length * (itemWidth + gapWidth)

      // Start the animation
      await controls.start({
        x: -totalWidth,
        transition: {
          duration: 30, // Adjust speed here - higher number = slower
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      })
    }

    if (!isPaused) {
      startAnimation()
    } else {
      controls.stop()
    }

    return () => {
      controls.stop()
    }
  }, [controls, isPaused, isClient])

  return (
    <div className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-light tracking-tighter mb-4 relative inline-block">
          gallery
          <motion.span
            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-orange-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mt-4">Explore our collection of minimalist stickman characters</p>
      </motion.div>

      {/* Conveyor belt gallery */}
      <div
        className="relative max-w-6xl mx-auto px-4 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        ref={containerRef}
      >
        {isClient && (
          <motion.div className="flex gap-6 py-8" animate={controls} initial={{ x: 0 }}>
            {extendedGalleryImages.map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index, 10) * 0.1 }}
                className="flex-shrink-0 w-[280px]"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 h-full relative"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-5 z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <pattern id={`pattern-${image.id}-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1" fill="black" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#pattern-${image.id}-${index})`} />
                    </svg>
                  </motion.div>

                  {/* Image container with artistic effects */}
                  <div className="relative h-[280px] bg-gray-50 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0"
                      animate={hoveredItem === index ? { opacity: 0.3 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-contain p-4"
                      />
                    </motion.div>

                    {/* Artistic overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0"
                      animate={
                        hoveredItem === index
                          ? {
                              opacity: 1,
                              background: [
                                "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                                "linear-gradient(225deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                                "linear-gradient(315deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                                "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
                              ],
                            }
                          : { opacity: 0 }
                      }
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Text content with artistic animation */}
                  <motion.div
                    className="p-4 text-center relative z-10"
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                  >
                    <motion.h3
                      className="text-xl font-light mb-1"
                      whileHover={{ textShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
                    >
                      {image.name}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-500"
                      animate={hoveredItem === index ? { color: "#6366f1" } : { color: "#6b7280" }}
                      transition={{ duration: 0.3 }}
                    >
                      {image.description}
                    </motion.p>

                    {/* Decorative underline */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300"
                      style={{ width: "30%" }}
                      initial={{ x: "-50%", scaleX: 0, opacity: 0 }}
                      animate={hoveredItem === index ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pause indicator */}
        {isPaused && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600 flex items-center gap-1">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <span>Paused - hover out to resume</span>
          </div>
        )}

        {/* Gradient overlays for fade effect on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  )
}
