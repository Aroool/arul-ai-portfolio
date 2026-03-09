import Link from "next/link";
import { getGitHubRepos } from "../../lib/github";
import { projectMeta } from "../../data/projectMeta";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function getTopLanguages(
  repos: Array<{ language: string | null }>
): string[] {
  const counts: Record<string, number> = {};

  for (const repo of repos) {
    if (!repo.language) continue;
    counts[repo.language] = (counts[repo.language] || 0) + 1;
  }

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language]) => language);
}

function getThisMonthReposCount(
  repos: Array<{ updated_at: string }>
): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return repos.filter((repo) => {
    const updated = new Date(repo.updated_at);
    return (
      updated.getMonth() === currentMonth &&
      updated.getFullYear() === currentYear
    );
  }).length;
}

function getLast30DaysHeatmap(
  repos: Array<{ updated_at: string }>
): number[] {
  const today = new Date();
  const days: number[] = [];

  for (let i = 29; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    const count = repos.filter((repo) => {
      const updated = new Date(repo.updated_at);
      return (
        updated.getDate() === day.getDate() &&
        updated.getMonth() === day.getMonth() &&
        updated.getFullYear() === day.getFullYear()
      );
    }).length;

    days.push(count);
  }

  return days;
}

function getHeatColor(count: number) {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-fuchsia-500/30";
  if (count === 2) return "bg-fuchsia-500/50";
  if (count === 3) return "bg-violet-500/60";
  return "bg-cyan-400/70";
}

export default async function ProjectsPage() {
  const username = "Aroool";
  const repos = await getGitHubRepos(username);

  const visibleRepos = repos
    .map((repo) => {
      const meta = projectMeta[repo.name];

      return {
        ...repo,
        title: meta?.title || repo.name,
        customDescription:
          meta?.description || repo.description || "No description available.",
        category: meta?.category || "Full Stack",
        featured: meta?.featured || false,
        hidden: meta?.hidden || false,
        demoUrl: meta?.demoUrl || repo.homepage || "",
        caseStudyUrl: meta?.caseStudyUrl || "",
      };
    })
    .filter((repo) => !repo.hidden);

  const totalRepos = visibleRepos.length;
  const topLanguages = getTopLanguages(visibleRepos);
  const thisMonthActivity = getThisMonthReposCount(visibleRepos);
  const featuredCount = visibleRepos.filter((repo) => repo.featured).length;
  const heatmapDays = getLast30DaysHeatmap(visibleRepos);

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
            <Link href="/projects" className="text-sm text-white">
              Projects
            </Link>
            <Link
              href="/opensource"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Open Source
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Projects
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            GitHub Projects
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
            Selected work, experiments, and public engineering builds pulled
            from GitHub and presented in a recruiter-friendly format.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]">
            <p className="text-sm text-white/45">Repositories</p>
            <p className="mt-3 text-4xl font-semibold">{totalRepos}</p>
            <p className="mt-2 text-sm text-white/55">Visible public repos</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]">
            <p className="text-sm text-white/45">This Month Activity</p>
            <p className="mt-3 text-4xl font-semibold">{thisMonthActivity}</p>
            <p className="mt-2 text-sm text-white/55">
              Repos updated this month
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]">
            <p className="text-sm text-white/45">Featured Projects</p>
            <p className="mt-3 text-4xl font-semibold">{featuredCount}</p>
            <p className="mt-2 text-sm text-white/55">Marked portfolio work</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.08)]">
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
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-white/45">Last 30 Days</p>
              <h2 className="mt-2 text-2xl font-semibold">
                Activity Heatmap
              </h2>
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
              <div
                key={index}
                className={`h-8 rounded-md border border-white/5 ${getHeatColor(
                  count
                )}`}
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
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Repository Showcase</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleRepos.map((repo) => (
              <div
                key={repo.id}
                className="group flex h-[300px] flex-col justify-between rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-6 shadow-[0_0_30px_rgba(139,92,246,0.08)] transition hover:-translate-y-1 hover:border-violet-400/20 hover:shadow-[0_0_60px_rgba(139,92,246,0.18)]"
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
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.03c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.58.24 2.75.12 3.04.73.81 1.17 1.84 1.17 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                      </svg>
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
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}