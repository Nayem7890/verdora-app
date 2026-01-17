"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";

export default function ProductsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await axios.get("https://verdora-server.vercel.app/plants");
        setPlants(res.data);
      } catch (err) {
        console.error("Axios fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();
  }, []);

  // Filter logic (search + category)
  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const title = plant.title || "";
      const shortDescription = plant.shortDescription || "";
      const plantCategory =
        plant.meta?.category || plant.category || "Other";

      // Search filter
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !search ||
        title.toLowerCase().includes(search) ||
        shortDescription.toLowerCase().includes(search);

      // Category filter
      const matchesCategory =
        category === "All Categories" ||
        plantCategory.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [plants, searchTerm, category]);

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-lime-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-emerald-800">Loading plants...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lime-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <AnimatedSection animation="fadeUp" className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-emerald-900">
            Our Plant Collection
          </h1>
          <p className="mt-2 text-emerald-800/80">
            Browse sustainable, natural, eco-friendly plants curated for your
            home.
          </p>
        </AnimatedSection>

        {/* Search + Filter UI */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <motion.input
              type="text"
              placeholder="Search plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-xs rounded-xl border border-lime-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-all"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full max-w-xs rounded-xl border border-lime-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300 transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <option>All Categories</option>
              <option>Indoor Plant</option>
              <option>Succulents</option>
              <option>Decor</option>
              <option>Outdoor</option>
              <option>Bundle</option>
              <option>Accessory</option>
              <option>Care Kit</option>
            </motion.select>
          </div>
        </AnimatedSection>

        {/* No results state */}
        <AnimatePresence mode="wait">
          {filteredPlants.length === 0 && (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-emerald-800/80 mt-10"
            >
              <p className="font-medium">
                No plants found matching your search/filter.
              </p>
              <p className="text-sm mt-1">
                Try clearing the search or choosing a different category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <motion.div
          className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredPlants.map((plant, index) => (
              <motion.div
                key={plant._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AnimatedCard className="rounded-3xl overflow-hidden bg-white border border-lime-100 shadow hover:shadow-xl transition-shadow h-full">
                  {/* Image */}
                  <div className="h-56 bg-emerald-100 overflow-hidden">
                    <motion.img
                      src={plant.image}
                      alt={plant.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-emerald-900">
                      {plant.title}
                    </h2>

                    <p className="mt-2 text-sm text-emerald-800/80 line-clamp-2">
                      {plant.shortDescription}
                    </p>

                    <p className="mt-3 text-emerald-900 font-semibold">
                      {typeof plant.price === "number"
                        ? `$${plant.price.toFixed(2)}`
                        : plant.price}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={`/products/${plant.slug}`}
                        className="mt-4 inline-block w-full rounded-full bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-lime-50 shadow hover:bg-emerald-800 transition-colors"
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
