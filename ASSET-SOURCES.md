# Sources and assets

Prepared from the owner's existing academic website on 12 November 2026. Scientific content, images and existing interactions are preserved while the build is adapted for GitHub Pages.

## Academic content

- Biography, education and presentations: the owner's CV and cover-letter context used for the original website. Those private source documents and chat transcripts are not packaged.
- The owner supplied `PengpeiZhu_CV.pdf` on 16 November 2026. The three-page CV is served unchanged at `public/Pengpei-Zhu-CV.pdf`. Its SHA-256 is `7764e4061fc826b657358be8380c556a6230b50053459b39e1507f9e29b07243`.
- Institutional profile: https://cosmicdawn.dk/staff/pengpei-zhu/
- ORCID: https://orcid.org/0000-0002-6768-8335
- Publications: all 19 results from the existing SciX query, checked on 12 November 2026. Exact query: `lib/publication-source.json`; individual matching records: `docs/scix-matches.json`.
- Added metadata and full author lists: https://arxiv.org/abs/2610.19146 and https://arxiv.org/abs/2610.27101. Both are preprints in the verified SciX results. Other bibliography metadata retains the existing CV entries.
- Outflow research additions from the owner on 17 November 2026: `phd1_gas_recycling_schematic.png` and `rs_outflow_vesc_vout.pdf`, served under `public/research/` with their supplied bytes. The velocity plot also has a PNG preview rendered from the full PDF page.
- SQuIGGLE Figure 3: Zhu et al. (2025), *ApJ*, 981, 60, doi:10.3847/1538-4357/adaf1c. The web figure is the original vector image from [the author's paper](https://arxiv.org/html/2501.16459v1#S3.F3), distributed under [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/). The page links to [the SciX record](https://scixplorer.org/abs/2025ApJ...981...60Z/abstract).

## Branding and design

- Personal surname mark: `public/branding/zhu-seal.svg` and `public/favicon.svg`, adapted from [朱-seal.svg](https://commons.wikimedia.org/wiki/File:%E6%9C%B1-seal.svg), a documented Shuowen small-seal form. Original vector by Tradittore (26 August 2023), based on character reference S04109. Wikimedia Commons marks the ancient-script outline public domain. The original vector is retained in `docs/zhu-seal-source.svg`. Only colour, margins and a terracotta seal background were added; the glyph geometry is preserved. The form was also checked against [Taiwan Ministry of Education, 朱](https://dict.variants.moe.edu.tw/dictView.jsp?ID=20676).

- DTU logo: https://media.adm.dtu.dk/designguide/DTU_Design_Guide_Pro_User/DTU_Design_Guide_Logo/Corporate_Red/Corp_Red_RGB/Corp_Red_RGB.png
- DAWN logo: https://cosmicdawn.dk/wp-content/uploads/2020/11/DAWNlogo_1625x375.png
- Transparent source assets retain their proportions and are presented in white with CSS, with a thin border/divider over the Milky Way.
- The owner's San Marco palette draws on Fra Angelico's paintings in Florence. The selected values are in `app/globals.css`, and the opening section credits the artist. [Museo di San Marco](https://museitoscana.cultura.gov.it/luoghi_della_cultura/museo_di_san_marco/)
- Page/index/progress inspiration: https://www.carlsbergfondet.dk/en/applicant/conferences/
- Research, presentations and photography organization references: https://jiaxuanli.me/research/ , https://jiaxuanli.me/talks/ , https://jiaxuanli.me/miscellany/photography/ . Only the owner's content/photos are included.

## Photographs

The owner supplied the current profile portrait on 17 November 2026. Its web copy at `public/portrait-pengpei-zhu.jpg` preserves the framing, decoded pixels and Display P3 colour profile.

The owner supplied the annotated archery photo on 17 November 2026. Its web copy at `public/archery-lagrange-points.jpg` preserves the framing, decoded pixels, sRGB profile and labels.

The astrophotographs are by Pengpei Zhu. On 16 November 2026, the gallery was expanded to include all 30 JPEGs with nonempty Finder comments in the owner's Astrophotos folder. Three already appeared in the gallery and now use captions based on their comments. The other two previously published photos retain their captions, for a total of 32 photographs. Capture dates come from EXIF DateTimeOriginal where available.

New web copies were made with lossless JPEG optimisation. Decoded pixels, colour profiles, framing and visible watermarks were preserved. EXIF (including GPS), XMP, IPTC and other JPEG comments were excluded. Captions and alternative descriptions are in `lib/photography.json`; reviewed file hashes are in `docs/assets-sha256.json`. The hero is the separately selected Milky Way image originally named `841891B8-CDB1-4740-BF61-4A57336F96B3_1_102_a.jpeg`.

Official names used in captions were checked with the [Royal House of Denmark](https://www.kongehuset.dk/en/palaces-and-the-royal-yacht/the-hermitage-palace/), the [Observatories of the Canary Islands](https://ocan.iac.es/), the [Cherenkov Telescope Array Observatory](https://www.ctao.org/emission-to-discovery/array-sites/ctao-north/) and [NASA’s Center for Near-Earth Object Studies](https://cneos.jpl.nasa.gov/news/news181a.html).

## Presentations

The owner supplied four slide decks and two posters on 17 November 2026. The PDF files in `public/talks/` preserve the supplied bytes. Their JPEG previews show the first page. The author’s slide covers supply the talk dates. The May 2024 poster title matches the conference programme. The dates and location were checked against the [Amsterdam University of Applied Sciences conference record](https://research.hva.nl/p/en/activities/nederlandse-astronomen-conferentie-2024) and [KU Leuven’s presentation record](https://fys.kuleuven.be/ster/research-projects/superstars-3d/superstars3d-talks-posters).

## Interactive scientific pages

- `public/interactive/uvj-sed-lab.html`: owner's UVJ + SED Lab. Scientific basis: Suess, Kriek, Price & Barro (2021), ApJ 915, 87, https://doi.org/10.3847/1538-4357/abf1e4 . Source figures, filter definitions and photometry conventions are credited inside the lab.
- `public/interactive/sandage-sfh.html`: owner's Sandage SFH lab. Uses the Sandage `t exp(−t²/2τ²)` form and embedded Planck18 age table. Original scientific assumptions, limits, provenance and sources are retained inside the page.
- Both standalone files preserve their embedded data and scripts. No remote script or data download is needed for the labs. Checksums are in `docs/assets-sha256.json`.
- Metallicity remains a placeholder.
- The owner supplied the current MapMyVisitors embed on 17 November 2026. The sandboxed `public/visitor-map.html` loads the script over HTTPS with the supplied widget key, colour and width. [MapMyVisitors](https://mapmyvisitors.com/)

## Build references

- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/actions/configure-pages

Dependencies and their licences are recorded by the npm lockfile and upstream packages.
