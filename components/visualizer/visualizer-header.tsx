"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VisualizerHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-14 items-center border-b border-border bg-card px-4"
    >
      <Button variant="ghost" size="sm" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>
      </Button>
      <div className="ml-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <span className="text-xs font-bold text-primary-foreground">Q</span>
        </div>
        <span className="font-semibold text-foreground">Quickiz</span>
        <span className="text-muted-foreground">|</span>
        <span className="text-sm text-muted-foreground">Algorithm Visualizer</span>
      </div>
    </motion.header>
  )
}
