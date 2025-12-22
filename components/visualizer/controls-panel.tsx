"use client"

import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface ControlsPanelProps {
  isPlaying: boolean
  onPlayPause: () => void
  onStepForward: () => void
  onStepBack: () => void
  onReset: () => void
  speed: number
  onSpeedChange: (speed: number) => void
  currentStep: number
  totalSteps: number
}

export function ControlsPanel({
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBack,
  onReset,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
}: ControlsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-center gap-6 rounded-xl border border-border bg-card p-4"
    >
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onReset} title="Reset">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onStepBack} disabled={currentStep === 0}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={onPlayPause} disabled={currentStep >= totalSteps - 1 && !isPlaying}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={onStepForward} disabled={currentStep >= totalSteps - 1}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Step</span>
        <span className="font-mono text-sm font-medium text-foreground">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <div className="h-6 w-px bg-border" />

      <div className="flex flex-1 items-center gap-3">
        <span className="text-sm text-muted-foreground">Speed</span>
        <Slider value={[speed]} onValueChange={(v) => onSpeedChange(v[0])} min={1} max={10} step={1} className="w-32" />
        <span className="text-sm font-medium text-foreground w-8">{speed}x</span>
      </div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
