"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollProgress - Shows reading progress at top of page
 */
export default function ScrollProgress() {
    const progressRef = useRef(null);

    useEffect(() => {
        const progress = progressRef.current;
        if (!progress) return;

        gsap.to(progress, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div
            ref={progressRef}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-600 z-[100] origin-left"
            style={{ transform: "scaleX(0)" }}
        />
    );
}
