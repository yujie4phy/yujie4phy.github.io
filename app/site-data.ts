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

export type Award = {
  year: string;
  title: string;
  description: string;
  href?: string;
};

export type Mentorship = {
  dates: string;
  name: string;
  level: string;
  institution: string;
  project: string;
};

export type Outreach = {
  year: string;
  title: string;
  description: string;
  href: string;
};

export type Talk = {
  date: string;
  title: string;
  event: string;
  location: string;
  links: PublicationLink[];
};

export const profile = {
  givenName: "Yujie",
  familyName: "Zhang",
  role: "Postdoctoral Fellow in Quantum Information",
  institution: "Institute for Quantum Computing",
  department: "University of Waterloo · Perimeter Institute",
  location: "Waterloo, Canada",
  email: "yujie.zhang1@uwaterloo.ca",
  lastUpdated: "July 2026",
  cvFile: "/Yujie-Zhang-CV.pdf",
  links: [
    { label: "Email", shortLabel: "@", href: "mailto:yujie.zhang1@uwaterloo.ca" },
    {
      label: "ORCID",
      shortLabel: "iD",
      href: "https://orcid.org/0000-0002-7858-7476",
    },
    {
      label: "Google Scholar",
      shortLabel: "GS",
      href: "https://scholar.google.com/citations?user=nbA1QlUAAAAJ&hl=en",
    },
    { label: "GitHub", shortLabel: "GH", href: "https://github.com/yujie4phy" },
    {
      label: "IQC profile",
      shortLabel: "IQC",
      href: "https://uwaterloo.ca/institute-for-quantum-computing/contacts/yujie-zhang",
    },
    { label: "arXiv", shortLabel: "aX", href: "https://arxiv.org/a/zhang_y_54.html" },
  ] satisfies ProfileLink[],
  interests: [
    {
      title: "Quantum foundations",
      description:
        "Generalized contextuality, entanglement, steering, and nonlocality—especially operational ways to define and certify nonclassical quantum processes.",
    },
    {
      title: "Quantum information & networks",
      description:
        "Higher-dimensional frequency-bin systems, quantum communication, and experimentally accessible protocols for distributed quantum networks.",
    },
    {
      title: "Quantum metrology & optics",
      description:
        "Quantum-enhanced long-baseline imaging, astronomical interferometry, optical sensing, and photonic-state engineering.",
    },
  ],
};

