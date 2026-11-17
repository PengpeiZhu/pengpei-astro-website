# Updates

Record future feature, content, design and maintenance changes here, newest first. Include the date, what changed, validation, and any relevant deployment status.

## 2026-11-17 · Compact research figures and job-search badge

- Replaced SQuIGGLE Figure 1 with Figure 3 and removed the DeepDive figure captioned “Neutral gas in galaxies with little star formation.”
- Reduced the preview sizes of the research figures and linked BaStA in the stellar-metallicity project.
- Styled the Searching for Jobs badge as a prominent green banner across the bottom of the portrait.
- Verified the new figure and removed assets in both export paths. Checked the full-size figure viewer and the banner at desktop and phone widths.

## 2026-11-17 · Editable website text and research figures

- Moved the homepage prose, research text and figure captions into `SITE-TEXT.md`. The GitHub Pages build reads this file directly.
- Used the owner's latest biography, highlighted its research sentence, added the three requested links and placed the annotated archery photo on the left. Added the editable Searching for Jobs portrait badge.
- Added the supplied gas-recycling schematic and escape-velocity figure, plus SQuIGGLE Figure 1 and a link to the survey. Switched links with matched records from arXiv to SciX.
- Compared the exported biography with the owner's GitHub edits, verified both export paths and all 19 SciX publication links, and checked the figure viewer and layout at desktop and phone widths.

## 2026-11-17 · Profile portrait, visitors, and presentation PDFs

- Replaced the homepage portrait and sharing image with the owner's supplied photo. The homepage displays the full framing.
- Switched the Visitors map to the new MapMyVisitors embed.
- Added PDF links and first-page previews for four slide decks and two posters, including the May 2024 Netherlands Astronomers’ Conference poster. Removed the GalFirenze flash talk and the Annual Danish Astronomy Meeting 2025 poster from the listing.
- Added directions for editing website text in the README.
- Verified both site export paths, the portrait and map at desktop and phone widths, and all six PDF links. Opened the NAC poster from the Talks & Posters list.

## 2026-11-16 · Featured photo sizing

- Sized each featured frame to its photo’s original proportions and staggered the two columns to accommodate portrait and landscape images.
- Verified edge-to-edge rendering at desktop and phone widths, along with the enlarged view and gallery pagination.

## 2026-11-16 · Astrophotos gallery and fortnightly rotation

- Added 27 photographs and updated three existing captions from the owner's Finder comments. Kept the two earlier photographs without comments, for 32 images in the gallery.
- Showed four featured photos alongside a larger More photos panel with Previous and Next controls. The enlarged view supports arrow keys and Escape.
- Set the featured selection to advance every 14 days from 16 November 2026 at 00:00 UTC. The published page calculates the current selection from the date.
- Verified all 28 browsing pages, keyboard controls, the layout at desktop and phone widths, and a complete rotation through all 32 photos. Validated both the custom-domain and project-path exports.

## 2026-11-16 · Fra Angelico and SciX links

- Linked Fra Angelico’s name in the opening credit to the supplied overview of his work at San Marco.
- Underlined the SciX publication link and gave it the San Marco terracotta colour to make it easier to recognise.
- Verified the link styling at desktop and phone widths, including visible keyboard focus on the SciX link.

## 2026-11-16 · Visitor map, updated CV and homepage navigation

- Replaced the visitor placeholder with the owner's MapMyVisitors widget in a sandboxed frame.
- Updated the download to the supplied three-page `PengpeiZhu_CV.pdf` at the existing address. The site's CV section now shows 16 November 2026.
- Added a floating **Back to top** control and credited Fra Angelico's paintings at the San Marco monastery in the opening section.
- The local preview loaded the map at desktop and mobile widths. The return control worked by keyboard and by clicking, and the served PDF matched the supplied file byte for byte.
- The owner approved the preview for publication from `main` on 16 November 2026.

## 2026-11-16 · Custom domain and repository rename

