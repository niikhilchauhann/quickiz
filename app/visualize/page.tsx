"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Sidebar } from "@/components/visualizer/sidebar"
import { VisualizationCanvas } from "@/components/visualizer/visualization-canvas"
import { MemoryView } from "@/components/visualizer/memory-view"
import { ControlsPanel } from "@/components/visualizer/controls-panel"
import { ComplexityPanel } from "@/components/visualizer/complexity-panel"
import { CodePanel } from "@/components/visualizer/code-panel"
import { VisualizerHeader } from "@/components/visualizer/visualizer-header"
import { AlgorithmEngine, type AlgorithmStep } from "@/lib/algorithm-engine"
import { algorithms } from "@/lib/algorithms"
import type { AlgorithmDefinition } from "@/lib/algorithm-engine"

export default function VisualizePage() {
  // use state hooks
  const [activeCategory, setActiveCategory] = useState("sorting")
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmDefinition | null>(null)
  const [viewMode, setViewMode] = useState<"algorithm" | "memory">("algorithm")
  const [inputArray, setInputArray] = useState([64, 34, 25, 12, 22, 11, 90, 45])

  // Engine state
  const engineRef = useRef<AlgorithmEngine | null>(null)
  const [currentStep, setCurrentStep] = useState<AlgorithmStep | null>(null)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(5)
  const [steps, setSteps] = useState<AlgorithmStep[]>([])

  // Initialize engine
  useEffect(() => {
    engineRef.current = new AlgorithmEngine()

    engineRef.current.setOnStepChange((step, index, total) => {
      setCurrentStep(step)
      setCurrentStepIndex(index)
      setTotalSteps(total)
    })

    engineRef.current.setOnPlayStateChange((playing) => {
      setIsPlaying(playing)
    })

    // Load default algorithm
    const defaultAlgo = algorithms.find((a) => a.id === "bubble-sort") || algorithms[0]
    if (defaultAlgo) {
      setSelectedAlgorithm(defaultAlgo)
      const generatedSteps = defaultAlgo.generateSteps(inputArray)
      setSteps(generatedSteps)
      engineRef.current.loadSteps(generatedSteps)
    }

    return () => {
      engineRef.current?.pause()
    }
  }, [])

  // Update algo speed
  useEffect(() => {
    if (engineRef.current) {
      const ms = Math.max(100, 1000 - speed * 90)
      engineRef.current.setSpeed(ms)
    }
  }, [speed])

  const handleAlgorithmSelect = useCallback(
    (algorithm: AlgorithmDefinition) => {
      setSelectedAlgorithm(algorithm)
      const generatedSteps = algorithm.generateSteps(inputArray)
      setSteps(generatedSteps)
      engineRef.current?.loadSteps(generatedSteps)
    },
    [inputArray],
  )

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      engineRef.current?.pause()
    } else {
      engineRef.current?.play()
    }
  }, [isPlaying])

  const handleStepForward = useCallback(() => {
    engineRef.current?.stepForward()
  }, [])

  const handleStepBack = useCallback(() => {
    engineRef.current?.stepBack()
  }, [])

  const handleReset = useCallback(() => {
    engineRef.current?.reset()
  }, [])

  const handleInputChange = useCallback((newArray: number[]) => {
    setInputArray(newArray)
  }, [])

  const handleRun = useCallback(() => {
    if (selectedAlgorithm) {
      const generatedSteps = selectedAlgorithm.generateSteps(inputArray)
      setSteps(generatedSteps)
      engineRef.current?.loadSteps(generatedSteps)
    }
  }, [selectedAlgorithm, inputArray])

  return (
    <div className="flex h-screen flex-col bg-background">
      <VisualizerHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={handleAlgorithmSelect}
        />

        <main className="flex flex-1 flex-col gap-4 p-4 min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-4">
            <VisualizationCanvas
              algorithmName={selectedAlgorithm?.name || "Select an Algorithm"}
              currentStep={currentStep}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {viewMode === "memory" && (
              <MemoryView currentStep={currentStep} algorithmName={selectedAlgorithm?.name || "Algorithm"} />
            )}

            <ControlsPanel
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onStepForward={handleStepForward}
              onStepBack={handleStepBack}
              onReset={handleReset}
              speed={speed}
              onSpeedChange={setSpeed}
              currentStep={currentStepIndex}
              totalSteps={totalSteps}
            />

            <CodePanel
              algorithm={selectedAlgorithm}
              inputArray={inputArray}
              onInputChange={handleInputChange}
              onRun={handleRun}
            />
          </div>
        </main>

        <ComplexityPanel algorithm={selectedAlgorithm} steps={steps} currentStepIndex={currentStepIndex} />
      </div>
    </div>
  )
}
