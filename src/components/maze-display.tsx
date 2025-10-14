"use client";

import type { Maze } from "@/lib/mazes";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, CheckCircle } from "lucide-react";
import { useState } from "react";

interface MazeDisplayProps {
  maze: Maze;
}

export function MazeDisplay({ maze }: MazeDisplayProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
    // Simulate maze completion after 3 seconds
    setTimeout(() => {
      setIsRunning(false);
      setIsComplete(true);
    }, 3000);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative flex-1 overflow-hidden rounded-xl border-4 border-primary bg-card shadow-lg">
        <div>
          {maze.map.map((row, i) => (
            <span key={i}>
              {row.map((value) => value)} <br />
            </span>
          ))}
        </div>
        {isRunning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="rounded-lg bg-primary px-6 py-3 text-lg font-bold text-primary-foreground shadow-lg">
              プログラム実行中...
            </div>
          </div>
        )}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-secondary p-8 shadow-2xl">
              <CheckCircle className="h-16 w-16 text-secondary-foreground" />
              <h3 className="text-2xl font-bold text-secondary-foreground">
                成功！
              </h3>
              <p className="text-secondary-foreground">
                迷路をクリアしました！
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 rounded-lg bg-card p-4 shadow-sm">
        <div>
          <h3 className="mb-2 text-lg font-bold text-foreground">
            {maze.name}
          </h3>
          <p className="text-sm text-muted-foreground">{maze.description}</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleStart}
            disabled={isRunning || isComplete}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Play className="h-5 w-5" />
            プログラムを開始
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="gap-2 bg-transparent"
            size="lg"
          >
            <RotateCcw className="h-5 w-5" />
            リセット
          </Button>
        </div>

        <div className="rounded-lg bg-accent/20 p-3">
          <p className="text-xs text-foreground">
            <strong>ヒント:</strong>{" "}
            カメラの前にARマーカーを配置して、プログラムを作成してください。
          </p>
        </div>
      </div>
    </div>
  );
}
