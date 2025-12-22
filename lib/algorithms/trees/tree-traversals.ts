import type { AlgorithmStep, TreeStep, TreeNode } from "@/lib/algorithm-engine"

function cloneTree(node: TreeNode | null | undefined): TreeNode | undefined {
  if (!node) return undefined

  return {
    id: node.id,
    value: node.value,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
  }
}


function generateNodeId(): string {
  return Math.random().toString(36).substring(2, 9)
}

function buildBST(values: number[]): TreeNode | null {
  if (values.length === 0) return null

  let root: TreeNode | null = null

  for (const value of values) {
    if (!root) {
      root = { id: generateNodeId(), value }
      continue
    }

    let current = root
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = { id: generateNodeId(), value }
          break
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = { id: generateNodeId(), value }
          break
        }
        current = current.right
      }
    }
  }

  return root
}

export const inorderTraversal = {
  id: "inorder-traversal",
  name: "Inorder Traversal",
  category: "trees",
  description: "Visit left subtree, then root, then right subtree. Produces sorted order for BST.",
  code: `function inorder(node, result = []) {
  if (!node) return result;
  
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  
  return result;
}`,
  timeComplexity: {
    best: "O(n)",
    average: "O(n)",
    worst: "O(n)",
  },
  spaceComplexity: "O(h)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const root = buildBST(input)
    const steps: TreeStep[] = []
    const traversalOrder: number[] = []

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [],
      operation: "initial",
      description: "Starting inorder traversal (Left → Root → Right)",
    })

    function inorder(node: TreeNode | null): void {
      if (!node) return

      // Visit left
      inorder(node.left || null)

      // Visit current node
      traversalOrder.push(node.value)
      steps.push({
        type: "tree",
        root: cloneTree(root),
        highlightedNodes: [node.id],
        traversalOrder: [...traversalOrder],
        operation: "visit",
        description: `Visiting node ${node.value}`,
      })

      // Visit right
      inorder(node.right || null)
    }

    inorder(root)

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [...traversalOrder],
      operation: "done",
      description: `Inorder traversal complete: [${traversalOrder.join(", ")}]`,
    })

    return steps
  },
}

export const preorderTraversal = {
  id: "preorder-traversal",
  name: "Preorder Traversal",
  category: "trees",
  description: "Visit root, then left subtree, then right subtree.",
  code: `function preorder(node, result = []) {
  if (!node) return result;
  
  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);
  
  return result;
}`,
  timeComplexity: {
    best: "O(n)",
    average: "O(n)",
    worst: "O(n)",
  },
  spaceComplexity: "O(h)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const root = buildBST(input)
    const steps: TreeStep[] = []
    const traversalOrder: number[] = []

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [],
      operation: "initial",
      description: "Starting preorder traversal (Root → Left → Right)",
    })

    function preorder(node: TreeNode | null): void {
      if (!node) return

      // Visit current node first
      traversalOrder.push(node.value)
      steps.push({
        type: "tree",
        root: cloneTree(root),
        highlightedNodes: [node.id],
        traversalOrder: [...traversalOrder],
        operation: "visit",
        description: `Visiting node ${node.value}`,
      })

      // Visit left
      preorder(node.left || null)

      // Visit right
      preorder(node.right || null)
    }

    preorder(root)

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [...traversalOrder],
      operation: "done",
      description: `Preorder traversal complete: [${traversalOrder.join(", ")}]`,
    })

    return steps
  },
}

export const postorderTraversal = {
  id: "postorder-traversal",
  name: "Postorder Traversal",
  category: "trees",
  description: "Visit left subtree, then right subtree, then root.",
  code: `function postorder(node, result = []) {
  if (!node) return result;
  
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);
  
  return result;
}`,
  timeComplexity: {
    best: "O(n)",
    average: "O(n)",
    worst: "O(n)",
  },
  spaceComplexity: "O(h)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const root = buildBST(input)
    const steps: TreeStep[] = []
    const traversalOrder: number[] = []

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [],
      operation: "initial",
      description: "Starting postorder traversal (Left → Right → Root)",
    })

    function postorder(node: TreeNode | null): void {
      if (!node) return

      // Visit left
      postorder(node.left || null)

      // Visit right
      postorder(node.right || null)

      // Visit current node last
      traversalOrder.push(node.value)
      steps.push({
        type: "tree",
        root: cloneTree(root),
        highlightedNodes: [node.id],
        traversalOrder: [...traversalOrder],
        operation: "visit",
        description: `Visiting node ${node.value}`,
      })
    }

    postorder(root)

    steps.push({
      type: "tree",
      root: cloneTree(root),
      highlightedNodes: [],
      traversalOrder: [...traversalOrder],
      operation: "done",
      description: `Postorder traversal complete: [${traversalOrder.join(", ")}]`,
    })

    return steps
  },
}
