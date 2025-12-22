"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { MemoryStep } from "@/lib/algorithm-engine"

interface MemoryVisualizationProps {
  step: MemoryStep
}

export function MemoryVisualization({ step }: MemoryVisualizationProps) {
  const { stackMemory, heapMemory, pointers } = step

  return (
    <div className="flex h-full gap-8 p-6">
      {/* Stack Memory */}
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <h3 className="text-sm font-semibold text-foreground">Stack Memory</h3>
        </div>
        <div className="flex flex-1 flex-col-reverse gap-2 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
          <AnimatePresence mode="popLayout">
            {stackMemory.map((block) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-between rounded-md border border-blue-300 bg-white p-3 dark:border-blue-800 dark:bg-blue-950"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-blue-700 dark:text-blue-400">{block.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{block.address}</span>
                </div>
                <div className="font-mono text-sm">
                  {typeof block.value === "string" && block.value.startsWith("0x") ? (
                    <span className="text-purple-600 dark:text-purple-400">{block.value}</span>
                  ) : (
                    <span className="text-foreground">{JSON.stringify(block.value)}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {stackMemory.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Empty</div>
          )}
        </div>
      </div>

      {/* Pointer arrows - simplified visual */}
      <div className="flex w-16 flex-col items-center justify-center gap-2">
        {pointers.map((pointer, i) => (
          <motion.div
            key={`${pointer.from}-${pointer.to}-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl text-purple-500"
          >
            →
          </motion.div>
        ))}
      </div>

      {/* Heap Memory */}
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <h3 className="text-sm font-semibold text-foreground">Heap Memory</h3>
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
          <AnimatePresence mode="popLayout">
            {heapMemory.map((block) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-md border border-green-300 bg-white p-3 dark:border-green-800 dark:bg-green-950"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-green-700 dark:text-green-400">
                    {block.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{block.address}</span>
                </div>
                <div className="mt-1 font-mono text-sm text-foreground">
                  {typeof block.value === "object" ? JSON.stringify(block.value) : String(block.value)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {heapMemory.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Empty</div>
          )}
        </div>
      </div>
    </div>
  )
}
