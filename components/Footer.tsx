"use client";
import { useEffect, useRef } from "react";

export default function FooterWaterWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let offset = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 255, 100, 0.25)");
      gradient.addColorStop(1, "rgba(0, 100, 50, 0.4)");

      ctx.beginPath();
      ctx.moveTo(0, 60);
      for (let x = 0; x <= canvas.width; x++) {
        const y = 60 + Math.sin((x + offset) * 0.02) * 5 + Math.sin((x + offset) * 0.01) * 3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      ctx.fillStyle = gradient;
      ctx.fill();

      offset += 0.5;
      requestAnimationFrame(drawWave);
    };

    drawWave();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[100px] overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
