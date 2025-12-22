"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { RecursionStep } from "@/lib/algorithm-engine"

interface RecursionVisualizationProps {
  step: RecursionStep
}

export function RecursionVisualization({ step }: RecursionVisualizationProps) {
  const { stackFrames, boardState, currentRow, currentCol } = step

  return (
    <div className="flex h-full gap-6 p-4">
      {/* Call Stack */}
      <div className="flex w-64 flex-col">
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Call Stack</h3>
        <div className="flex flex-1 flex-col-reverse gap-2 overflow-auto">
          <AnimatePresence mode="popLayout">
            {stackFrames.map((frame, index) => (
              <motion.div
                key={frame.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`rounded-lg border p-3 ${
                  frame.isActive ? "border-primary bg-primary/10" : "border-border bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium">
                    {frame.functionName}(
                    {Object.entries(frame.args)
                      .map(([k, v]) => `${k}=${v}`)
                      .join(", ")}
                    )
                  </span>
                  <span className="text-xs text-muted-foreground">#{index}</span>
                </div>
                {frame.returnValue !== undefined && (
                  <div className="mt-1 text-xs text-green-600">→ returns {JSON.stringify(frame.returnValue)}</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {stackFrames.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Stack is empty</div>
          )}
        </div>
      </div>

      {/* Board State (for N-Queens) */}
      {boardState && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Board State</h3>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${boardState.length}, 1fr)`,
            }}
          >
            {boardState.map((row, i) =>
              row.map((cell, j) => {
                const isCurrentCell = currentRow === i && currentCol === j
                const hasQueen = cell === 1

                return (
                  <motion.div
                    key={`${i}-${j}`}
                    initial={false}
                    animate={{
                      backgroundColor: hasQueen
                        ? "hsl(var(--primary))"
                        : isCurrentCell
                          ? "hsl(var(--accent))"
                          : (i + j) % 2 === 0
                            ? "hsl(var(--muted))"
                            : "hsl(var(--card))",
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded border border-border text-lg"
                  >
                    {hasQueen && "♛"}
                  </motion.div>
                )
              }),
            )}
          </div>
        </div>
      )}

      {/* Fibonacci tree would show here for fib - simplified view */}
      {!boardState && stackFrames.length > 0 && (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary">{stackFrames.length}</div>
            <div className="mt-2 text-sm text-muted-foreground">Stack Depth</div>
          </div>
        </div>
      )}
    </div>
  )
}
