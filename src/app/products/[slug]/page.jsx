"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
      <main className=" flex items-center justify-center bg-lime-50">
        <p className="text-emerald-800">Loading product...</p>
      </main>
    );
  }

  // Not found
  if (notFound || !plant) {
    return (
      <main className=" bg-lime-50 flex items-center justify-center flex-col text-center px-6">
        <h2 className="text-3xl font-bold text-emerald-900">Product Not Found</h2>
        <p className="mt-2 text-emerald-900/70 max-w-md">
          The product you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-6 rounded-full bg-emerald-800 px-6 py-3 text-lime-50 font-semibold hover:bg-emerald-900 transition-all"
        >
          Back to Products
        </button>
      </main>
    );
  }

  const category = plant.meta?.category || plant.category || "Category";

  return (
    <main className=" bg-lime-50 px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-900 shadow hover:bg-emerald-50 transition-all"
        >
          ← Back
        </button>

        <div className="bg-white border border-lime-100 rounded-3xl shadow flex flex-col md:flex-row overflow-hidden">

          {/* Image */}
          <div className="md:w-1/2 h-80 md:h-auto bg-emerald-100">
            <img
              src={plant.image}
              alt={plant.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 p-8 space-y-5">
            <h1 className="text-3xl font-extrabold text-emerald-900">
              {plant.title}
            </h1>

            <p className="inline-block bg-lime-200 text-emerald-900 text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </p>

            <p className="text-emerald-900 text-xl font-bold">
              ${typeof plant.price === "number" ? plant.price.toFixed(2) : plant.price}
            </p>

            <p className="text-sm text-emerald-900/80 leading-relaxed">
              {plant.fullDescription || plant.shortDescription}
            </p>

            <div className="pt-4">
              <button
                onClick={() => alert("This is a demo — no cart added yet!")}
                className="rounded-full bg-emerald-700 px-6 py-3 text-lime-50 font-semibold shadow hover:bg-emerald-800 active:scale-95 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
