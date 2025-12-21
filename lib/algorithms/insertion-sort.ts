import type { AlgorithmDefinition, AlgorithmStep } from "@/lib/algorithm-engine"

export const insertionSort: AlgorithmDefinition = {
  id: "insertion-sort",
  name: "Insertion Sort",
  category: "sorting",
  description:
    "Builds the final sorted array one item at a time by repeatedly picking the next element and inserting it into the sorted portion.",
  code: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
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

    for (let i = 1; i < n; i++) {
      const key = arr[i]
      let j = i - 1

      while (j >= 0 && arr[j] > key) {
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          operation: "compare",
          description: `Comparing arr[${j}]=${arr[j]} with key=${key}`,
        })

        arr[j + 1] = arr[j]
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          operation: "swap",
          description: `Shifted arr[${j}] to position ${j + 1}`,
        })
        j--
      }

      arr[j + 1] = key
      if (j + 1 !== i) {
        steps.push({
          array: [...arr],
          activeIndices: [j + 1],
          operation: "swap",
          description: `Inserted key=${key} at position ${j + 1}`,
        })
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
