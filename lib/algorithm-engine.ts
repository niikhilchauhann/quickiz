// AlgorithmEngine - Core abstraction for step-based algorithm execution

// Sorting step
export interface SortingStep {
  type: "sorting"
  array: number[]
  activeIndices: number[]
  operation: "compare" | "swap" | "done" | "initial"
  description: string
}

// Tree step
export interface TreeNode {
  id: string
  value: number
  left?: TreeNode
  right?: TreeNode

  x?: number
  y?: number
}

export interface TreeStep {
  type: "tree"
  root: TreeNode | undefined
  highlightedNodes: string[]
  traversalOrder: number[]
  operation: "visit" | "insert" | "delete" | "compare" | "done" | "initial"
  description: string
}

// Graph step
export interface GraphNode {
  id: string
  label: string
  x: number
  y: number
}

export interface GraphEdge {
  from: string
  to: string
  weight?: number
}

export interface GraphStep {
  type: "graph"
  nodes: GraphNode[]
  edges: GraphEdge[]
  visitedNodes: string[]
  activeNode: string | null
  activeEdge: GraphEdge | null
  queue: string[]
  distances?: Record<string, number>
  operation: "visit" | "explore" | "enqueue" | "dequeue" | "done" | "initial"
  description: string
}

// Recursion step
export interface StackFrame {
  id: string
  functionName: string
  args: Record<string, unknown>
  returnValue?: unknown
  isActive: boolean
}

export interface RecursionStep {
  type: "recursion"
  stackFrames: StackFrame[]
  boardState?: (number | null)[][]
  currentRow?: number
  currentCol?: number
  operation: "push" | "pop" | "execute" | "backtrack" | "done" | "initial"
  description: string
}

// Memory step
export interface MemoryBlock {
  id: string
  name: string
  value: unknown
  address: string
  type: "stack" | "heap"
  pointsTo?: string
}

export interface MemoryStep {
  type: "memory"
  stackMemory: MemoryBlock[]
  heapMemory: MemoryBlock[]
  pointers: { from: string; to: string }[]
  operation: "allocate" | "deallocate" | "update" | "traverse" | "done" | "initial"
  description: string
}

// Union type for all steps
export type AlgorithmStep = SortingStep | TreeStep | GraphStep | RecursionStep | MemoryStep

// Legacy support
export interface LegacyAlgorithmStep {
  array: number[]
  activeIndices: number[]
  operation: "compare" | "swap" | "done" | "initial"
  description: string
}

export interface AlgorithmDefinition {
  id: string
  name: string
  category: string
  description: string
  code: string
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  generateSteps: (input: number[]) => AlgorithmStep[]
}

export class AlgorithmEngine {
  private steps: AlgorithmStep[] = []
  private currentIndex = 0
  private isPlaying = false
  private intervalId: NodeJS.Timeout | null = null
  private speed = 400 // ms between steps
  private onStepChange: ((step: AlgorithmStep, index: number, total: number) => void) | null = null
  private onPlayStateChange: ((isPlaying: boolean) => void) | null = null

  constructor() {
    this.steps = []
    this.currentIndex = 0
  }

  loadSteps(steps: AlgorithmStep[]) {
    this.reset()
    this.steps = steps
    this.currentIndex = 0
    this.notifyStepChange()
  }

  setOnStepChange(callback: (step: AlgorithmStep, index: number, total: number) => void) {
    this.onStepChange = callback
  }

  setOnPlayStateChange(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChange = callback
  }

  setSpeed(ms: number) {
    this.speed = ms
    if (this.isPlaying) {
      this.pause()
      this.play()
    }
  }

  play() {
    if (this.isPlaying || this.currentIndex >= this.steps.length - 1) return
    this.isPlaying = true
    this.onPlayStateChange?.(true)

    this.intervalId = setInterval(() => {
      if (this.currentIndex < this.steps.length - 1) {
        this.currentIndex++
        this.notifyStepChange()
      } else {
        this.pause()
      }
    }, this.speed)
  }

  pause() {
    this.isPlaying = false
    this.onPlayStateChange?.(false)
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  stepForward() {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++
      this.notifyStepChange()
    }
  }

  stepBack() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.notifyStepChange()
    }
  }

  reset() {
    this.pause()
    this.currentIndex = 0
    if (this.steps.length > 0) {
      this.notifyStepChange()
    }
  }

  getCurrentStep(): AlgorithmStep | null {
    return this.steps[this.currentIndex] || null
  }

  getCurrentIndex(): number {
    return this.currentIndex
  }

  getTotalSteps(): number {
    return this.steps.length
  }

  getIsPlaying(): boolean {
    return this.isPlaying
  }

  private notifyStepChange() {
    if (this.onStepChange && this.steps[this.currentIndex]) {
      this.onStepChange(this.steps[this.currentIndex], this.currentIndex, this.steps.length)
    }
  }
}
