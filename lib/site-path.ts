/** Prefix files from public/ for both project Pages and a domain-root website. */
export function assetPath(path: string) {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
  return `${basePath}/${path.replace(/^\/+/, "")}`;
}

export function siteUrl(path: string) {
  return new URL(assetPath(path), process.env.NEXT_PUBLIC_SITE_URL || "https://pengpeizhu.com").href;
}
