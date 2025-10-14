import { Header } from "@/components/header"
import { CameraView } from "@/components/camera-view"
import { MazeDisplay } from "@/components/maze-display"
import { mazes } from "@/lib/mazes"
import { notFound } from "next/navigation"

interface MazePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MazePage({ params }: MazePageProps) {
  const { id } = await params
  const maze = mazes.find((m) => m.id === Number.parseInt(id))

  if (!maze) {
    notFound()
  }

  return (
    <div className="flex h-screen flex-col">
      <Header pageName={maze.name} />
      <div className="flex flex-1 gap-4 overflow-hidden p-8">
        {/* Left side: Maze display */}
        <div className="flex-1">
          <MazeDisplay maze={maze} />
        </div>
        {/* Right side: Camera view */}
        <div className="flex-1">
          <CameraView />
        </div>
      </div>
    </div>
  )
}
