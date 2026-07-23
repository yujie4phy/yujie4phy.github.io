export type ProfileLink = {
  label: string;
  shortLabel: string;
  href: string;
};

export type PublicationLink = {
  label: string;
  href: string;
};

export type Publication = {
  year: number;
  venue: string;
  title: string;
  authors: string;
  citation: string;
  abstract: string;
  selected?: boolean;
  links: PublicationLink[];
};

export type CareerEntry = {
  title: string;
  institution: string;
  location: string;
  dates: string;
  detail: string;
};

export type Talk = {
  date: string;
  title: string;
  event: string;
  location: string;
  links: PublicationLink[];
};

// Replace the placeholder values in this file with your information.
// Every page reads from this single source.
export const profile = {
  givenName: "Your",
  familyName: "Name",
  role: "Postdoctoral Researcher in Quantum Information",
  institution: "Your Institution",
  department: "Your Research Group / Department",
  location: "City, Country",
  email: "your.email@institution.edu",
  lastUpdated: "July 2026",
  cvFile: "",
  links: [
    { label: "Email", shortLabel: "@", href: "" },
    { label: "ORCID", shortLabel: "iD", href: "" },
    { label: "Google Scholar", shortLabel: "GS", href: "" },
    { label: "GitHub", shortLabel: "GH", href: "" },
    { label: "Institution", shortLabel: "IN", href: "" },
    { label: "arXiv", shortLabel: "aX", href: "" },
  ] satisfies ProfileLink[],
  interests: [
    {
      title: "Quantum information theory",
      description:
        "Add the core conceptual questions, resources, and operational settings that define your research.",
    },
    {
      title: "Quantum computation",
      description:
        "Describe the algorithmic, complexity-theoretic, or architectural problems you investigate.",
    },
    {
      title: "Mathematical methods",
      description:
        "Highlight the analytical, numerical, or optimization tools that connect your projects.",
    },
  ],
};

export const publications: Publication[] = [
  {
    year: 2026,
    venue: "arXiv preprint",
    title: "Replace with the title of your newest preprint",
    authors: "Your Name, Collaborator A, Collaborator B",
    citation: "arXiv preprint (2026)",
    abstract:
      "Add a concise abstract or plain-language summary. Visitors can expand this text without leaving the page, following the interaction used on Marco Quintino’s website.",
    selected: true,
    links: [
      { label: "arXiv", href: "" },
      { label: "PDF", href: "" },
    ],
  },
  {
    year: 2025,
    venue: "Quantum",
    title: "Replace with a selected publication title",
    authors: "Collaborator A, Your Name, Collaborator B",
    citation: "Quantum 9, article number (2025)",
    abstract:
      "Use this space for the paper abstract. Each publication can include links to arXiv, a local PDF, the journal page, code, slides, or a recorded talk.",
    selected: true,
    links: [
      { label: "arXiv", href: "" },
      { label: "PDF", href: "" },
      { label: "Journal", href: "" },
      { label: "Code", href: "" },
    ],
  },
  {
    year: 2025,
    venue: "Phys. Rev. A",
    title: "Replace with another representative research paper",
    authors: "Your Name, Collaborator A",
    citation: "Phys. Rev. A 00, 000000 (2025)",
    abstract:
      "Add the original abstract or a shorter description of the result and why it matters.",
    selected: true,
    links: [
      { label: "arXiv", href: "" },
      { label: "Journal", href: "" },
    ],
  },
  {
    year: 2024,
    venue: "QIP",
    title: "Replace with an earlier conference or journal paper",
    authors: "Collaborator A, Collaborator B, Your Name",
    citation: "QIP (2024)",
    abstract:
      "Publication entries are automatically grouped by year on the full publications page.",
    links: [
      { label: "arXiv", href: "" },
      { label: "Slides", href: "" },
      { label: "Video", href: "" },
    ],
  },
];

export const employment: CareerEntry[] = [
  {
    title: "Postdoctoral Researcher",
    institution: "Your Institution",
    location: "City, Country",
    dates: "20XX – present",
    detail: "Hosted by Professor / Research Group. Add fellowship or project information here.",
  },
  {
    title: "Previous Research Position",
    institution: "Previous Institution",
    location: "City, Country",
    dates: "20XX – 20XX",
    detail: "Add the research group, supervisor, project, or funding source.",
  },
];

export const education: CareerEntry[] = [
  {
    title: "PhD in Physics / Computer Science / Mathematics",
    institution: "Your University",
    location: "City, Country",
    dates: "20XX – 20XX",
    detail: "Thesis: Your thesis title. Supervisor: Professor Name.",
  },
  {
    title: "MSc degree",
    institution: "Your University",
    location: "City, Country",
    dates: "20XX – 20XX",
    detail: "Add thesis, supervisor, distinctions, or funding.",
  },
  {
    title: "BSc degree",
    institution: "Your University",
    location: "City, Country",
    dates: "20XX – 20XX",
    detail: "Add specialization or relevant academic information.",
  },
];

export const talks: Talk[] = [
  {
    date: "2026",
    title: "Replace with your most recent invited or conference talk",
    event: "Conference or Seminar Name",
    location: "City, Country",
    links: [
      { label: "Slides", href: "" },
      { label: "Video", href: "" },
    ],
  },
  {
    date: "2025",
    title: "Replace with another research presentation",
    event: "Research Institute Seminar",
    location: "City, Country / online",
    links: [{ label: "Slides", href: "" }],
  },
  {
    date: "2024",
    title: "Replace with a contributed conference talk",
    event: "Quantum Information Conference",
    location: "City, Country",
    links: [{ label: "Slides", href: "" }],
  },
];
