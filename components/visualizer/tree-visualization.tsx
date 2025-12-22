"use client"

import { motion } from "framer-motion"
import type { TreeStep, TreeNode } from "@/lib/algorithm-engine"

interface TreeVisualizationProps {
  step: TreeStep
}

interface NodePosition {
  node: TreeNode
  x: number
  y: number
  parentX?: number
  parentY?: number
}

function assignInorderPositions(
  node: TreeNode | null,
  positions: Map<string, number>,
  counter: { value: number },
): void {
  if (!node) return
  assignInorderPositions(node.left || null, positions, counter)
  positions.set(node.id, counter.value)
  counter.value++
  assignInorderPositions(node.right || null, positions, counter)
}

function getTreeDepth(node: TreeNode | null): number {
  if (!node) return 0
  return 1 + Math.max(getTreeDepth(node.left || null), getTreeDepth(node.right || null))
}

function buildPositions(
  node: TreeNode | null,
  inorderPositions: Map<string, number>,
  level: number,
  nodeSpacing: number,
  levelHeight: number,
  positions: NodePosition[],
  parentX?: number,
  parentY?: number,
): void {
  if (!node) return

  const xIndex = inorderPositions.get(node.id) || 0
  const x = xIndex * nodeSpacing
  const y = level * levelHeight

  positions.push({ node, x, y, parentX, parentY })

  if (node.left) {
    buildPositions(node.left, inorderPositions, level + 1, nodeSpacing, levelHeight, positions, x, y)
  }
  if (node.right) {
    buildPositions(node.right, inorderPositions, level + 1, nodeSpacing, levelHeight, positions, x, y)
  }
}

export function TreeVisualization({ step }: TreeVisualizationProps) {
  const positions: NodePosition[] = []

  if (step.root) {
    // Assign x positions using inorder traversal
    const inorderPositions = new Map<string, number>()
    assignInorderPositions(step.root, inorderPositions, { value: 0 })

    const nodeSpacing = 70 // horizontal space between consecutive inorder nodes
    const levelHeight = 80 // vertical space between levels

    buildPositions(step.root, inorderPositions, 0, nodeSpacing, levelHeight, positions)
  }

  // Calculate SVG dimensions with padding
  const padding = 40
  const nodeRadius = 20
  const minX = positions.length > 0 ? Math.min(...positions.map((p) => p.x)) : 0
  const maxX = positions.length > 0 ? Math.max(...positions.map((p) => p.x)) : 0
  const maxY = positions.length > 0 ? Math.max(...positions.map((p) => p.y)) : 0

  const svgWidth = maxX - minX + padding * 2 + nodeRadius * 2
  const svgHeight = maxY + padding * 2 + nodeRadius * 2

  // Offset to shift all nodes so minX starts at padding
  const offsetX = padding + nodeRadius - minX
  const offsetY = padding + nodeRadius

  return (
    <div className="relative flex-1 min-h-[350px] overflow-auto p-4">
      <svg width={Math.max(500, svgWidth)} height={Math.max(300, svgHeight)} className="mx-auto">
        {/* Draw edges first (behind nodes) */}
        {positions.map(({ node, x, y, parentX, parentY }) => {
          if (parentX !== undefined && parentY !== undefined) {
            return (
              <motion.line
                key={`edge-${node.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x1={parentX + offsetX}
                y1={parentY + offsetY + nodeRadius}
                x2={x + offsetX}
                y2={y + offsetY - nodeRadius}
                stroke="#e5e5e5"
                strokeWidth={2}
              />
            )
          }
          return null
        })}

        {/* Draw nodes */}
        {positions.map(({ node, x, y }) => {
          const isHighlighted = step.highlightedNodes.includes(node.id)
          const cx = x + offsetX
          const cy = y + offsetY

          return (
            <g key={node.id}>
              <motion.circle
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                cx={cx}
                cy={cy}
                r={nodeRadius}
                fill={isHighlighted ? "#7c3aed" : "#ffffff"}
                stroke={isHighlighted ? "#7c3aed" : "#e5e5e5"}
                strokeWidth={2}
              />
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x={cx}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight={600}
                fill={isHighlighted ? "#ffffff" : "#1f2937"}
              >
                {node.value}
              </motion.text>
            </g>
          )
        })}
      </svg>

      {/* Traversal order display */}
      {step.traversalOrder.length > 0 && (
        <div className="mt-4 rounded-lg bg-muted/50 p-3">
          <span className="text-xs font-medium text-muted-foreground">Traversal order: </span>
          <span className="text-sm font-semibold text-foreground">[{step.traversalOrder.join(", ")}]</span>
        </div>
      )}

      {/* Empty state */}
      {!step.root && (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">Tree is empty</p>
        </div>
      )}
    </div>
  )
}
