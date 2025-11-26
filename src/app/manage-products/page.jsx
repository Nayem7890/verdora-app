"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ManageProductsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  /* -------------------------------------------------------------------
     CUSTOM TOAST CONFIRM DIALOG
  ------------------------------------------------------------------- */
  const confirmDelete = (message) =>
    new Promise((resolve) => {
      toast((t) => (
        <div className="flex flex-col gap-3 px-1">
          <p className="text-sm text-emerald-950 dark:text-white">{message}</p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                resolve(true);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yes, delete
            </button>

            <button
              onClick={() => {
                resolve(false);
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 text-xs bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ));
    });

  /* -------------------------------------------------------------------
     AUTH CHECK
  ------------------------------------------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsub();
  }, [router]);

  /* -------------------------------------------------------------------
     FETCH PRODUCTS
  ------------------------------------------------------------------- */
  useEffect(() => {
    if (!user) return;

    async function fetchPlants() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/plants");
        setPlants(res.data);
      } catch (err) {
        console.error("Failed to fetch plants:", err);
        toast.error("Failed to load products. Try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();
  }, [user]);

  const totalProducts = useMemo(() => plants.length, [plants]);

  /* -------------------------------------------------------------------
     DELETE PRODUCT (WITH TOAST CONFIRM)
  ------------------------------------------------------------------- */
  const handleDelete = async (id) => {
    const ok = await confirmDelete("Are you sure you want to delete this product?");
    if (!ok) return;

    try {
      setDeletingId(id);

      const res = await axios.delete(`http://localhost:5000/plants/${id}`);

      if (res.data.deletedCount === 1) {
        setPlants((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Unable to delete product. Please try again.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Something went wrong while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  /* -------------------------------------------------------------------
     RENDER
  ------------------------------------------------------------------- */

  if (!user) return null;

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center bg-lime-50">
        <p className="text-emerald-800">Loading products...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lime-50 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-900">
              Manage Products
            </h1>
            <p className="mt-1 text-sm text-emerald-900/80">
              View and manage all plants in the Verdora collection.
            </p>
          </div>
          <div className="text-sm text-emerald-900/80 bg-white border border-lime-100 rounded-full px-4 py-2 shadow-sm">
            Total products:{" "}
            <span className="font-semibold text-emerald-900">
              {totalProducts}
            </span>
          </div>
        </div>

        {/* Table */}
        {plants.length === 0 ? (
          <div className="mt-10 text-center text-emerald-900/80">
            <p className="font-medium">No products found.</p>
            <p className="text-sm mt-1">
              Add a new product from  
              <Link
                href="/add-product"
                className="font-semibold text-emerald-800 hover:underline ml-1"
              >
                Add Product
              </Link>
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-lime-100 rounded-3xl shadow">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-emerald-800 text-lime-50">
                  <th className="px-4 py-3 rounded-tl-3xl">#</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3 text-center rounded-tr-3xl">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {plants.map((plant, index) => {
                  const category =
                    plant.meta?.category || plant.category || "N/A";
                  const price =
                    typeof plant.price === "number"
                      ? `$${plant.price.toFixed(2)}`
                      : plant.price || "N/A";

                  return (
                    <tr
                      key={plant._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-emerald-50/40"}
                    >
                      <td className="px-4 py-3">{index + 1}</td>

                      <td className="px-4 py-3">
                        <p className="font-semibold text-emerald-900">{plant.title}</p>
                        <p className="text-xs text-emerald-900/70 line-clamp-2">
                          {plant.shortDescription}
                        </p>
                      </td>

                      <td className="px-4 py-3">{category}</td>
                      <td className="px-4 py-3">{price}</td>
                      <td className="px-4 py-3 text-xs">{plant.slug}</td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                          <Link
                            href={`/products/${plant.slug}`}
                            className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900 hover:bg-emerald-50"
                          >
                            View
                          </Link>

                          <button
                            onClick={() => handleDelete(plant._id)}
                            disabled={deletingId === plant._id}
                            className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:bg-red-600 disabled:opacity-60"
                          >
                            {deletingId === plant._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </main>
  );
}
