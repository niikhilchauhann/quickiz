# Quickiz

**Quickiz** is an interactive platform for visualizing **Data Structures and Algorithms** with a strong focus on **execution flow, memory behavior (stack & heap), and step-by-step understanding**.

The project is designed to help learners go beyond running code by making **algorithm execution and memory usage explicit and observable**.

---

## Overview

Traditional learning resources often require users to manually dry-run algorithms to understand how data changes in memory. Quickiz addresses this problem by providing:

- Deterministic, step-by-step algorithm execution
- Visual representation of algorithm state
- Explicit stack and heap memory visualization
- Clear separation between algorithm logic and rendering

The platform is built as a **modular, extensible system** that supports multiple algorithm categories and visualization strategies.

---

## Tech Stack

- **Next.js (App Router)**
- **TypeScript (strict mode)**
- **Tailwind CSS** with design tokens
- **Framer Motion** for animations
- Custom **Algorithm Execution Engine**
- Modular visualization components

---

## Core Architecture

Quickiz is built around a **step-based execution model**.

1. Each algorithm produces a sequence of immutable execution steps.
2. Every step contains only the data required to render that state.
3. A visualization layer renders the current step.
4. Playback controls allow stepping forward, backward, or auto-playing steps.

This architecture ensures correctness, debuggability, and extensibility.

---

## Implemented Features

### Algorithm Execution Engine
- Discriminated-union based `AlgorithmStep` model
- Immutable step snapshots
- Strong type safety across all algorithm categories
- Visualization routing based on step type

### Sorting Algorithms (Implemented)
- Bubble Sort
- Selection Sort
- Insertion Sort
- Quick Sort (basic)
- Merge Sort (basic)

Each sorting algorithm includes:
- Active index highlighting
- Compare vs swap distinction
- Step-by-step visual transitions
- Time complexity awareness

### Tree Algorithms (Implemented)
- Binary Search Tree (BST) Insertion
- Inorder Traversal
- Preorder Traversal
- Postorder Traversal

Tree visualizations include:
- Snapshot-based tree cloning
- Node highlighting
- Traversal order tracking
- Operation-specific steps (`compare`, `insert`, `visit`, `done`)

### Memory Visualization (Current Scope)
- Stack frame visualization
- Heap object visualization
- Variable-to-heap reference mapping
- Active pointer tracking
- Step-synchronized memory updates

---

## UI and UX

- Responsive layout
- Animated transitions between steps
- Clear separation of algorithm view and memory view
- Modular components designed for reuse and extension

---

## In Progress

- Automatic tree layout calculation (`x`, `y` positioning)
- Improved tree animations (insert and traversal)
- Unified memory model across all algorithm types
- Step-backward execution support
- Algorithm metadata normalization

---

## Planned Feature: Playground

### Description

The **Playground** will be an interactive environment where users can write and execute code while observing **real-time stack and heap memory visualization**, similar in spirit to platforms like LeetCode but focused on memory understanding.

The goal is to eliminate the need for manual dry runs by making memory behavior explicit at each execution step.

---

### Key Capabilities (Planned)

- Interactive code editor
- Input and output panels
- Step-by-step execution
- Live stack visualization
- Live heap visualization
- Function call lifecycle visualization
- Real-time updates on data mutation

---

### Execution Model

The Playground will **not execute real JVM code**.  
Instead, it will use a **custom, controlled interpreter** for a Java-like language subset.

#### High-Level Flow

User Code
→ Parser
→ AST-based Interpreter
→ Execution Steps
→ Stack & Heap Visualization


This approach enables deterministic execution and accurate educational visualization without relying on JVM internals.

---

### Memory Model

#### Stack
- Each function call creates a stack frame
- Local variables stored directly
- References point to heap objects

#### Heap
- Objects, arrays, and strings stored as heap entities
- Referenced via unique identifiers
- Mutations update heap state per execution step

Each execution step emits a snapshot of:
- Stack frames
- Heap objects
- Output (if applicable)
- Human-readable description

---

### Supported Language Subset (Planned)

- Primitive types (`int`, `double`, `boolean`, `char`)
- `String`
- Arrays
- Functions and methods
- Objects and references
- Conditionals and loops
- Recursion

This model focuses on **conceptual correctness** rather than JVM-level optimizations.

---

## Algorithm Roadmap

### Completed
- Basic sorting algorithms
- BST insertion
- Tree traversals

### Planned

#### Sorting
- Heap Sort
- Counting Sort
- Radix Sort

#### Trees
- AVL Tree
- Red-Black Tree
- Tree rotations
- Level-order traversal

#### Graphs
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra’s Algorithm
- Topological Sort
- Union-Find

#### Recursion and Dynamic Programming
- Fibonacci (recursive and memoized)
- N-Queens
- Knapsack
- Subset Sum

---

## Long-Term Vision

Quickiz aims to become a **memory-first learning tool** that bridges the gap between code execution and mental models by making algorithm behavior transparent and observable.

The focus is not only on *what* an algorithm does, but on *how* it behaves internally.

---

## Status

- Active development
- Core architecture stable
- Tree and memory systems under continuous improvement
- Playground feature in design phase
