import { bubbleSort } from "./bubble-sort"
import { selectionSort } from "./selection-sort"
import { insertionSort } from "./insertion-sort"
import { quickSort } from "./quick-sort"
import { bstInsert } from "./trees/bst-insert"
import { inorderTraversal, preorderTraversal, postorderTraversal } from "./trees/tree-traversals"
import { bfs } from "./graphs/bfs"
import { dfs } from "./graphs/dfs"
import { dijkstra } from "./graphs/dijkstra"
import { nQueens } from "./recursion/n-queens"
import { fibonacciRecursive } from "./recursion/fibonacci"
import { linkedListTraversal } from "./memory/linked-list"
import { stackVsHeap } from "./memory/stack-heap"
import type { AlgorithmDefinition } from "@/lib/algorithm-engine"

export const algorithms: AlgorithmDefinition[] = [
  // Sorting
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  // Trees
  bstInsert,
  inorderTraversal,
  preorderTraversal,
  postorderTraversal,
  // Graphs
  bfs,
  dfs,
  dijkstra,
  // Recursion
  nQueens,
  fibonacciRecursive,
  // Memory
  linkedListTraversal,
  stackVsHeap,
]

export const algorithmsByCategory = algorithms.reduce(
  (acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = []
    }
    acc[algo.category].push(algo)
    return acc
  },
  {} as Record<string, AlgorithmDefinition[]>,
)

export const getAlgorithmById = (id: string): AlgorithmDefinition | undefined => {
  return algorithms.find((a) => a.id === id)
}

export const searchAlgorithms = (query: string): AlgorithmDefinition[] => {
  const lowerQuery = query.toLowerCase()
  return algorithms.filter(
    (a) =>
      a.name.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery) ||
      a.category.toLowerCase().includes(lowerQuery),
  )
}
