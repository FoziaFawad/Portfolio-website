export type ProjectCategory = "all" | "individual" | "contributed";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "individual" | "contributed";
  role?: string;
  contributions?: string[];
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year?: string;
  metrics?: string;
}
