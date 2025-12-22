import type { AlgorithmStep, TreeStep, TreeNode } from "@/lib/algorithm-engine"

function cloneTree(node: TreeNode | null): TreeNode | null {
  if (!node) return null
  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left || null),
    right: cloneTree(node.right || null),
  }
}

function generateNodeId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export const bstInsert = {
  id: "bst-insert",
  name: "BST Insertion",
  category: "trees",
  description: "Insert values into a Binary Search Tree while maintaining BST properties.",
  code: `function insert(root, value) {
  if (!root) {
    return { value, left: null, right: null };
  }
  
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else {
    root.right = insert(root.right, value);
  }
  
  return root;
}`,
  timeComplexity: {
    best: "O(log n)",
    average: "O(log n)",
    worst: "O(n)",
  },
  spaceComplexity: "O(n)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const steps: TreeStep[] = []
    let root: TreeNode | null = null

    steps.push({
      type: "tree",
      root: null,
      highlightedNodes: [],
      traversalOrder: [],
      operation: "initial",
      description: `Starting BST insertion with values: [${input.join(", ")}]`,
    })

    for (const value of input) {
      if (!root) {
        root = { id: generateNodeId(), value }
        steps.push({
          type: "tree",
          root: cloneTree(root),
          highlightedNodes: [root.id],
          traversalOrder: [value],
          operation: "insert",
          description: `Inserted ${value} as root node`,
        })
        continue
      }

      let current: TreeNode | null = root
      const path: string[] = []

      while (current) {
        path.push(current.id)
        steps.push({
          type: "tree",
          root: cloneTree(root),
          highlightedNodes: [...path],
          traversalOrder: [],
          operation: "compare",
          description: `Comparing ${value} with node ${current.value}`,
        })

        if (value < current.value) {
          if (!current.left) {
            current.left = { id: generateNodeId(), value }
            steps.push({
              type: "tree",
              root: cloneTree(root),
              highlightedNodes: [current.left.id],
              traversalOrder: [],
              operation: "insert",
              description: `Inserted ${value} as left child of ${current.value}`,
            })
            break
          }
          current = current.left
        } else {
          if (!current.right) {
            current.right = { id: generateNodeId(), value }
            steps.push({
              type: "tree",
              root: cloneTree(root),
              highlightedNodes: [current.right.id],
              traversalOrder: [],
              operation: "insert",
              description: `Inserted ${value} as right child of ${current.value}`,
            })
            break
          }
          current = current.right
        }
      }
    }

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [],
      operation: "done",
      description: "BST insertion complete!",
    })

    return steps
  },
}
