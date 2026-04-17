const GITHUB_USERNAME = "Amanshukla124";
const BASE = "https://api.github.com";

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

async function ghFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

export async function getGithubUser(): Promise<GithubUser | null> {
  return ghFetch<GithubUser>(`/users/${GITHUB_USERNAME}`);
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const repos = await ghFetch<GithubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
  );
  return repos ?? [];
}
