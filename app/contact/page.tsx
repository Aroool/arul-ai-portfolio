"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-14">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Contact
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Let&apos;s build something useful
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-8 text-white/65 md:text-lg">
            I&apos;m interested in software engineering, AI engineering,
            developer tools, and product-focused technical work.
          </p>
        </motion.section>

        {/* Contact cards */}
        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Reach Out
            </p>

            <div className="mt-8 space-y-7">
              {[
                {
                  label: "Email",
                  href: "mailto:arajarajan@clarku.edu",
                  display: "arajarajan@clarku.edu",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/Aroool",
                  display: "Github",
                  external: true,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/arulprashath01/",
                  display: "LinkedIn",
                  external: true,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.1 }}
                >
                  <p className="text-sm text-white/40">{item.label}</p>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="mt-2 block text-2xl text-white transition hover:text-fuchsia-300"
                  >
                    {item.display}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">
              Availability
            </p>

            <div className="mt-8 space-y-5 text-white/70">
              {[
                "Open to software engineering and AI-focused opportunities.",
                "Interested in full-time, internship, and impactful product roles.",
                "Best way to reach me: email or LinkedIn.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.1 }}
                  className="text-lg leading-8"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                href="/Arulprashath-resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.22)] transition"
              >
                Download Resume
              </motion.a>

              <motion.div whileHover={{ scale: 1.03 }}>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
