"use client"

import { motion } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { AlgorithmStep, SortingStep } from "@/lib/algorithm-engine"

interface StackFrame {
  name: string
  variables: { name: string; value: string }[]
}

interface HeapObject {
  address: string
  type: string
  values: number[]
}

interface MemoryViewProps {
  currentStep: AlgorithmStep | null
  algorithmName: string
}

function isSortingStep(step: AlgorithmStep): step is SortingStep {
  return step.type === "sorting"
}


export function MemoryView({ currentStep, algorithmName }: MemoryViewProps) {
  const sortingStep = currentStep && isSortingStep(currentStep)
  ? currentStep
  : null

  const [expandedFrames, setExpandedFrames] = useState<number[]>([0, 1, 2])

  const toggleFrame = (index: number) => {
    setExpandedFrames((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Mock stack frames based on current step
  const stackFrames: StackFrame[] = [
    {
      name: "main()",
      variables: [{ name: "arr", value: `[${sortingStep?.array?.join(", ") || "..."}]` }],
    },
    {
      name: `${algorithmName.replace(/\s/g, "")}(arr, 0, ${sortingStep?.array?.length || 0})`,
      variables: [
        { name: "i", value: String(sortingStep?.activeIndices?.[0] ?? 0) },
        { name: "j", value: String(sortingStep?.activeIndices?.[1] ?? 0) },
      ],
    },
    {
      name:
        currentStep?.operation === "compare" ? "compare()" : currentStep?.operation === "swap" ? "swap()" : "execute()",
      variables: [{ name: "operation", value: currentStep?.operation || "initial" }],
    },
  ]

  const heapObjects: HeapObject[] = [
    {
      address: "0x7f3a",
      type: "Array",
      values: sortingStep?.array || [64, 34, 25, 12, 22, 11, 90, 45],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-1 flex-col rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-card-foreground">Memory Visualization</h2>
        <span className="text-sm text-muted-foreground">{currentStep?.description}</span>
      </div>

      <div className="flex-1 grid gap-6 p-6 md:grid-cols-2">
        {/* Stack */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Call Stack</h4>
          <div className="space-y-2">
            {stackFrames.map((frame, index) => (
              <div key={index} className="overflow-hidden rounded-md border border-border bg-card">
                <button
                  onClick={() => toggleFrame(index)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-secondary/50"
                >
                  {expandedFrames.includes(index) ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  <span className="font-mono text-xs">{frame.name}</span>
                </button>
                {expandedFrames.includes(index) && (
                  <div className="border-t border-border bg-secondary/30 px-3 py-2 space-y-1">
                    {frame.variables.map((v, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{v.name}</span>
                        <span className="font-mono text-primary truncate max-w-[150px]">{v.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Heap */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Heap Memory</h4>
          <div className="space-y-3">
            {heapObjects.map((obj, index) => (
              <div key={index} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-muted-foreground">{obj.address}</span>
                  <span className="font-semibold text-foreground">
                    {obj.type}[{obj.values.length}]
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {obj.values.map((v, i) => {
                    const isActive = sortingStep?.activeIndices?.includes(i)
                    return (
                      <span
                        key={i}
                        className={`rounded px-2 py-0.5 font-mono text-xs transition-colors ${
                          isActive ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {v}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Pointer visualization */}
          <div className="mt-4 rounded-md border border-dashed border-border p-3">
            <h5 className="text-xs font-medium text-muted-foreground mb-2">Active Pointers</h5>
            <div className="flex gap-4">
              {sortingStep?.activeIndices?.map((idx, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{i === 0 ? "i" : "j"}:</span>
                  <span className="font-mono text-xs text-primary">{idx}</span>
                </div>
              ))}
              {(!sortingStep?.activeIndices || sortingStep.activeIndices.length === 0) && (
                <span className="text-xs text-muted-foreground">No active pointers</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