- Renamed the GitHub repository to [`PengpeiZhu/pengpei-astro-website`](https://github.com/PengpeiZhu/pengpei-astro-website) and updated its website link.
- Set `pengpeizhu.com` as the GitHub Pages custom domain. Cloudflare publishes four DNS-only A records for the root domain and a DNS-only `www` alias to `pengpeizhu.github.io`.
- The production build uses the domain root and sets the HTTPS canonical URL from the GitHub Pages host. The root and project-path exports each verified 23 file references, including the CV and both labs. Automatic deployment still runs on pushes to `main`.
- GitHub issued a certificate for `pengpeizhu.com` and `www.pengpeizhu.com`. Enabled HTTPS enforcement and verified that both HTTP addresses and the HTTPS `www` address redirect to `https://pengpeizhu.com/`.

## 2026-11-13 · Automatic GitHub Pages publishing

- A push or pull request merge into `main` now starts the GitHub Pages workflow automatically.
- The workflow checks content, TypeScript, and the static export before publishing. Use **Run workflow** for an on-demand redeploy. [GitHub Actions run history](https://github.com/PengpeiZhu/pengpei-astronomy/actions/workflows/pages.yml)
- Checked that the workflow targets `main` and that publishing depends on a successful build.

## 2026-11-12 · Updated CV download

- Replaced the CV download with the owner's supplied `PengpeiZhu_Europass_CV.pdf`, preserving the document bytes and the existing public download address.
- Updated the visible note to three pages and the 12 November upload date. The new PDF includes the 19-paper publication list.
- Inspected all three rendered pages and updated only the approved CV checksum. The file is 71,709 bytes, SHA-256 `cd84e3b769ac7bd28cd93b5e271baa19fa2bbbb8aa050d4b00bf98bac563459c`.
- Published successfully in [GitHub Actions run 43253384457](https://github.com/PengpeiZhu/pengpei-astronomy/actions/runs/43253384457). The unauthenticated live PDF download matches the supplied file exactly, and both homepage CV links point to it.

## 2026-11-12 · Public website on GitHub Pages

- The owner approved making the repository public and publishing the website through GitHub Pages.
- The publishing workflow builds the reviewed source on `main`, verifies content and types, and exports the site with the `/pengpei-astronomy/` prefix.
- Updated the maintenance guide and README with the public website address and the manual publishing procedure. The separate Sites-hosted copy keeps its existing private audience.
- Made the repository public and published the website with the manual Actions workflow and enforced HTTPS. [Public website](https://pengpeizhu.github.io/pengpei-astronomy/)
- The 12 November release built source commit `e24c1909e02edd8f53dbc7b1a76a48f3c79e2631`. The build, content checks, TypeScript and deployment all passed. [GitHub Actions run 43253384457](https://github.com/PengpeiZhu/pengpei-astronomy/actions/runs/43253384457)
- Live verification: all 16 public assets returned HTTP 200 and matched their reviewed checksums, including the updated CV and both full labs. The project-path build resolved all 23 local references. UVJ and SFH preview controls and the photo viewer worked; desktop and 390 px mobile layouts had no page overflow, and the mobile menu opened and closed. The checked browser session reported no console errors.

## 2026-11-12 · Private GitHub repository and surname identity

- Merged the maintenance notes into one `AGENTS.md` and removed the duplicate `AGENT.md`.
- Renamed `REVIEW.md` to `UPDATES.md` and established this file as the ongoing changelog.
- Replaced the star mark and browser icon with the surname 朱 in documented 小篆 (Shuowen seal script). The logo uses a terracotta seal field and cream lettering, and stays visible on small screens.
- The owner approved uploading the complete source to a private GitHub repository. Public GitHub Pages hosting is a separate step.
- Repository: [PengpeiZhu/pengpei-astronomy](https://github.com/PengpeiZhu/pengpei-astronomy), created as private with GitHub Pages disabled.
- Validation: content and asset checks passed (19 publications and 16 runtime assets); TypeScript passed; the static build passed with all 23 local file references resolving. The logo and header were checked at 1440 px, 390 px and 320 px, with no page overflow. The mobile menu opened and closed successfully.
- The existing owner-private Sites website was updated successfully from source commit `d71a9f056ccd015546af12e738a35f546583b761`, with its audience unchanged.

## 2026-11-12 · Initial GitHub review edition

**Open the site:** double-click `Preview.command` on macOS. The supplied `out/` directory is a ready-built static website. Python 3 is needed by the launcher; Node.js 24 is needed only for editing/building or the alternative `npm run preview` command.

**Status at this initial review:** a local Git repository on `main` was prepared before upload approval. The existing private Sites website received the same 19-paper bibliography update independently. The GitHub workflow was supplied for a future, separate hosting step.

### Changes included

- All 19 records from the current SciX search, including Leviathan and SQuIGGLE radio AGN.
- Full BibTeX entries for the additions, an updated bibliography download, automatic counts and year filters, and SciX ordering in the All view.
- The complete current website, including the homepage email/CV/Contact links, branding, photos, scientific figure, talks/posters section and both full interactive labs.
- A portable static build, with asset paths that work for both a domain root and a GitHub project path.
- Maintenance notes, setup/deployment instructions, source credits, a publication matching record and asset checksums.

### Validation performed

| Check | Result |
| --- | --- |
| Live SciX search | 19 results, all matched one-to-one to the website list |
| New metadata | Titles, authorship and preprint status checked against SciX and arXiv |
| Bibliography | 19 unique records; download matches the data source |
| TypeScript | Passed |
| Static export at `/` | Passed; all 22 homepage file references resolve |
| Static export at `/pengpei-astronomy/` | Passed; prefixed asset/download/lab URLs resolve |
| Static HTTP asset check | All 15 public files returned identical bytes under the project path |
| Publication controls | All = 19, First author = 2, Leviathan search = 1, year 2022 = 1 |
| UVJ preview | Blue preset changes U−V/V−J from 1.57/0.82 to 0.48/−0.01 |
| SFH preview | Two episodes displays both burst components |
| Photo viewer | Opens and closes successfully |
| Responsive checks | Desktop and 390 px viewport; no page overflow or broken loaded images |
| Browser console | No errors in the checked static-site interactions |
| CV and full labs | Exported bytes match their approved source assets |
| Review launcher | Shell and embedded Python syntax checked |

Build environment: Node.js 24.22.1, npm 11.21.2, Next.js 16.3.4. Both builds use the pinned dependencies. No GitHub Actions deployment was run as part of this initial review.

The CV PDF remains the original four-page, 9 November 2026 version, with 17 papers. Presentation media, metallicity and visitor-map placeholders remain intentional. The local review package includes the built website; generated output is ignored by Git and rebuilt by the future Pages workflow.

![Updated publications section](docs/publications-preview.png)
