"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import NintendoCarousel from "@/components/nintendo-carousel"
import GallerySection from "@/components/gallery-section"
import { ChevronDown, Sparkles, Star, Zap, Palette } from "lucide-react"
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const catalogueRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const controls = useAnimation()
  const { scrollYProgress } = useScroll()
  const mainRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("hero")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Transformations basées sur le défilement
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -5])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    setIsLoaded(true)
    controls.start("visible")

    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Déterminer la section active
      const heroSection = 0
      const catalogueSection = catalogueRef.current?.offsetTop || 0
      const gallerySection = galleryRef.current?.offsetTop || 0

      if (window.scrollY >= gallerySection - 300) {
        setActiveSection("gallery")
      } else if (window.scrollY >= catalogueSection - 300) {
        setActiveSection("catalogue")
      } else {
        setActiveSection("hero")
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [controls])

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  // Particules animées
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 6 + 2
      const initialX = Math.random() * 100
      const initialY = Math.random() * 100
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5

      return (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-amber-300/30 to-purple-300/30"
          style={{
            width: size,
            height: size,
            left: `${initialX}%`,
            top: `${initialY}%`,
            filter: "blur(1px)",
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, Math.random() + 0.5, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: duration,
            delay: delay,
            ease: "easeInOut",
          }}
        />
      )
    })
  }

  // Éléments artistiques aléatoires
  const generateRandomShapes = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 100 + 50
      const x = Math.random() * 100
      const y = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 10 + 15
      const opacity = Math.random() * 0.15 + 0.05

      return (
        <motion.div
          key={`shape-${i}`}
          className="absolute rounded-full mix-blend-multiply"
          style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
            background:
              i % 3 === 0
                ? "rgba(255, 184, 108, 0.4)"
                : i % 3 === 1
                  ? "rgba(166, 218, 255, 0.4)"
                  : "rgba(175, 143, 233, 0.4)",
            opacity,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() * 0.5 + 0.8, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: duration,
            delay: delay,
            ease: "easeInOut",
          }}
        />
      )
    })
  }

  // Lignes artistiques
  const generateArtisticLines = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const thickness = Math.random() * 1 + 0.5
      const length = Math.random() * 30 + 10
      const x = Math.random() * 100
      const y = Math.random() * 100
      const rotation = Math.random() * 360
      const delay = Math.random() * 3
      const duration = Math.random() * 8 + 10
      const opacity = Math.random() * 0.15 + 0.05

      return (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-black/10"
          style={{
            width: `${length}vw`,
            height: thickness,
            left: `${x}%`,
            top: `${y}%`,
            transformOrigin: "center",
            rotate: rotation,
            opacity,
          }}
          animate={{
            rotate: [rotation, rotation + 20, rotation],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: duration,
            delay: delay,
            ease: "easeInOut",
          }}
        />
      )
    })
  }

  // Effet de curseur personnalisé
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: 0.5,
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      opacity: 0.1,
      mixBlendMode: "difference" as const,
    },
  }

  // Card animation data - reduced size by 25% and better distributed
  const cardAnimations = [
    {
      id: 1,
      position: { left: "10%", top: "20%" },
      size: "w-[90px] h-[90px] md:w-[135px] md:h-[135px]",
      transform: "translateZ(50px) rotateX(5deg) rotateY(-5deg)",
      float: {
        y: [-15, 15, -15],
        transition: {
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      image: "/images/photo1.jpg",
      alt: "Character in red outfit",
    },
    {
      id: 2,
      position: { right: "15%", top: "25%" },
      size: "w-[75px] h-[75px] md:w-[120px] md:h-[120px]",
      transform: "translateZ(30px) rotateX(-5deg) rotateY(5deg)",
      float: {
        y: [10, -10, 10],
        transition: {
          duration: 7,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      image: "/images/photo2.jpg",
      alt: "Character with sunglasses",
    },
    {
      id: 3,
      position: { left: "20%", bottom: "25%" },
      size: "w-[105px] h-[105px] md:w-[150px] md:h-[150px]",
      transform: "translateZ(70px) rotateX(10deg) rotateY(-10deg)",
      float: {
        y: [-20, 20, -20],
        transition: {
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      image: "/images/logo.jpg",
      alt: "Blue character with rainbow glasses",
    },
    {
      id: 4,
      position: { right: "30%", top: "45%" },
      size: "w-[68px] h-[68px] md:w-[105px] md:h-[105px]",
      transform: "translateZ(40px) rotateX(-8deg) rotateY(8deg)",
      float: {
        y: [15, -15, 15],
        transition: {
          duration: 5,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      image: "/images/photo3.jpg",
      alt: "Character with necklace",
    },
    {
      id: 5,
      position: { right: "20%", bottom: "20%" },
      size: "w-[90px] h-[90px] md:w-[135px] md:h-[135px]",
      transform: "translateZ(60px) rotateX(-5deg) rotateY(5deg)",
      float: {
        y: [5, -25, 5],
        transition: {
          duration: 9,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse" as const,
        },
      },
      image: "/images/photo4.jpg",
      alt: "Character with AA eyes",
    },
  ]

  return (
    <main className="bg-white relative overflow-hidden" style={{ perspective: "1500px" }}>
      {/* Curseur personnalisé */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-purple-400 mix-blend-difference pointer-events-none z-50"
        variants={cursorVariants}
        animate="default"
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Particules d'arrière-plan */}
      <div className="fixed inset-0 pointer-events-none z-0">{generateParticles(30)}</div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 bg-white/70 backdrop-blur-md"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          onClick={scrollToTop}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="w-10 h-10 relative"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(10px)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M6 12H18M6 12L10 8M6 12L10 16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
            <motion.div
              className="absolute -inset-1 rounded-full bg-amber-200/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
          <motion.span
            className="font-bold text-xl relative"
            whileHover={{ textShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(10px)",
            }}
          >
            stickify
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-purple-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </motion.div>

        <div
          className="flex gap-8 text-gray-600"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <Link href="/create" className="relative group">
            <motion.span
              className="hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)",
              }}
            >
              create
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-purple-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -inset-2 rounded-lg bg-amber-100/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </Link>
          <button onClick={scrollToCatalogue} className="relative group">
            <motion.span
              className="hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)",
              }}
            >
              explore
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-purple-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -inset-2 rounded-lg bg-amber-100/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </button>
          <button onClick={scrollToGallery} className="relative group">
            <motion.span
              className="hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(10px)",
              }}
            >
              gallery
            </motion.span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-purple-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -inset-2 rounded-lg bg-amber-100/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Indicateur de section */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40">
        <motion.button
          className={`w-3 h-3 rounded-full ${activeSection === "hero" ? "bg-gradient-to-r from-amber-400 to-purple-400" : "bg-gray-300"}`}
          onClick={scrollToTop}
          whileHover={{ scale: 1.5 }}
          animate={
            activeSection === "hero"
              ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 0px 10px rgba(251, 191, 36, 0.5)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                }
              : {}
          }
          transition={{
            repeat: activeSection === "hero" ? Number.POSITIVE_INFINITY : 0,
            duration: 2,
          }}
        />
        <motion.button
          className={`w-3 h-3 rounded-full ${activeSection === "catalogue" ? "bg-gradient-to-r from-amber-400 to-purple-400" : "bg-gray-300"}`}
          onClick={scrollToCatalogue}
          whileHover={{ scale: 1.5 }}
          animate={
            activeSection === "catalogue"
              ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 0px 10px rgba(251, 191, 36, 0.5)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                }
              : {}
          }
          transition={{
            repeat: activeSection === "catalogue" ? Number.POSITIVE_INFINITY : 0,
            duration: 2,
          }}
        />
        <motion.button
          className={`w-3 h-3 rounded-full ${activeSection === "gallery" ? "bg-gradient-to-r from-amber-400 to-purple-400" : "bg-gray-300"}`}
          onClick={scrollToGallery}
          whileHover={{ scale: 1.5 }}
          animate={
            activeSection === "gallery"
              ? {
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0px 0px 0px rgba(0,0,0,0)",
                    "0px 0px 10px rgba(251, 191, 36, 0.5)",
                    "0px 0px 0px rgba(0,0,0,0)",
                  ],
                }
              : {}
          }
          transition={{
            repeat: activeSection === "gallery" ? Number.POSITIVE_INFINITY : 0,
            duration: 2,
          }}
        />
      </div>

      {/* Hero Section with Artistic Elements */}
      <section
        className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden z-10"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
              fill="none"
              stroke="black"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
            <motion.path
              d="M0,30 Q25,50 50,30 T100,30 V100 H0 Z"
              fill="none"
              stroke="black"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />
            <motion.path
              d="M0,70 Q25,90 50,70 T100,70 V100 H0 Z"
              fill="none"
              stroke="black"
              strokeWidth="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </svg>
        </div>

        {/* Animated decorative elements */}
        <div className="absolute inset-0 -z-5 overflow-hidden">
          {/* Cercles animés */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full border border-amber-200/20 left-[10%] top-[20%]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full border border-purple-200/20 right-[15%] bottom-[30%]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />

          {/* Étoiles animées */}
          <motion.div
            className="absolute left-[5%] bottom-[15%]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Star className="w-6 h-6 text-amber-200" />
          </motion.div>
          <motion.div
            className="absolute right-[8%] top-[25%]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          >
            <Sparkles className="w-8 h-8 text-purple-200" />
          </motion.div>
          <motion.div
            className="absolute left-[30%] top-[10%]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          >
            <Zap className="w-5 h-5 text-amber-300" />
          </motion.div>
          <motion.div
            className="absolute right-[25%] bottom-[20%]"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, -180, -360],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
          >
            <Palette className="w-7 h-7 text-purple-300" />
          </motion.div>
        </div>

        {/* Main Title with Artistic Animation */}
        <motion.div
          className="text-center mb-32 relative"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1 } },
          }}
          style={{
            scale: titleScale,
            y: titleY,
            rotateX: heroRotate,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            className="absolute -inset-10 -z-10 opacity-20 rounded-full"
            animate={{
              background: [
                "radial-gradient(circle, rgba(238,174,202,0.2) 0%, rgba(148,187,233,0.1) 100%)",
                "radial-gradient(circle, rgba(148,187,233,0.2) 0%, rgba(238,174,202,0.1) 100%)",
                "radial-gradient(circle, rgba(238,174,202,0.2) 0%, rgba(148,187,233,0.1) 100%)",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <motion.h1
            className="text-7xl md:text-9xl font-light tracking-tighter relative inline-block"
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.span
              className="relative inline-block"
              animate={{
                rotateX: [0, 5, 0, -5, 0],
                rotateY: [0, -5, 0, 5, 0],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative">
                s
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-amber-200 to-amber-300"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0 }}
                />
              </span>
              <span className="relative">
                t
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-amber-300 to-orange-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
                />
              </span>
              <span className="relative">
                i
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-orange-200 to-rose-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.4 }}
                />
              </span>
              <span className="relative">
                c
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-rose-200 to-pink-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.6 }}
                />
              </span>
              <span className="relative">
                k
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-pink-200 to-purple-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
                />
              </span>
              <span className="relative">
                i
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-purple-200 to-indigo-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                />
              </span>
              <span className="relative">
                f
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-indigo-200 to-blue-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
                />
              </span>
              <span className="relative">
                y
                <motion.span
                  className="absolute -inset-1 -z-10 rounded-lg opacity-20 bg-gradient-to-r from-blue-200 to-cyan-200"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.4 }}
                />
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mt-4 relative"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
            }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          >
            <motion.span
              animate={{
                textShadow: ["0 0 5px rgba(0,0,0,0)", "0 0 15px rgba(0,0,0,0.1)", "0 0 5px rgba(0,0,0,0)"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key="line1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  Create your Stickmans
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key="line2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="block"
                >
                  made for stickmans lovers.
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="h-1 w-40 bg-gradient-to-r from-amber-300 to-purple-400 rounded-full mx-auto mt-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(10px)",
            }}
          />
        </motion.div>

        {/* Floating Images with Enhanced 3D Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Render all cards with continuous floating animation */}
          {cardAnimations.map((card, index) => (
            <motion.div
              key={card.id}
              className={`absolute rounded-3xl overflow-hidden shadow-xl cursor-pointer ${card.size}`}
              style={{
                transformStyle: "preserve-3d",
                transform: card.transform,
                left: card.position.left,
                right: card.position.right,
                top: card.position.top,
                bottom: card.position.bottom,
                zIndex: hoveredCard === index ? 50 : 10,
              }}
              initial={{ scale: 1 }}
              animate={{
                y: card.float.y,
                scale: hoveredCard === index ? 1.2 : 1,
                boxShadow:
                  hoveredCard === index
                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                z: hoveredCard === index ? 100 : 0,
              }}
              transition={{
                y: card.float.transition,
                scale: { type: "spring", stiffness: 300, damping: 15 },
                boxShadow: { type: "spring", stiffness: 300, damping: 15 },
                z: { type: "spring", stiffness: 300, damping: 15 },
              }}
              whileHover={{ scale: 1.2, z: 100 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Card content */}
              <div className="w-full h-full relative">
                <Image src={card.image || "/placeholder.svg"} alt={card.alt} fill className="object-cover" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(225deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(315deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Effet de brillance */}
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  style={{ borderRadius: "inherit" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Down Button with Artistic Animation */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToCatalogue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(30px)",
          }}
        >
          <motion.span
            className="text-sm text-gray-500 mb-2"
            animate={{
              y: [0, -5, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            View catalog
          </motion.span>
          <motion.div
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-200/30 to-purple-200/30"
            animate={{
              y: [0, 5, 0],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 0px 15px rgba(251, 191, 36, 0.3)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section Catalogue avec fond artistique */}
      <section
        ref={catalogueRef}
        id="catalogue-section"
        className="min-h-screen flex flex-col items-center justify-center py-20 relative z-10 bg-white"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Fond artistique */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="black" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(200, 200, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 70% 70%, rgba(200, 200, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 30% 70%, rgba(200, 200, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 70% 30%, rgba(200, 200, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%255,255,0) 70%)",
                "radial-gradient(circle at 70% 30%, rgba(200, 200, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
              ],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cercles animés */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full border border-blue-200/20 left-[5%] top-[10%]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] rounded-full border border-purple-200/20 right-[10%] bottom-[20%]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />

          {/* Particules flottantes */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() * 4 + 2
            const x = Math.random() * 100
            const y = Math.random() * 100

            return (
              <motion.div
                key={`particle-cat-${i}`}
                className="absolute rounded-full bg-blue-300/30"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                  filter: "blur(1px)",
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: Math.random() * 10 + 10,
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        {/* Titre de la section catalogue avec effet artistique */}
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
        >
          <motion.h2
            className="text-3xl font-light tracking-tighter text-gray-800 relative"
            whileHover={{
              textShadow: "0px 0px 8px rgba(0,0,0,0.2)",
            }}
          >
            <motion.span
              animate={{
                color: ["rgb(31, 41, 55)", "rgb(79, 70, 229)", "rgb(31, 41, 55)"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              catalog
            </motion.span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.h2>
        </motion.div>

        {/* Interface principale */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
        >
          <NintendoCarousel />
        </motion.div>
      </section>

      {/* Section galerie avec style artistique */}
      <section
        ref={galleryRef}
        className="min-h-screen relative z-10 bg-white"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Fond artistique */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="black" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(255, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 70% 70%, rgba(255, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 30% 70%, rgba(255, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
                "radial-gradient(circle at 70% 30%, rgba(255, 200, 200, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
              ],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Éléments décoratifs animés */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cercles animés */}
          <motion.div
            className="absolute w-[350px] h-[350px] rounded-full border border-rose-200/20 right-[5%] top-[15%]"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -10, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] rounded-full border border-amber-200/20 left-[10%] bottom-[25%]"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          />

          {/* Particules flottantes */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() * 4 + 2
            const x = Math.random() * 100
            const y = Math.random() * 100

            return (
              <motion.div
                key={`particle-gal-${i}`}
                className="absolute rounded-full bg-rose-300/30"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                  filter: "blur(1px)",
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: Math.random() * 10 + 10,
                  ease: "easeInOut",
                }}
              />
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(10px)",
          }}
        >
          <GallerySection />
        </motion.div>
      </section>

      {/* Bouton de retour en haut */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-purple-400 flex items-center justify-center z-40 shadow-lg"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: scrollY > 300 ? 1 : 0,
          scale: scrollY > 300 ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <ChevronDown className="text-white transform rotate-180" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.button>
    </main>
  )
}
