import type { AlgorithmDefinition, AlgorithmStep } from "@/lib/algorithm-engine"

export const quickSort: AlgorithmDefinition = {
  id: "quick-sort",
  name: "Quick Sort",
  category: "sorting",
  description:
    "A divide-and-conquer algorithm that selects a pivot element and partitions the array around it, recursively sorting the sub-arrays.",
  code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
  },
  spaceComplexity: "O(log n)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const steps: AlgorithmStep[] = []
    const arr = [...input]

    steps.push({
      array: [...arr],
      activeIndices: [],
      operation: "initial",
      description: "Initial array state",
    })

    function partition(low: number, high: number): number {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        steps.push({
          array: [...arr],
          activeIndices: [j, high],
          operation: "compare",
          description: `Comparing arr[${j}]=${arr[j]} with pivot=${pivot}`,
        })

        if (arr[j] < pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          if (i !== j) {
            steps.push({
              array: [...arr],
              activeIndices: [i, j],
              operation: "swap",
              description: `Swapped arr[${i}] and arr[${j}]`,
            })
          }
        }
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      steps.push({
        array: [...arr],
        activeIndices: [i + 1, high],
        operation: "swap",
        description: `Placed pivot at position ${i + 1}`,
      })

      return i + 1
    }

    function sort(low: number, high: number) {
      if (low < high) {
        const pi = partition(low, high)
        sort(low, pi - 1)
        sort(pi + 1, high)
      }
    }

    sort(0, arr.length - 1)

    steps.push({
      array: [...arr],
      activeIndices: [],
      operation: "done",
      description: "Sorting complete!",
    })

    return steps
  },
}
