"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
export default function Home() {

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await axios.get("https://verdora-server.vercel.app/plants");
        const firstThree = res.data.slice(0, 3); // pick first 3 products
        setFeatured(firstThree);
      } catch (err) {
        console.error("Failed to load featured:", err);
      }
    }

    loadFeatured();
  }, []);

  return (

    <main className="bg-lime-50 text-emerald-950">

      {/* -------------------------------------------------- */}
      {/* 1. HERO SECTION (Your original code unchanged) */}
      {/* -------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-0 grid gap-12 md:grid-cols-2 items-center">
        
        {/* Left Content */}
        <div className="space-y-6">
          
          {/* Badge Row */}
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-800 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-lime-50 shadow-sm">
              Clean Scene • Healthy Green
            </span>
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-medium text-emerald-900 shadow-sm">
              Eco-Friendly
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Curated <span className="text-emerald-800">green</span> essentials
            <br />
            for a <span className="text-lime-700">healthier home.</span>
          </h1>

          <p className="text-lg text-emerald-900/80 max-w-xl">
            Verdora helps you create a fresh, natural living space with
            eco-friendly plants, accessories, and everyday essentials that are
            kind to you and the planet.
          </p>

          {/* Eco keywords */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="rounded-full bg-amber-200 px-4 py-1 text-sm font-medium text-emerald-900">
              Sustainable
            </span>
            <span className="rounded-full bg-lime-200 px-4 py-1 text-sm font-medium text-emerald-900">
              Natural
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-900">
              Low-Waste
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/products"
              className="rounded-full bg-emerald-800 px-7 py-3 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg active:scale-95 transition-all"
            >
              Shop Green Collection
            </a>
            <a
              href="/about"
              className="rounded-full border border-emerald-200 bg-white/70 px-7 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 active:scale-95 transition-all"
            >
              Learn our story
            </a>
          </div>

          {/* Small Meta Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-emerald-900/75">
            <span>✓ Eco-friendly sourcing</span>
            <span>✓ Plastic-lite packaging</span>
            <span>✓ Local, small growers</span>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            
            {/* Main hero image */}
            <div className="overflow-hidden rounded-3xl bg-emerald-900 shadow-xl">
              <Image
                src="/hero.jpg"
                alt="Verdora green lifestyle moodboard"
                width={800}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-10 left-6 right-6 rounded-2xl bg-white shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">
                  Verdora Promise
                </p>
                <p className="text-sm text-emerald-900">
                  Thoughtfully sourced, planet-first every step of the way.
                </p>
              </div>

              <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-semibold text-emerald-900">
                Green Meets Clean
              </span>
            </div>
          </div>
        </div>

      </section>

       {/* FEATURED ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-emerald-900">
          Featured Green Picks
        </h2>
        <p className="text-center text-emerald-900/70 max-w-xl mx-auto mt-3">
          A look at our most loved plant essentials.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-12">

          {featured.map((plant) => (
            <div
              key={plant._id}
              className="rounded-3xl bg-white border border-lime-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="h-48 bg-emerald-100">
                <img
                  src={plant.image}
                  alt={plant.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-semibold text-emerald-900">{plant.title}</p>

                <p className="text-sm text-emerald-800/80 mt-2 line-clamp-2">
                  {plant.shortDescription}
                </p>

                <a
                  href={`/products/${plant.slug}`}
                  className="mt-4 inline-block text-sm font-bold text-emerald-800 hover:underline"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}

        </div>
      </section>

      
      {/* -------------------------------------------------- */}
      {/* 4. TESTIMONIAL SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-emerald-100/60 px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-emerald-900">
            Loved by Plant Lovers
          </h2>

          <p className="mt-4 text-emerald-900/80 max-w-2xl mx-auto">
            “Verdora transformed my living space into a peaceful, clean, and
            thriving environment. Their plants are incredibly healthy and
            last longer than any I’ve bought before.”
          </p>

          <p className="mt-2 font-semibold text-emerald-900">— A Happy Customer</p>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5. CTA BANNER SECTION */}
      {/* -------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-emerald-800 text-lime-50 text-center px-10 py-16 shadow-xl">
          <h2 className="text-3xl font-bold">Ready to Go Green?</h2>
          <p className="text-lime-100 mt-3 max-w-xl mx-auto">
            Start your eco-friendly lifestyle today with Verdora's curated collection.
          </p>

          <a
            href="/products"
            className="mt-6 inline-block rounded-full bg-lime-300 text-emerald-900 font-semibold px-7 py-3 hover:bg-lime-200 transition-all"
          >
            Browse All Products
          </a>
        </div>
      </section>

    </main>
  );
}
