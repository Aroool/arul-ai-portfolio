import { getGitHubRepos } from "../../lib/github";
import { projectMeta } from "../../data/projectMeta";
import ProjectsContent from "./ProjectsContent";

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
    <div className="min-h-screen">
      <ProjectsContent
        totalRepos={totalRepos}
        thisMonthActivity={thisMonthActivity}
        featuredCount={featuredCount}
        topLanguages={topLanguages}
        heatmapDays={heatmapDays}
        repos={visibleRepos}
        username={username}
      />
    </div>
  );
}
