"use client"

import { motion } from "framer-motion"
import type { AlgorithmDefinition, AlgorithmStep } from "@/lib/algorithm-engine"

interface ComplexityPanelProps {
  algorithm: AlgorithmDefinition | null
  steps: AlgorithmStep[]
  currentStepIndex: number
}

export function ComplexityPanel({ algorithm, steps, currentStepIndex }: ComplexityPanelProps) {
  // Count operations up to current step
  const stepsUpToNow = steps.slice(0, currentStepIndex + 1)
  const comparisons = stepsUpToNow.filter((s) => s.operation === "compare").length
  const swaps = stepsUpToNow.filter((s) => s.operation === "swap").length

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 shrink-0 border-l border-border bg-card p-4 overflow-auto"
    >
      <h3 className="mb-4 text-sm font-semibold text-foreground">Complexity Analysis</h3>

      {algorithm && (
        <div className="mb-6 space-y-3">
          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground mb-2">Time Complexity</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Best</span>
                <span className="font-mono font-medium text-foreground">{algorithm.timeComplexity.best}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average</span>
                <span className="font-mono font-medium text-foreground">{algorithm.timeComplexity.average}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Worst</span>
                <span className="font-mono font-medium text-foreground">{algorithm.timeComplexity.worst}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-3">
            <p className="text-xs text-muted-foreground">Space Complexity</p>
            <p className="mt-1 font-mono text-sm font-medium text-foreground">{algorithm.spaceComplexity}</p>
          </div>
        </div>
      )}

      <h3 className="mb-3 text-sm font-semibold text-foreground">Operation Counters</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-accent px-3 py-2">
          <span className="text-sm text-muted-foreground">Comparisons</span>
          <motion.span
            key={comparisons}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-mono text-sm font-semibold text-primary"
          >
            {comparisons}
          </motion.span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-accent px-3 py-2">
          <span className="text-sm text-muted-foreground">Swaps</span>
          <motion.span
            key={swaps}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="font-mono text-sm font-semibold text-primary"
          >
            {swaps}
          </motion.span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-accent px-3 py-2">
          <span className="text-sm text-muted-foreground">Total Steps</span>
          <span className="font-mono text-sm font-semibold text-primary">{steps.length}</span>
        </div>
      </div>
    </motion.aside>
  )
}
