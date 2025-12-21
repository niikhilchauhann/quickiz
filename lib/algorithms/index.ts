import { bubbleSort } from "./bubble-sort"
import { selectionSort } from "./selection-sort"
import { insertionSort } from "./insertion-sort"
import { quickSort } from "./quick-sort"
import type { AlgorithmDefinition } from "@/lib/algorithm-engine"

export const algorithms: AlgorithmDefinition[] = [bubbleSort, selectionSort, insertionSort, quickSort]

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
