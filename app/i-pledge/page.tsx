"use client"

import { Button } from "@/components/ui/button"
import { toPng } from "html-to-image"
import React, { useEffect, useRef, useState } from "react"

const Page = () => {
  const imageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [image, setImage] = useState<string | null>(null)
  const [cameraMode, setCameraMode] = useState("user")
  const [data, setData] = useState({ name: "", other: "" })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("DD")
      if (stored) setData(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 300 },
            height: { ideal: 300 },
            facingMode: cameraMode,
          },
          audio: false,
        })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
        });
    } else {
      console.error("Browser does not support getUserMedia");
    }
  }, [cameraMode]);

  const captureImage = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const dataUrl = canvas.toDataURL("image/png")
    setImage(dataUrl)
  }

  const handleDownload = async () => {
    const dataUrl = await toPng(imageRef.current!)
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "i-pledge.png"
    link.click()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative w-full max-w-[600px] aspect-[3/4]"
        ref={imageRef}
        style={{ background: "#f9f9f9" }}
      >
        {/* Background Image */}
        <img
          src="/image.png"
          alt="Poster"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Camera/Captured Image Overlay (positioned absolutely on the poster) */}
        <div
          className="absolute z-10 rounded-full overflow-hidden"
          style={{
            top: "30.7%",  
            left: "35.4%",  
            width: "30%",    
            aspectRatio: "1 / 1",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onDoubleClick={() =>
            setCameraMode((mode) =>
              mode === "user" ? "environment" : "user"
            )
          }
        >
          {image ? (
            <img
              src={image}
              alt="Captured"
              className="w-full h-full object-cover rounded-full"
              style={{ aspectRatio: "1 / 1" }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover rounded-full"
              style={{ aspectRatio: "1 / 1" }}
            />
          )}
        </div>

        {/* Text Overlay */}
        <div className="absolute w-full top-[82%] z-20 text-center">
          <p className="font-bold text-sm text-[#6d242c]">{data.name}</p>
          <p className="font-bold text-sm text-[#6d242c]">{data.other}</p>
        </div>

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Capture Button (only if not captured) */}
        {!image && (
          <div className="w-full  left-0 -bottom-20 flex justify-center z-30 absolute">
            <Button
              onClick={captureImage}
              className="px-4 py-2 bg-[#0c61aa] text-white rounded w-[80%]"
            >
              Capture Photo
            </Button>
          </div>
        )}
      </div>

      {/* Retake & Download buttons */}
      {image && (
        <div className="py-2 flex flex-col gap-2 w-full items-center">
          <Button
            className="w-[80%] bg-red-400"
            onClick={() => window.location.reload()}
          >
            Retake Picture
          </Button>
          <Button className="w-[80%]" onClick={handleDownload}>
            Download I-Pledge
          </Button>
        </div>
      )}
    </div>
  )
}

export default Page