export const publications: Publication[] = [
  {
    year: 2026,
    venue: "arXiv",
    title: "Quantum-Limited Subdiffraction Telescopy Requires Genuine Multi-Telescope Interference",
    authors: "Yujie Zhang, Yunkai Wang, Wilson Wu, Thomas Jennewein",
    citation: "arXiv:2606.27276 (2026)",
    abstract:
      "This work studies the quantum limits of subdiffraction imaging with telescope arrays and identifies genuine multi-telescope interference as an essential resource for reaching the optimal precision.",
    selected: true,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2606.27276" },
      { label: "PDF", href: "https://arxiv.org/pdf/2606.27276" },
    ],
  },
  {
    year: 2026,
    venue: "PRX",
    title: "A New Paradigm for Entanglement Certification Using Noncontextuality Inequalities",
    authors:
      "Yujie Zhang, Jonah Spodek, David Schmid, Carter Reid, Liam J. Morrison, Thomas Jennewein, Kevin J. Resch, Robert W. Spekkens",
    citation: "Physical Review X (2026)",
    abstract:
      "By combining Bell locality with generalized noncontextuality, this work develops a hierarchy of experimentally practical inequalities that witness entanglement, steering, and nonlocality without prior measurement characterization.",
    selected: true,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2507.01122" },
      { label: "PDF", href: "https://arxiv.org/pdf/2507.01122" },
      { label: "Journal", href: "https://doi.org/10.1103/dxpr-wp6l" },
    ],
  },
  {
    year: 2026,
    venue: "PRX",
    title: "Reassessing the Boundary Between Classical and Nonclassical for Individual Quantum Processes",
    authors: "Yujie Zhang, David Schmid, Yìlè Yīng, Robert W. Spekkens",
    citation: "Physical Review X 16, 021050 (2026)",
    abstract:
      "This work uses generalized noncontextuality to define a unified classical–nonclassical boundary for individual quantum processes, including states, measurements, channels, and assemblages.",
    selected: true,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2503.05884" },
      { label: "PDF", href: "https://arxiv.org/pdf/2503.05884" },
      {
        label: "Journal",
        href: "https://journals.aps.org/prx/accepted/10.1103/vqfz-wzjg",
      },
    ],
  },
  {
    year: 2026,
    venue: "npj QI",
    title: "Time-Resolved Certification of Frequency-Bin Entanglement Over Multi-Mode Channels",
    authors:
      "Stéphane Vinet, Marco Clementi, Marcello Bacchi, Yujie Zhang, Massimo Giacomin, Luke Neal, Paolo Villoresi, Matteo Galli, Daniele Bajoni, Thomas Jennewein",
    citation: "npj Quantum Information 12, 38 (2026)",
    abstract:
      "A time-resolved method is developed to certify frequency-bin entanglement transmitted through spatially multimode channels, supporting high-dimensional quantum communication over practical links.",
    selected: true,
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2508.10200" },
      { label: "PDF", href: "https://arxiv.org/pdf/2508.10200" },
      {
        label: "Journal",
        href: "https://www.nature.com/articles/s41534-026-01183-5",
      },
    ],
  },
  {
    year: 2025,
    venue: "arXiv",
    title: "Probing the Critical Point (CritPt) of AI Reasoning: A Frontier Physics Research Benchmark",
    authors: "CritPt group (including Yujie Zhang)",
    citation: "arXiv:2509.26574 (2025)",
    abstract:
      "CritPt is a research benchmark designed to evaluate advanced AI reasoning on frontier-level problems drawn from physics.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2509.26574" },
      { label: "PDF", href: "https://arxiv.org/pdf/2509.26574" },
    ],
  },
  {
    year: 2025,
    venue: "Quantum",
    title: "Quantifiers and Witnesses for the Nonclassicality of Measurements and of States",
    authors: "Yujie Zhang, Yìlè Yīng, David Schmid",
    citation: "arXiv:2504.02944 (2025); accepted in Quantum",
    abstract:
      "This work develops quantitative measures and experimentally accessible witnesses for the operational nonclassicality of measurements and states.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2504.02944" },
      { label: "PDF", href: "https://arxiv.org/pdf/2504.02944" },
    ],
  },
  {
    year: 2025,
    venue: "PR Research",
    title: "Criteria for Optimal Entanglement-Assisted Long Baseline Telescopy",
    authors: "Yujie Zhang, Thomas Jennewein",
    citation: "Physical Review Research 7, 043278 (2025)",
    abstract:
      "This work establishes criteria for optimal entanglement-assisted imaging across long baselines and compares shared entanglement and linear-optical teleportation resources for astronomical sensing.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2501.16670" },
      { label: "PDF", href: "https://arxiv.org/pdf/2501.16670" },
      {
        label: "Journal",
        href: "https://doi.org/10.1103/PhysRevResearch.7.043278",
      },
    ],
  },
  {
    year: 2025,
    venue: "Quantum",
    title: "Cost of Simulating Entanglement in Steering Scenarios",
    authors: "Yujie Zhang, Jiaxuan Zhang, Eric Chitambar",
    citation: "Quantum 9, 1902 (2025)",
    abstract:
      "The shared-randomness cost of simulating unsteerable entangled states is quantified, revealing unbounded costs in some cases and a strict separation between separable and entangled two-qubit states.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2302.09060" },
      { label: "PDF", href: "https://arxiv.org/pdf/2302.09060" },
      {
        label: "Journal",
        href: "https://quantum-journal.org/papers/q-2025-10-31-1902/",
      },
      {
        label: "Code",
        href: "https://github.com/yujie4phy/Compatible-radius-calculation",
      },
    ],
  },
  {
    year: 2025,
    venue: "Opt. Express",
    title: "Feasibility Study of Frequency-Encoded Photonic Qubits Over a Free-Space Channel",
    authors: "Stéphane Vinet, Wilson Wu, Yujie Zhang, Thomas Jennewein",
    citation: "Optics Express 33, 40437–40449 (2025)",
    abstract:
      "A field-widened interferometric approach decodes frequency-bin qubits over fluctuating free-space channels without adaptive optics or spatial-mode filtering.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2412.06104" },
      { label: "PDF", href: "https://arxiv.org/pdf/2412.06104" },
      {
        label: "Journal",
        href: "https://opg.optica.org/oe/viewmedia.cfm?uri=oe-33-19-40437&html=true",
      },
    ],
  },
  {
    year: 2025,
    venue: "PRL",
    title: "Temporally Localized Quantum Operations on Continuous-Wave Thermal Light",
    authors: "Yunkai Wang, Yujie Zhang, Virginia O. Lorenz",
    citation: "Physical Review Letters 135, 113602 (2025)",
    abstract:
      "This work analyzes how continuous-wave thermal light can be decomposed into localized temporal modes and processed for quantum sensing and astronomical applications.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2412.17223" },
      { label: "PDF", href: "https://arxiv.org/pdf/2412.17223" },
      {
        label: "Journal",
        href: "https://journals.aps.org/prl/abstract/10.1103/y4v8-1wgm",
      },
    ],
  },
  {
    year: 2025,
    venue: "PR Research",
    title: "Astronomical Interferometry Using Continuous-Variable Quantum Teleportation",
    authors: "Yunkai Wang, Yujie Zhang, Virginia O. Lorenz",
    citation: "Physical Review Research 7, 023154 (2025)",
    abstract:
      "A continuous-variable teleportation architecture is proposed for astronomical interferometry and evaluated across different source-intensity regimes.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2308.12851" },
      { label: "PDF", href: "https://arxiv.org/pdf/2308.12851" },
      {
        label: "Journal",
        href: "https://doi.org/10.1103/PhysRevResearch.7.023154",
      },
    ],
  },
  {
    year: 2025,
    venue: "APL",
    title: "Public Quantum Network: The First Node",
    authors:
      "K. Kapoor, S. Hoseini, J. Choi, B. E. Nussbaum, Y. Zhang, K. Shetty, C. Skaar, M. Ward, L. Wilson, K. Shinbrough, E. Edwards, R. Wiltfong, C. P. Lualdi, Offir Cohen, P. G. Kwiat, V. O. Lorenz",
    citation: "Applied Physics Letters 126, 054002 (2025)",
    abstract:
      "This paper reports the first node of a publicly accessible metropolitan fiber quantum network linking the University of Illinois with the Urbana Free Library.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2410.06398" },
      { label: "PDF", href: "https://arxiv.org/pdf/2410.06398" },
      { label: "Project", href: "https://iquist.illinois.edu/pqn" },
    ],
  },
  {
    year: 2024,
    venue: "PRL",
    title: "Exact Steering Bound for Two-Qubit Werner States",
    authors: "Yujie Zhang, Eric Chitambar",
    citation: "Physical Review Letters 132, 250201 (2024)",
    abstract:
      "The exact quantum-steering threshold for two-qubit Werner states under general measurements is derived, resolving a longstanding open problem.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2309.09960" },
      { label: "PDF", href: "https://arxiv.org/pdf/2309.09960" },
      {
        label: "Journal",
        href: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.250201",
      },
    ],
  },
  {
    year: 2024,
    venue: "PRA",
    title: "Information Carried by a Single Particle in Quantum Multiple-Access Channels",
    authors: "Xinan Chen*, Yujie Zhang*, Andreas Winter, Virginia O. Lorenz, Eric Chitambar",
    citation: "Physical Review A 109, 062420 (2024)",
    abstract:
      "The communication rates of multiple-access channels built from a single particle are characterized, showing how multilevel coherence enables quantum advantages.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2301.02513" },
      { label: "PDF", href: "https://arxiv.org/pdf/2301.02513" },
      {
        label: "Journal",
        href: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.109.062420",
      },
    ],
  },
  {
    year: 2023,
    venue: "JOSA B",
    title: "Fiber-Based Photon-Pair Generation: Tutorial",
    authors:
      "Karina Garay-Palmett, Dong Beom Kim, Yujie Zhang, Francisco A. Domínguez-Serna, Virginia O. Lorenz, Alfred B. U’Ren",
    citation: "Journal of the Optical Society of America B 40, 469–490 (2023)",
    abstract:
      "A tutorial review of spontaneous four-wave mixing in optical fibers, covering photon-pair factorability, tunability, bandwidth control, entanglement, and characterization.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2212.13652" },
      { label: "PDF", href: "https://arxiv.org/pdf/2212.13652" },
      { label: "Journal", href: "https://doi.org/10.1364/JOSAB.478008" },
    ],
  },
  {
    year: 2023,
    venue: "Frontiers",
    title: "Toward Quantum-Enhanced Interferometric Telescopy",
    authors: "David O. Diaz, Yujie Zhang, Yunkai Wang, Virginia O. Lorenz, Paul G. Kwiat",
    citation: "Frontiers in Optics (2023)",
    abstract:
      "This conference contribution explores entanglement-assisted interferometric imaging and its potential for improving astronomical observation.",
    links: [
      {
        label: "Abstract",
        href: "https://meetings.aps.org/Meeting/MAR23/Session/T72.1",
      },
    ],
  },
  {
    year: 2022,
    venue: "Quantum",
    title: "Building Multiple Access Channels With a Single Particle",
    authors: "Yujie Zhang, Xinan Chen, Eric Chitambar",
    citation: "Quantum 6, 653 (2022)",
    abstract:
      "Single-particle interferometers are used to construct quantum multiple-access channels and communication games that witness advantages from genuine multilevel coherence.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2006.12475" },
      { label: "PDF", href: "https://arxiv.org/pdf/2006.12475" },
      {
        label: "Journal",
        href: "https://quantum-journal.org/papers/q-2022-02-16-653/",
      },
    ],
  },
  {
    year: 2021,
    venue: "PRA",
    title: "Superresolution in Interferometric Imaging of Strong Thermal Sources",
    authors: "Yunkai Wang, Yujie Zhang, Virginia O. Lorenz",
    citation: "Physical Review A 104, 022613 (2021)",
    abstract:
      "An interferometric imaging protocol is analyzed for resolving closely spaced, strong thermal sources beyond conventional direct-imaging limits.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2012.14026" },
      { label: "PDF", href: "https://arxiv.org/pdf/2012.14026" },
      {
        label: "Journal",
        href: "https://journals.aps.org/pra/abstract/10.1103/PhysRevA.104.022613",
      },
    ],
  },
  {
    year: 2020,
    venue: "NJP",
    title: "Channel Activation of CHSH Nonlocality",
    authors: "Yujie Zhang*, Rodrigo Araiza Bravo*, Virginia O. Lorenz, Eric Chitambar",
    citation: "New Journal of Physics 22, 043003 (2020)",
    abstract:
      "Two noisy channels that individually destroy CHSH nonlocality are shown to activate nonlocal state distribution when used in parallel.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/1911.06349" },
      { label: "PDF", href: "https://arxiv.org/pdf/1911.06349" },
      {
        label: "Journal",
        href: "https://iopscience.iop.org/article/10.1088/1367-2630/ab7bef/meta",
      },
    ],
  },
  {
    year: 2019,
    venue: "Opt. Express",
    title:
      "Dual-Pump Approach to Photon-Pair Generation: Demonstration of Enhanced Characterization and Engineering Capabilities",
    authors:
      "Yujie Zhang, Ryan Spiniolas, Kai Shinbrough, Bin Fang, Offir Cohen, Virginia O. Lorenz",
    citation: "Optics Express 27, 19050–19061 (2019)",
    abstract:
      "A dual-pump spontaneous four-wave-mixing source is demonstrated with improved control and characterization of photon-pair spectral correlations.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/1904.05278" },
      { label: "PDF", href: "https://arxiv.org/pdf/1904.05278" },
      { label: "Journal", href: "https://pubmed.ncbi.nlm.nih.gov/31252837/" },
    ],
  },
  {
    year: 2018,
    venue: "J. Phys. A",
    title: "Adaptive Tomography of Qubits: Purity Versus Statistical Fluctuations",
    authors: "Aonan Zhang, Yujie Zhang, Feixiang Xu, Long Li, Lijian Zhang",
    citation: "Journal of Physics A 51, 395304 (2018)",
    abstract:
      "Adaptive qubit-state tomography is analyzed across pure, mixed, and nearly pure states, clarifying how purity and statistical fluctuations determine estimation accuracy.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/1805.04808" },
      { label: "PDF", href: "https://arxiv.org/pdf/1805.04808" },
      {
        label: "Journal",
        href: "https://iopscience.iop.org/article/10.1088/1751-8121/aadad3/meta",
      },
    ],
  },
];

