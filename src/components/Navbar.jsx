"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Leaf, User } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getMockUser, mockLogout, isMockLoggedIn } from "@/lib/mockAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mockUser, setMockUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Check for mock user on mount and pathname change
  useEffect(() => {
    setMockUser(getMockUser());
  }, [pathname]);

  // Combined user (prioritize Firebase, fallback to mock)
  const user = firebaseUser || mockUser;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => pathname === href;

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "Account");

  const handleLogout = async () => {
    setUserMenuOpen(false);
    mockLogout();
    setMockUser(null);
    await signOut(auth);
    router.push("/");
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled
          ? "border-lime-200/80 bg-lime-50/95 backdrop-blur-lg shadow-sm"
          : "border-lime-100 bg-lime-50/90 backdrop-blur-md"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-lime-500 text-lime-50 shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Leaf size={20} />
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight text-emerald-900">
                Verdora
              </span>
              <span className="text-xs font-medium text-emerald-700/70">
                green meets clean
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-sm font-medium transition-colors"
                >
                  <motion.span
                    className={
                      isActive(link.href)
                        ? "text-emerald-900"
                        : "text-emerald-700/80 hover:text-emerald-900"
                    }
                    whileHover={{ y: -1 }}
                  >
                    {link.name}
                  </motion.span>
                  {isActive(link.href) && (
                    <motion.span
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-lime-400"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Right side: auth controls */}
            {!user && (
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-800 hover:shadow-lg transition-all"
                  >
                    Register
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {user && (
              <div className="relative">
                <motion.button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-200 text-emerald-900">
                    <User size={14} />
                  </span>
                  <span>{displayName}</span>
                  {mockUser && !firebaseUser && (
                    <span className="ml-1 text-[10px] bg-lime-300 text-emerald-900 px-1.5 py-0.5 rounded-full">
                      Demo
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-lg border border-lime-100 py-2 text-sm overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-2 border-b border-lime-100 text-xs text-emerald-800/80">
                        <p className="font-semibold">Signed in as</p>
                        <p>{user.email}</p>
                        {mockUser && !firebaseUser && (
                          <p className="mt-1 text-emerald-600 font-medium">Demo Account</p>
                        )}
                      </div>
                      <motion.div whileHover={{ backgroundColor: "#f7fee7" }}>
                        <Link
                          href="/add-product"
                          className="block px-4 py-2 text-emerald-900"
                        >
                          Add Product
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ backgroundColor: "#f7fee7" }}>
                        <Link
                          href="/manage-products"
                          className="block px-4 py-2 text-emerald-900"
                        >
                          Manage Products
                        </Link>
                      </motion.div>
                      <motion.button
                        onClick={handleLogout}
                        className="mt-1 block w-full px-4 py-2 text-left text-emerald-800"
                        whileHover={{ backgroundColor: "#ecfccb" }}
                      >
                        Logout
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile toggles */}
          <motion.button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-emerald-900 hover:bg-lime-100 md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-2 border-t border-lime-100 bg-lime-50/95 px-4 pb-4 pt-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                      block rounded-xl px-3 py-2 text-sm font-medium transition-colors
                      ${isActive(link.href)
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-emerald-800 hover:bg-lime-100"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <motion.div
                  className="mt-3 flex flex-col gap-2 border-t border-lime-100 pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full border border-emerald-200 bg-white px-4 py-2 text-center text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-800 hover:shadow-lg transition-all"
                  >
                    Register
                  </Link>
                </motion.div>
              )}

              {user && (
                <motion.div
                  className="mt-3 space-y-2 border-t border-lime-100 pt-3 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-emerald-800/80">
                    Signed in as{" "}
                    <span className="font-semibold">{user.email}</span>
                    {mockUser && !firebaseUser && (
                      <span className="ml-2 text-emerald-600">(Demo)</span>
                    )}
                  </p>
                  <Link
                    href="/add-product"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-emerald-50 px-3 py-2 font-medium text-emerald-900"
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/manage-products"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl bg-emerald-50 px-3 py-2 font-medium text-emerald-900"
                  >
                    Manage Products
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left font-medium text-emerald-800 hover:bg-lime-100"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
