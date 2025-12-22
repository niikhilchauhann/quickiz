"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/5" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/5" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Quickiz
            </h1>
            <p className="mt-4 max-w-lg text-pretty text-lg text-muted-foreground md:text-xl">
              Visualize Data Structures. Understand Algorithms. Master Memory.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/visualize">Explore Algorithms</Link>
              </Button>
              {/* <Button variant="outline" size="lg" asChild>
                <Link href="/visualize">Explore Algorithms</Link>
              </Button> */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-muted-foreground">Bubble Sort Visualization</span>
              </div>
              <div className="p-6">
                <AnimatedBarsPreview />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-4 -right-4 rounded-lg border border-border bg-card p-3 shadow-lg"
            >
              <pre className="text-xs text-muted-foreground">
                <code>
                  <span className="text-primary">if</span> (arr[j] {">"} arr[j+1]) {"{"}
                  {"\n"} swap(arr[j], arr[j+1]);
                  {"\n"}
                  {"}"}
                </code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AnimatedBarsPreview() {
  const bars = [64, 34, 25, 12, 22, 11, 90, 45]

  return (
    <div className="flex h-40 items-end justify-center gap-2">
      {bars.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / 90) * 100}%` }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 2,
          }}
          className="w-6 rounded-t-md bg-primary"
        />
      ))}
    </div>
  )
}
