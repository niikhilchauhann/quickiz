"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BarChart3, GitBranch, Layers, Zap, Code2, BookOpen } from "lucide-react"

const features = [
  {
    title: "Sorting Algorithms",
    description: "Bubble, Quick, Merge, and more. Watch elements swap in real-time.",
    icon: BarChart3,
    href: "/visualize?category=sorting",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Tree Structures",
    description: "BST, AVL, Red-Black trees with traversal animations.",
    icon: GitBranch,
    href: "/visualize?category=trees",
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Memory Visualization",
    description: "Understand stack vs heap with live memory diagrams.",
    icon: Layers,
    href: "/visualize?category=memory",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Step Controls",
    description: "Play, pause, step forward or back at your own pace.",
    icon: Zap,
    href: "/visualize",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Source Code View",
    description: "See the algorithm code with line-by-line highlighting.",
    icon: Code2,
    href: "/visualize",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    title: "Complexity Analysis",
    description: "Track comparisons, swaps, and Big-O notation live.",
    icon: BookOpen,
    href: "/visualize",
    color: "bg-teal-500/10 text-teal-600",
  },
]

export function FeatureCards() {
  return (
    <section className="bg-secondary/30 py-20">
      
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Master the Fundamentals</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
            Interactive visualizations to help you understand complex concepts. Perfect for interviews, coursework, or
            pure curiosity.
          </p>
        </motion.div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="group h-full rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/20">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mt-10"
          >
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
              <div className="bg-secondary/50 px-4 py-2 border-b border-border">
                <span className="text-xs font-medium text-muted-foreground">bubble-sort.ts</span>
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-muted-foreground">
                  <span className="text-muted-foreground/60">1 </span>
                  <span className="text-primary">function</span> bubbleSort(arr) {"{"}
                  {"\n"}
                  <span className="text-muted-foreground/60">2 </span> <span className="text-primary">for</span> (
                  <span className="text-primary">let</span> i = 0; i {"<"} n; i++) {"{"}
                  {"\n"}
                  <span className="text-muted-foreground/60">3 </span> <span className="text-primary">for</span> (
                  <span className="text-primary">let</span> j = 0; j {"<"} n-i-1; j++) {"{"}
                  {"\n"}
                  <span className="bg-primary/20 text-foreground">
                    4 if (arr[j] {">"} arr[j+1]) {"{"}
                  </span>
                  {"\n"}
                  <span className="bg-primary/20 text-foreground">5 swap(arr[j], arr[j+1]);</span>
                  {"\n"}
                  <span className="text-muted-foreground/60">6 </span> {"}"}
                  {"\n"}
                  <span className="text-muted-foreground/60">7 </span> {"}"}
                  {"\n"}
                  <span className="text-muted-foreground/60">8 </span> {"}"}
                  {"\n"}
                  <span className="text-muted-foreground/60">9 </span>
                  {"}"}
                  {"\n"}
                </code>
              </pre>
            </div>

            {/* Floating step indicator */}
            <div className="absolute -top-3 -right-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
              Step 24 / 56
            </div>
          </motion.div>
      </div>
    </section>
  )
}
