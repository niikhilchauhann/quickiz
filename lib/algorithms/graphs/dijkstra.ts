import type { AlgorithmStep, GraphStep, GraphNode, GraphEdge } from "@/lib/algorithm-engine"

function createWeightedGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [
    { id: "A", label: "A", x: 100, y: 100 },
    { id: "B", label: "B", x: 250, y: 50 },
    { id: "C", label: "C", x: 250, y: 180 },
    { id: "D", label: "D", x: 400, y: 100 },
    { id: "E", label: "E", x: 400, y: 220 },
  ]

  const edges: GraphEdge[] = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "D", weight: 8 },
    { from: "C", to: "E", weight: 10 },
    { from: "D", to: "E", weight: 2 },
  ]

  return { nodes, edges }
}

export const dijkstra = {
  id: "dijkstra",
  name: "Dijkstra's Algorithm",
  category: "graphs",
  description: "Find the shortest path from a source node to all other nodes in a weighted graph.",
  code: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  const pq = [[0, start]]; // [distance, node]
  
  for (const node of graph.nodes) {
    distances[node] = Infinity;
  }
  distances[start] = 0;
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dist, node] = pq.shift();
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    for (const [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
}`,
  timeComplexity: {
    best: "O((V + E) log V)",
    average: "O((V + E) log V)",
    worst: "O((V + E) log V)",
  },
  spaceComplexity: "O(V)",
  generateSteps: (_input: number[]): AlgorithmStep[] => {
    const { nodes, edges } = createWeightedGraph()
    const steps: GraphStep[] = []

    // Build adjacency list with weights
    const adjList: Record<string, { node: string; weight: number }[]> = {}
    for (const node of nodes) {
      adjList[node.id] = []
    }
    for (const edge of edges) {
      adjList[edge.from].push({ node: edge.to, weight: edge.weight! })
      adjList[edge.to].push({ node: edge.from, weight: edge.weight! })
    }

    const distances: Record<string, number> = {}
    const visited = new Set<string>()
    const pq: [number, string][] = [[0, "A"]]

    for (const node of nodes) {
      distances[node.id] = Number.POSITIVE_INFINITY
    }
    distances["A"] = 0

    steps.push({
      type: "graph",
      nodes: [...nodes],
      edges: [...edges],
      visitedNodes: [],
      activeNode: null,
      activeEdge: null,
      queue: ["A"],
      distances: { ...distances },
      operation: "initial",
      description: "Starting Dijkstra from node A. All distances set to ∞ except A=0",
    })

    while (pq.length > 0) {
      pq.sort((a, b) => a[0] - b[0])
      const [dist, current] = pq.shift()!

      if (visited.has(current)) continue

      steps.push({
        type: "graph",
        nodes: [...nodes],
        edges: [...edges],
        visitedNodes: [...visited],
        activeNode: current,
        activeEdge: null,
        queue: pq.map((p) => p[1]),
        distances: { ...distances },
        operation: "dequeue",
        description: `Processing node ${current} with distance ${dist}`,
      })

      visited.add(current)

      steps.push({
        type: "graph",
        nodes: [...nodes],
        edges: [...edges],
        visitedNodes: [...visited],
        activeNode: current,
        activeEdge: null,
        queue: pq.map((p) => p[1]),
        distances: { ...distances },
        operation: "visit",
        description: `Marked node ${current} as visited`,
      })

      for (const { node: neighbor, weight } of adjList[current]) {
        if (!visited.has(neighbor)) {
          const newDist = dist + weight

          const edge = edges.find(
            (e) => (e.from === current && e.to === neighbor) || (e.to === current && e.from === neighbor),
          )

          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist
            pq.push([newDist, neighbor])

            steps.push({
              type: "graph",
              nodes: [...nodes],
              edges: [...edges],
              visitedNodes: [...visited],
              activeNode: current,
              activeEdge: edge || null,
              queue: pq.map((p) => p[1]),
              distances: { ...distances },
              operation: "explore",
              description: `Updated distance to ${neighbor}: ${newDist} (via ${current})`,
            })
          }
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
      distances: { ...distances },
      operation: "done",
      description: `Dijkstra complete! Shortest distances from A: ${Object.entries(distances)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ")}`,
    })

    return steps
  },
}
