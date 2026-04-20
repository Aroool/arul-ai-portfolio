"use client";

import { motion } from "framer-motion";

const contributions = [
  {
    project: "Prefect",
    type: "Merged Pull Request",
    title: "Fix kwargs typing for remote_options in prefect-ray",
    summary:
      "Improved type correctness in Prefect's prefect-ray integration by fixing the kwargs typing for remote_options, making the developer experience cleaner and more reliable.",
    date: "Mar 2026",
    link: "https://github.com/PrefectHQ/prefect/pull/20899",
    status: "Merged",
    repo: "PrefectHQ/prefect",
    language: "Python",
  },
  {
    project: "Open Source",
    type: "Public Engineering",
    title: "Consistent contribution workflow on GitHub",
    summary:
      "Actively works through issues, pull requests, and improvements in public repositories to build visible engineering proof and stronger collaboration habits.",
    date: "Ongoing",
    link: "https://github.com/Aroool",
    status: "Active",
    repo: "github.com/Aroool",
    language: "GitHub",
  },
  {
    project: "Developer Growth",
    type: "Contribution Practice",
    title: "Using open source to strengthen engineering depth",
    summary:
      "Treats open source as a practical way to improve code quality, understand real codebases, and contribute in environments beyond personal projects.",
    date: "Ongoing",
    link: "https://github.com/Aroool",
    status: "Ongoing",
    repo: "github.com/Aroool",
    language: "Learning",
  },
];

const strengths = [
  {
    title: "Real Codebases",
    description:
      "Working in open source means reading, understanding, and improving systems built by other engineers.",
  },
  {
    title: "Public Proof",
    description:
      "Merged pull requests and contribution history show visible engineering effort beyond personal projects.",
  },
  {
    title: "Collaboration",
    description:
      "Open source improves communication, review discipline, and the ability to work within existing standards.",
  },
];

const GitHubIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.73.81 1.17 1.84 1.17 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function OpenSourcePage() {
  const mergedCount = contributions.filter(
    (item) => item.status === "Merged"
  ).length;

  const activeCount = contributions.filter(
    (item) => item.status === "Active" || item.status === "Ongoing"
  ).length;

  const stats = [
    {
      label: "Contribution Entries",
      value: contributions.length,
      sub: "Tracked highlights",
    },
    { label: "Merged PRs", value: mergedCount, sub: "Accepted contributions" },
    { label: "Active Work", value: activeCount, sub: "Ongoing public effort" },
  ];

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-14">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Open Source
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Public Proof of Work
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
            Contributions, pull requests, and public engineering work that show
            how I collaborate with real codebases beyond personal projects.
          </p>
        </motion.section>

        {/* Stat cards */}
        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
            >
              <p className="text-sm text-white/45">{stat.label}</p>
              <p className="mt-3 text-4xl font-semibold">{stat.value}</p>
              <p className="mt-2 text-sm text-white/55">{stat.sub}</p>
            </motion.div>
          ))}

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]"
          >
            <p className="text-sm text-white/45">GitHub</p>
            <div className="mt-4">
              <a
                href="https://github.com/Aroool"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                <GitHubIcon />
                View Profile
              </a>
            </div>
          </motion.div>
        </section>

        {/* Strength cards */}
        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)]"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {item.description}
              </p>
            </motion.div>
          ))}
        </section>

        {/* Contributions */}
        <section className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-between"
          >
            <h2 className="text-2xl font-semibold">Contribution Highlights</h2>
            <a
              href="https://github.com/Aroool"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Open GitHub
            </a>
          </motion.div>

          <div className="grid gap-6">
            {contributions.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)] transition hover:border-violet-400/20 hover:shadow-[0_0_45px_rgba(139,92,246,0.14)]"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                        {item.project}
                      </span>
                      <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">
                        {item.type}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        {item.language}
                      </span>
                      <span className="text-xs text-white/45">{item.date}</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-base leading-8 text-white/68">
                      {item.summary}
                    </p>
                    <p className="mt-4 text-sm text-white/45">{item.repo}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.status === "Merged"
                          ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border border-white/15 bg-white/5 text-white/75"
                      }`}
                    >
                      {item.status}
                    </span>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      <GitHubIcon />
                      View Link
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-8 shadow-[0_0_30px_rgba(139,92,246,0.08)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                Open Source Mindset
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Learning through public engineering
              </h2>
              <p className="mt-4 text-base leading-8 text-white/68">
                I use open source as a way to sharpen code quality, understand
                real production systems, and learn how strong engineering teams
                review and evolve software in public.
              </p>
            </div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              href="https://github.com/Aroool"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.22)] transition"
            >
              Visit GitHub Profile
            </motion.a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
