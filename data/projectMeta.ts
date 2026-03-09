export type ProjectMeta = {
  title?: string;
  description?: string;
  category?: "AI" | "Full Stack" | "Open Source" | "Developer Tools";
  featured?: boolean;
  hidden?: boolean;
  demoUrl?: string;
  caseStudyUrl?: string;
};

export const projectMeta: Record<string, ProjectMeta> = {
  PatternForge: {
    title: "PatternForge",
    description:
      "A DSA pattern analyzer and visualizer designed to help developers break coding problems into reusable solving patterns.",
    category: "Developer Tools",
  },

  "dsa-prep": {
    title: "DSA Prep",
    description:
      "A focused repository for LeetCode and data structures practice, organized for consistent interview preparation.",
    category: "Developer Tools",
  },

  "sentinel-ai": {
    title: "Sentinel AI",
    description:
      "An AI-driven security analysis concept exploring automated code inspection and vulnerability awareness.",
    category: "AI",
  },

  "AI-Meeting-Summarizer": {
    title: "AI Meeting Summarizer",
    description:
      "An AI-powered meeting intelligence system that summarizes conversations, extracts action items, and supports contextual Q&A.",
    category: "AI",
  },

  "repo-you-dont-want-to-show": {
    hidden: true,
  },
};