export const employment: CareerEntry[] = [
  {
    title: "Postdoctoral Fellow",
    institution: "Institute for Quantum Computing, University of Waterloo / Perimeter Institute",
    location: "Waterloo, Canada",
    dates: "Dec 2023 – present",
    detail:
      "Research in generalized contextuality, entanglement certification, higher-dimensional frequency-bin systems, and distributed quantum metrology.",
  },
];

export const education: CareerEntry[] = [
  {
    title: "PhD in Physics",
    institution: "University of Illinois at Urbana–Champaign",
    location: "Urbana, USA",
    dates: "2017 – 2023",
    detail: "Department of Physics.",
  },
  {
    title: "BSc in Physics",
    institution: "Nanjing University",
    location: "Nanjing, China",
    dates: "2013 – 2017",
    detail: "Kuang Yaming Honor School.",
  },
];

export const awards: Award[] = [
  {
    year: "2023",
    title: "Boeing Quantum Creators Prize",
    description:
      "Recognizes early-career researchers whose work moves quantum information science and engineering in new directions.",
    href: "https://chicagoquantum.org/education-and-training/2023-boeing-quantum-creators-prize-winners",
  },
  {
    year: "2019",
    title: "University Fellowship",
    description: "Awarded for outstanding research accomplishments.",
  },
];

