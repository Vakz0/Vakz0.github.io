import type { Locale } from "./site";

/**
 * Le modèle impose la narration attendue sur un projet data : on ne peut pas
 * publier une fiche sans avoir écrit la question, les données, la méthode et
 * les limites. `findings` reste vide tant que l'analyse n'a pas abouti, ce qui
 * force le statut "en cours" plutôt qu'un résultat inventé.
 */
export type ProjectStatus = "in-progress" | "published";

export interface ProjectCopy {
  title: string;
  /** Résumé d'une phrase affiché dans l'index. */
  summary: string;
  /** La question métier ou scientifique à laquelle le projet répond. */
  question: string;
  /** Origine des données, volume, et ce qui est sale dedans. */
  data: string;
  /** Traitement, choix de modélisation et arbitrages. */
  method: string;
  /** Résultats chiffrés. Vide tant que le projet est en cours. */
  findings: string[];
  /** Ce que l'analyse ne peut pas prouver. */
  limits: string;
}

export interface ProjectSource {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  status: ProjectStatus;
  /** Année de démarrage, affichée telle quelle. */
  year: string;
  tools: string[];
  sources: ProjectSource[];
  repo?: string;
  demo?: string;
  image: string;
  imageAlt: Record<Locale, string>;
  copy: Record<Locale, ProjectCopy>;
}

