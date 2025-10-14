import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="text-lg text-muted-foreground">ページが見つかりません</p>
      <Link href="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" />
          ホームに戻る
        </Button>
      </Link>
    </div>
  )
}
