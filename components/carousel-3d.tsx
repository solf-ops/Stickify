"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Utilisation des 5 images originales
const slides = [
  {
    id: 1,
    src: "/images/photo1.jpg",
    alt: "Character in red outfit",
    title: "creative",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    alt: "Character with sunglasses",
    title: "unique",
  },
  {
    id: 3,
    src: "/images/photo3.jpg",
    alt: "Character with necklace",
    title: "innovative",
  },
  {
    id: 4,
    src: "/images/photo4.jpg",
    alt: "Character with AA eyes",
    title: "minimal",
  },
  {
    id: 5,
    src: "/images/logo.jpg",
    alt: "Blue character with rainbow glasses",
    title: "colorful",
  },
]

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [direction, setDirection] = useState(0) // -1 pour gauche, 1 pour droite, 0 pour initial
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rotationY = useMotionValue(0)
  const carouselRotation = useTransform(rotationY, [-30, 30], [-5, 5])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % slides.length)
    setTimeout(() => {
      setIsAnimating(false)
      setDirection(0)
    }, 600)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => {
      setIsAnimating(false)
      setDirection(0)
    }, 600)
  }

  useEffect(() => {
    // Défilement automatique toutes les 2 secondes
    if (!isHovering) {
      autoRotateRef.current = setInterval(() => {
        handleNext()
      }, 2000)
    }

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current)
    }
  }, [isHovering])

  // Effet de suivi de la souris pour la rotation 3D
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const mouseX = e.clientX

      // Calculer la rotation en fonction de la position de la souris
      const rotationAmount = ((mouseX - centerX) / (rect.width / 2)) * 30
      rotationY.set(rotationAmount)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [rotationY])

  // Calculer la position de chaque carte dans le carousel
  const getCardPosition = (index: number) => {
    const diff = (index - activeIndex + slides.length) % slides.length
    const normalizedDiff = diff > slides.length / 2 ? diff - slides.length : diff

    // Calculer l'angle pour positionner les cartes en arc de cercle
    const angle = normalizedDiff * 30 // 30 degrés entre chaque carte
    const radius = 400 // rayon de l'arc de cercle

    // Calculer la position x et z en fonction de l'angle
    const x = Math.sin(angle * (Math.PI / 180)) * radius
    const z = (Math.cos(angle * (Math.PI / 180)) - 1) * radius * 1.5 // Augmenter l'effet de profondeur

    // Calculer l'échelle en fonction de la distance par rapport au centre
    const scale = normalizedDiff === 0 ? 1 : 0.7

    // Calculer l'opacité
    const opacity = normalizedDiff === 0 ? 1 : 0.8

    // Calculer le z-index pour l'ordre d'empilement
    const zIndex = 100 - Math.abs(normalizedDiff) * 10

    return {
      x,
      z,
      scale,
      opacity,
      zIndex,
      rotateY: -angle, // rotation pour faire face à l'utilisateur
    }
  }

  // Effet de transition 3D amélioré
  const getTransitionStyles = (index: number) => {
    const position = getCardPosition(index)
    const isActive = index === activeIndex

    // Ajouter des effets de transition 3D supplémentaires
    const transitionStyles = {
      x: position.x,
      z: position.z,
      scale: position.scale,
      opacity: position.opacity,
      rotateY: position.rotateY,
      rotateX: isActive ? 0 : Math.random() * 5 - 2.5, // Légère inclinaison aléatoire pour les cartes non actives
    }

    // Ajouter un effet de "swing" pendant les transitions
    if (isAnimating) {
      const swingAmount = direction * (index === activeIndex ? 15 : 5)
      transitionStyles.rotateY += swingAmount
    }

    return transitionStyles
  }

  return (
    <div className="relative w-full h-[700px] overflow-hidden">
      {/* Titre du carousel avec style similaire à l'image */}
      <motion.h2
        className="text-7xl font-bold text-center mb-12 text-[#f8b67d]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        3d-Carousel
      </motion.h2>

      {/* Conteneur principal avec perspective */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] perspective-1500"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Fond avec lignes courbes subtiles */}
        <div className="absolute inset-0 z-0">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0 opacity-20"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M0,500 C200,300 800,700 1000,500 C800,300 200,700 0,500 Z"
              fill="none"
              stroke="#f8b67d"
              strokeWidth="1"
            />
            <path
              d="M0,300 C300,500 700,100 1000,300 C700,500 300,100 0,300 Z"
              fill="none"
              stroke="#f8b67d"
              strokeWidth="1"
            />
            <path
              d="M0,700 C300,900 700,500 1000,700 C700,900 300,500 0,700 Z"
              fill="none"
              stroke="#f8b67d"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Carousel 3D avec rotation basée sur la position de la souris */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center preserve-3d"
          style={{
            rotateY: carouselRotation,
            transformStyle: "preserve-3d",
          }}
        >
          <AnimatePresence mode="popLayout">
            {slides.map((slide, index) => {
              const position = getCardPosition(index)
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={`${slide.id}-${index}`}
                  className="absolute"
                  style={{
                    zIndex: position.zIndex,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotateY: direction * 90,
                  }}
                  animate={getTransitionStyles(index)}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotateY: direction * -90,
                    transition: { duration: 0.5 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                  }}
                >
                  {/* Carte avec effet glassmorphism */}
                  <motion.div
                    className={`relative rounded-3xl overflow-hidden ${
                      isActive ? "w-[400px] h-[240px]" : "w-[200px] h-[120px]"
                    } bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/20`}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow: isActive
                        ? "0 20px 40px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1)"
                        : "0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.05)",
                      transform: `translateZ(${isActive ? 50 : 0}px)`,
                    }}
                    whileHover={
                      isActive
                        ? {
                            scale: 1.05,
                            rotateX: 5,
                            rotateY: 5,
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                  >
                    {/* Image avec effet de profondeur */}
                    <div className="absolute inset-0 p-4 flex items-center justify-center preserve-3d">
                      <motion.div
                        className={`relative ${
                          isActive ? "w-[360px] h-[200px]" : "w-[180px] h-[100px]"
                        } rounded-2xl overflow-hidden`}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: `translateZ(10px)`,
                        }}
                      >
                        <Image
                          src={slide.src || "/placeholder.svg"}
                          alt={slide.alt}
                          fill
                          className="object-cover"
                          sizes={isActive ? "360px" : "180px"}
                        />
                      </motion.div>
                    </div>

                    {/* Effet de brillance 3D */}
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        transform: `translateZ(20px) rotateX(5deg)`,
                      }}
                    />

                    {/* Titre (uniquement sur la carte active) */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 p-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                          transform: `translateZ(30px)`,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <span className="text-xl font-medium text-white drop-shadow-md">{slide.title}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Boutons de navigation stylisés comme dans l'image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <motion.button
            className="w-[100px] h-[60px] rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
            onClick={handlePrev}
            whileHover={{ scale: 1.05, rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ChevronLeft className="h-8 w-8 text-gray-800" style={{ transform: "translateZ(10px)" }} />
          </motion.button>
          <motion.button
            className="w-[100px] h-[60px] rounded-full bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center"
            onClick={handleNext}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <ChevronRight className="h-8 w-8 text-gray-800" style={{ transform: "translateZ(10px)" }} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
