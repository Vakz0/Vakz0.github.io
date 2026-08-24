import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { PointerGlow } from "@/components/PointerGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getDictionary } from "@/content/i18n";
import { LOCALES, SITE, type Locale } from "@/content/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return {
    metadataBase: new URL(SITE.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: { fr: "/fr/", en: "/en/" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}/`,
      siteName: SITE.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const typed = locale as Locale;
  const dict = getDictionary(typed);

  return (
    <html
      lang={dict.htmlLang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ScrollProgress />
        <PointerGlow />
        <Grain />
        <Header locale={typed} dict={dict} />
        {/* Le contenu passe au-dessus du halo, qui reste au niveau du fond. */}
        <div className="relative z-10 flex flex-1 flex-col">
          {children}
          <Footer dict={dict} />
        </div>
      </body>
    </html>
  );
}
