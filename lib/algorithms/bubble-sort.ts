import type { AlgorithmDefinition, AlgorithmStep } from "@/lib/algorithm-engine"

export const bubbleSort: AlgorithmDefinition = {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "sorting",
  description:
    "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
  code: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  spaceComplexity: "O(1)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = []
    const arr = [...input]
    const n = arr.length

    steps.push({
      array: [...arr],
      activeIndices: [],
      operation: "initial",
      description: "Initial array state",
    })

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Compare step
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          operation: "compare",
          description: `Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`,
        })

        if (arr[j] > arr[j + 1]) {
          // Swap
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          steps.push({
            array: [...arr],
            activeIndices: [j, j + 1],
            operation: "swap",
            description: `Swapped arr[${j}] and arr[${j + 1}]`,
          })
        }
      }
    }

    steps.push({
      array: [...arr],
      activeIndices: [],
      operation: "done",
      description: "Sorting complete!",
    })

    return steps
  },
}
