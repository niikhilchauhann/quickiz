import type { AlgorithmStep, RecursionStep, StackFrame } from "@/lib/algorithm-engine"

export const nQueens = {
  id: "n-queens",
  name: "N-Queens Problem",
  category: "recursion",
  description: "Place N queens on an NxN chessboard so that no two queens attack each other.",
  code: `function solveNQueens(n) {
  const board = Array(n).fill(null)
    .map(() => Array(n).fill(0));
  
  function isSafe(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col]) return false;
    }
    // Check diagonals
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j]) return false;
    }
    return true;
  }
  
  function solve(row) {
    if (row === n) return true;
    
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 1;
        if (solve(row + 1)) return true;
        board[row][col] = 0; // backtrack
      }
    }
    return false;
  }
  
  solve(0);
  return board;
}`,
  timeComplexity: {
    best: "O(N!)",
    average: "O(N!)",
    worst: "O(N!)",
  },
  spaceComplexity: "O(N²)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const n = Math.min(Math.max(input[0] || 4, 4), 8) // Clamp between 4 and 8
    const steps: RecursionStep[] = []
    const board: (number | null)[][] = Array(n)
      .fill(null)
      .map(() => Array(n).fill(null))
    const stackFrames: StackFrame[] = []
    let frameId = 0

    function cloneBoard(): (number | null)[][] {
      return board.map((row) => [...row])
    }

    steps.push({
      type: "recursion",
      stackFrames: [],
      boardState: cloneBoard(),
      currentRow: 0,
      currentCol: 0,
      operation: "initial",
      description: `Starting N-Queens problem with N=${n}`,
    })

    function isSafe(row: number, col: number): boolean {
      // Check column above
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 1) return false
      }
      // Check upper-left diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false
      }
      // Check upper-right diagonal
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 1) return false
      }
      return true
    }

    function solve(row: number): boolean {
      const frame: StackFrame = {
        id: `frame-${frameId++}`,
        functionName: "solve",
        args: { row },
        isActive: true,
      }
      stackFrames.push(frame)

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        boardState: cloneBoard(),
        currentRow: row,
        operation: "push",
        description: `Entering solve(row=${row})`,
      })

      if (row === n) {
        frame.returnValue = true
        frame.isActive = false

        steps.push({
          type: "recursion",
          stackFrames: stackFrames.map((f) => ({ ...f })),
          boardState: cloneBoard(),
          currentRow: row,
          operation: "execute",
          description: `All queens placed successfully!`,
        })

        stackFrames.pop()

        steps.push({
          type: "recursion",
          stackFrames: stackFrames.map((f) => ({ ...f })),
          boardState: cloneBoard(),
          currentRow: row - 1,
          operation: "pop",
          description: `Returning true from solve(row=${row})`,
        })

        return true
      }

      for (let col = 0; col < n; col++) {
        steps.push({
          type: "recursion",
          stackFrames: stackFrames.map((f) => ({ ...f })),
          boardState: cloneBoard(),
          currentRow: row,
          currentCol: col,
          operation: "execute",
          description: `Trying to place queen at (${row}, ${col})`,
        })

        if (isSafe(row, col)) {
          board[row][col] = 1

          steps.push({
            type: "recursion",
            stackFrames: stackFrames.map((f) => ({ ...f })),
            boardState: cloneBoard(),
            currentRow: row,
            currentCol: col,
            operation: "execute",
            description: `Placed queen at (${row}, ${col}) - position is safe`,
          })

          if (solve(row + 1)) {
            return true
          }

          // Backtrack
          board[row][col] = null

          steps.push({
            type: "recursion",
            stackFrames: stackFrames.map((f) => ({ ...f })),
            boardState: cloneBoard(),
            currentRow: row,
            currentCol: col,
            operation: "backtrack",
            description: `Backtracking: removed queen from (${row}, ${col})`,
          })
        }
      }

      frame.returnValue = false
      frame.isActive = false
      stackFrames.pop()

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        boardState: cloneBoard(),
        currentRow: row - 1,
        operation: "pop",
        description: `No valid position in row ${row}, returning false`,
      })

      return false
    }

    solve(0)

    steps.push({
      type: "recursion",
      stackFrames: [],
      boardState: cloneBoard(),
      operation: "done",
      description: "N-Queens problem solved!",
    })

    return steps
  },
}
