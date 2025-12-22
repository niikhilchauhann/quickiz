"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">Q</span>
            </div>
            <span className="font-semibold text-foreground">Quickiz</span>
          </div>
          <nav className="flex gap-6">
            <Link href="https://linkedin.com/in/niikhilchauhann/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </Link>
            <Link href="https://github.com/niikhilchauhann/quickiz/README.md" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link href="https://github.com/niikhilchauhann/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </Link>
             <Link href="https://niikhilchauhann.web.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>
          </nav>
          <p className="text-sm text-muted-foreground">Built for engineers who learn by seeing.</p>
        </div>
      </div>
    </footer>
  )
}
