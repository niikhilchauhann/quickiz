import type { AlgorithmStep, GraphStep, GraphNode, GraphEdge } from "@/lib/algorithm-engine"

function createSampleGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: "A", label: "A", x: 200, y: 50 },
    { id: "B", label: "B", x: 100, y: 150 },
    { id: "C", label: "C", x: 300, y: 150 },
    { id: "D", label: "D", x: 50, y: 250 },
    { id: "E", label: "E", x: 150, y: 250 },
    { id: "F", label: "F", x: 250, y: 250 },
    { id: "G", label: "G", x: 350, y: 250 },
  ]

  const edges: GraphEdge[] = [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "B", to: "E" },
    { from: "C", to: "F" },
    { from: "C", to: "G" },
  ]

  return { nodes, edges }
}

export const bfs = {
  id: "bfs",
  name: "Breadth-First Search",
  category: "graphs",
  description: "Explore all neighbors at current depth before moving to nodes at next depth level.",
  code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`,
  timeComplexity: {
    best: "O(V + E)",
    average: "O(V + E)",
    worst: "O(V + E)",
  },
  spaceComplexity: "O(V)",
  generateSteps: (_input: number[]): AlgorithmStep[] => {
    const { nodes, edges } = createSampleGraph()
    const steps: GraphStep[] = []

    // Build adjacency list
    const adjList: Record<string, string[]> = {}
    for (const node of nodes) {
      adjList[node.id] = []
    }
    for (const edge of edges) {
      adjList[edge.from].push(edge.to)
      adjList[edge.to].push(edge.from)
    }

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [],
      activeNode: null,
      activeEdge: null,
      queue: [],
      operation: "initial",
      description: "Starting BFS from node A",
    })

    const visited = new Set<string>()
    const queue: string[] = ["A"]

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [],
      activeNode: null,
      activeEdge: null,
      queue: [...queue],
      operation: "enqueue",
      description: "Added starting node A to queue",
    })

    while (queue.length > 0) {
      const current = queue.shift()!

      if (visited.has(current)) continue

      steps.push({
        type: "graph",
        nodes: [...nodes],
        edges: [...edges],
        visitedNodes: [...visited],
        activeNode: current,
        activeEdge: null,
        queue: [...queue],
        operation: "dequeue",
        description: `Dequeued node ${current}`,
      })

      visited.add(current)

      steps.push({
        type: "graph",
        nodes: [...nodes],
        edges: [...edges],
        visitedNodes: [...visited],
        activeNode: current,
        activeEdge: null,
        queue: [...queue],
        operation: "visit",
        description: `Visiting node ${current}`,
      })

      for (const neighbor of adjList[current]) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor)

          const edge = edges.find(
            (e) => (e.from === current && e.to === neighbor) || (e.to === current && e.from === neighbor),
          )

          steps.push({
            type: "graph",
            nodes: [...nodes],
            edges: [...edges],
            visitedNodes: [...visited],
            activeNode: current,
            activeEdge: edge || null,
            queue: [...queue],
            operation: "explore",
            description: `Exploring edge to ${neighbor}, adding to queue`,
          })
        }
      }
    }

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [...visited],
      activeNode: null,
      activeEdge: null,
      queue: [],
      operation: "done",
      description: `BFS complete! Visited: ${[...visited].join(" → ")}`,
    })

    return steps
  },
}
