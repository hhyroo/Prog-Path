"use client"

import type { Maze } from "@/lib/mazes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Info } from "lucide-react"
import { useRouter } from "next/navigation"

interface MazePreviewProps {
  maze: Maze | null
}

export function MazePreview({ maze }: MazePreviewProps) {
  const router = useRouter()

  if (!maze) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <div className="flex items-center justify-center rounded-full bg-muted p-8 shadow-inner">
          <div className="h-24 w-24 rounded-lg bg-secondary shadow-md" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">ARメイズへようこそ</h2>
        <p className="max-w-md text-center text-muted-foreground">
          サイドバーから迷路を選択して、プレビューを表示して開始してください。
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-2xl border-4 border-primary shadow-2xl">
        {/* <Image src={maze.imageUrl || "/placeholder.svg"} alt={maze.name} fill className="object-cover" priority /> */}
        <div>
          {maze.map}
        </div>
      </div>
      <div className="flex w-full max-w-2xl flex-col gap-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">{maze.name}</h2>
          <p className="mt-2 text-lg text-muted-foreground">{maze.description}</p>
        </div>
        <div className="flex gap-4">
          <Button
            size="lg"
            className="flex-1 gap-2 bg-primary text-lg font-semibold text-primary-foreground hover:bg-primary/90"
            onClick={() => router.push(`/maze/${maze.id}`)}
          >
            <Play className="h-5 w-5" />
            迷路を開始
          </Button>
          <Button size="lg" variant="outline" className="gap-2 bg-transparent">
            <Info className="h-5 w-5" />
            情報
          </Button>
        </div>
      </div>
    </div>
  )
}
