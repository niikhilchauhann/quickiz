// "use client"

// import { motion } from "framer-motion"
// import { cn } from "@/lib/utils"
// import type { AlgorithmStep, SortingStep, TreeStep, GraphStep, RecursionStep, MemoryStep } from "@/lib/algorithm-engine"
// import { TreeVisualization } from "./tree-visualization"
// import { GraphVisualization } from "./graph-visualization"
// import { RecursionVisualization } from "./recursion-visualization"
// import { MemoryVisualization } from "./memory-visualization"

// interface VisualizationCanvasProps {
//   algorithmName: string
//   currentStep: AlgorithmStep | null
//   viewMode: "algorithm" | "memory"
//   onViewModeChange: (mode: "algorithm" | "memory") => void
// }

// function isSortingStep(step: AlgorithmStep): step is SortingStep {
//   return step.type === "sorting" || (!("type" in step) && "array" in step)
// }

// function isTreeStep(step: AlgorithmStep): step is TreeStep {
//   return step.type === "tree"
// }

// function isGraphStep(step: AlgorithmStep): step is GraphStep {
//   return step.type === "graph"
// }

// function isRecursionStep(step: AlgorithmStep): step is RecursionStep {
//   return step.type === "recursion"
// }

// function isMemoryStep(step: AlgorithmStep): step is MemoryStep {
//   return step.type === "memory"
// }

// function SortingVisualization({ step }: { step: SortingStep }) {
//   const bars = step.array
//   const activeIndices = step.activeIndices
//   const operation = step.operation
//   const maxValue = Math.max(...bars)

//   return (
//     <div className="flex flex-1 items-end justify-center gap-3 p-8">
//       {bars.map((value, index) => {
//         const isActive = activeIndices.includes(index)
//         const heightPercent = (value / maxValue) * 100

//         return (
//           <motion.div
//             key={index}
//             layout
//             initial={false}
//             animate={{
//               height: `${Math.max(heightPercent, 10)}%`,
//               backgroundColor: isActive
//                 ? operation === "swap"
//                   ? "hsl(var(--destructive))"
//                   : "hsl(var(--primary))"
//                 : "hsl(var(--accent))",
//             }}
//             transition={{ duration: 0.3 }}
//             className="relative w-12 rounded-t-md"
//             style={{ minHeight: "20px" }}
//           >
//             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
//               {value}
//             </span>
//             <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">{index}</span>
//           </motion.div>
//         )
//       })}
//     </div>
//   )
// }

// export function VisualizationCanvas({
//   algorithmName,
//   currentStep,
//   viewMode,
//   onViewModeChange,
// }: VisualizationCanvasProps) {
//   // Determine visualization type
//   const getVisualizationType = (): string => {
//     if (!currentStep) return "sorting"
//     if (isSortingStep(currentStep)) return "sorting"
//     if (isTreeStep(currentStep)) return "tree"
//     if (isGraphStep(currentStep)) return "graph"
//     if (isRecursionStep(currentStep)) return "recursion"
//     if (isMemoryStep(currentStep)) return "memory"
//     return "sorting"
//   }

//   const visType = getVisualizationType()

//   // Legacy support: convert old step format
//   const normalizedStep: AlgorithmStep | null = currentStep
//     ? currentStep.type
//       ? currentStep
//       : ({ type: "sorting" as const, ...currentStep } as SortingStep)
//     : null

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="flex flex-1 flex-col rounded-xl border border-border bg-card"
//     >
//       <div className="flex items-center justify-between border-b border-border px-6 py-4">
//         <div>
//           <h2 className="text-lg font-semibold text-card-foreground">{algorithmName}</h2>
//           {currentStep && <p className="text-sm text-muted-foreground mt-1">{currentStep.description}</p>}
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => onViewModeChange("algorithm")}
//             className={cn(
//               "rounded-full px-3 py-1 text-xs font-medium transition-colors",
//               viewMode === "algorithm"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-secondary text-muted-foreground hover:text-foreground",
//             )}
//           >
//             Algorithm View
//           </button>
//           <button
//             onClick={() => onViewModeChange("memory")}
//             className={cn(
//               "rounded-full px-3 py-1 text-xs font-medium transition-colors",
//               viewMode === "memory"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-secondary text-muted-foreground hover:text-foreground",
//             )}
//           >
//             Memory View
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 min-h-[300px]">
//         {normalizedStep && isSortingStep(normalizedStep) && <SortingVisualization step={normalizedStep} />}
//         {normalizedStep && isTreeStep(normalizedStep) && <TreeVisualization step={normalizedStep} />}
//         {normalizedStep && isGraphStep(normalizedStep) && <GraphVisualization step={normalizedStep} />}
//         {normalizedStep && isRecursionStep(normalizedStep) && <RecursionVisualization step={normalizedStep} />}
//         {normalizedStep && isMemoryStep(normalizedStep) && <MemoryVisualization step={normalizedStep} />}
//         {!normalizedStep && (
//           <div className="flex flex-1 items-center justify-center">
//             <p className="text-muted-foreground">Select an algorithm to visualize</p>
//           </div>
//         )}
//       </div>

