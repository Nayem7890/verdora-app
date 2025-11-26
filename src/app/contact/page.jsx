export default function ContactPage() {
  return (
    <main className=" bg-lime-50 text-emerald-950 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-emerald-900">
            Contact Me
          </h1>
          <p className="mt-3 text-emerald-900/80 max-w-2xl mx-auto">
            I’m MD NAYEM HASAN, a Frontend & MERN Stack Developer based in Chattogram, Bangladesh.  
            Feel free to reach out for collaboration, internships, or web development opportunities.
          </p>
        </div>

        {/* Main Card */}
        <section className="mb-10 bg-white border border-lime-100 rounded-3xl shadow-lg p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Left – About */}
          <div className="flex-1 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/80">
              About Me
            </p>
            <h2 className="text-2xl font-bold text-emerald-900">
              MD NAYEM HASAN
            </h2>
            <p className="text-sm font-semibold text-emerald-900/90">
              Frontend Developer | MERN Stack
            </p>
            <p className="text-sm text-emerald-900/80 leading-relaxed">
              I’m a student and aspiring MERN Stack Developer, focused on building clean,
              responsive web applications using React, Next.js, and modern JavaScript.
              I enjoy turning ideas into real-world projects and continuously improving
              my skills through hands-on learning.
            </p>
            <p className="text-sm text-emerald-900/80">
              Let’s connect if you’re looking for a motivated frontend / MERN developer
              who is eager to learn, grow, and contribute to a modern tech team.
            </p>
          </div>

          {/* Right – Quick Details */}
          <div className="w-full md:w-64 bg-emerald-800 text-lime-50 rounded-2xl p-5 shadow-md">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Quick Details
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-semibold">Name:</span>{" "}
                <span className="opacity-90">MD NAYEM HASAN</span>
              </li>
              <li>
                <span className="font-semibold">Role:</span>{" "}
                <span className="opacity-90">Frontend Developer | MERN Stack</span>
              </li>
              <li>
                <span className="font-semibold">Location:</span>{" "}
                <span className="opacity-90">Chattogram, Bangladesh</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Email */}
          <div className="bg-white border border-lime-100 rounded-3xl shadow p-6">
            <h3 className="text-lg font-semibold text-emerald-900">
              Email
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80">
              Best for formal communication, project discussions, and professional opportunities.
            </p>
            <a
              href="mailto:mnhasan.2303@gmail.com"
              className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline"
            >
              mnhasan.2303@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white border border-lime-100 rounded-3xl shadow p-6">
            <h3 className="text-lg font-semibold text-emerald-900">
              WhatsApp
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80">
              Quick chats, short questions, and faster communication.
            </p>
            <a
              href="https://wa.me/8801521700687"
              target="_blank"
              className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline"
            >
              +8801521700687
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-white border border-lime-100 rounded-3xl shadow p-6">
            <h3 className="text-lg font-semibold text-emerald-900">
              GitHub
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80">
              Explore my projects, practice work, and ongoing experiments with MERN and frontend development.
            </p>
            <a
              href="https://github.com/Nayem7890"
              target="_blank"
              className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline"
            >
              github.com/Nayem7890
            </a>
          </div>

          {/* LinkedIn */}
          <div className="bg-white border border-lime-100 rounded-3xl shadow p-6">
            <h3 className="text-lg font-semibold text-emerald-900">
              LinkedIn
            </h3>
            <p className="mt-2 text-sm text-emerald-900/80">
              Let’s connect professionally. I’m actively building my career in frontend
              and MERN stack development.
            </p>
            <a
              href="https://www.linkedin.com/in/md-nayemhasan/"
              target="_blank"
              className="mt-3 inline-block text-sm font-semibold text-emerald-800 hover:underline"
            >
              linkedin.com/in/md-nayemhasan
            </a>
          </div>
        </section>

        {/* Bottom note */}
        <section className="mt-10 text-center text-xs text-emerald-900/70">
          <p>
            Open to internships, junior roles, and project-based collaborations in frontend / MERN stack development.
          </p>
        </section>
      </div>
    </main>
  );
}
