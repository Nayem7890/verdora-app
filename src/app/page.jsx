"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import AnimatedCard, { AnimatedLink } from "@/components/AnimatedCard";
import MagneticButton from "@/components/MagneticButton";
import TextReveal, { SplitText } from "@/components/TextReveal";
import ParallaxSection, { ParallaxImage } from "@/components/ParallaxSection";

export default function Home() {

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await axios.get("https://verdora-server.vercel.app/plants");
        const firstThree = res.data.slice(0, 3);
        setFeatured(firstThree);
      } catch (err) {
        console.error("Failed to load featured:", err);
      }
    }

    loadFeatured();
  }, []);

  return (

    <main className="bg-lime-50 text-emerald-950 overflow-hidden">

      {/* -------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* -------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-0 grid gap-12 md:grid-cols-2 items-center">

        {/* Left Content */}
        <div className="space-y-6">

          {/* Badge Row */}
          <AnimatedSection animation="fadeUp" delay={0}>
            <div className="flex flex-wrap gap-3">
              <motion.span
                className="rounded-full bg-emerald-800 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-lime-50 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                Clean Scene • Healthy Green
              </motion.span>
              <motion.span
                className="rounded-full bg-amber-200 px-3 py-1 text-xs font-medium text-emerald-900 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                Eco-Friendly
              </motion.span>
            </div>
          </AnimatedSection>

          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <SplitText text="Curated " delay={0.1} stagger={0.04} />
              <span className="text-emerald-800">
                <SplitText text="green" delay={0.4} stagger={0.05} />
              </span>
              <SplitText text=" essentials" delay={0.6} stagger={0.04} />
              <br />
              <SplitText text="for a " delay={0.9} stagger={0.04} />
              <span className="text-lime-700">
                <SplitText text="healthier home." delay={1.1} stagger={0.04} />
              </span>
            </h1>
          </div>

          <AnimatedSection animation="fadeUp" delay={0.2}>
            <p className="text-lg text-emerald-900/80 max-w-xl">
              Verdora helps you create a fresh, natural living space with
              eco-friendly plants, accessories, and everyday essentials that are
              kind to you and the planet.
            </p>
          </AnimatedSection>

          {/* Eco keywords */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Sustainable", "Natural", "Low-Waste"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className={`rounded-full px-4 py-1 text-sm font-medium text-emerald-900 ${i === 0 ? "bg-amber-200" : i === 1 ? "bg-lime-200" : "bg-emerald-100"
                    }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton strength={0.4}>
                <a
                  href="/products"
                  className="inline-block rounded-full bg-emerald-800 px-7 py-3 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg transition-all"
                >
                  Shop Green Collection
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a
                  href="/about"
                  className="inline-block rounded-full border border-emerald-200 bg-white/70 px-7 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-all"
                >
                  Learn our story
                </a>
              </MagneticButton>
            </div>
          </AnimatedSection>

          {/* Small Meta Row */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-emerald-900/75">
              <span>✓ Eco-friendly sourcing</span>
              <span>✓ Plastic-lite packaging</span>
              <span>✓ Local, small growers</span>
            </div>
          </AnimatedSection>
        </div>

        {/* Right Visual */}
        <AnimatedSection animation="scaleUp" delay={0.2} className="relative flex justify-center">
          <div className="relative w-full max-w-md">

            {/* Main hero image with parallax */}
            <motion.div
              className="overflow-hidden rounded-3xl bg-emerald-900 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ParallaxSection speed={0.3}>
                <Image
                  src="/hero.jpg"
                  alt="Verdora green lifestyle moodboard"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover scale-110"
                  priority
                />
              </ParallaxSection>
            </motion.div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-10 left-6 right-6 rounded-2xl bg-white shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
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
            </motion.div>
          </div>
        </AnimatedSection>

      </section>

      {/* FEATURED ITEMS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimatedSection animation="fadeUp">
          <h2 className="text-3xl font-bold text-center text-emerald-900">
            Featured Green Picks
          </h2>
          <p className="text-center text-emerald-900/70 max-w-xl mx-auto mt-3">
            A look at our most loved plant essentials.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-12" staggerDelay={0.15}>
          {featured.map((plant) => (
            <StaggerItem key={plant._id}>
              <AnimatedCard className="rounded-3xl bg-white border border-lime-200 shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
                {/* Image */}
                <div className="h-48 bg-emerald-100 overflow-hidden">
                  <motion.img
                    src={plant.image}
                    alt={plant.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
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
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>


      {/* -------------------------------------------------- */}
      {/* 4. TESTIMONIAL SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-emerald-100/60 px-6 py-20">
        <AnimatedSection animation="scaleUp" className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-emerald-900">
              Loved by Plant Lovers
            </h2>

            <motion.p
              className="mt-4 text-emerald-900/80 max-w-2xl mx-auto text-lg italic"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              "Verdora transformed my living space into a peaceful, clean, and
              thriving environment. Their plants are incredibly healthy and
              last longer than any I've bought before."
            </motion.p>

            <motion.p
              className="mt-4 font-semibold text-emerald-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              — A Happy Customer
            </motion.p>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* -------------------------------------------------- */}
      {/* 5. CTA BANNER SECTION */}
      {/* -------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <AnimatedSection animation="fadeUp">
          <motion.div
            className="rounded-3xl bg-emerald-800 text-lime-50 text-center px-10 py-16 shadow-xl"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold">Ready to Go Green?</h2>
            <p className="text-lime-100 mt-3 max-w-xl mx-auto">
              Start your eco-friendly lifestyle today with Verdora's curated collection.
            </p>

            <AnimatedLink
              href="/products"
              className="mt-6 inline-block rounded-full bg-lime-300 text-emerald-900 font-semibold px-7 py-3 hover:bg-lime-200 transition-colors"
            >
              Browse All Products
            </AnimatedLink>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* -------------------------------------------------- */}
      {/* 6. HOW IT WORKS SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-3xl font-bold text-emerald-900">
              How It Works
            </h2>
            <p className="mt-3 text-emerald-900/70 max-w-xl mx-auto">
              Getting your green essentials delivered is as easy as 1-2-3.
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-3" staggerDelay={0.2}>
            {[
              { step: 1, title: "Browse Collection", desc: "Explore our curated selection of eco-friendly plants and accessories." },
              { step: 2, title: "Select Your Favorites", desc: "Pick the perfect plants that match your space and lifestyle." },
              { step: 3, title: "Enjoy Green Living", desc: "Receive your plants with eco-friendly packaging and care guides." },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <AnimatedCard className="rounded-3xl bg-lime-50 border border-lime-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <motion.div
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-800 text-lime-50 text-2xl font-bold shadow-md"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="mt-5 text-lg font-bold text-emerald-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-emerald-900/70">
                    {item.desc}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 7. WHY CHOOSE VERDORA SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-emerald-50/50 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fadeUp">
            <h2 className="text-3xl font-bold text-emerald-900">
              Why Choose Verdora?
            </h2>
            <p className="mt-3 text-emerald-900/70 max-w-xl mx-auto">
              We're committed to bringing nature into your home sustainably.
            </p>
          </AnimatedSection>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
            {[
              { icon: "✨", title: "100% Eco-Friendly", desc: "All products sourced from sustainable growers." },
              { icon: "✓", title: "Premium Quality", desc: "Hand-picked healthy plants with quality guarantee." },
              { icon: "🎧", title: "Expert Support", desc: "Plant care tips and dedicated customer support." },
              { icon: "🚚", title: "Free Delivery", desc: "Carbon-neutral shipping on orders over $50." },
            ].map((benefit, i) => (
              <StaggerItem key={i}>
                <AnimatedCard className="rounded-2xl bg-white border border-lime-100 p-6 shadow-sm hover:shadow-xl transition-shadow">
                  <motion.div
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-lime-200 text-emerald-800 text-xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="mt-4 font-bold text-emerald-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-emerald-900/70">
                    {benefit.desc}
                  </p>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* 8. NEWSLETTER SECTION */}
      {/* -------------------------------------------------- */}
      <section className="bg-emerald-900 px-6 py-20">
        <AnimatedSection animation="fadeUp" className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-lime-50">
            Join Our Green Community
          </h2>
          <p className="mt-3 text-lime-100/80 max-w-xl mx-auto">
            Subscribe for exclusive deals, plant care tips, and eco-living inspiration delivered to your inbox.
          </p>

          <motion.form
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 rounded-full px-6 py-3.5 text-sm text-emerald-900 bg-white border-2 border-lime-200 shadow-lg outline-none focus:ring-4 focus:ring-lime-300/50 focus:border-lime-400 placeholder:text-emerald-600/60 transition-all"
              required
            />
            <motion.button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing! 🌱");
              }}
              className="rounded-full bg-lime-400 px-7 py-3 text-sm font-semibold text-emerald-900 shadow-md hover:bg-lime-300 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>

          <p className="mt-4 text-xs text-lime-100/60">
            No spam, ever. Unsubscribe anytime.
          </p>
        </AnimatedSection>
      </section>

    </main>
  );
}
