"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPlant() {
      try {
        const res = await axios.get("https://verdora-server.vercel.app/plants");
        const allPlants = res.data;

        const item = allPlants.find((p) => p.slug === slug);

        if (!item) {
          setNotFound(true);
        } else {
          setPlant(item);
        }
      } catch (err) {
        console.error("Failed to load details:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPlant();
  }, [slug]);

  // Loading state
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
          <p className="text-emerald-800">Loading product...</p>
        </motion.div>
      </main>
    );
  }

  // Not found
  if (notFound || !plant) {
    return (
      <main className="min-h-[60vh] bg-lime-50 flex items-center justify-center flex-col text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-emerald-900">Product Not Found</h2>
          <p className="mt-2 text-emerald-900/70 max-w-md">
            The product you are looking for does not exist or has been removed.
          </p>
          <motion.button
            onClick={() => router.push("/products")}
            className="mt-6 rounded-full bg-emerald-800 px-6 py-3 text-lime-50 font-semibold hover:bg-emerald-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Products
          </motion.button>
        </motion.div>
      </main>
    );
  }

  const category = plant.meta?.category || plant.category || "Category";

  return (
    <main className="min-h-screen bg-lime-50 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <AnimatedSection animation="fadeUp">
          <motion.button
            onClick={() => router.back()}
            className="mb-6 rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-900 shadow hover:bg-emerald-50 transition-colors"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back
          </motion.button>
        </AnimatedSection>

        <motion.div
          className="bg-white border border-lime-100 rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* Image */}
          <motion.div
            className="md:w-1/2 h-80 md:h-auto bg-emerald-100 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.img
              src={plant.image}
              alt={plant.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Right Side */}
          <motion.div
            className="md:w-1/2 p-8 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl font-extrabold text-emerald-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {plant.title}
            </motion.h1>

            <motion.p
              className="inline-block bg-lime-200 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.p>

            <motion.p
              className="text-emerald-900 text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              ${typeof plant.price === "number" ? plant.price.toFixed(2) : plant.price}
            </motion.p>

            <motion.p
              className="text-sm text-emerald-900/80 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {plant.fullDescription || plant.shortDescription}
            </motion.p>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => alert("This is a demo — no cart added yet!")}
                className="rounded-full bg-emerald-700 px-6 py-3 text-lime-50 font-semibold shadow hover:bg-emerald-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add to Cart
              </motion.button>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
