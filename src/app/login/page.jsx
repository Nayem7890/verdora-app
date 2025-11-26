"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Chrome } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/"); // redirect home
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // redirect home
    } catch (err) {
      console.error(err);
      let msg = "Unable to sign in. Please check your details.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/user-not-found") {
        msg = "No account found with that email.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] bg-lime-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-lime-100 px-6 py-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
            Verdora
          </p>
          <h1 className="mt-2 text-2xl font-bold text-emerald-900">
            Welcome back 🌿
          </h1>
          <p className="mt-1 text-sm text-emerald-900/80">
            Sign in to manage your green essentials.
          </p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-100 bg-white py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50 transition-all disabled:opacity-60"
        >
          <Chrome size={18} />
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-lime-100" />
          <span className="text-[11px] uppercase tracking-wide text-emerald-900/60">
            or sign in with email
          </span>
          <div className="h-px flex-1 bg-lime-100" />
        </div>

        {/* Email / password */}
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white"
              placeholder="Your password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-emerald-900/80">
          New to Verdora?{" "}
          <a
            href="/register"
            className="font-semibold text-emerald-800 hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
