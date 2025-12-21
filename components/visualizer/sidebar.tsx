"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { BarChart3, GitBranch, Share2, RefreshCw, Layers, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { algorithms, searchAlgorithms } from "@/lib/algorithms"
import type { AlgorithmDefinition } from "@/lib/algorithm-engine"
import { useState, useMemo } from "react"

const categories = [
  { id: "sorting", label: "Sorting", icon: BarChart3 },
  { id: "trees", label: "Trees", icon: GitBranch },
  { id: "graphs", label: "Graphs", icon: Share2 },
  { id: "recursion", label: "Recursion", icon: RefreshCw },
  { id: "memory", label: "Memory", icon: Layers },
]

interface SidebarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  selectedAlgorithm: AlgorithmDefinition | null
  onAlgorithmSelect: (algorithm: AlgorithmDefinition) => void
}

export function Sidebar({ activeCategory, onCategoryChange, selectedAlgorithm, onAlgorithmSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredAlgorithms = useMemo(() => {
    if (searchQuery) {
      return searchAlgorithms(searchQuery)
    }
    return algorithms.filter((a) => a.category === activeCategory)
  }, [searchQuery, activeCategory])

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-64 shrink-0 border-r border-border bg-card flex flex-col"
    >
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {!searchQuery && (
          <>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Categories</h2>
            <nav className="flex flex-col gap-1 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeCategory === category.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </button>
              ))}
            </nav>
          </>
        )}

        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {searchQuery ? "Search Results" : "Algorithms"}
        </h2>
        <nav className="flex flex-col gap-1">
          {filteredAlgorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => onAlgorithmSelect(algo)}
              className={cn(
                "flex flex-col items-start rounded-lg px-3 py-2 text-left transition-colors",
                selectedAlgorithm?.id === algo.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <span className="text-sm font-medium">{algo.name}</span>
              <span
                className={cn(
                  "text-xs",
                  selectedAlgorithm?.id === algo.id ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {algo.timeComplexity.average}
              </span>
            </button>
          ))}
          {filteredAlgorithms.length === 0 && (
            <p className="text-sm text-muted-foreground px-3 py-2">No algorithms found</p>
          )}
        </nav>
      </div>
    </motion.aside>
  )
}
