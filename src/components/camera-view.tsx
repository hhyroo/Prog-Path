"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CameraView() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false,
      })

      setStream(mediaStream)
      setIsActive(true)
    } catch (err) {
      setError("カメラを起動できませんでした。権限を確認してください。")
      console.error("Camera error:", err)
      if (err instanceof Error) {
        setError(`${err.name}: ${err.message}`)
      }
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      setStream(null)
      setIsActive(false)
    }
  }

  // ストリームのクリーンアップを行うEffect
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop())
      }
    }
  }, [stream])

  // ビデオ要素とストリームの同期を行うEffect
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || !stream || !isActive) return

    const handleEnterPiP = () => {
      videoElement.style.transform = 'none'
    }

    const handleLeavePiP = () => {
      videoElement.style.transform = 'rotateY(180deg)'
    }

    const setupVideo = async () => {
      try {
        videoElement.srcObject = stream
        await videoElement.play()

        videoElement.addEventListener('enterpictureinpicture', handleEnterPiP)
        videoElement.addEventListener('leavepictureinpicture', handleLeavePiP)

      } catch (err) {
        console.error("Video play error in effect:", err)
        setError("ビデオの再生に失敗しました。")
      }
    }

    setupVideo()

    return () => {
      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject = null
        // イベントリスナーのクリーンアップ
        videoElement.removeEventListener('enterpictureinpicture', handleEnterPiP)
        videoElement.removeEventListener('leavepictureinpicture', handleLeavePiP)

        videoElement.style.transform = 'rotateY(180deg)'
      }
    }
  }, [stream, isActive, setError])

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="relative flex-1 overflow-hidden rounded-xl border-4 border-primary bg-muted">
        <div className="relative h-full w-full">
          {isActive ? (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              style={{ transform: 'rotateY(180deg)' }} //メインカメラでの胸像表示
              className="absolute inset-0 h-full w-full object-cover"
              disablePictureInPicture={false}
              onLoadedMetadata={(e) => {
                const video = e.target as HTMLVideoElement
                if (document.pictureInPictureElement) {
                  document.exitPictureInPicture().catch(console.error)
                }
              }}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
              <div className="rounded-full bg-primary/10 p-8">
                <Camera className="h-16 w-16 text-primary" />
              </div>
              <p className="text-center text-lg font-semibold text-foreground">カメラが起動していません</p>
              <p className="text-center text-sm text-muted-foreground">カメラを起動してARマーカーを認識してください</p>
            </div>
          )}
        </div>
        {isActive && (
          <div className="absolute left-4 top-4 rounded-lg bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
            🎥 Review
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        {!isActive ? (
          <Button
            onClick={startCamera}
            className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            <Camera className="h-5 w-5" />
            カメラを起動
          </Button>
        ) : (
          <Button onClick={stopCamera} variant="destructive" className="flex-1 gap-2" size="lg">
            <CameraOff className="h-5 w-5" />
            カメラを停止
          </Button>
        )}
      </div>
    </div>
  )
}