export const mentorship: Mentorship[] = [
  {
    dates: "2024 – present",
    name: "Jonah Spodek",
    level: "Graduate student",
    institution: "University of Waterloo, IQC",
    project: "Experimental tests of entanglement with operational contextuality",
  },
  {
    dates: "2024 – present",
    name: "Yìlè Yīng",
    level: "Graduate student",
    institution: "Perimeter Institute",
    project: "Nonclassicality of general quantum processes",
  },
  {
    dates: "2023 – present",
    name: "Stéphane Vinet",
    level: "Graduate student",
    institution: "University of Waterloo, IQC",
    project: "Frequency-bin encoded quantum systems over free-space channels",
  },
  {
    dates: "2022 – 2023",
    name: "Soroush Hoseini",
    level: "Undergraduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Long-distance entanglement distribution with a classical shared reference frame",
  },
  {
    dates: "2022 – 2023",
    name: "Keshav Kapoor",
    level: "Graduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Public quantum network: the first nodes",
  },
  {
    dates: "2021 – 2022",
    name: "Jiaxin Zhang",
    level: "Undergraduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Simulation complexity of entanglement and compatible measurements",
  },
  {
    dates: "2019 – 2022",
    name: "Xinan Chen",
    level: "Graduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Multiple-access communication with a single particle",
  },
  {
    dates: "2017 – 2019",
    name: "Rodrigo Araiza Bravo",
    level: "Undergraduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Activation of quantum nonlocality and multipartite entanglement",
  },
  {
    dates: "2017 – 2018",
    name: "Ryan Spiniolas",
    level: "Undergraduate student",
    institution: "University of Illinois Urbana–Champaign",
    project: "Photonic engineering of in-fiber single-photon sources",
  },
];

