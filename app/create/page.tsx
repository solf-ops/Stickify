"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles, Palette, Wand2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Generate particles for background
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 30% 70%, rgba(251, 191, 36, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
              "radial-gradient(circle at 70% 30%, rgba(167, 139, 250, 0.3) 0%, rgba(255, 255, 255, 0) 70%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated circles */}
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

        {/* Floating particles */}
        {generateParticles(20)}

        {/* Decorative icons */}
        <motion.div
          className="absolute left-[15%] top-[15%] text-amber-300/30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Sparkles size={40} />
        </motion.div>
        <motion.div
          className="absolute right-[20%] top-[25%] text-purple-300/30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -360, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        >
          <Palette size={50} />
        </motion.div>
        <motion.div
          className="absolute left-[25%] bottom-[20%] text-amber-300/30"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        >
          <Wand2 size={35} />
        </motion.div>
      </div>

      {/* Back button */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/">
          <motion.div
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Main content with 3D effect */}
      <motion.div
        className="max-w-3xl text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${(mousePosition.y - 0.5) * -5}deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`,
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-light mb-8 relative inline-block"
          animate={{
            textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          Create Your Sticker
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-purple-400"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h1>

        <motion.div
          className="bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg border border-white/50"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
          }}
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            translateZ: "40px",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-gray-700 text-sm md:text-base leading-relaxed"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(10px)",
            }}
          >
            Open{" "}
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              chatgpt.com
            </a>{" "}
            select a character you want, and then paste this prompt: "Turn this image into a playful, minimalist
            stickman character. Use thin black lines for limbs and a simple round or oval head. Exaggerate and simplify
            the subject's most iconic traits — like hairstyle, glasses, clothing, text, accessories, or facial marks —
            while keeping the look humorous and expressive. Keep the body extremely minimal (like a line drawing), and
            focus the detail on the head, outfit, and props. Use flat colors, bold outlines, and light textured
            background. The final image should look like a collectible avatar or meme-style comic figure, inspired by
            dark humor or satire"
          </motion.p>

          {/* Interactive button */}
        </motion.div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute right-[15%] top-[30%] w-20 h-20 rounded-lg bg-gradient-to-br from-amber-200/20 to-amber-300/20 backdrop-blur-sm border border-white/20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${Math.sin(Date.now() * 0.001) * 10}deg) rotateY(${
            Math.cos(Date.now() * 0.001) * 10
          }deg)`,
        }}
      />
      <motion.div
        className="absolute left-[20%] bottom-[25%] w-16 h-16 rounded-full bg-gradient-to-br from-purple-200/20 to-purple-300/20 backdrop-blur-sm border border-white/20"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${Math.cos(Date.now() * 0.001) * 10}deg) rotateY(${
            Math.sin(Date.now() * 0.001) * 10
          }deg)`,
        }}
      />
    </div>
  )
}
