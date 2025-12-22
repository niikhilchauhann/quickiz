"use client"

import { motion } from "framer-motion"
import type { GraphStep } from "@/lib/algorithm-engine"

interface GraphVisualizationProps {
  step: GraphStep
}

export function GraphVisualization({ step }: GraphVisualizationProps) {
  const { nodes, edges, visitedNodes, activeNode, activeEdge, queue, distances } = step

  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full">
        {/* Draw edges */}
        {edges.map((edge) => {
          const from = nodes.find((n) => n.id === edge.from)
          const to = nodes.find((n) => n.id === edge.to)
          if (!from || !to) return null

          const isActive =
            activeEdge &&
            ((activeEdge.from === edge.from && activeEdge.to === edge.to) ||
              (activeEdge.from === edge.to && activeEdge.to === edge.from))

          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <motion.line
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  stroke: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                  strokeWidth: isActive ? 3 : 2,
                }}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
              {edge.weight !== undefined && (
                <text x={midX} y={midY - 8} textAnchor="middle" className="fill-muted-foreground text-xs font-medium">
                  {edge.weight}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Draw nodes */}
      {nodes.map((node) => {
        const isVisited = visitedNodes.includes(node.id)
        const isActive = activeNode === node.id
        const distance = distances?.[node.id]

        return (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute flex flex-col items-center"
            style={{
              left: node.x - 20,
              top: node.y - 20,
            }}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground scale-110"
                  : isVisited
                    ? "border-green-500 bg-green-500/20 text-green-700"
                    : "border-border bg-card text-card-foreground"
              }`}
            >
              {node.label}
            </div>
            {distance !== undefined && distance !== Number.POSITIVE_INFINITY && (
              <span className="mt-1 text-xs font-medium text-muted-foreground">d={distance}</span>
            )}
          </motion.div>
        )
      })}

      {/* Queue/Stack display */}
      {queue.length > 0 && (
        <div className="absolute bottom-4 left-4 rounded-lg bg-muted/50 p-3">
          <span className="text-xs font-medium text-muted-foreground">
            {step.operation === "dequeue" ? "Queue" : "Stack"}:{" "}
          </span>
          <span className="text-sm font-semibold text-foreground">[{queue.join(", ")}]</span>
        </div>
      )}
    </div>
  )
}