export const outreach: Outreach[] = [
  {
    year: "2023",
    title: "Public Quantum Network at Urbana Free Library",
    description:
      "Led the creation of a public-facing quantum-network node distributing entangled photons from UIUC to a local library and connecting research with education.",
    href: "https://iquist.illinois.edu/pqn",
  },
  {
    year: "2023",
    title: "IQUIST at Ant-Man and the Wasp: Quantumania",
    description:
      "Led a public post-screening discussion about quantum science, coordinated by the Illinois Quantum Information Science and Technology Center.",
    href: "https://calendars.illinois.edu/detail/6415?eventId=33454672",
  },
];

export const talks: Talk[] = [
  {
    date: "2026",
    title: "A Paradigm for Entanglement Certification Using Noncontextuality Inequalities",
    event: "Foxconn",
    location: "—",
    links: [],
  },
  {
    date: "2025",
    title: "Criteria for Optimal Entanglement-Enhanced Long Baseline Imaging Protocols",
    event: "AQIS",
    location: "—",
    links: [],
  },
  {
    date: "2025",
    title: "Defining Nonclassicality for Individual Quantum Processes",
    event: "QPL",
    location: "—",
    links: [],
  },
  {
    date: "2024",
    title: "Exact Steering Bound for Two-Qubit Werner States",
    event: "QIP",
    location: "—",
    links: [],
  },
  {
    date: "2023",
    title: "Quantum-Enhanced Interferometric Imaging",
    event: "Quantum 2.0",
    location: "—",
    links: [],
  },
  {
    date: "2022",
    title: "Information Carried by a Single Particle in Multiple-Access Channels",
    event: "TQC",
    location: "—",
    links: [],
  },
  {
    date: "2021",
    title: "Building Multiple-Access Channels With One Particle",
    event: "Beyond IID",
    location: "—",
    links: [],
  },
  {
    date: "2020",
    title: "Dual-Pump Design Enables Novel Photon-Pair Characterization and Engineering",
    event: "CLEO",
    location: "—",
    links: [],
  },
  {
    date: "2019",
    title: "Tailored Photon-Pair Generation in Optical Fiber Through Dual-Pump Spontaneous Four-Wave Mixing",
    event: "FIO-LS",
    location: "—",
    links: [],
  },
];
