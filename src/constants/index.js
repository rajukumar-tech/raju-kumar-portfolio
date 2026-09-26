// ---------------------------------------------------------------------------
// All personal content for the portfolio lives in this file.
// Edit here, not in the section components.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Raju Kumar Munji",
  shortName: "Raju",
  email: "rk8852641@gmail.com",
  location: "Bengaluru, India",
  github: "https://github.com/rajukumar-tech",
  // Leave "" to hide the LinkedIn icon
  linkedin: "https://www.linkedin.com/in/raju-kumar-5693a5341",
};

const logo = (name, file) => ({ name, path: `/assets/logos/${file}` });
const L = {
  python: logo("Python", "python.svg"),
  javascript: logo("JavaScript", "javascript.svg"),
  typescript: logo("TypeScript", "typescript.svg"),
  sql: logo("SQL", "mysql.svg"),
  bash: logo("Bash", "bash.svg"),
  react: logo("React", "react.svg"),
  vite: logo("Vite", "vitejs.svg"),
  tailwind: logo("Tailwind CSS", "tailwindcss.svg"),
  html: logo("HTML5", "html5.svg"),
  css: logo("CSS3", "css3.svg"),
  threejs: logo("Three.js", "threejs.svg"),
  node: logo("Node.js", "nodejs.svg"),
  express: logo("Express", "express.svg"),
  fastapi: logo("FastAPI", "fastapi.svg"),
  prisma: logo("Prisma", "prisma.svg"),
  mongodb: logo("MongoDB", "mongodb.svg"),
  postgres: logo("PostgreSQL", "postgresql.svg"),
  mysql: logo("MySQL", "mysql.svg"),
  sqlite: logo("SQLite", "sqlite.svg"),
  docker: logo("Docker", "docker.svg"),
  git: logo("Git", "git.svg"),
  github: logo("GitHub", "github.svg"),
  vscode: logo("VS Code", "visualstudiocode.svg"),
  gemini: logo("Gemini API", "googlegemini.svg"),
  pandas: logo("Pandas", "pandas.svg"),
  sklearn: logo("scikit-learn", "scikitlearn.svg"),
};

const tags = (...items) => items.map((t, i) => ({ id: i + 1, ...t }));

// Skills section. Items without a logo render as plain text chips.
export const skillGroups = [
  {
    title: "Languages",
    skills: [L.python, L.javascript, L.typescript, L.sql, L.bash],
  },
  {
    title: "Frontend",
    skills: [L.react, L.vite, L.tailwind, L.html, L.css, L.threejs],
  },
  {
    title: "Backend & Databases",
    skills: [
      L.node, L.express, L.fastapi, { name: "REST APIs" }, L.prisma,
      L.mongodb, L.postgres, L.mysql, L.sqlite, L.docker,
    ],
  },
  {
    title: "AI / ML & Data",
    skills: [
      L.gemini, { name: "RAG" }, { name: "Vector Search / Embeddings" },
      L.pandas, L.sklearn,
    ],
  },
  {
    title: "Tools & Concepts",
    skills: [
      L.git, L.github, L.vscode, { name: "MySQL Workbench" },
      { name: "OOP" }, { name: "Data Structures" },
    ],
  },
];

// Icons that orbit in the About section (file names in /assets/logos).
export const orbitOuter = [
  "python", "javascript", "typescript", "react", "nodejs", "express",
  "mongodb", "postgresql", "mysql", "docker", "tailwindcss", "git",
];
export const orbitInner = [
  "googlegemini", "pandas", "scikitlearn", "fastapi", "prisma",
  "sqlite", "vitejs", "html5", "bash", "github",
];

