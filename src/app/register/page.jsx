"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Chrome } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleRegister() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoURL = form.get("photoURL");
    const email = form.get("email");
    const password = form.get("password");

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update user profile (name & photo)
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || null,
      });

      router.push("/");
    } catch (err) {
      console.error(err);
      let msg = "Unable to create account. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] bg-lime-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-lime-100 px-6 py-8">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
            Verdora
          </p>
          <h1 className="mt-2 text-2xl font-bold text-emerald-900">
            Create Your Verdora Account 🌱
          </h1>
          <p className="mt-1 text-sm text-emerald-900/80">
            Join the eco-friendly community today.
          </p>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-100 bg-white py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50 transition-all disabled:opacity-60"
        >
          <Chrome size={18} />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-lime-100" />
          <span className="text-[11px] uppercase tracking-wide text-emerald-900/60">
            or sign up with email
          </span>
          <div className="h-px flex-1 bg-lime-100" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white"
              placeholder="John Doe"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Photo URL (optional)
            </label>
            <input
              name="photoURL"
              type="url"
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white"
              placeholder="https://example.com/profile.jpg"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-emerald-900/80">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-emerald-800 hover:underline"
          >
            Sign in instead
          </a>
        </p>
      </div>
    </main>
  );
}
