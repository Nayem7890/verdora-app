"use client";

import { motion } from "framer-motion";

/**
 * AnimatedCard - Card with hover animations
 */
export default function AnimatedCard({
    children,
    className = "",
    hoverScale = 1.02,
    hoverLift = -5,
}) {
    return (
        <motion.div
            whileHover={{
                scale: hoverScale,
                y: hoverLift,
                transition: { duration: 0.2, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.98 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * AnimatedButton - Button with micro-interactions
 */
export function AnimatedButton({
    children,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={className}
        >
            {children}
        </motion.button>
    );
}

/**
 * AnimatedLink - Link with hover animation
 */
export function AnimatedLink({ children, href, className = "" }) {
    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={className}
        >
            {children}
        </motion.a>
    );
}
