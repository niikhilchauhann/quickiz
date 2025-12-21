"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp, Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { AlgorithmDefinition } from "@/lib/algorithm-engine"

interface CodePanelProps {
  algorithm: AlgorithmDefinition | null
  inputArray: number[]
  onInputChange: (arr: number[]) => void
  onRun: () => void
}

export function CodePanel({ algorithm, inputArray, onInputChange, onRun }: CodePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputText, setInputText] = useState(inputArray.join(", "))
  const [error, setError] = useState("")

  const handleInputChange = (text: string) => {
    setInputText(text)
    setError("")

    try {
      const parsed = text
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "")
        .map((s) => {
          const num = Number.parseInt(s, 10)
          if (isNaN(num)) throw new Error(`Invalid number: ${s}`)
          return num
        })

      if (parsed.length > 0) {
        onInputChange(parsed)
      }
    } catch (e) {
      setError("Invalid input. Use comma-separated numbers.")
    }
  }

  const handleReset = () => {
    const defaultArr = [64, 34, 25, 12, 22, 11, 90, 45]
    setInputText(defaultArr.join(", "))
    onInputChange(defaultArr)
    setError("")
  }

  if (!algorithm) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-6 py-4 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">Source Code & Input</span>
          <span className="text-xs text-muted-foreground">{algorithm.name}</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Code viewer */}
            <div className="p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Algorithm Code
              </h4>
              <pre className="rounded-lg bg-secondary p-4 text-sm overflow-x-auto max-h-64">
                <code className="text-foreground">{algorithm.code}</code>
              </pre>
            </div>

            {/* Input editor */}
            <div className="p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Input Array</h4>
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter comma-separated numbers..."
                className="font-mono text-sm mb-2 min-h-[100px]"
              />
              {error && <p className="text-xs text-destructive mb-2">{error}</p>}

              <div className="flex gap-2">
                <Button onClick={onRun} size="sm" className="gap-2">
                  <Play className="h-3 w-3" />
                  Run
                </Button>
                <Button onClick={handleReset} variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
              </div>

              <div className="mt-4 rounded-lg bg-secondary p-3">
                <h5 className="text-xs font-medium text-muted-foreground mb-2">Description</h5>
                <p className="text-sm text-foreground">{algorithm.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