export const PROJECTS: Project[] = [
  {
    slug: "immobilier-lyon",
    status: "in-progress",
    year: "2026",
    tools: ["Python", "pandas", "DuckDB", "SQL"],
    sources: [
      {
        label: "DVF, DGFiP",
        url: "https://www.data.gouv.fr/datasets/demandes-de-valeurs-foncieres/",
      },
    ],
    image: "/images/projet-immobilier.webp",
    imageAlt: {
      fr: "Toits de Lyon à l'heure bleue, la colline de Fourvière en arrière-plan",
      en: "Lyon rooftops at blue hour, with the Fourvière hill behind",
    },
    copy: {
      fr: {
        title: "Prix de l'immobilier à Lyon",
        summary:
          "Mesurer la baisse réelle par quartier, à surface et type de bien comparables.",
        question:
          "Quels quartiers lyonnais ont réellement décroché depuis la remontée des taux, une fois la surface et le type de bien neutralisés ?",
        data: "Demandes de Valeurs Foncières, le fichier national des transactions publié par la DGFiP. Plusieurs millions de lignes par année, avec des mutations dupliquées, des surfaces manquantes et des dépendances comptées séparément du logement.",
        method:
          "Déduplication des mutations en SQL sur DuckDB, reconstruction du prix au mètre carré par bien, puis comparaison des quartiers à caractéristiques comparables plutôt qu'en moyenne brute.",
        findings: [],
        limits:
          "DVF ne contient ni l'état du bien ni l'étage, deux facteurs de prix majeurs. Les ventes en l'état futur d'achèvement sont absentes. Les conclusions porteront sur des tendances de quartier, jamais sur l'estimation d'un bien précis.",
      },
      en: {
        title: "Property prices in Lyon",
        summary:
          "Measuring the real drop per neighbourhood, at comparable size and property type.",
        question:
          "Which Lyon neighbourhoods actually declined after interest rates rose, once floor area and property type are held constant?",
        data: "Demandes de Valeurs Foncières, the French national record of property transactions published by the tax administration. Several million rows per year, with duplicated transactions, missing floor areas and outbuildings counted separately from the home itself.",
        method:
          "Deduplicating transactions in SQL on DuckDB, rebuilding a price per square metre for each property, then comparing neighbourhoods at comparable characteristics rather than on raw averages.",
        findings: [],
        limits:
          "The dataset records neither the condition of the property nor its floor level, two major price drivers. Off-plan sales are missing. Conclusions will describe neighbourhood trends, never the valuation of a specific property.",
      },
    },
  },
  {
    slug: "electricite-temperature",
    status: "in-progress",
    year: "2026",
    tools: ["Python", "pandas", "scikit-learn", "matplotlib"],
    sources: [
      { label: "RTE éCO2mix", url: "https://www.rte-france.com/eco2mix" },
      {
        label: "Météo-France",
        url: "https://meteo.data.gouv.fr/",
      },
    ],
    image: "/images/projet-electricite.webp",
    imageAlt: {
      fr: "Pylônes à haute tension traversant une plaine gelée en hiver",
      en: "High voltage pylons crossing a frozen plain in winter",
    },
    copy: {
      fr: {
        title: "Électricité et température",
        summary:
          "Chiffrer la sensibilité de la consommation française au froid, et son évolution.",
        question:
          "De combien la consommation électrique française augmente-t-elle par degré perdu en hiver, et cette sensibilité évolue-t-elle d'une année sur l'autre ?",
        data: "Consommation nationale au pas demi-horaire publiée par RTE via éCO2mix, croisée avec les relevés des stations Météo-France. Les deux séries n'ont ni le même pas de temps, ni le même découpage géographique.",
        method:
          "Ré-échantillonnage des deux séries au pas journalier, construction d'une température moyenne pondérée par la population régionale, puis régression de la consommation sur la température avec un seuil de chauffe estimé plutôt que fixé à l'avance.",
        findings: [],
        limits:
          "La sensibilité mesurée mélange le chauffage résidentiel et l'activité industrielle. Les périodes de sobriété énergétique et les jours fériés faussent la comparaison entre années si on ne les isole pas explicitement.",
      },
      en: {
        title: "Electricity and temperature",
        summary:
          "Quantifying how French power demand responds to cold, and whether that is changing.",
        question:
          "How much does French electricity consumption rise per degree lost in winter, and is that sensitivity changing from year to year?",
        data: "Half-hourly national consumption published by the grid operator RTE through éCO2mix, joined with weather station records from Météo-France. The two series share neither time resolution nor geographic breakdown.",
        method:
          "Resampling both series to a daily step, building a population-weighted average temperature by region, then regressing consumption on temperature with a heating threshold that is estimated rather than assumed.",
        findings: [],
        limits:
          "The measured sensitivity mixes residential heating with industrial activity. Energy saving periods and public holidays distort year-on-year comparison unless they are isolated explicitly.",
      },
    },
  },
  {
    slug: "qualite-air-aura",
    status: "published",
    year: "2026",
    tools: ["Python", "pandas", "scikit-learn", "matplotlib", "Open-Meteo"],
    sources: [
      {
        label: "Atmo Auvergne-Rhône-Alpes",
        url: "https://depot.atmo-aura.fr/mesures/horaires/",
      },
      {
        label: "Open-Meteo (ERA5)",
        url: "https://open-meteo.com/",
      },
    ],
    repo: "https://github.com/Vakz0/qualite-air-aura",
    image: "/images/projet-air.webp",
    imageAlt: {
      fr: "Nappe de pollution piégée au-dessus d'une vallée industrielle en hiver",
      en: "Layer of pollution trapped over an industrial valley in winter",
    },
    copy: {
      fr: {
        title: "Qualité de l'air en Auvergne-Rhône-Alpes",
        summary:
          "Séparer ce qui relève de la météo et ce qui relève de l'activité humaine.",
        question:
          "Les pics de particules fines dans la vallée du Rhône s'expliquent-ils davantage par les conditions météo que par l'activité humaine ?",
        data: "Mesures horaires PM2.5 de 19 stations vallée du Rhône (Atmo AURA, historique figé juil. 2022 → juil. 2023), croisées avec température, vent et humidité Open-Meteo ERA5 aux coordonnées des stations.",
        method:
          "Exploration Atmo, jointure horaire avec la météo, proxy d'inversion (froid + vent faible), puis régression Ridge comparant blocs calendrier (heure, week-end, fériés) et météo, avec effets par station.",
        findings: [
          "157 000 heures jointes : la météo seule explique plus de variance que le calendrier (R² holdout ~0,19 vs ~0,15).",
          "Proxy inversion (froid + vent < 2 m/s) : PM2.5 +62 % en moyenne vs les autres heures.",
          "Corrélations : température −0,30, vent −0,17 ; double bosse horaire en semaine compatible avec le trafic, mais effet secondaire face à la météo.",
        ],
        limits:
          "Corrélation ≠ causalité. Pas de trafic horaire : le calendrier reste un proxy grossier. ERA5 lisse les microclimats de vallée. Historique Atmo figé, pas un suivi temps réel. Modèle linéaire simple (R² ~0,20), pas une prévision opérationnelle.",
      },
      en: {
        title: "Air quality in Auvergne-Rhône-Alpes",
        summary:
          "Separating what comes from the weather and what comes from human activity.",
        question:
          "Are fine particle peaks in the Rhône valley driven more by weather conditions than by human activity?",
        data: "Hourly PM2.5 from 19 Rhône valley stations (Atmo AURA, fixed history Jul. 2022 → Jul. 2023), joined with Open-Meteo ERA5 temperature, wind and humidity at station coordinates.",
        method:
          "Atmo exploration, hourly join with weather, inversion proxy (cold + low wind), then Ridge regression comparing calendar blocks (hour, weekend, holidays) vs weather, with station fixed effects.",
        findings: [
          "~157k joined hours: weather alone explains more variance than the calendar (holdout R² ~0.19 vs ~0.15).",
          "Inversion proxy (cold + wind < 2 m/s): PM2.5 +62% on average vs other hours.",
          "Correlations: temperature −0.30, wind −0.17; weekday double peak compatible with traffic, but secondary to weather.",
        ],
        limits:
          "Correlation is not causation. No hourly traffic data: calendar remains a coarse proxy. ERA5 smooths valley microclimates. Fixed Atmo history, not live monitoring. Simple linear model (R² ~0.20), not operational forecasting.",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
