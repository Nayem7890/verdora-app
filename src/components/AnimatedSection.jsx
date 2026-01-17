"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Fade up animation variants
const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Fade in animation variants
const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

// Scale up animation variants
const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Slide from left
const slideLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// Slide from right
const slideRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const variantMap = {
    fadeUp: fadeUpVariants,
    fadeIn: fadeInVariants,
    scaleUp: scaleUpVariants,
    slideLeft: slideLeftVariants,
    slideRight: slideRightVariants,
};

/**
 * AnimatedSection - Scroll-triggered animation wrapper
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {"fadeUp"|"fadeIn"|"scaleUp"|"slideLeft"|"slideRight"} props.animation
 * @param {number} props.delay - delay in seconds
 * @param {string} props.className
 */
export default function AnimatedSection({
    children,
    animation = "fadeUp",
    delay = 0,
    className = "",
    once = true,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const variants = variantMap[animation] || fadeUpVariants;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                ...variants,
                visible: {
                    ...variants.visible,
                    transition: {
                        ...variants.visible.transition,
                        delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer - Container for staggered children animations
 */
export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
    once = true,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem - Child component for staggered animations
 */
export function StaggerItem({ children, className = "" }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
