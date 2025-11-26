import Image from "next/image";

export default function Home() {
  return (
    <main className=" bg-lime-50 text-emerald-950">
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid gap-12 md:grid-cols-2 items-center">
        {/* Left content */}
        <div className="space-y-6">
          {/* Badge row */}
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-800 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-lime-50 shadow-sm">
              Clean Scene • Healthy Green
            </span>
            <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-medium text-emerald-900 shadow-sm">
              Eco-Friendly
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Curated <span className="text-emerald-800">green</span> essentials
            <br />
            for a <span className="text-lime-700">healthier home.</span>
          </h1>

          <p className="text-lg text-emerald-900/80 max-w-xl">
            Verdora helps you create a fresh, natural living space with
            eco-friendly plants, accessories, and everyday essentials that are
            kind to you and the planet.
          </p>

          {/* Eco keywords */}
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="rounded-full bg-amber-200 px-4 py-1 text-sm font-medium text-emerald-900">
              Sustainable
            </span>
            <span className="rounded-full bg-lime-200 px-4 py-1 text-sm font-medium text-emerald-900">
              Natural
            </span>
            <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-900">
              Low-Waste
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="/products"
              className="rounded-full bg-emerald-800 px-7 py-3 text-sm font-semibold text-lime-50 shadow-md hover:bg-emerald-900 hover:shadow-lg active:scale-95 transition-all"
            >
              Shop Green Collection
            </a>
            <a
              href="/about"
              className="rounded-full border border-emerald-200 bg-white/70 px-7 py-3 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 active:scale-95 transition-all"
            >
              Learn our story
            </a>
          </div>

          {/* Small meta row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-emerald-900/75">
            <span>✓ Eco-friendly sourcing</span>
            <span>✓ Plastic-lite packaging</span>
            <span>✓ Local, small growers</span>
          </div>
        </div>

        {/* Right visual - moodboard style */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Main image card */}
            <div className="overflow-hidden rounded-3xl bg-emerald-900 shadow-xl">
              <Image
                src="/hero.jpg" // put your moodboard image as public/hero.jpg
                alt="Verdora green lifestyle moodboard"
                width={800}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Floating label card */}
            <div className="absolute -bottom-10 left-6 right-6 rounded-2xl bg-white shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700/80">
                  Verdora Promise
                </p>
                <p className="text-sm text-emerald-900">
                  Thoughtfully sourced, planet-first every step of the way.
                </p>
              </div>
              <span className="rounded-full bg-lime-200 px-3 py-1 text-xs font-semibold text-emerald-900">
                Green Meets Clean
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