//       {/* Legend - only for sorting */}
//       {visType === "sorting" && (
//         <div className="flex items-center justify-center gap-6 border-t border-border px-6 py-3">
//           <div className="flex items-center gap-2">
//             <div className="h-3 w-3 rounded-sm bg-accent" />
//             <span className="text-xs text-muted-foreground">Unsorted</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="h-3 w-3 rounded-sm bg-primary" />
//             <span className="text-xs text-muted-foreground">Comparing</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="h-3 w-3 rounded-sm bg-destructive" />
//             <span className="text-xs text-muted-foreground">Swapping</span>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { AlgorithmStep, SortingStep, TreeStep, GraphStep, RecursionStep, MemoryStep } from "@/lib/algorithm-engine"
import { TreeVisualization } from "./tree-visualization"
import { GraphVisualization } from "./graph-visualization"
import { RecursionVisualization } from "./recursion-visualization"
import { MemoryVisualization } from "./memory-visualization"

interface VisualizationCanvasProps {
  algorithmName: string
  currentStep: AlgorithmStep | null
  viewMode: "algorithm" | "memory"
  onViewModeChange: (mode: "algorithm" | "memory") => void
}

function isSortingStep(step: AlgorithmStep): step is SortingStep {
  return step.type === "sorting" || (!("type" in step) && "array" in step)
}

function isTreeStep(step: AlgorithmStep): step is TreeStep {
  return step.type === "tree"
}

function isGraphStep(step: AlgorithmStep): step is GraphStep {
  return step.type === "graph"
}

function isRecursionStep(step: AlgorithmStep): step is RecursionStep {
  return step.type === "recursion"
}

function isMemoryStep(step: AlgorithmStep): step is MemoryStep {
  return step.type === "memory"
}

function SortingVisualization({ step }: { step: SortingStep }) {
  const bars = step.array
  const activeIndices = step.activeIndices
  const operation = step.operation
  const maxValue = Math.max(...bars)

  return (
    <div className="flex flex-1 items-end justify-center gap-3 p-8">
      {bars.map((value, index) => {
        const isActive = activeIndices.includes(index)
        const heightPercent = (value / maxValue) * 100

        return (
          <motion.div
            key={index}
            layout
            initial={false}
            animate={{
              height: `${Math.max(heightPercent, 10)}%`,
              backgroundColor: isActive
                ? operation === "swap"
                  ? "hsl(var(--destructive))"
                  : "hsl(var(--primary))"
                : "hsl(var(--accent))",
            }}
            transition={{ duration: 0.3 }}
            className="relative w-12 rounded-t-md"
            style={{ minHeight: "20px" }}
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
              {value}
            </span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">{index}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

export function VisualizationCanvas({
  algorithmName,
  currentStep,
  viewMode,
  onViewModeChange,
}: VisualizationCanvasProps) {
  // Determine visualization type
  const getVisualizationType = (): string => {
    if (!currentStep) return "sorting"
    if (isSortingStep(currentStep)) return "sorting"
    if (isTreeStep(currentStep)) return "tree"
    if (isGraphStep(currentStep)) return "graph"
    if (isRecursionStep(currentStep)) return "recursion"
    if (isMemoryStep(currentStep)) return "memory"
    return "sorting"
  }

  const visType = getVisualizationType()

  // Legacy support: convert old step format
  // const normalizedStep: AlgorithmStep | null = currentStep
  //   ? currentStep.type
  //     ? currentStep
  //     : ({ type: "sorting" as const, ...currentStep } as SortingStep)
  //   : null
  const normalizedStep = currentStep;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-xl border border-border bg-card"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">{algorithmName}</h2>
          {currentStep && <p className="text-sm text-muted-foreground mt-1">{currentStep.description}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange("algorithm")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              viewMode === "algorithm"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            Algorithm View
          </button>
          <button
            onClick={() => onViewModeChange("memory")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              viewMode === "memory"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            Memory View
          </button>
        </div>
      </div>

      <div className="flex min-h-[400px]">
        {normalizedStep && isSortingStep(normalizedStep) && <SortingVisualization step={normalizedStep} />}
        {normalizedStep && isTreeStep(normalizedStep) && <TreeVisualization step={normalizedStep} />}
        {normalizedStep && isGraphStep(normalizedStep) && <GraphVisualization step={normalizedStep} />}
        {normalizedStep && isRecursionStep(normalizedStep) && <RecursionVisualization step={normalizedStep} />}
        {normalizedStep && isMemoryStep(normalizedStep) && <MemoryVisualization step={normalizedStep} />}
        {!normalizedStep && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Select an algorithm to visualize</p>
          </div>
        )}
      </div>

      {/* Legend - only for sorting */}
      {visType === "sorting" && (
        <div className="flex items-center justify-center gap-6 border-t border-border px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-accent" />
            <span className="text-xs text-muted-foreground">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-primary" />
            <span className="text-xs text-muted-foreground">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-destructive" />
            <span className="text-xs text-muted-foreground">Swapping</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
