"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-lime-100 bg-lime-50/90 text-emerald-900">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">
        {/* Brand / tagline */}
        <AnimatedSection animation="fadeUp" delay={0}>
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            Verdora
          </h2>
          <p className="mt-3 text-sm text-emerald-900/80">
            Clean scenes, healthy green. Eco-friendly plants and essentials
            curated for bright, natural spaces.
          </p>
        </AnimatedSection>

        {/* Shop */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
            {["All Products", "Indoor Plants", "Eco Accessories"].map((item, i) => (
              <motion.li key={i} whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                <Link href="/products" className="hover:text-emerald-950 transition-colors">
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </AnimatedSection>

        {/* About / Support */}
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            About
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
            <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Link href="/about" className="hover:text-emerald-950 transition-colors">
                Our Story
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Link href="/contact" className="hover:text-emerald-950 transition-colors">
                Contact
              </Link>
            </motion.li>
            <motion.li whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Link href="#" className="hover:text-emerald-950 transition-colors">
                Sustainability
              </Link>
            </motion.li>
          </ul>
        </AnimatedSection>

        {/* Social */}
        <AnimatedSection animation="fadeUp" delay={0.3}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            Stay Connected
          </h3>
          <p className="mt-3 text-sm text-emerald-900/80">
            Follow our journey towards greener homes and healthier spaces.
          </p>

          <div className="mt-4 flex space-x-3">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Github, href: "https://github.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <div className="border-t border-lime-100/80 bg-lime-100/70">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center justify-between gap-2 text-xs text-emerald-900/80 md:flex-row">
          <p>
            © {new Date().getFullYear()} Verdora. Green meets clean, all rights
            reserved.
          </p>
          <p className="flex flex-wrap gap-2">
            <span>Eco-friendly</span>
            <span>•</span>
            <span>Sustainable</span>
            <span>•</span>
            <span>Natural Living</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
