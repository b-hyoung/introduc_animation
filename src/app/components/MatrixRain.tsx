// MatrixRain.tsx
"use client"
import { useEffect, useRef } from "react";
import './MatrixRain.css'
import gsap from "gsap";


export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = Array(columns).fill(1);

        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#6dff91ff";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = Math.random() > 0.5 ? "1" : "0";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        const interval = setInterval(draw, 100);
        gsap.fromTo(
            canvas,
            { opacity: 1 },
            { opacity: 0.4, duration: 10, ease: "power2.out" }
        )

        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 z-0" />;
}
