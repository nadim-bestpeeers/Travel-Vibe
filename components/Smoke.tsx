"use client";

import React, { useRef, useEffect, useState } from "react";

const SmokeCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasVisible, setCanvasVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: any[] = [];

    const createParticle = (x: number, y: number) => {
      const radius = Math.random() * 5 + 5;
      return {
        x,
        y,
        radius,
        opacity: 1,
        dx: (Math.random() - 0.5) * 3,
        dy: (Math.random() - 1.5) * 3,
        dr: 0.1 + Math.random() * 0.2,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${p.opacity})`; // lime color
        ctx.shadowColor = `rgba(100, 255, 100, ${p.opacity})`;
        ctx.shadowBlur = 25;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.radius += p.dr;
        p.opacity -= 0.01;

        if (p.opacity <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("button, a, .interactive");
      if (target) setCanvasVisible(false);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.relatedTarget as HTMLElement)?.closest("button, a, .interactive");
      if (!target) setCanvasVisible(true);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-[9999] transition-opacity duration-300 ${
        canvasVisible ? "opacity-100" : "opacity-0"
      } pointer-events-none`}
    />
  );
};

export default SmokeCursor;
