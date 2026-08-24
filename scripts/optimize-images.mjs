import { readdir, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

/**
 * Convertit les PNG déposés dans public/images en WebP redimensionnés.
 * Les sources générées pèsent plusieurs mégaoctets : servies telles quelles,
 * elles détruiraient le LCP du site.
 */
const DIR = "public/images";
const MAX_WIDTH = 1600;
const QUALITY = 78;

const files = await readdir(DIR);
const sources = files.filter((file) => /\.(png|jpe?g)$/i.test(file));

if (sources.length === 0) {
  console.log("Aucune image à convertir.");
}

for (const file of sources) {
  const input = join(DIR, file);
  const output = join(DIR, `${parse(file).name}.webp`);

  const info = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  await unlink(input);
  console.log(`${file} -> ${parse(output).base} (${Math.round(info.size / 1024)} Ko)`);
}
