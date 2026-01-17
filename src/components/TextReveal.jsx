"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * TextReveal - Animates text with a reveal effect
 */
export default function TextReveal({
    children,
    className = "",
    delay = 0,
    duration = 1,
    y = 100,
    triggerOnScroll = false,
}) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const animation = {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power4.out",
        };

        if (triggerOnScroll) {
            gsap.fromTo(
                text,
                { y, opacity: 0 },
                {
                    ...animation,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        } else {
            gsap.fromTo(text, { y, opacity: 0 }, animation);
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [delay, duration, y, triggerOnScroll]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={textRef} style={{ opacity: 0 }}>
                {children}
            </div>
        </div>
    );
}

/**
 * SplitText - Animates each character individually
 */
export function SplitText({
    text,
    className = "",
    charClassName = "",
    delay = 0,
    stagger = 0.03,
}) {
    const containerRef = useRef(null);
    const charsRef = useRef([]);

    useEffect(() => {
        const chars = charsRef.current;
        if (!chars.length) return;

        gsap.fromTo(
            chars,
            { y: 50, opacity: 0, rotateX: -90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                delay,
                stagger,
                ease: "back.out(1.7)",
            }
        );
    }, [delay, stagger]);

    return (
        <span ref={containerRef} className={className}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    ref={(el) => (charsRef.current[i] = el)}
                    className={`inline-block ${charClassName}`}
                    style={{ opacity: 0 }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}
