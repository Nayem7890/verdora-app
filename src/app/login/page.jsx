"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Chrome, Info } from "lucide-react";
import { mockLogin, MOCK_CREDENTIALS } from "@/lib/mockAuth";
import { motion } from "framer-motion";

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
      router.push("/products");
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

    // Try mock login first
    const mockResult = mockLogin(email, password);
    if (mockResult.success) {
      router.push("/products");
      return;
    }

    // If not mock credentials, try Firebase
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/products");
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
      <motion.div
        className="w-full max-w-md rounded-3xl bg-white shadow-xl border border-lime-100 px-6 py-8"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
            Verdora
          </p>
          <h1 className="mt-2 text-2xl font-bold text-emerald-900">
            Welcome back 🌿
          </h1>
          <p className="mt-1 text-sm text-emerald-900/80">
            Sign in to manage your green essentials.
          </p>
        </motion.div>

        {/* Mock credentials info box */}
        <motion.div
          className="mb-5 rounded-xl bg-lime-100 border border-lime-200 p-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-2">
            <Info size={16} className="text-emerald-700 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-emerald-800">
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: <span className="font-mono bg-white px-1 rounded">{MOCK_CREDENTIALS.email}</span></p>
              <p>Password: <span className="font-mono bg-white px-1 rounded">{MOCK_CREDENTIALS.password}</span></p>
            </div>
          </div>
        </motion.div>

        {/* Google */}
        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-emerald-100 bg-white py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50 transition-colors disabled:opacity-60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Chrome size={18} />
          Continue with Google
        </motion.button>

        <motion.div
          className="my-5 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-px flex-1 bg-lime-100" />
          <span className="text-[11px] uppercase tracking-wide text-emerald-900/60">
            or sign in with email
          </span>
          <div className="h-px flex-1 bg-lime-100" />
        </motion.div>

        {/* Email / password */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Email
            </label>
            <motion.input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white transition-all"
              placeholder="you@example.com"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-emerald-900/80">
              Password
            </label>
            <motion.input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-lime-100 bg-emerald-50/40 px-3 py-2 text-sm text-emerald-900 outline-none focus:border-emerald-400 focus:bg-white transition-all"
              placeholder="Your password"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          {error && (
            <motion.p
              className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg transition-all disabled:opacity-60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>
        </motion.form>

        <motion.p
          className="mt-4 text-xs text-center text-emerald-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          New to Verdora?{" "}
          <a
            href="/register"
            className="font-semibold text-emerald-800 hover:underline"
          >
            Create an account
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}
