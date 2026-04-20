"use client";

import { motion } from "framer-motion";

type Repo = {
  id: number;
  title: string;
  customDescription: string;
  category: string;
  language: string | null;
  forks_count: number;
  updated_at: string;
  html_url: string;
  demoUrl: string;
  featured: boolean;
};

type Props = {
  totalRepos: number;
  thisMonthActivity: number;
  featuredCount: number;
  topLanguages: string[];
  heatmapDays: number[];
  repos: Repo[];
  username: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getHeatColor(count: number) {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-fuchsia-500/30";
  if (count === 2) return "bg-fuchsia-500/50";
  if (count === 3) return "bg-violet-500/60";
  return "bg-cyan-400/70";
}

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
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ProjectsContent({
  totalRepos,
  thisMonthActivity,
  featuredCount,
  topLanguages,
  heatmapDays,
  repos,
  username,
}: Props) {
  const stats = [
    {
      label: "Repositories",
      value: totalRepos,
      sub: "Visible public repos",
    },
    {
      label: "This Month Activity",
      value: thisMonthActivity,
      sub: "Repos updated this month",
    },
    {
      label: "Featured Projects",
      value: featuredCount,
      sub: "Marked portfolio work",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      {/* Page header */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-white/40">
          Projects
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
          GitHub Projects
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
          Selected work, experiments, and public engineering builds pulled from
          GitHub and presented in a recruiter-friendly format.
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
          <p className="text-sm text-white/45">Top Languages</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {topLanguages.map((language) => (
              <span
                key={language}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85"
              >
                {language}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Heatmap */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)]"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/45">Last 30 Days</p>
            <h2 className="mt-2 text-2xl font-semibold">Activity Heatmap</h2>
          </div>

          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
          >
            View GitHub Profile
          </a>
        </div>

        <div className="mt-6 grid grid-cols-10 gap-2 md:grid-cols-15 lg:grid-cols-30">
          {heatmapDays.map((count, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.01 }}
              className={`h-8 rounded-md border border-white/5 ${getHeatColor(count)}`}
              title={`${count} repo update${count === 1 ? "" : "s"}`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-white/45">
          <span>Less</span>
          <span className="h-3 w-3 rounded-sm bg-white/5" />
          <span className="h-3 w-3 rounded-sm bg-fuchsia-500/30" />
          <span className="h-3 w-3 rounded-sm bg-fuchsia-500/50" />
          <span className="h-3 w-3 rounded-sm bg-violet-500/60" />
          <span className="h-3 w-3 rounded-sm bg-cyan-400/70" />
          <span>More</span>
        </div>
      </motion.section>

      {/* Repository grid */}
      <section className="mt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-semibold">Repository Showcase</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group flex h-[300px] flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)] transition hover:border-violet-400/20 hover:shadow-[0_0_60px_rgba(139,92,246,0.18)]"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-2xl font-semibold leading-tight">
                      {repo.title}
                    </h3>
                    <p className="mt-2 text-sm text-fuchsia-300/85">
                      {repo.category}
                    </p>
                  </div>

                  {repo.language && (
                    <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                      {repo.language}
                    </span>
                  )}
                </div>

                <p className="mt-5 line-clamp-3 text-sm leading-7 text-white/68">
                  {repo.customDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/55">
                  <span>⑂ {repo.forks_count}</span>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-6">
                <div className="flex items-center gap-2 text-xs text-white/55">
                  {repo.language && (
                    <>
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{repo.language}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                  >
                    <GitHubIcon />
                    GitHub
                  </a>

                  {repo.demoUrl && (
                    <a
                      href={repo.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.22)] transition hover:scale-[1.02]"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
