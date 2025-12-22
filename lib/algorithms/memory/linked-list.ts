import type { AlgorithmStep, MemoryStep, MemoryBlock } from "@/lib/algorithm-engine"

export const linkedListTraversal = {
  id: "linked-list",
  name: "Linked List Traversal",
  category: "memory",
  description: "Traverse a linked list and visualize pointer movements and memory allocation.",
  code: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function traverse(head) {
  let current = head;
  const values = [];
  
  while (current !== null) {
    values.push(current.value);
    current = current.next;
  }
  
  return values;
}`,
  timeComplexity: {
    best: "O(n)",
    average: "O(n)",
    worst: "O(n)",
  },
  spaceComplexity: "O(1)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const values = input.length > 0 ? input.slice(0, 6) : [10, 20, 30, 40, 50]
    const steps: MemoryStep[] = []

    // Create memory blocks for each node
    const heapMemory: MemoryBlock[] = values.map((value, i) => ({
      id: `node-${i}`,
      name: `Node ${i}`,
      value: { value, next: i < values.length - 1 ? `0x${(1000 + (i + 1) * 8).toString(16)}` : "null" },
      address: `0x${(1000 + i * 8).toString(16)}`,
      type: "heap",
      pointsTo: i < values.length - 1 ? `node-${i + 1}` : undefined,
    }))

    const headPointer: MemoryBlock = {
      id: "head",
      name: "head",
      value: heapMemory[0].address,
      address: "0x0100",
      type: "stack",
      pointsTo: "node-0",
    }

    steps.push({
      type: "memory",
      stackMemory: [headPointer],
      heapMemory: [...heapMemory],
      pointers: [{ from: "head", to: "node-0" }],
      operation: "initial",
      description: `Created linked list with ${values.length} nodes: [${values.join(" → ")}]`,
    })

    // Traversal
    let currentPointer: MemoryBlock = {
      id: "current",
      name: "current",
      value: heapMemory[0].address,
      address: "0x0108",
      type: "stack",
      pointsTo: "node-0",
    }

    steps.push({
      type: "memory",
      stackMemory: [headPointer, currentPointer],
      heapMemory: [...heapMemory],
      pointers: [
        { from: "head", to: "node-0" },
        { from: "current", to: "node-0" },
      ],
      operation: "allocate",
      description: "Created 'current' pointer initialized to head",
    })

    for (let i = 0; i < values.length; i++) {
      steps.push({
        type: "memory",
        stackMemory: [headPointer, { ...currentPointer }],
        heapMemory: heapMemory.map((block, j) => ({
          ...block,
          name: j === i ? `Node ${j} ← CURRENT` : `Node ${j}`,
        })),
        pointers: [
          { from: "head", to: "node-0" },
          { from: "current", to: `node-${i}` },
        ],
        operation: "traverse",
        description: `Visiting node at ${heapMemory[i].address}: value = ${values[i]}`,
      })

      if (i < values.length - 1) {
        currentPointer = {
          ...currentPointer,
          value: heapMemory[i + 1].address,
          pointsTo: `node-${i + 1}`,
        }

        steps.push({
          type: "memory",
          stackMemory: [headPointer, { ...currentPointer }],
          heapMemory: [...heapMemory],
          pointers: [
            { from: "head", to: "node-0" },
            { from: "current", to: `node-${i + 1}` },
          ],
          operation: "update",
          description: `Moving current to next node: current = current.next`,
        })
      }
    }

    steps.push({
      type: "memory",
      stackMemory: [headPointer],
      heapMemory: [...heapMemory],
      pointers: [{ from: "head", to: "node-0" }],
      operation: "done",
      description: `Traversal complete! Visited all ${values.length} nodes.`,
    })

    return steps
  },
}
