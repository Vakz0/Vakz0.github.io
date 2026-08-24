import type { Locale } from "./site";

export interface Dictionary {
  htmlLang: string;
  meta: { title: string; description: string };
  nav: { projects: string; skills: string; about: string; switchTo: string };
  hero: {
    eyebrow: string;
    headlineTop: string;
    headlineBottom: string;
    subtext: string;
    primaryCta: string;
    secondaryCta: string;
    portraitAlt: string;
  };
  projects: {
    heading: string;
    intro: string;
    count: string;
    statusInProgress: string;
    statusPublished: string;
    readMore: string;
    backToList: string;
    listTitle: string;
    listIntro: string;
  };
  detail: {
    question: string;
    data: string;
    method: string;
    findings: string;
    findingsPending: string;
    limits: string;
    tools: string;
    sources: string;
    repo: string;
  };
  skills: {
    heading: string;
    intro: string;
    groups: { title: string; body: string }[];
  };
  about: { heading: string; paragraphs: string[] };
  contact: { heading: string; body: string; email: string };
  footer: { note: string };
}

const fr: Dictionary = {
  htmlLang: "fr",
  meta: {
    title: "Bastien Guillemin, analyse de données",
    description:
      "Élève ingénieur à l'INSA Lyon. Analyses de bout en bout sur des données publiques françaises : immobilier, énergie, qualité de l'air.",
  },
  nav: {
    projects: "projets",
    skills: "compétences",
    about: "parcours",
    switchTo: "Passer en anglais",
  },
  hero: {
    eyebrow: "INSA Lyon · Élève ingénieur",
    headlineTop: "Des données publiques,",
    headlineBottom: "rendues lisibles.",
    subtext:
      "Je construis des analyses de bout en bout sur des données publiques françaises : immobilier, énergie, qualité de l'air.",
    primaryCta: "Voir les projets",
    secondaryCta: "Me contacter",
    portraitAlt: "Infrastructure technique photographiée de nuit",
  },
  projects: {
    heading: "Trois analyses en construction",
    intro:
      "Chaque projet part d'une question concrète et de données ouvertes réelles, pas d'un jeu de données prémâché.",
    count: "3 projets · sources ouvertes",
    statusInProgress: "En cours",
    statusPublished: "Publié",
    readMore: "Lire la fiche",
    backToList: "Retour aux projets",
    listTitle: "Projets",
    listIntro:
      "Les analyses que je mène en ce moment, avec leur méthode et leurs limites annoncées avant les résultats.",
  },
  detail: {
    question: "La question",
    data: "Les données",
    method: "La méthode",
    findings: "Les résultats",
    findingsPending:
      "L'analyse est en cours. Les résultats seront publiés ici quand ils seront solides, pas avant.",
    limits: "Les limites",
    tools: "Outils",
    sources: "Sources",
    repo: "Code source",
  },
  skills: {
    heading: "Ce que je sais faire",
    intro:
      "Regroupé par usage plutôt que par logo, parce que c'est comme ça qu'un recruteur lit un profil.",
    groups: [
      {
        title: "Explorer",
        body: "Python, pandas, SQL. Nettoyage de données réelles, jointures multi-sources, contrôles de cohérence.",
      },
      {
        title: "Modéliser",
        body: "scikit-learn, régression, séries temporelles. Choix de métrique justifié, pas un score de compétition.",
      },
      {
        title: "Restituer",
        body: "matplotlib, Power BI, Excel avancé. Une recommandation actionnable, pas une galerie de graphiques.",
      },
      {
        title: "Documenter",
        body: "Git, README structurés, notebooks commentés. Un collègue doit pouvoir reprendre le travail.",
      },
    ],
  },
  about: {
    heading: "Où j'en suis",
    paragraphs: [
      "Élève ingénieur à l'INSA Lyon depuis 2025, en premier cycle FIMI. Je m'oriente vers l'analyse de données et l'apprentissage automatique.",
      "Ce site n'est pas une vitrine finie. Il documente les analyses que je mène en ce moment, méthode et limites comprises, plutôt que d'aligner des projets terminés que je n'ai pas encore.",
      "J'écris chaque fiche pour qu'elle se lise en trente secondes : la question d'abord, les données ensuite, et ce que l'analyse ne peut pas prouver à la fin.",
    ],
  },
  contact: {
    heading: "Parlons données.",
    body: "Ouvert aux stages, aux échanges et aux retours critiques sur mes analyses.",
    email: "Email",
  },
  footer: {
    note: "Site statique, construit avec Next.js et hébergé sur GitHub Pages.",
  },
};

const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "Bastien Guillemin, data analysis",
    description:
      "Engineering student at INSA Lyon. End to end analyses on French open data: housing, energy, air quality.",
  },
  nav: {
    projects: "projects",
    skills: "skills",
    about: "background",
    switchTo: "Switch to French",
  },
  hero: {
    eyebrow: "INSA Lyon · Engineering student",
    headlineTop: "Public data,",
    headlineBottom: "made readable.",
    subtext:
      "I build end to end analyses on French open data: housing, energy and air quality.",
    primaryCta: "See the projects",
    secondaryCta: "Get in touch",
    portraitAlt: "Technical infrastructure photographed at night",
  },
  projects: {
    heading: "Three analyses in progress",
    intro:
      "Every project starts from a concrete question and real open data, not from a pre-cleaned dataset.",
    count: "3 projects · open sources",
    statusInProgress: "In progress",
    statusPublished: "Published",
    readMore: "Read the write-up",
    backToList: "Back to projects",
    listTitle: "Projects",
    listIntro:
      "The analyses I am running right now, with their method and their limits stated before any result.",
  },
  detail: {
    question: "The question",
    data: "The data",
    method: "The method",
    findings: "The findings",
    findingsPending:
      "The analysis is still running. Results will be published here once they hold up, and not before.",
    limits: "The limits",
    tools: "Tools",
    sources: "Sources",
    repo: "Source code",
  },
  skills: {
    heading: "What I can do",
    intro:
      "Grouped by what it is for rather than by logo, because that is how a hiring manager reads a profile.",
    groups: [
      {
        title: "Explore",
        body: "Python, pandas, SQL. Cleaning real data, joining several sources, running consistency checks.",
      },
      {
        title: "Model",
        body: "scikit-learn, regression, time series. A metric chosen for a reason, not a leaderboard score.",
      },
      {
        title: "Communicate",
        body: "matplotlib, Power BI, advanced Excel. One actionable recommendation, not a gallery of charts.",
      },
      {
        title: "Document",
        body: "Git, structured READMEs, commented notebooks. A colleague should be able to pick the work up.",
      },
    ],
  },
  about: {
    heading: "Where I am",
    paragraphs: [
      "Engineering student at INSA Lyon since 2025, currently in the FIMI first cycle. I am heading towards data analysis and machine learning.",
      "This site is not a finished showcase. It documents the analyses I am running right now, method and limits included, rather than lining up completed projects I do not have yet.",
      "Each write-up is built to be read in thirty seconds: the question first, the data next, and what the analysis cannot prove at the end.",
    ],
  },
  contact: {
    heading: "Let's talk data.",
    body: "Open to internships, conversations and critical feedback on my analyses.",
    email: "Email",
  },
  footer: {
    note: "Static site, built with Next.js and hosted on GitHub Pages.",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
