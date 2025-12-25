# Contributing to Quickiz

Thank you for your interest in contributing to **Quickiz**.  
This document outlines the contribution guidelines, development standards, and architectural principles for the project.

Quickiz is an educational, visualization-first platform. Contributions should prioritize **clarity, correctness, and determinism** over shortcuts or abstractions that hide behavior.

---

## Code of Conduct

All contributors are expected to maintain a respectful and professional environment.

- Be constructive and respectful in discussions
- Avoid harassment, discrimination, or personal attacks
- Focus feedback on improving the project

By contributing, you agree to follow these principles.

---

## Ways to Contribute

Contributions are welcome in the following areas:

### Algorithms
- Implement new algorithms
- Improve existing implementations
- Add step-by-step execution logic
- Provide accurate time and space complexity metadata

### Visualizations
- Improve existing visualizations (sorting, trees, memory)
- Add new visualization types (graphs, recursion, DP)
- Improve animations and transitions

### Memory & Execution Engine
- Improve stack and heap modeling
- Extend memory visualization to new algorithm categories
- Improve execution correctness and snapshot clarity

### Playground (Planned Feature)
- Language subset design
- Interpreter and execution engine logic
- Stack and heap snapshot generation
- Editor, input/output, and execution controls

### Documentation
- Improve README clarity
- Add algorithm explanations
- Write usage examples
- Improve inline comments

### Bug Fixes & Refactoring
- Fix bugs
- Improve TypeScript type safety
- Refactor for readability and maintainability

---

## Project Structure (High-Level)

/app
├─ pages and layouts
├─ visualizer components
/lib
├─ algorithm-engine
├─ algorithms
│ ├─ sorting
│ ├─ trees
│ ├─ graphs (planned)
│ └─ recursion (planned)
/components
├─ visualization components
├─ memory view
└─ shared UI


Contributors should familiarize themselves with this structure before making changes.

---

## Contribution Workflow

### 1. Fork the Repository
Create a fork of the repository on GitHub.

### 2. Create a Feature Branch
Create a new branch for your work:

git checkout -b feature/your-feature-name

Use clear and descriptive branch names.

---

## Coding Standards

- Use **TypeScript strictly**
- Avoid `any` unless absolutely necessary
- Prefer discriminated unions and type guards
- Keep algorithm steps immutable
- Avoid side effects across steps
- Favor clarity over cleverness

---

## Algorithm Implementation Guidelines

When adding or modifying algorithms:

- Each algorithm must emit **step-by-step snapshots**
- Each step should represent a meaningful execution state
- Steps must be immutable
- Each step should include:
  - `type`
  - `description`
  - Visualization-specific data
- Include time and space complexity metadata

---

## Visualization Guidelines

- Visualization components must be **pure and deterministic**
- Rendering should depend only on the current step
- Avoid embedding algorithm logic in visualization components
- Animations should be subtle and instructional

---

## Memory Model Guidelines

- Stack and heap must be modeled explicitly
- Do not mix `null` and `undefined` inconsistently
- Use references (IDs) to link stack variables to heap objects
- Memory updates must be synchronized with execution steps

---

## Testing Requirements

Before submitting a pull request, ensure:

npm run dev
npm run build


- No TypeScript errors
- No runtime crashes
- No build failures

---

## Commit Message Guidelines

Use clear, conventional commit messages:

feat: add inorder traversal visualization
fix: correct heap reference update
refactor: simplify tree cloning logic
docs: update README with playground design


---

## Pull Request Guidelines

When opening a pull request:

- Clearly describe what the change does
- Explain why the change is needed
- Reference related issues if applicable
- Keep pull requests focused and scoped

Large changes should be discussed in an issue before implementation.

---

## Reporting Issues

To report bugs or suggest features:

- Use GitHub Issues
- Provide clear reproduction steps if applicable
- Include screenshots or logs when useful
- Be concise and specific

---

## Design Philosophy

Quickiz prioritizes:

- Deterministic execution
- Educational clarity
- Explicit memory modeling
- Strong type safety
- Maintainable architecture

All contributions should align with these principles.

---

Thank you for contributing to **Quickiz**.
