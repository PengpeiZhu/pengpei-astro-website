import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { resolve, extname } from "node:path";

const root = resolve("out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const pages = [
  ["index.html", "en"],
  ["zh-hans/index.html", "zh-Hans"],
  ["zh-hant/index.html", "zh-Hant"],
].map(([file, lang]) => {
  const html = readFileSync(resolve(root, file), "utf8");
  assert(html.includes(`<html lang="${lang}"`), `Incorrect document language: ${file}`);
  return html;
});
const papers = JSON.parse(readFileSync("lib/publications.json", "utf8"));
const photos = JSON.parse(readFileSync("lib/photography.json", "utf8"));
assert(pages[0].includes(`All publications · ${papers.length}`), "Export has stale publication count.");
const urls = pages.flatMap(html => [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(match => match[1]));
urls.push(`${basePath}/photography/hero-milky-way.jpeg`, `${basePath}/interactive/uvj-sed-lab.html`, `${basePath}/interactive/sandage-sfh.html`);
urls.push(...photos.map(photo => `${basePath}${photo.src}`));
let checked = 0;
for (let url of new Set(urls)) {
  if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(url)) continue;
  url = decodeURIComponent(url.split(/[?#]/)[0]);
  if (!url) continue;
  if (basePath) assert(url.startsWith(`${basePath}/`), `Asset bypasses project path: ${url}`);
  const relative = url.slice(basePath.length).replace(/^\//, "");
  const target = resolve(root, relative);
  assert(target === root || target.startsWith(`${root}/`), "Invalid export path.");
  assert(existsSync(target), `Missing export asset: ${url}`);
  if (!extname(target) && statSync(target).isDirectory()) assert(existsSync(resolve(target, "index.html")));
  checked++;
}
const presentationPdfs = [...new Set(urls)]
  .filter(url => url.startsWith(`${basePath}/talks/`) && url.endsWith(".pdf"))
  .map(url => url.slice(basePath.length + 1));
for (const file of ["Pengpei-Zhu-CV.pdf", "publications.bib", "interactive/uvj-sed-lab.html", "interactive/sandage-sfh.html", "research/rs-outflow-escape-velocity.pdf", ...presentationPdfs]) {
  assert(readFileSync(resolve(root, file)).equals(readFileSync(resolve("public", file))), `Export changed ${file}`);
}
writeFileSync(resolve(root, ".nojekyll"), "");
writeFileSync(resolve(root, "preview-config.json"), JSON.stringify({ basePath }) + "\n");
console.log(`Static export verified: ${checked} local references, ${papers.length} publications, base path ${basePath || "/"}.`);
