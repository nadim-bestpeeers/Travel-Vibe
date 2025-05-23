"use client";
import { useEffect, useRef } from "react";

export default function CursorRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
      for (let i = 0; i < 8; i++) {
        raindrops.push({
          x: x + Math.random() * 20 - 10,
          y: y + Math.random() * 20 - 10,
          length: Math.random() * 8 + 6,
          speed: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.2 + 0.15,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw rain
      for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = `rgba(173, 216, 230, ${drop.alpha})`; // light blue
        ctx.lineWidth = 1;
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height - 5) {
          ripples.push({ x: drop.x, radius: 2, opacity: 0.4 });
          raindrops.splice(i, 1);
          i--;
        }
      }

      // Draw ripples
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

    const handleMouseMove = (e: MouseEvent) => {
      createRaindrops(e.clientX, e.clientY);
    };

    draw();
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}
