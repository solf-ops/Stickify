"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarouselControlsProps {
  onPrev: () => void
  onNext: () => void
}

export default function CarouselControls({ onPrev, onNext }: CarouselControlsProps) {
  return (
    <div className="flex gap-4 mt-8">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-zinc-300 hover:bg-zinc-400 border-none"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-zinc-800 hover:bg-black text-white border-none"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
