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

export const dfs = {
  id: "dfs",
  name: "Depth-First Search",
  category: "graphs",
  description: "Explore as far as possible along each branch before backtracking.",
  code: `function dfs(graph, start) {
  const visited = new Set();
  const result = [];
  
  function explore(node) {
    if (visited.has(node)) return;
    
    visited.add(node);
    result.push(node);
    
    for (const neighbor of graph[node]) {
      explore(neighbor);
    }
  }
  
  explore(start);
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

    const visited = new Set<string>()
    const stack: string[] = []

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [],
      activeNode: null,
      activeEdge: null,
      queue: [],
      operation: "initial",
      description: "Starting DFS from node A",
    })

    function dfsRecursive(current: string): void {
      if (visited.has(current)) return

      stack.push(current)

      steps.push({
        type: "graph",
        nodes: [...nodes],
        edges: [...edges],
        visitedNodes: [...visited],
        activeNode: current,
        activeEdge: null,
        queue: [...stack],
        operation: "visit",
        description: `Visiting node ${current}`,
      })

      visited.add(current)

      for (const neighbor of adjList[current]) {
        if (!visited.has(neighbor)) {
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
            queue: [...stack],
            operation: "explore",
            description: `Exploring edge to ${neighbor}`,
          })

          dfsRecursive(neighbor)
        }
      }

      stack.pop()
    }

    dfsRecursive("A")

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [...visited],
      activeNode: null,
      activeEdge: null,
      queue: [],
      operation: "done",
      description: `DFS complete! Visited: ${[...visited].join(" → ")}`,
    })

    return steps
  },
}
