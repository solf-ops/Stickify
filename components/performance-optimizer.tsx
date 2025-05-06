"use client"

import { useEffect } from "react"

export function PerformanceOptimizer() {
  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window === "undefined") return

    // Function to optimize animations based on device capability
    const optimizeForDevice = () => {
      // Check if the device is low-end or has reduced motion preference
      const isLowEndDevice =
        navigator.hardwareConcurrency <= 4 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Add a class to the document body that our CSS can target
      if (isLowEndDevice || prefersReducedMotion) {
        document.body.classList.add("reduced-motion")
      }

      // Set a CSS variable with the device performance level (1-5)
      const performanceLevel = isLowEndDevice
        ? navigator.hardwareConcurrency <= 2
          ? 1
          : 2
        : navigator.hardwareConcurrency >= 8
          ? 5
          : 4

      document.documentElement.style.setProperty("--device-performance", performanceLevel.toString())
    }

    // Run optimization
    optimizeForDevice()

    // Add event listener for visibility change to optimize when tab becomes visible
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        // Restart animations only when tab is visible
        document.body.classList.remove("hidden-tab")
      } else {
        // Pause heavy animations when tab is not visible
        document.body.classList.add("hidden-tab")
      }
    })

    return () => {
      document.removeEventListener("visibilitychange", () => {})
    }
  }, [])

  return null
}
