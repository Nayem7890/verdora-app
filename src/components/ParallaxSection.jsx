"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * ParallaxSection - Creates parallax scrolling effect
 */
export default function ParallaxSection({
    children,
    className = "",
    speed = 0.5,
    direction = "up", // "up" or "down"
}) {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const content = contentRef.current;
        const container = containerRef.current;
        if (!content || !container) return;

        const yPercent = direction === "up" ? -50 * speed : 50 * speed;

        gsap.fromTo(
            content,
            { yPercent: -yPercent },
            {
                yPercent: yPercent,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [speed, direction]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={contentRef}>{children}</div>
        </div>
    );
}

/**
 * ParallaxImage - Image with parallax effect
 */
export function ParallaxImage({
    src,
    alt,
    className = "",
    speed = 0.3,
}) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current;
        const container = containerRef.current;
        if (!image || !container) return;

        gsap.fromTo(
            image,
            { yPercent: -15 * speed },
            {
                yPercent: 15 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className="w-full h-[120%] object-cover"
                style={{ marginTop: "-10%" }}
            />
        </div>
    );
}
