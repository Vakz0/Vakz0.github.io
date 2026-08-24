import type { ProjectHighlight } from "@/content/projects";
import type { Locale } from "@/content/site";

export function ProjectHighlights({
  highlights,
  locale,
}: {
  highlights: ProjectHighlight[];
  locale: Locale;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {highlights.map((item) => (
        <div
          key={item.label[locale]}
          className="rounded-base border border-line bg-canvas-alt px-4 py-4"
        >
          <p className="font-mono text-2xl font-medium tracking-tight text-accent">
            {item.value}
          </p>
          <p className="mt-1 text-[13px] leading-snug text-fg-soft">
            {item.label[locale]}
          </p>
        </div>
      ))}
    </div>
  );
}
