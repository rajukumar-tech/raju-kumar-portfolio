---
description: Add a GitHub project to the portfolio's Projects section
argument-hint: <github-repo-url> [what I did on it]
---

Add the project at $ARGUMENTS to the portfolio.

1. Read the repo's README and dependency files (package.json, requirements.txt, pyproject.toml) with the GitHub API. Only describe features and tech that actually exist in the repo; never invent metrics.
2. Check the commit history or ask me whether I own the repo or was a collaborator. Start the description with "Team project · " for collaborator repos.
3. Get a real screenshot: run the project locally (or its live demo), capture 1280×800 into `public/assets/projects/<slug>.png`. Fall back to `https://opengraph.githubassets.com/1/<owner>/<repo>` only if it can't run.
4. Append an entry to `myProjects` in `src/constants/index.js` matching the existing shape (`id`, `title`, `description`, `subDescription` of 3-4 bullets, `href`, `image`, `tags` built with `tags(L.x, ...)`). Add any missing logo to `public/assets/logos/` and the `L` map.
5. The content hook runs `scripts/validate-content.mjs` automatically; fix anything it reports. Then run `npm run build`.
6. Tell me what you added and ask before removing or reordering any existing project.
