"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MazeSidebar } from "@/components/maze-sidebar"
import { MazePreview } from "@/components/maze-preview"
import type { Maze } from "@/lib/mazes"

export default function HomePage() {
  const [selectedMaze, setSelectedMaze] = useState<Maze | null>(null)

  return (
    <div className="flex h-screen flex-col">
      <Header pageName="ホーム" />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <MazePreview maze={selectedMaze} />
        </div>
        <MazeSidebar onMazeSelect={setSelectedMaze} selectedMaze={selectedMaze} />
      </div>
    </div>
  )
}
