"use client";
import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      dx: number;
      dy: number;
    }[] = [];

    const createParticles = (x: number, y: number) => {
      for (let i = 0; i < 8; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 6 + 4,
          alpha: 1,
          dx: Math.random() * 2 - 1,
          dy: Math.random() * 2 - 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(132, 204, 22, ${p.alpha})`;
        ctx.shadowColor = "rgba(132, 204, 22, 0.6)";
        ctx.shadowBlur = 20;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.01;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      createParticles(e.clientX, e.clientY);
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
      className="fixed top-0 left-0 pointer-events-none z-10"
    />
  );
}
