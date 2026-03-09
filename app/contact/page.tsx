import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.08),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)]">
              ✦
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              Arul.dev
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Projects
            </Link>
            <Link
              href="/opensource"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Open Source
            </Link>
            <Link href="/contact" className="text-sm text-white">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Contact
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build something useful
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-white/65 md:text-lg">
            I’m interested in software engineering, AI engineering, developer
            tools, and product-focused technical work.
          </p>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Reach Out
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <p className="text-sm text-white/40">Email</p>
                <a
                  href="mailto:arajarajan@clarku.edu"
                  className="mt-2 block text-2xl text-white transition hover:text-fuchsia-300"
                >
                  arajarajan@clarku.edu
                </a>
              </div>

              <div>
                <p className="text-sm text-white/40">GitHub</p>
                <a
                  href="https://github.com/Aroool"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-2xl text-white transition hover:text-fuchsia-300"
                >
                  Github
                </a>
              </div>

              <div>
                <p className="text-sm text-white/40">LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/arulprashath01/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block text-2xl text-white transition hover:text-fuchsia-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Availability
            </p>

            <div className="mt-8 space-y-5 text-white/70">
              <p className="text-lg leading-8">
                Open to software engineering and AI-focused opportunities.
              </p>
              <p className="text-lg leading-8">
                Interested in full-time, internship, and impactful product
                roles.
              </p>
              <p className="text-lg leading-8">
                Best way to reach me: email or LinkedIn.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/Arulprashath-resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.22)] transition hover:scale-[1.02]"
                >
                Download Resume
                </a>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}