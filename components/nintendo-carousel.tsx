"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

// Données des stickers
const stickers = [
  {
    id: 1,
    name: "Gake",
    src: "/images/photo1.jpg",
    alt: "Character in red outfit",
    bgColor: "#FF5A5F",
    category: "god candle",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Alon",
    src: "/images/photo2.jpg",
    alt: "Character with sunglasses",
    bgColor: "#FFA726",
    category: "Himothy",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Frank",
    src: "/images/photo3.jpg",
    alt: "Character with necklace",
    bgColor: "#42A5F5",
    category: "Topblastor",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Feed",
    src: "/images/photo4.jpg",
    alt: "Character with AA eyes",
    bgColor: "#66BB6A",
    category: "Wallet tracker FED",
    rating: 4.2,
  },
  {
    id: 5,
    name: "Patty",
    src: "/images/logo.jpg",
    alt: "Blue character with rainbow glasses",
    bgColor: "#AB47BC",
    category: "OG KOLs (no more motion sadly)",
    rating: 4.8,
  },
]

export default function NintendoCarousel() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isHovering, setIsHovering] = useState(false)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleNext = () => {
    console.log("Next clicked")
    setActiveIndex((prev) => (prev + 1) % stickers.length)
  }

  const handlePrev = () => {
    console.log("Prev clicked")
    setActiveIndex((prev) => (prev - 1 + stickers.length) % stickers.length)
  }

  // Auto-rotation
  useEffect(() => {
    if (!isMounted) return

    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current)
    }

    if (!isHovering) {
      autoRotateRef.current = setInterval(() => {
        handleNext()
      }, 2000)
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
      }
    }
  }, [isHovering, isMounted])

  // Calculate card positions with enhanced 3D effect
  const getCardPosition = (index: number) => {
    const diff = (index - activeIndex + stickers.length) % stickers.length
    const normalizedDiff = diff > stickers.length / 2 ? diff - stickers.length : diff

    // Calculate angle for arc positioning with more depth
    const angle = normalizedDiff * 15 // 15 degrees between cards

    // Calculate x and y positions based on angle
    const x = Math.sin(angle * (Math.PI / 180)) * 300
    const y = Math.abs(normalizedDiff) * 20 // Slight elevation for distant cards
    const z = Math.cos(angle * (Math.PI / 180)) * 100 - 100 // Z-depth for 3D effect

    // Calculate scale based on distance from center
    const scale = normalizedDiff === 0 ? 1 : 0.85 - Math.abs(normalizedDiff) * 0.1

    // Calculate opacity
    const opacity = 1 - Math.abs(normalizedDiff) * 0.2

    // Calculate z-index for stacking order
    const zIndex = 100 - Math.abs(normalizedDiff) * 10

    return {
      x,
      y,
      z,
      scale,
      opacity,
      zIndex,
      rotateY: angle, // rotation for perspective effect
      rotateX: normalizedDiff * -2, // slight tilt on X axis
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden bg-white perspective-1500"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-8"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      >
        <motion.h2
          className="text-6xl md:text-7xl font-light tracking-tighter mb-2 text-gray-800"
          animate={{
            textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          stickify
          <motion.div
            className="h-0.5 w-40 bg-gradient-to-r from-amber-300 to-purple-400 rounded-full mx-auto mt-2"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h2>
        <h3 className="text-3xl md:text-4xl font-light mb-6 text-gray-800">Exclusive Collection</h3>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">Discover our carefully selected stickers.</p>
      </div>

      {/* Carousel with 3D effect */}
      <motion.div
        className="relative w-full h-[300px] perspective-1500"
        style={{
          transformStyle: "preserve-3d",
          rotateX: (mousePosition.y - 0.5) * -10,
          rotateY: (mousePosition.x - 0.5) * 10,
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center">
          {stickers.map((sticker, index) => {
            const position = getCardPosition(index)
            const isActive = index === activeIndex

            return (
              <motion.div
                key={`sticker-${sticker.id}-${index}`}
                className="absolute origin-bottom"
                style={{
                  zIndex: position.zIndex,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  x: position.x,
                  y: position.y,
                  z: position.z,
                  scale: position.scale,
                  opacity: position.opacity,
                  rotateY: position.rotateY,
                  rotateX: position.rotateX,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <motion.div
                  className="w-[220px] h-[320px] rounded-3xl overflow-hidden shadow-xl"
                  style={{
                    backgroundColor: sticker.bgColor,
                    boxShadow: isActive
                      ? `0 20px 60px ${sticker.bgColor}66, 0 10px 30px ${sticker.bgColor}33, 0 0 0 2px rgba(255,255,255,0.1)`
                      : `0 10px 30px rgba(0,0,0,0.2)`,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={isActive ? { scale: 1.05, y: -10 } : {}}
                >
                  {/* Card content with 3D layers */}
                  <div
                    className="p-5 h-full flex flex-col"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Card header with 3D effect */}
                    <div
                      className="flex justify-between items-start mb-2"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(20px)",
                      }}
                    >
                      <div>
                        <motion.h3
                          className="text-xl font-light text-white"
                          animate={
                            isActive
                              ? {
                                  textShadow: [
                                    "0px 0px 0px rgba(255,255,255,0)",
                                    "0px 0px 8px rgba(255,255,255,0.5)",
                                    "0px 0px 0px rgba(255,255,255,0)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {sticker.name}
                        </motion.h3>
                        <p className="text-xs text-white/70 font-light">{sticker.category}</p>
                      </div>
                      <div className="flex items-center bg-white/20 rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-white mr-1" fill="white" />
                        <span className="text-xs text-white font-medium">{sticker.rating}</span>
                      </div>
                    </div>

                    {/* Image with 3D effect */}
                    <div
                      className="flex-grow flex items-center justify-center"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: "translateZ(40px)",
                      }}
                    >
                      <motion.div
                        className="relative w-[180px] h-[180px] rounded-xl overflow-hidden"
                        animate={
                          isActive
                            ? {
                                boxShadow: [
                                  "0px 0px 20px rgba(255,255,255,0.2)",
                                  "0px 0px 30px rgba(255,255,255,0.4)",
                                  "0px 0px 20px rgba(255,255,255,0.2)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Image
                          src={sticker.src || "/placeholder.svg"}
                          alt={sticker.alt}
                          fill
                          className="object-cover"
                        />

                        {/* Animated overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                          animate={{
                            opacity: [0, 0.3, 0],
                            background: [
                              "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                              "linear-gradient(225deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                              "linear-gradient(315deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                              "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                            ],
                          }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Auto-scroll indicator moved below the cards */}
      <div className="flex justify-center items-center mt-8 gap-2 text-gray-500 text-sm">
        <motion.div
          className={`w-2 h-2 rounded-full ${isHovering ? "bg-yellow-400" : "bg-green-400"}`}
          animate={
            !isHovering
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }
              : {}
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        />
        <span>{isHovering ? "Scrolling paused" : "Auto-scrolling"}</span>
      </div>
    </div>
  )
}
