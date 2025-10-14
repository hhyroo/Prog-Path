"use client"

import { Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeaderProps {
  pageName: string
}

export function Header({ pageName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side: App name and Home button */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <div className="h-5 w-5 rounded-full bg-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ARメイズ</span>
          </Link>
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">ホーム</span>
            </Button>
          </Link>
        </div>

        {/* Center: Page name in rounded box */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full bg-secondary/80 px-6 py-2 bg-secondary">
            <span className="text-sm font-semibold text-secondary-foreground">{pageName}</span>
          </div>
        </div>

        {/* Right side: Account button */}
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground">
          <User className="h-5 w-5" />
          <span className="sr-only">アカウント</span>
        </Button>
      </div>
    </header>
  )
}
