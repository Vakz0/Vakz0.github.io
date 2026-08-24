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
  /** Réponse en langage clair à la question (encadré en tête de fiche). */
  answer?: string;
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

export interface ProjectFigure {
  src: string;
  caption: Record<Locale, string>;
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
  /** Graphiques de restitution (optionnel, affichés en galerie). */
  figures?: ProjectFigure[];
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
    figures: [
      {
        src: "/images/projects/air/00_tableau_de_bord.png",
        caption: {
          fr: "Vue d'ensemble : 157 000 heures analysées, pics hivernaux, effet inversion +62 %, météo > calendrier.",
          en: "Overview: 157k hours analysed, winter peaks, +62% inversion effect, weather > calendar.",
        },
      },
      {
        src: "/images/projects/air/01_saisonnalite_journaliere.png",
        caption: {
          fr: "PM2.5 journalier sur un an — les pics arrivent en hiver, quand les inversions piègent la pollution.",
          en: "Daily PM2.5 over one year — peaks occur in winter when inversions trap pollution.",
        },
      },
      {
        src: "/images/projects/air/02_profil_horaire_trafic.png",
        caption: {
          fr: "Profil horaire en semaine vs week-end — double bosse matin (7h–9h) et soir (17h–19h), signature du trafic.",
          en: "Hourly profile weekday vs weekend — morning (7–9am) and evening (5–7pm) peaks, traffic signature.",
        },
      },
      {
        src: "/images/projects/air/03_effet_inversion.png",
        caption: {
          fr: "Quand il fait froid et qu'il ne vente presque pas (< 2 m/s), le PM2.5 moyen augmente de 62 %.",
          en: "When it's cold and nearly windless (< 2 m/s), average PM2.5 rises by 62%.",
        },
      },
      {
        src: "/images/projects/air/04_meteo_vs_pm25.png",
        caption: {
          fr: "Plus froid = plus de particules (r = −0,30). Vent fort = dispersion (r = −0,17).",
          en: "Colder = more particles (r = −0.30). Strong wind = dispersion (r = −0.17).",
        },
      },
      {
        src: "/images/projects/air/06_comparaison_modeles.png",
        caption: {
          fr: "Modèle prédictif : la météo seule (R² = 19 %) bat le calendrier seul (R² = 15 %).",
          en: "Predictive model: weather alone (R² = 19%) beats calendar alone (R² = 15%).",
        },
      },
      {
        src: "/images/projects/air/07_importance_blocs.png",
        caption: {
          fr: "Importance relative : météo >> station >> calendrier quand on mélange les variables du modèle.",
          en: "Relative importance: weather >> station >> calendar when model variables are shuffled.",
        },
      },
    ],
    copy: {
      fr: {
        title: "Qualité de l'air en Auvergne-Rhône-Alpes",
        summary:
          "157 000 heures de mesures : la météo explique les pics de pollution mieux que le trafic.",
        answer:
          "Quand il fait froid et qu'il ne vente pas, la pollution reste piégée dans la vallée du Rhône (+62 % de PM2.5). Le trafic laisse une trace (double bosse matin/soir), mais c'est surtout la météo — inversions thermiques en hiver — qui pilote les concentrations.",
        question:
          "Les pics de particules fines dans la vallée du Rhône s'expliquent-ils davantage par les conditions météo que par l'activité humaine ?",
        data: "19 stations Atmo AURA dans la vallée du Rhône (Rhône, Isère, Drôme, Ardèche, Loire), mesures horaires PM2.5 sur un an (juil. 2022 → juil. 2023). Croisement avec température, vent et humidité Open-Meteo ERA5 aux coordonnées exactes de chaque station. Total : 157 000 heures exploitables.",
        method:
          "1) Explorer les données Atmo (saisonnalité, profil horaire, stations). 2) Télécharger la météo Open-Meteo et joindre heure par heure. 3) Tester un proxy d'inversion (froid + vent < 2 m/s). 4) Comparer deux blocs explicatifs par régression Ridge : calendrier (heure, week-end, fériés) vs météo (température, vent, humidité), avec un effet par station.",
        findings: [
          "Saisonnalité marquée : les pics de PM2.5 arrivent en hiver (fév.–mars 2023), quand les inversions thermiques emprisonnent les particules sous une couche d'air chaud.",
          "Effet inversion mesurable : froid + vent faible → PM2.5 moyen +62 % (de ~7,5 à ~12 µg/m³). Corrélations : température −0,30, vent −0,17.",
          "Signal trafic visible mais secondaire : double bosse horaire en semaine (7h–9h et 17h–19h), absente le week-end. Mais la météo seule explique 19 % de variance vs 15 % pour le calendrier seul.",
          "Verdict du modèle : météo > calendrier. Ajouter le trafic (via calendrier) au modèle météo n'apporte que +1,5 point de R².",
        ],
        limits:
          "Corrélation ≠ causalité. Pas de données de trafic horaire : le calendrier est un proxy grossier. La météo ERA5 (~9–25 km) lisse les microclimats de vallée. Historique Atmo figé, pas un suivi temps réel. Modèle linéaire simple (R² ~20 %), pas une prévision opérationnelle.",
      },
      en: {
        title: "Air quality in Auvergne-Rhône-Alpes",
        summary:
          "157,000 hours of readings: weather explains pollution peaks better than traffic.",
        answer:
          "When it's cold and windless, pollution stays trapped in the Rhône valley (+62% PM2.5). Traffic leaves a trace (morning/evening double peak), but weather — thermal inversions in winter — mainly drives concentrations.",
        question:
          "Are fine particle peaks in the Rhône valley driven more by weather conditions than by human activity?",
        data: "19 Atmo AURA stations in the Rhône valley (Rhône, Isère, Drôme, Ardèche, Loire), hourly PM2.5 over one year (Jul. 2022 → Jul. 2023). Joined with Open-Meteo ERA5 temperature, wind and humidity at each station's coordinates. Total: 157,000 usable hours.",
        method:
          "1) Explore Atmo data (seasonality, hourly profile, stations). 2) Download Open-Meteo weather and join hour-by-hour. 3) Test an inversion proxy (cold + wind < 2 m/s). 4) Compare two explanatory blocks via Ridge regression: calendar (hour, weekend, holidays) vs weather (temperature, wind, humidity), with station fixed effects.",
        findings: [
          "Marked seasonality: PM2.5 peaks occur in winter (Feb–Mar 2023), when thermal inversions trap particles under a warm air layer.",
          "Measurable inversion effect: cold + low wind → average PM2.5 +62% (~7.5 to ~12 µg/m³). Correlations: temperature −0.30, wind −0.17.",
          "Traffic signal visible but secondary: weekday double peak (7–9am and 5–7pm), absent on weekends. But weather alone explains 19% of variance vs 15% for calendar alone.",
          "Model verdict: weather > calendar. Adding traffic (via calendar) to the weather model only adds +1.5 R² points.",
        ],
        limits:
          "Correlation is not causation. No hourly traffic data: calendar is a coarse proxy. ERA5 weather (~9–25 km) smooths valley microclimates. Fixed Atmo history, not live monitoring. Simple linear model (R² ~20%), not operational forecasting.",
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
