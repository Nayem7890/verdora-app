"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import axios from "axios";

export default function ProductsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await axios.get("http://localhost:5000/plants");
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
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-emerald-800">Loading plants...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lime-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-emerald-900">
            Our Plant Collection
          </h1>
          <p className="mt-2 text-emerald-800/80">
            Browse sustainable, natural, eco-friendly plants curated for your
            home.
          </p>
        </div>

        {/* Search + Filter UI */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs rounded-xl border border-lime-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full max-w-xs rounded-xl border border-lime-200 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-300"
          >
            <option>All Categories</option>
            <option>Indoor Plant</option>
            <option>Succulents</option>
            <option>Decor</option>
            <option>Outdoor</option>
            <option>Bundle</option>
            <option>Accessory</option>
            <option>Care Kit</option>
          </select>
        </div>

        {/* No results state */}
        {filteredPlants.length === 0 && (
          <div className="text-center text-emerald-800/80 mt-10">
            <p className="font-medium">
              No plants found matching your search/filter.
            </p>
            <p className="text-sm mt-1">
              Try clearing the search or choosing a different category.
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlants.map((plant) => (
            <div
              key={plant._id}
              className="rounded-3xl overflow-hidden bg-white border border-lime-100 shadow hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="h-56 bg-emerald-100">
                <img
                  src={plant.image}
                  alt={plant.title}
                  className="h-full w-full object-cover"
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

                <Link
                  href={`/products/${plant.slug}`}
                  className="mt-4 inline-block w-full rounded-full bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-lime-50 shadow hover:bg-emerald-800 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
