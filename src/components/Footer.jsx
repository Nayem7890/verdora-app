"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-lime-100 bg-lime-50/90 text-emerald-900">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-4">
        {/* Brand / tagline */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            Verdora
          </h2>
          <p className="mt-3 text-sm text-emerald-900/80">
            Clean scenes, healthy green. Eco-friendly plants and essentials
            curated for bright, natural spaces.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
            <li>
              <Link href="/products" className="hover:text-emerald-950">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-emerald-950">
                Indoor Plants
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-emerald-950">
                Eco Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* About / Support */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            About
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/80">
            <li>
              <Link href="/about" className="hover:text-emerald-950">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-950">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-emerald-950">
                Sustainability
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            Stay Connected
          </h3>
          <p className="mt-3 text-sm text-emerald-900/80">
            Follow our journey towards greener homes and healthier spaces.
          </p>

          <div className="mt-4 flex space-x-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="footer-icon"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="footer-icon"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="footer-icon"
            >
              <Instagram size={18} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="footer-icon"
            >
              <Github size={18} />
            </Link>
          </div>
        </div>
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
