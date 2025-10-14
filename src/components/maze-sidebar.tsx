"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { mazes, type Maze } from "@/lib/mazes"
import { useRouter } from "next/navigation"

interface MazeSidebarProps {
  onMazeSelect: (maze: Maze) => void
  selectedMaze: Maze | null
}

export function MazeSidebar({ onMazeSelect, selectedMaze }: MazeSidebarProps) {
  const router = useRouter()
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMazeClick = (maze: Maze) => {
    if (clickTimeout) {
      // Double click detected
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      router.push(`/maze/${maze.id}`)
    } else {
      // Single click - show preview
      const timeout = setTimeout(() => {
        onMazeSelect(maze)
        setClickTimeout(null)
      }, 250)
      setClickTimeout(timeout)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-secondary text-secondary-foreground"
      case "medium":
        return "bg-accent text-accent-foreground"
      case "hard":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex h-full w-80 flex-col border-l border-border bg-card">
      <div className="border-b border-border bg-primary p-4">
        <h2 className="text-lg font-bold text-primary-foreground">迷路一覧</h2>
        <p className="text-sm text-primary-foreground/80">迷路を選択してください</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {mazes.map((maze) => (
            <Button
              key={maze.id}
              variant={selectedMaze?.id === maze.id ? "default" : "outline"}
              className="h-auto justify-start gap-3 p-4 text-left"
              onClick={() => handleMazeClick(maze)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted shadow-inner text-lg font-bold text-foreground">
                {maze.id}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{maze.name}</span>
                  <Badge className={getDifficultyColor(maze.difficulty)} variant="secondary">
                    {maze.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{maze.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t border-border bg-muted p-4">
        <p className="text-xs text-muted-foreground">
          <strong>ヒント:</strong> シングルクリックでプレビュー、ダブルクリックで開始
        </p>
      </div>
    </div>
  )
}
