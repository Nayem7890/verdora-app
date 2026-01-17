"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CustomCursor - Animated cursor with green fire trail effect
 */
export default function CustomCursor() {
    const canvasRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const particlesRef = useRef([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const dot = cursorDotRef.current;
        if (!canvas || !dot) return;

        const ctx = canvas.getContext("2d");

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Particle class for fire effect
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 8 + 4;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2 - 1; // Slight upward bias
                this.life = 1;
                this.decay = Math.random() * 0.02 + 0.015;
                // Green fire colors
                this.hue = 100 + Math.random() * 40; // 100-140 = green to lime
                this.saturation = 70 + Math.random() * 30;
                this.lightness = 50 + Math.random() * 20;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size *= 0.96;
                this.speedY -= 0.02; // Float upward
            }

            draw(ctx) {
                if (this.life <= 0) return;

                const alpha = this.life * 0.8;

                // Glow effect
                ctx.save();
                ctx.globalAlpha = alpha * 0.3;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness + 20}%, ${alpha * 0.5})`;
                ctx.fill();

                // Core
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Gradient for fire effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size
                );
                gradient.addColorStop(0, `hsla(${this.hue + 20}, 100%, 80%, ${alpha})`);
                gradient.addColorStop(0.5, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha})`);
                gradient.addColorStop(1, `hsla(${this.hue - 10}, ${this.saturation}%, 30%, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.restore();
            }
        }

        // Mouse move handler
        const handleMouseMove = (e) => {
            setIsVisible(true);
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Inner dot follows immediately
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out",
            });

            // Create particles for trail
            for (let i = 0; i < 3; i++) {
                particlesRef.current.push(new Particle(e.clientX, e.clientY));
            }
        };

        // Click creates burst of particles
        const handleClick = (e) => {
            for (let i = 0; i < 20; i++) {
                const particle = new Particle(e.clientX, e.clientY);
                particle.size = Math.random() * 12 + 6;
                particle.speedX = (Math.random() - 0.5) * 8;
                particle.speedY = (Math.random() - 0.5) * 8;
                particlesRef.current.push(particle);
            }
        };

        // Hide cursor when leaving window
        const handleMouseOut = (e) => {
            if (!e.relatedTarget && !e.toElement) {
                setIsVisible(false);
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter(p => {
                p.update();
                p.draw(ctx);
                return p.life > 0 && p.size > 0.5;
            });

            // Keep only last 150 particles for performance
            if (particlesRef.current.length > 150) {
                particlesRef.current = particlesRef.current.slice(-150);
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Add listeners
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("click", handleClick);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("click", handleClick);
            document.removeEventListener("mouseout", handleMouseOut);
            window.removeEventListener("resize", resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Only show on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            {/* Hide default cursor via global styles */}
            <style jsx global>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

            {/* Canvas for particle trail */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9998]"
                style={{ willChange: "transform" }}
            />

            {/* Inner cursor dot */}
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    willChange: "transform",
                    background: "radial-gradient(circle, #a3e635 0%, #22c55e 50%, #15803d 100%)",
                    boxShadow: "0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #15803d"
                }}
            />
        </>
    );
}
