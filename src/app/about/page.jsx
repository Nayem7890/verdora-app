export default function AboutPage() {
  return (
    <main className="min-h-screen bg-lime-50 text-emerald-950 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-emerald-900">About Verdora</h1>
          <p className="mt-3 text-emerald-900/80 max-w-xl mx-auto">
            Nurturing greener homes with eco-friendly plants, sustainable essentials, 
            and mindful living practices.
          </p>
        </div>

        {/* Section 1 - Story */}
        <section className="mb-16 bg-white border border-lime-100 rounded-3xl shadow p-8 md:p-12">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">Our Story</h2>
          <p className="text-emerald-900/80 leading-relaxed">
            Verdora began with a simple idea — to make nature part of everyday living.
            We believe a greener home is a happier home. Our mission is to curate 
            sustainable, naturally beautiful plants and home essentials that bring peace, 
            wellness, and a breath of fresh air into your space.
          </p>
          <p className="text-emerald-900/80 leading-relaxed mt-4">
            From locally sourced plants to eco-friendly accessories, every product is 
            chosen with intention, care, and a commitment to the planet.
          </p>
        </section>

        {/* Section 2 - Values */}
        <section className="mb-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Eco-Friendly",
              desc: "We prioritize sustainable materials, low-waste packaging, and ethical sourcing.",
            },
            {
              title: "Plant-First",
              desc: "Each plant is selected for its beauty, resilience, and ability to purify your space.",
            },
            {
              title: "Community",
              desc: "We support small growers, local artisans, and eco-conscious suppliers.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-lime-100 rounded-3xl shadow p-6"
            >
              <h3 className="text-xl font-semibold text-emerald-900">{item.title}</h3>
              <p className="text-emerald-900/80 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Section 3 - Mission */}
        <section className="mb-16 bg-emerald-800 text-lime-50 rounded-3xl shadow p-10 md:p-14">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            To inspire greener habits, bring nature closer to every home, and create 
            products that are good for people and gentle on the planet.
          </p>
        </section>

        {/* Section 4 - Contact CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-emerald-900">Get in Touch</h2>
          <p className="text-emerald-900/80 mt-2">
            Have questions or want to collaborate?
          </p>

          <a
            href="/contact"
            className="mt-5 inline-block rounded-full bg-emerald-800 px-6 py-3 text-lime-50 font-semibold shadow hover:bg-emerald-900 transition-all"
          >
            Contact Us
          </a>
        </section>
      </div>
    </main>
  );
}
