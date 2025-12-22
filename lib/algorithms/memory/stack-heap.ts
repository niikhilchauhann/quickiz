import type { AlgorithmStep, MemoryStep, MemoryBlock } from "@/lib/algorithm-engine"

export const stackVsHeap = {
  id: "stack-heap",
  name: "Stack vs Heap",
  category: "memory",
  description: "Visualize the difference between stack and heap memory allocation.",
  code: `function example() {
  // Stack allocation
  let x = 10;           // primitive on stack
  let y = 20;           // primitive on stack
  
  // Heap allocation
  let arr = [1, 2, 3];  // array on heap
  let obj = { a: 1 };   // object on heap
  
  // Reference assignment
  let arr2 = arr;       // points to same heap location
  
  arr2[0] = 99;         // modifies original array!
  console.log(arr[0]);  // outputs: 99
}`,
  timeComplexity: {
    best: "O(1)",
    average: "O(1)",
    worst: "O(1)",
  },
  spaceComplexity: "O(n)",
  generateSteps: (_input: number[]): AlgorithmStep[] => {
    const steps: MemoryStep[] = []

    steps.push({
      type: "memory",
      stackMemory: [],
      heapMemory: [],
      pointers: [],
      operation: "initial",
      description: "Starting function execution - memory is empty",
    })

    // Step 1: Allocate x on stack
    const x: MemoryBlock = {
      id: "x",
      name: "x",
      value: 10,
      address: "0x0100",
      type: "stack",
    }

    steps.push({
      type: "memory",
      stackMemory: [x],
      heapMemory: [],
      pointers: [],
      operation: "allocate",
      description: "let x = 10 → Primitive stored directly on stack",
    })

    // Step 2: Allocate y on stack
    const y: MemoryBlock = {
      id: "y",
      name: "y",
      value: 20,
      address: "0x0108",
      type: "stack",
    }

    steps.push({
      type: "memory",
      stackMemory: [x, y],
      heapMemory: [],
      pointers: [],
      operation: "allocate",
      description: "let y = 20 → Another primitive on stack",
    })

    // Step 3: Allocate array on heap
    const arrHeap: MemoryBlock = {
      id: "arr-heap",
      name: "[1, 2, 3]",
      value: [1, 2, 3],
      address: "0x2000",
      type: "heap",
    }

    const arr: MemoryBlock = {
      id: "arr",
      name: "arr",
      value: "0x2000",
      address: "0x0110",
      type: "stack",
      pointsTo: "arr-heap",
    }

    steps.push({
      type: "memory",
      stackMemory: [x, y, arr],
      heapMemory: [arrHeap],
      pointers: [{ from: "arr", to: "arr-heap" }],
      operation: "allocate",
      description: "let arr = [1, 2, 3] → Array allocated on heap, reference stored on stack",
    })

    // Step 4: Allocate object on heap
    const objHeap: MemoryBlock = {
      id: "obj-heap",
      name: "{ a: 1 }",
      value: { a: 1 },
      address: "0x2020",
      type: "heap",
    }

    const obj: MemoryBlock = {
      id: "obj",
      name: "obj",
      value: "0x2020",
      address: "0x0118",
      type: "stack",
      pointsTo: "obj-heap",
    }

    steps.push({
      type: "memory",
      stackMemory: [x, y, arr, obj],
      heapMemory: [arrHeap, objHeap],
      pointers: [
        { from: "arr", to: "arr-heap" },
        { from: "obj", to: "obj-heap" },
      ],
      operation: "allocate",
      description: "let obj = { a: 1 } → Object allocated on heap, reference on stack",
    })

    // Step 5: Reference assignment
    const arr2: MemoryBlock = {
      id: "arr2",
      name: "arr2",
      value: "0x2000",
      address: "0x0120",
      type: "stack",
      pointsTo: "arr-heap",
    }

    steps.push({
      type: "memory",
      stackMemory: [x, y, arr, obj, arr2],
      heapMemory: [arrHeap, objHeap],
      pointers: [
        { from: "arr", to: "arr-heap" },
        { from: "obj", to: "obj-heap" },
        { from: "arr2", to: "arr-heap" },
      ],
      operation: "allocate",
      description: "let arr2 = arr → Both arr and arr2 now point to the SAME heap location!",
    })

    // Step 6: Modify through arr2
    const arrHeapModified: MemoryBlock = {
      ...arrHeap,
      name: "[99, 2, 3]",
      value: [99, 2, 3],
    }

    steps.push({
      type: "memory",
      stackMemory: [x, y, arr, obj, arr2],
      heapMemory: [arrHeapModified, objHeap],
      pointers: [
        { from: "arr", to: "arr-heap" },
        { from: "obj", to: "obj-heap" },
        { from: "arr2", to: "arr-heap" },
      ],
      operation: "update",
      description: "arr2[0] = 99 → Modified heap data. arr[0] is also 99 now!",
    })

    steps.push({
      type: "memory",
      stackMemory: [x, y, arr, obj, arr2],
      heapMemory: [arrHeapModified, objHeap],
      pointers: [
        { from: "arr", to: "arr-heap" },
        { from: "obj", to: "obj-heap" },
        { from: "arr2", to: "arr-heap" },
      ],
      operation: "done",
      description: "Demo complete! Key insight: Objects/arrays are references, primitives are values.",
    })

    return steps
  },
}
