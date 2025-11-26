"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Leaf, User } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);        // mobile menu
  const [userMenuOpen, setUserMenuOpen] = useState(false); // desktop user dropdown
  const [user, setUser] = useState(null);         // firebase user

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

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
    await signOut(auth);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-lime-100 bg-lime-50/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-700 to-lime-500 text-lime-50 shadow-md group-hover:scale-105 transition-transform">
              <Leaf size={20} />
            </div>
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  relative text-sm font-medium transition-colors
                  ${
                    isActive(link.href)
                      ? "text-emerald-900"
                      : "text-emerald-700/80 hover:text-emerald-900"
                  }
                `}
              >
                {link.name}
                {isActive(link.href) && (
                  <span className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-lime-400" />
                )}
              </Link>
            ))}

            {/* Right side: auth controls */}
            {!user && (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-800 hover:shadow-lg active:scale-95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 transition-all"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-200 text-emerald-900">
                    <User size={14} />
                  </span>
                  <span>{displayName}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-lg border border-lime-100 py-2 text-sm">
                    <div className="px-4 pb-2 border-b border-lime-100 text-xs text-emerald-800/80">
                      <p className="font-semibold">Signed in as</p>
                      <p>{user.email}</p>
                    </div>
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 hover:bg-lime-50 text-emerald-900"
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      className="block px-4 py-2 hover:bg-lime-50 text-emerald-900"
                    >
                      Manage Products
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mt-1 block w-full px-4 py-2 text-left text-emerald-800 hover:bg-lime-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile toggles */}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-emerald-900 hover:bg-lime-100 md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="space-y-2 border-t border-lime-100 bg-lime-50/95 px-4 pb-4 pt-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`
                block rounded-xl px-3 py-2 text-sm font-medium transition-colors
                ${
                  isActive(link.href)
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-emerald-800 hover:bg-lime-100"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="mt-3 flex flex-col gap-2 border-t border-lime-100 pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full border border-emerald-200 bg-white px-4 py-2 text-center text-sm font-semibold text-emerald-900 hover:bg-emerald-50 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-emerald-700 px-4 py-2 text-center text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-800 hover:shadow-lg active:scale-95 transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="mt-3 space-y-2 border-t border-lime-100 pt-3 text-sm">
              <p className="text-xs text-emerald-800/80">
                Signed in as{" "}
                <span className="font-semibold">{user.email}</span>
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
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
