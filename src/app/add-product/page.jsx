"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Indoor Plant");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = title.toLowerCase().replace(/\s+/g, "-");

      const newProduct = {
        title,
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        price: Number(price),
        image,
        slug,
        meta: { category },
      };

      const res = await axios.post("http://localhost:5000/plants", newProduct);

      if (res.data.insertedId) {
        toast.success("Product added successfully!");

        setTitle("");
        setShortDesc("");
        setFullDesc("");
        setPrice("");
        setImage("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-lime-50 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white border border-lime-100 rounded-3xl p-10 shadow-lg">

        <h1 className="text-3xl font-extrabold text-emerald-900 text-center mb-6">
          Add a New Plant 🌱
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-sm font-medium text-emerald-900">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-900">Short Description</label>
            <input
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-900">Full Description</label>
            <textarea
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              rows="4"
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-900">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-900">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
            >
              <option>Indoor Plant</option>
              <option>Succulents</option>
              <option>Outdoor</option>
              <option>Decor</option>
              <option>Care Kit</option>
              <option>Accessory</option>
              <option>Bundle</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-emerald-900">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-lime-200 px-3 py-2 text-sm bg-emerald-50/40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald-800 text-white py-3 font-semibold hover:bg-emerald-900 transition active:scale-95"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </main>
  );
}
