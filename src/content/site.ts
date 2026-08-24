export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const SITE = {
  name: "Bastien Guillemin",
  url: "https://vakz0.github.io",
  email: "bastien.guillemin@insa-lyon.fr",
  github: "https://github.com/Vakz0",
  linkedin: "https://www.linkedin.com/in/bastien-guillemin/",
} as const;