export const myProjects = [
  {
    id: 1,
    title: "CampusConnect",
    description:
      "Team project · Events, clubs and units platform for Atria University with separate logins and dashboards for Students, Club Managers and Faculty/Admin.",
    subDescription: [
      "Role-based dashboards: students join clubs and register for events, club managers run their club and approve requests, faculty oversee users and sign-ups.",
      "Full-stack TypeScript: React + Vite frontend, Express API and a SQLite database served from a single Node process.",
      "Three.js hero on the landing page, built from a Figma design.",
      "Backed by 127 unit/API tests (Vitest) and 40 real-browser end-to-end scenarios.",
    ],
    href: "https://github.com/shrutikushwaha2110-ux/CAMPUS-CONNECT",
    image: "/assets/projects/campusconnect.png",
    tags: tags(L.typescript, L.react, L.node, L.sqlite, L.threejs),
  },
  {
    id: 2,
    title: "AgriLoop 2.0",
    description:
      "Team project · AI-powered circular-economy marketplace that turns agricultural waste into income by connecting farmers, households and industrial buyers.",
    subDescription: [
      "AI Waste Value Analyzer: farmers photograph crop residue and Google Gemini estimates residue type, moisture, purity and market price (₹).",
      "Digital biomass marketplace with listings, buyer bidding and order tracking from Open to Pending Pickup to Completed.",
      "Carbon-impact calculator showing the CO₂ saved by not burning stubble, plus an AI yield and revenue planner.",
      "Built with React, TypeScript, Tailwind, GSAP and Recharts dashboards.",
    ],
    href: "https://github.com/rahul200618/AGRILOOP",
    image: "/assets/projects/agriloop.png",
    tags: tags(L.typescript, L.react, L.gemini, L.tailwind),
  },
  {
    id: 3,
    title: "AttendanceHub",
    description:
      "Full-stack attendance management system for educational institutions, with admin and instructor portals.",
    subDescription: [
      "Admin portal with a real-time attendance dashboard, student/instructor management, courses, batches and reports.",
      "REST API built with Node.js, Express and Prisma ORM on SQLite, with request validation via express-validator.",
      "Secure authentication using JWT, bcrypt password hashing and role-based access control.",
      "React + Vite frontend with Radix UI components, forms and Recharts analytics.",
    ],
    href: "https://github.com/rajukumar-tech/Final-project-frontend",
    image: "/assets/projects/attendancehub.png",
    tags: tags(L.react, L.node, L.express, L.prisma, L.sqlite),
  },
  {
    id: 4,
    title: "Yaksha FAQ Portal",
    description:
      "Team project · Vicharanashala Lab, IIT Ropar. Full-stack FAQ portal with semantic vector search and AI-powered community moderation, designed for 1 million users.",
    subDescription: [
      "Zero-touch pipeline: Zoom meetings, webhooks and uploads feed the knowledge base automatically.",
      "Semantic search over FAQs using vector embeddings; a scheduler auto-answers high-confidence matches and escalates the rest to experts.",
      "TypeScript monorepo: React frontend, Express + MongoDB backend, OpenAI integration, Dockerised deployment.",
    ],
    href: "https://github.com/vicharanashala/crowd-source-faq",
    image: "/assets/projects/yaksha-faq.png",
    tags: tags(L.typescript, L.react, L.express, L.mongodb, L.docker),
  },
  {
    id: 5,
    title: "Aegis: AI Bias Detection",
    description:
      "Team project · Fairness-auditing and causal-discovery API that detects and explains bias in machine-learning models.",
    subDescription: [
      "FastAPI backend with REST endpoints for datasets, models and fairness audits, with auto-generated OpenAPI docs.",
      "Fairness metrics: Demographic Parity, Equalized Odds, Calibration and subgroup analysis on the Adult Income and COMPAS datasets.",
      "Model registry covering Logistic Regression, Random Forest, Decision Tree, Gradient Boosting and XGBoost.",
      "Causal discovery with the PC algorithm on NetworkX graphs to trace which features drive biased outcomes.",
    ],
    href: "https://github.com/MANOFHATERS/aegis",
    image: "/assets/projects/aegis.png",
    tags: tags(L.python, L.fastapi, L.sklearn, L.pandas),
  },
  {
    id: 6,
    title: "Battery Health Monitoring Dashboard",
    description:
      "Team hackathon project · Real-time dashboard that monitors battery voltage, temperature and charge cycles, with alerts for predictive maintenance.",
    subDescription: [
      "Live voltage and temperature trend charts (Chart.js) with LIVE indicators, play/pause and min/max statistics.",
      "Threshold-based anomaly alerts: voltage drops below 2.8 V, over-voltage above 4.3 V, and temperature warnings above 50 °C.",
      "Node.js + Express REST API storing readings in a MongoDB time-series collection, with per-minute trend aggregation.",
      "JWT authentication with bcrypt, request validation (Joi), Winston logging and a telemetry simulator for testing.",
    ],
    href: "https://github.com/shrutikushwaha2110-ux/Hackathon-Project-",
    image: "/assets/projects/battery-monitor.png",
    tags: tags(L.react, L.node, L.express, L.mongodb),
  },
];

export const mySocials = [
  { name: "GitHub", href: profile.github, icon: "/assets/socials/github.svg" },
  { name: "LinkedIn", href: profile.linkedin, icon: "/assets/socials/linkedIn.svg" },
  { name: "Email", href: `mailto:${profile.email}`, icon: "/assets/socials/mail.svg" },
].filter((s) => s.href);

export const experiences = [
  {
    title: "Summer Intern",
    job: "Vicharanashala Lab, IIT Ropar",
    date: "May – Jun 2025",
    contents: [
      "Worked in a project team on an existing production website, extending it with new features using JavaScript, Node.js and MongoDB.",
      "Helped design and integrate a Retrieval-Augmented Generation (RAG) feature, giving context-aware answers grounded in the lab's own content and data.",
      "Collaborated with the lab team to debug and deploy updates to a live codebase in an established engineering environment.",
      "Earned the lab's Level 5 Achievement and 3,600-Minute Club recognitions (all-time).",
    ],
  },
  {
    title: "B.Tech CSE Student",
    job: "Atria University, Bengaluru",
    date: "Expected 2028",
    contents: [
      "Computer Science Engineering with a Digital Transformation (AI/ML) specialisation, currently in 3rd year.",
      "Built a university attendance app (Python, MySQL) plus several full-stack and AI team projects.",
      "Looking for software engineering and data analytics internships.",
    ],
  },
];

export const achievements = [
  {
    icon: "🏆",
    title: "Hackathon: Round 2",
    org: "AIT inter-college hackathon",
    body: "Cleared the first round and advanced to the second round.",
  },
  {
    icon: "🏆",
    title: "Hackathon: Round 2",
    org: "BIT inter-college hackathon",
    body: "Cleared the first round and advanced to the second round.",
  },
  {
    icon: "🎓",
    title: "Research Internship",
    org: "IIT Ropar · Vicharanashala Lab",
    body: "2-month internship contributing to a live platform as part of a project team.",
  },
  {
    icon: "⭐",
    title: "Level 5 Achievement",
    org: "Vicharanashala Lab, IIT Ropar",
    body: "All-time Level 5 recognition from the lab.",
  },
  {
    icon: "⏱️",
    title: "3,600-Minute Club",
    org: "Vicharanashala Lab, IIT Ropar",
    body: "All-time member of the lab's 3,600-Minute Club.",
  },
  {
    icon: "📜",
    title: "Technology Job Simulation",
    org: "Deloitte × Forage · Jun 2026",
    body: "Completed practical coding and development tasks.",
  },
  {
    icon: "🚀",
    title: "6+ Real-World Projects",
    org: "Web apps · Dashboards · AI platforms",
    body: "Built end-to-end products, from AI marketplaces to real-time IoT dashboards.",
  },
];
