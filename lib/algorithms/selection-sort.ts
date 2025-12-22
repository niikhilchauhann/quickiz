import type { AlgorithmDefinition, SortingStep } from "@/lib/algorithm-engine"

export const selectionSort: AlgorithmDefinition = {
  id: "selection-sort",
  name: "Selection Sort",
  category: "sorting",
  description:
    "An in-place comparison sorting algorithm that divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.",
  code: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}`,
  timeComplexity: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
  },
  spaceComplexity: "O(1)",
  generateSteps: (input: number[]): SortingStep[] => {
    const steps: SortingStep[] = []
    const arr = [...input]
    const n = arr.length

    steps.push({
      type: "sorting",
      array: [...arr],
      activeIndices: [],
      operation: "initial",
      description: "Initial array state",
    })

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i

      for (let j = i + 1; j < n; j++) {
        steps.push({
          type: "sorting",
          array: [...arr],
          activeIndices: [minIdx, j],
          operation: "compare",
          description: `Comparing arr[${minIdx}]=${arr[minIdx]} with arr[${j}]=${arr[j]}`,
        })

        if (arr[j] < arr[minIdx]) {
          minIdx = j
        }
      }

      if (minIdx !== i) {
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        steps.push({
          type: "sorting",
          array: [...arr],
          activeIndices: [i, minIdx],
          operation: "swap",
          description: `Swapped arr[${i}] and arr[${minIdx}]`,
        })
      }
    }

    steps.push({
      type: "sorting",
      array: [...arr],
      activeIndices: [],
      operation: "done",
      description: "Sorting complete!",
    })

    return steps
  },
}
