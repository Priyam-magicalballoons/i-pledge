"use client"

import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const page = () => {
    const [isCapturing, setIsCapturing] = useState(true);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState("environment")
  let data;

  useEffect(()=>{
    if(typeof window !== 'undefined')
      data = JSON.parse(localStorage.getItem("DD")!)
  },[])

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 300 },
            height: { ideal: 300 },
            facingMode: "environment",
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
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64 image
    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
  };
  return (
    <div>
        {/* <Button
              variant="outline"
              className={`self-center shadow-md py-10 w-[80%]  bg-gray-100 border-2 border-black`}
              onClick={() => setIsCapturing(true)}
            >
              <Camera /> Capture Doctor Image
            </Button> */}
        {isCapturing && (
            <div className="relative w-full max-w-[600px]" ref={imageRef}>
              <Image
                src="/Poster.png"
                alt="Poster"
                className="w-full h-auto block"
                height={100}
                width={100}
              />
              <div
                className="absolute"
                style={{
                  top: "11.5%",
                  left: "21%",
                  width: "58%",
                  aspectRatio: "1 / 1",
                }}
              >
                <div className=" rounded overflow-hidden" onDoubleClick={()=>setCameraMode((mode)=>mode === "user" ? "environment" : "user")}>
                  {image ? (
                    <img
                      src={image}
                      alt="Captured"
                      className="w-full h-full object-cover rounded-md block"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={`w-full h-full object-cover rounded-md ${
                        image && "hidden"
                      }`}
                      style={{ display: "block" }}
                    />
                  )}
                </div>
              </div>
              <div className={`w-full pt-5 flex justify-center ${image && "hidden"}`}>
              <Button
                onClick={captureImage}
                className="px-4 py-2 bg-[#0c61aa] text-white rounded w-[80%] "
                >
                Capture Photo
              </Button>
                </div>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
          {( image) && (
            <div className=" py-2 flex flex-col gap-2 w-full items-center">
              <Button
                className="w-[80%] bg-red-400 hover:bg-red-00/70"
                onClick={() => {
                  setImage("")
                }}
              >
                Retake Picture
              </Button>
              <Button className="w-[80%]"
            //    onClick={handleDownload}
               >
                Download I-Pledge
              </Button>
            </div>
          )}
    </div>
  )
}

export default page