"use client";
import { useEffect, useRef } from "react";

export default function CursorRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resizeCanvas();

    const raindrops: {
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
    }[] = [];

    const ripples: {
      x: number;
      radius: number;
      opacity: number;
    }[] = [];

    const createRaindrops = (x: number, y: number) => {
      const rect = container.getBoundingClientRect();
      const localX = x - rect.left;
      const localY = y - rect.top;

      if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) return;

      for (let i = 0; i < 8; i++) {
        raindrops.push({
          x: localX + Math.random() * 20 - 10,
          y: localY + Math.random() * 20 - 10,
          length: Math.random() * 8 + 6,
          speed: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.2 + 0.15,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(173, 216, 230, ${drop.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height - 5) {
          ripples.push({ x: drop.x, radius: 2, opacity: 0.4 });
          raindrops.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        ctx.beginPath();
        ctx.arc(ripple.x, canvas.height - 3, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(173, 216, 230, ${ripple.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ripple.radius += 0.5;
        ripple.opacity -= 0.01;

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        createRaindrops(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
