import type { AlgorithmStep, RecursionStep, StackFrame } from "@/lib/algorithm-engine"

export const fibonacciRecursive = {
  id: "fibonacci-recursive",
  name: "Recursive Fibonacci",
  category: "recursion",
  description: "Calculate Fibonacci numbers using recursion to demonstrate call stack depth.",
  code: `function fib(n) {
  if (n <= 1) return n;
  
  return fib(n - 1) + fib(n - 2);
}

// Example: fib(5) = 5
// Call tree shows exponential calls`,
  timeComplexity: {
    best: "O(2^n)",
    average: "O(2^n)",
    worst: "O(2^n)",
  },
  spaceComplexity: "O(n)",
  generateSteps: (input: number[]): AlgorithmStep[] => {
    const n = Math.min(Math.max(input[0] || 5, 1), 7) // Clamp between 1 and 7 for reasonable visualization
    const steps: RecursionStep[] = []
    const stackFrames: StackFrame[] = []
    let frameId = 0

    steps.push({
      type: "recursion",
      stackFrames: [],
      operation: "initial",
      description: `Starting Fibonacci calculation for n=${n}`,
    })

    function fib(num: number): number {
      const frame: StackFrame = {
        id: `frame-${frameId++}`,
        functionName: "fib",
        args: { n: num },
        isActive: true,
      }
      stackFrames.push(frame)

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        operation: "push",
        description: `Calling fib(${num})`,
      })

      if (num <= 1) {
        frame.returnValue = num
        frame.isActive = false

        steps.push({
          type: "recursion",
          stackFrames: stackFrames.map((f) => ({ ...f })),
          operation: "execute",
          description: `Base case: fib(${num}) = ${num}`,
        })

        stackFrames.pop()

        steps.push({
          type: "recursion",
          stackFrames: stackFrames.map((f) => ({ ...f })),
          operation: "pop",
          description: `Returning ${num} from fib(${num})`,
        })

        return num
      }

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        operation: "execute",
        description: `Computing fib(${num}) = fib(${num - 1}) + fib(${num - 2})`,
      })

      const left = fib(num - 1)
      const right = fib(num - 2)
      const result = left + right

      // Update the current frame
      const currentFrame = stackFrames.find((f) => f.id === frame.id)
      if (currentFrame) {
        currentFrame.returnValue = result
        currentFrame.isActive = false
      }

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        operation: "execute",
        description: `Computed: fib(${num}) = ${left} + ${right} = ${result}`,
      })

      stackFrames.pop()

      steps.push({
        type: "recursion",
        stackFrames: stackFrames.map((f) => ({ ...f })),
        operation: "pop",
        description: `Returning ${result} from fib(${num})`,
      })

      return result
    }

    const result = fib(n)

    steps.push({
      type: "recursion",
      stackFrames: [],
      operation: "done",
      description: `Fibonacci calculation complete! fib(${n}) = ${result}`,
    })

    return steps
  },
}
