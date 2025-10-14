export interface Maze {
  id: number
  name: string
  difficulty: "easy" | "medium" | "hard"
  description: string
  map: number[]
}

export const mazes: Maze[] = [
  {
    id: 1,
    name: "迷路 1",
    difficulty: "easy",
    description: "初心者向けの簡単な迷路",
    map: [],
  },
  {
    id: 2,
    name: "迷路 2",
    difficulty: "easy",
    description: "分岐が少ない基本的な迷路",
    map: [],
  },
  {
    id: 3,
    name: "迷路 3",
    difficulty: "easy",
    description: "シンプルなL字型の迷路",
    map: [],
  },
  {
    id: 4,
    name: "迷路 4",
    difficulty: "medium",
    description: "複数の経路がある中級の迷路",
    map: [],
  },
  {
    id: 5,
    name: "迷路 5",
    difficulty: "medium",
    description: "行き止まりのある迷路",
    map: [],
  },
  {
    id: 6,
    name: "迷路 6",
    difficulty: "medium",
    description: "螺旋状の迷路",
    map: [],
  },
  {
    id: 7,
    name: "迷路 7",
    difficulty: "medium",
    description: "交差点のある迷路",
    map: [],
  },
  {
    id: 8,
    name: "迷路 8",
    difficulty: "hard",
    description: "多くの分岐がある複雑な迷路",
    map: [],
  },
  {
    id: 9,
    name: "迷路 9",
    difficulty: "hard",
    description: "障害物のある上級者向け迷路",
    map: [],
  },
  {
    id: 10,
    name: "迷路 10",
    difficulty: "hard",
    description: "挑戦的な迷路",
    map: [],
  },
  {
    id: 11,
    name: "迷路 11",
    difficulty: "hard",
    description: "非常に複雑な迷路",
    map: [],
  },
  {
    id: 12,
    name: "迷路 12",
    difficulty: "hard",
    description: "エキスパート向けマスター迷路",
    map: [],
  },
]
