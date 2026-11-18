"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/site-path";
import { locales, localeByLanguage, formatDate, type Locale } from "../lib/locales";
import { translator } from "../lib/site-labels";
import publications from "../lib/publications.json";
import publicationSource from "../lib/publication-source.json";
import { presentations } from "../lib/presentations";
import { researchFigures, type ResearchFigure } from "../lib/research-figures";
import type { SiteSection, SiteText } from "../lib/site-text";
import { Astrophotos } from "./astrophotos";
import { InteractiveProjects } from "./interactive-projects";
import { useReadingProgress } from "../lib/use-reading-progress";
const nav = [
  ["about", "About"],
  ["research", "Research"],
  ["publications", "Publications"],
  ["panels", "Interactive"],
  ["talks", "Talks & Posters"],
  ["photography", "Astrophotos"],
  ["philosophy", "Philosophy blogs"],
  ["cv", "CV"],
  ["contact", "Contact"],
];
const openingLinks = [["about","A little about me"],["research","My research"],["panels","Fun Interactive projects"],["photography","Astrophotos"]];
const sectionIds = nav.map(([id]) => id);
const emailAddress = "penzhu@space.dtu.dk";
const cvFilename = "Pengpei-Zhu-CV.pdf";
const sciXQuery = publicationSource.query;
const sciXUrl = `https://scixplorer.org/search?q=${encodeURIComponent(sciXQuery)}&sort=date%20desc&d=astrophysics`;
const ReadingTrack = ({section}:{section:string}) => <span className="reading-track" data-progress-for={section} aria-hidden="true"><i/></span>;
const SectionTitle = ({section,children}:{section:string,children:React.ReactNode}) => <div className="section-title"><h2 id={`${section}-title`}>{children}</h2><ReadingTrack section={section}/></div>;
const Arrow = ({up=false}:{up?:boolean}) => <span aria-hidden="true">{up?"↗":"→"}</span>;
const External = ({href,children}:{href:string,children:React.ReactNode}) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;
type ResearchProject = {
  id: string;
  label: string;
  meta: string;
  title: SiteSection;
  text: SiteSection;
  publicationId?: string;
  link?: string;
};

const projects: ResearchProject[] = [
  {
    id: "stellar-metallicity", label: "Stellar metallicities", meta: "Ongoing · JWST/NIRSpec",
    title: "Stellar metallicities title", text: "Stellar metallicities",
  },
  {
    id: "neutral-outflows", label: "Neutral gas flows", meta: "DeepDive · Published 2026",
    title: "Neutral gas flows title", text: "Neutral gas flows",
    publicationId: "zhuThereBackAgain2026", link: "Read the DeepDive paper",
  },
  {
    id: "post-starburst-galaxies", label: "Post-starburst galaxies", meta: "SQuIGGLE · Keck/NIRES",
    title: "Post-starburst galaxies title", text: "Post-starburst galaxies",
    publicationId: "zhuSQuIGGEObservationalEvidence2025", link: "Read the SQuIGGLE paper",
  },
  {
    id: "spectral-methods", label: "Spectra & open catalogues", meta: "Methods · VLT/MUSE & archives",
    title: "Spectra and open catalogues title", text: "Spectra and open catalogues",
  },
];

function arxivUrl(id: string) {
  return `https://arxiv.org/abs/${id}`;
}

export default function Home({ locale, copy: siteText, showJobBadge }: { locale: Locale; copy: SiteText; showJobBadge: boolean }){
 const t = translator(locale);
 const[filter,setFilter]=useState("selected"),[query,setQuery]=useState(""),[year,setYear]=useState("all"),[notice,setNotice]=useState("");
 const [expandedFigure, setExpandedFigure] = useState(researchFigures["neutral-outflows"][0]);
 const dialog=useRef<HTMLDialogElement>(null);
 const active=useReadingProgress(sectionIds);
 const matches=publications.filter(p=>(filter==="all"||(filter==="selected"&&p.selected)||(filter==="first"&&p.firstAuthor))&&(year==="all"||p.year===year)&&`${p.title} ${t(p.title)} ${p.authors} ${p.journal} ${p.year} ${p.doi} ${p.arxiv} Pengpei Zhu`.toLowerCase().includes(query.toLowerCase().trim())).sort((a,b)=>filter==="selected"?0:a.scixOrder-b.scixOrder);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(""),4000);return()=>clearTimeout(timer)},[notice]);
 async function copy(text:string,success:string){try{await navigator.clipboard.writeText(text);setNotice(success)}catch{setNotice(t("Copy is unavailable here. Select the text, or download the bibliography."))}}
 function expandFigure(figure: ResearchFigure) {
   setExpandedFigure(figure);
   dialog.current?.showModal();
 }
 return <>
 <a className="skip-link" href="#main">{t("Skip to content")}</a>
 <header className="site-header">
   <div className="header-inner">
     <a href="#top" className="wordmark" aria-label={t("Pengpei Zhu, home")}>
       <img className="mark" src={assetPath("/branding/zhu-seal.svg")} alt="" aria-hidden="true" width="42" height="42"/>
       <span lang="en">Pengpei Zhu</span><span className="wordmark-cn" lang="zh">朱芃佩</span>
     </a>
     <details className="language-picker">
       <summary aria-label={`${t("Language")} · ${localeByLanguage(locale).label}`}>
         {localeByLanguage(locale).label} <span aria-hidden="true">▾</span>
       </summary>
       <nav aria-label={t("Language")}>
         {locales.map(({ lang, path, label }) => (
           <a key={lang} href={assetPath(path)} lang={lang} hrefLang={lang} aria-current={locale === lang ? "page" : undefined}>{label}</a>
         ))}
       </nav>
     </details>
   </div>
 </header>
 <main id="main">
  <section id="top" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
    <div className="hero-main wrap">
      <div>
        <h1 id="hero-title" lang="en">Pengpei Zhu <span lang="zh">朱芃佩</span></h1>
        <p className="hero-statement">{siteText["Opening headline"]}</p>
        <p className="hero-description">{siteText["Opening introduction"]}</p>
        <p className="hero-palette-credit">{siteText["Colour credit"]}</p>
        <nav className="hero-actions" aria-label={t("Explore my website")}>
          {openingLinks.map(([id, label]) => (
            <a className="hero-link" key={id} href={`#${id}`}>{t(label)}<Arrow/></a>
          ))}
        </nav>
      </div>
      <div className="hero-aside">
        <div className="institution-marks" aria-label={t("Affiliations")}>
          <a href="https://www.space.dtu.dk/" target="_blank" rel="noreferrer" aria-label={t("DTU Space")}>
            <img className="dtu-mark" src={assetPath("/branding/dtu-logo.png")}  alt="DTU" width="1951" height="2846"/>
          </a>
          <a href="https://cosmicdawn.dk/" target="_blank" rel="noreferrer" aria-label={t("Cosmic Dawn Center")}>
            <img className="dawn-mark" src={assetPath("/branding/dawn-logo.png")}  alt={t("Cosmic Dawn Center")} width="1625" height="375"/>
          </a>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            <img src={assetPath("/portrait-pengpei-zhu.jpg")} alt={t("Pengpei Zhu by the water")} width="956" height="822" fetchPriority="high"/>
            {showJobBadge && <span className="profile-job-badge">{siteText["Job search badge"]}</span>}
          </div>
          <figcaption>
            <span>{siteText["Profile role"]}</span>
            <span>{siteText["Profile affiliation"]}</span>
          </figcaption>
        </figure>
        <address className="hero-contact" aria-label={t("Email, CV, publications and contact links")}>
          <a className="hero-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
          <div className="hero-contact-links">
            <a href={assetPath(`/${cvFilename}`)} download={cvFilename}>{t("Download CV (PDF)")} <span aria-hidden="true">↓</span></a>
            <External href={sciXUrl}>{t("Publication on SciX")} <Arrow up/></External>
            <a href="#contact">{t("Contact")} <Arrow/></a>
          </div>
        </address>
      </div>
    </div>
  </section>
  <div className="page-index"><div className="index-inner wrap"><div className="index-contact"><span className="index-label">{t("Contact")}</span><a href={`mailto:${emailAddress}`}>{emailAddress}</a></div><div><span className="index-label">{t("On this page")}</span><nav aria-label={t("On this page")}>{nav.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?"location":undefined}>{t(label)}<ReadingTrack section={id}/></a>)}</nav></div></div></div>

 <section id="about" data-reading-section className="section about" aria-labelledby="about-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>01</span>{t("About me")}</p>
     </div>
     <div className="intro-grid">
       <div>
         <SectionTitle section="about">{siteText["About heading"]}</SectionTitle>
         <figure className="about-archery">
           <External href={assetPath("/archery-lagrange-points.jpg")}>
             <img
               src={assetPath("/archery-lagrange-points.jpg")}
               alt={t("Pengpei drawing a recurve bow with the five Lagrange points marked in red around him.")}
               width="1772"
               height="1774"
               loading="lazy"
             />
           </External>
           <figcaption>{siteText["Archery photo caption"]}</figcaption>
         </figure>
       </div>
       <div className="intro-copy">{siteText["About me"]}</div>
     </div>
     <ol className="education-strip">
       <li><span>{t("2017–2022 · Santa Cruz")}</span><strong>{t("Physics & Philosophy")}</strong><p>{t("BS & BA · UC Santa Cruz")}</p></li>
       <li><span>{t("2022–2024 · Leiden")}</span><strong>{t("Astronomy")}</strong><p>{t("MSc · Leiden University")}</p></li>
       <li><span>{t("2024–present · Denmark")}</span><strong>{t("Astrophysics")}</strong><p>{t("PhD · Cosmic Dawn Center, DTU")}</p></li>
     </ol>
   </div>
 </section>
 <section id="research" data-reading-section className="section research" aria-labelledby="research-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>02</span>{t("Research")}</p>
       <span className="section-note">{t("From spectra to physical histories")}</span>
     </div>
     <div className="intro-grid">
       <SectionTitle section="research">{t("Research")}</SectionTitle>
       <div className="intro-copy">{siteText["Research introduction"]}</div>
     </div>
     <nav className="research-contents" aria-label={t("Research topics")}>
       {projects.map((project, index) => (
         <a href={`#${project.id}`} key={project.id}>
           <span>0{index + 1}</span>{t(project.label)}<Arrow/><ReadingTrack section={project.id}/>
         </a>
       ))}
     </nav>
     <div className="research-topics">
       {projects.map((project, index) => {
         const paper = publications.find(publication => publication.id === project.publicationId);
         const paperUrl = paper?.scix || (paper?.arxiv ? arxivUrl(paper.arxiv) : undefined);
         const figures = researchFigures[project.id];

         return (
           <article className="research-topic" id={project.id} data-reading-section key={project.id} aria-labelledby={`${project.id}-title`}>
             <div className="topic-grid">
               <div className="topic-heading">
                 <p className="eyebrow">0{index + 1} / {t(project.label)}</p>
                 <h3 id={`${project.id}-title`}>{siteText[project.title]}</h3>
                 <ReadingTrack section={project.id}/>
                 <p className="research-meta">{t(project.meta)}</p>
               </div>
               <div className="topic-copy">
                 {siteText[project.text]}
                 {paperUrl && (
                   <a className="text-link" href={paperUrl} target="_blank" rel="noreferrer">{t(project.link ?? "")}<Arrow up/></a>
                 )}
               </div>
             </div>
             {figures && (
               <div className="research-figures">
                 {figures.map(figure => (
                   <figure className="science-figure" key={figure.image}>
                     <div className="figure-heading">
                       <span className="eyebrow">{t(figure.title)}</span>
                       <button className="small-button" onClick={() => expandFigure(figure)} aria-label={`${t("Expand")} ${t(figure.title)}`}>
                         {t("Expand")} <span aria-hidden="true">⤢</span>
                       </button>
                     </div>
                     <button className="figure-image-button" aria-label={`${t("View")} ${t(figure.title)}`} onClick={() => expandFigure(figure)}>
                       <img src={assetPath(figure.image)} alt={t(figure.alt)} width={figure.width} height={figure.height} loading="lazy"/>
                     </button>
                     <figcaption>{siteText[figure.caption]}</figcaption>
                   </figure>
                 ))}
               </div>
             )}
           </article>
         );
       })}
     </div>
   </div>
 </section>
 <section data-reading-section id="publications" className="section publications" aria-labelledby="publications-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>03</span>{t("Publications")}</p>
       <a className="text-link" href={assetPath("/publications.bib")} download>{t("Download bibliography")} <small>BIB</small>↓</a>
     </div>
     <div className="publications-heading">
       <SectionTitle section="publications">{t("Publications")}</SectionTitle>
       <a className="scix-link" href={sciXUrl} target="_blank" rel="noreferrer">
         <span className="scix-link-title">{t("Publication on SciX")}</span>
         <Arrow up/>
       </a>
     </div>
   <p className="scix-note">{publications.length} {t("publications and preprints, matched to SciX")} · {t("Updated")} {formatDate(locale, publicationSource.verifiedOn, publicationSource.displayDate, { dateStyle: "long" })}.</p><div className="publication-controls"><div className="filter-buttons" role="group" aria-label={t("Filter publications")}>{[["selected",t("Selected")],["all",`${t("All publications")} · ${publications.length}`],["first",t("First author")]].map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="search-controls"><label className="search-label"><span className="sr-only">{t("Search publications")}</span><span aria-hidden="true">⌕</span><input type="search" value={query} placeholder={t("Search papers…")} onChange={e=>{setQuery(e.target.value);if(e.target.value)setFilter("all")}}/></label><label><span className="sr-only">{t("Filter by year")}</span><select value={year} onChange={e=>setYear(e.target.value)}><option value="all">{t("All years")}</option>{Array.from(new Set(publications.map(p => p.year))).sort((a,b) => Number(b)-Number(a)).map(y=><option key={y}>{y}</option>)}</select></label></div></div><p className="result-count" aria-live="polite">{matches.length} {t(matches.length===1?"publication":"publications")} {t(filter==="selected"?"selected":"shown")}<span>{t("SciX bibliography")} · {formatDate(locale, publicationSource.verifiedOn, publicationSource.displayDate, { dateStyle: "long" })}</span></p>
 <div className="publication-list">{matches.map(p => {
   const journalUrl = p.doi ? `https://doi.org/${p.doi}` : undefined;
   const recordUrl = p.scix || (p.arxiv ? arxivUrl(p.arxiv) : undefined);
   return <article className="publication" key={p.id}><div className="publication-year">{p.year}<span>{p.firstAuthor?t("First author"):p.preprint?t("Preprint"):t("Coauthor")}</span></div><div className="publication-content"><h3><External href={journalUrl || recordUrl || sciXUrl}>{t(p.title)} <Arrow up/></External></h3>{locale !== "en" && <p className="original-title" lang="en">{p.title}</p>}<p className="authors">{p.authors.split("Pengpei Zhu").map((part,i)=><span key={i}>{i>0&&<strong>Pengpei Zhu</strong>}{part}</span>)}{!p.includesAuthor&&<span> · {t("with")} <strong>Pengpei Zhu</strong></span>}</p><p className="journal">{p.journal}{p.volume&&` ${p.volume}`}{p.pages&&`, ${p.pages}`}{p.preprint&&` · arXiv:${p.arxiv}`}</p>{"summary" in p&&p.summary&&<p className="publication-summary">{t(p.summary)}</p>}<div className="publication-links">{journalUrl && <External href={journalUrl}>{t("Journal")} <Arrow up/></External>}{recordUrl && <External href={recordUrl}>{p.scix ? "SciX" : "arXiv"} <Arrow up/></External>}<details><summary>BibTeX +</summary><div className="citation-panel"><button className="small-button" onClick={()=>copy(p.bib,t("BibTeX citation copied."))}>{t("Copy BibTeX")}</button><pre tabIndex={0}>{p.bib}</pre></div></details></div></div></article>;
 })}</div>{!matches.length&&<div className="empty-state"><h3>{t("No papers match these filters.")}</h3><p>{t("Try a different title, author, or year.")}</p><button className="button" onClick={()=>{setQuery("");setYear("all");setFilter("all")}}>{t("Clear filters")} <Arrow/></button></div>}<p className="publication-footnote">{siteText["Publication links note"]}</p></div></section>
 <section id="panels" data-reading-section className="section panels" aria-labelledby="panels-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>04</span>{t("Interactive projects")}</p></div>
     <div className="intro-grid">
       <SectionTitle section="panels">{locale === "en" ? <>Explore<br/>the science.</> : t("Explore the science.")}</SectionTitle>
       <div className="intro-copy">{siteText["Interactive projects introduction"]}</div>
     </div>
     <InteractiveProjects locale={locale} />
   </div>
 </section>
 <section id="talks" data-reading-section className="section talks-section" aria-labelledby="talks-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>05</span>{t("Presentations")}</p></div>
     <SectionTitle section="talks">{t("Talks & Posters")}</SectionTitle>
     <ol className="presentation-list">
       {presentations.map(presentation => {
         const media = `/talks/${presentation.id}`;
         return (
           <li className="presentation-row" key={presentation.id}>
             <div>
               <p className="presentation-format">{t(presentation.format)}</p>
               <h3>{t(presentation.title)}</h3>
               {locale !== "en" && <p className="original-title" lang="en">{presentation.title}</p>}
               <p className="presentation-event">
                 {presentation.href
                   ? <External href={presentation.href}>{t(presentation.event)} <Arrow up/></External>
                   : t(presentation.event)}
               </p>
               <p className="presentation-date">{t(presentation.venue)} · <time dateTime={presentation.startDate}>{t(presentation.date)}</time></p>
             </div>
             <a
               className="presentation-material"
               data-kind={presentation.material}
               href={assetPath(`${media}.pdf`)}
               target="_blank"
               rel="noreferrer"
               aria-label={`${t(presentation.material)} (PDF) · ${t(presentation.event)} ${t("(opens in a new tab)")}`}
             >
               <img src={assetPath(`${media}.jpg`)} alt="" width={presentation.preview.width} height={presentation.preview.height} loading="lazy"/>
               <span>{t(presentation.material)} (PDF) <Arrow up/></span>
             </a>
           </li>
         );
       })}
     </ol>
   </div>
 </section>
 <section id="photography" data-reading-section className="section photography" aria-labelledby="photography-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>06</span>{t("Astrophotos")}</p>
       <span className="section-note">{t("Under the same sky")}</span>
     </div>
     <div className="intro-grid">
       <SectionTitle section="photography">{t("Astrophotos")}</SectionTitle>
       <div className="intro-copy">{siteText["Astrophotos introduction"]}</div>
     </div>
     <Astrophotos locale={locale} />
   </div>
 </section>
 <section id="philosophy" data-reading-section className="section philosophy" aria-labelledby="philosophy-title">
   <div className="wrap intro-grid">
     <SectionTitle section="philosophy">{t("Philosophy blogs")}</SectionTitle>
     <div className="intro-copy">{siteText["Philosophy blogs"]}</div>
   </div>
 </section>
 <section data-reading-section id="cv" className="section cv-section" aria-labelledby="cv-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>07</span>{t("Curriculum vitae")}</p><span className="section-note">{t("A path through astronomy")}</span></div><div className="cv-layout"><div className="cv-intro"><SectionTitle section="cv">{locale === "en" ? <>Curriculum<br/>vitae</> : t("Curriculum vitae")}</SectionTitle><a className="button" href={assetPath(`/${cvFilename}`)} download={cvFilename}>{t("Download full CV ↓")}</a><p className="download-note">{t("PDF · 3 pages · Updated 16 November 2026")}</p></div><div className="cv-details"><h3 className="eyebrow">{t("Education")}</h3><ol className="timeline"><li><span>{t("2024 — present")}</span><div><h4>{t("PhD in Astrophysics")}</h4><p>{t("Cosmic Dawn Center · DTU Space")}</p><small>{t("Supervisor: Francesco Valentino")}</small></div></li><li><span>2022 — 2024</span><div><h4>{t("MSc in Astronomy")}</h4><p>{t("Leiden University, the Netherlands")}</p><small>{t("Astronomy Research programme")}</small></div></li><li><span>2017 — 2022</span><div><h4>{t("BS in Physics & BA in Philosophy")}</h4><p>{t("University of California, Santa Cruz")}</p><small>{t("Astrophysics and philosophy of science")}</small></div></li></ol><div className="cv-detail-columns"><div><h3 className="eyebrow">{t("Recognition")}</h3><p><External href="https://www.universiteitleiden.nl/en/news/2024/11/several-leiden-science-students-excel-and-win-khmw-young-talent-awards">{t("KHMW Young Talent Award")} <Arrow up/></External><small>{t("Astronomy master’s thesis prize · 2024")}</small></p><p>{t("UCSC Dean’s Scholarship")}<small>{t("Undergraduate studies")}</small></p></div><div><h3 className="eyebrow">{t("Community")}</h3><p>{t("DTU Space PhD Committee")}<small>{t("Member · 2026–2027")}</small></p><p>{t("DAWN Summit 2025")}<small>{t("Scientific Organizing Committee")}</small></p><p>{t("Public observing at Leiden")}<small>L.A.D. “F. Kaiser” · 2022–2023</small></p></div></div></div></div></div></section>
 <section data-reading-section id="contact" className="section contact" aria-labelledby="contact-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>08</span>{t("Contact")}</p>
     </div>
     <div className="contact-layout">
       <div>
         <SectionTitle section="contact">{t("Let’s talk")}<br/><em>{t("about galaxies.")}</em></SectionTitle>
         <div className="email-row">
           <a href={`mailto:${emailAddress}`}>{emailAddress} <Arrow up/></a>
           <button onClick={() => copy(emailAddress, t("Email address copied."))} aria-label={t("Copy email address")}>{t("Copy")}</button>
         </div>
         <div className="contact-institution">
           <span className="eyebrow">{t("Based at")}</span>
           <h3>{t("Cosmic Dawn Center")}</h3>
           <address>
             {t("DTU Space")}<br/>
             {t("Technical University of Denmark")}<br/>
             {siteText["Office address"]}
           </address>
           <div className="contact-links">
             <External href="https://cosmicdawn.dk/staff/pengpei-zhu/">{t("DAWN profile")} <Arrow up/></External>
             <External href="https://orcid.org/0000-0002-6768-8335">ORCID <Arrow up/></External>
             <External href="https://www.linkedin.com/in/pengpei-zhu-52631b265/">LinkedIn <Arrow up/></External>
             <External href="https://scholar.google.com/citations?user=WzUUBYwAAAAJ&amp;hl=en">{t("Google Scholar")} <Arrow up/></External>
             <External href="https://orbit.dtu.dk/en/persons/pengpei-zhu/">DTU Orbit <Arrow up/></External>
           </div>
         </div>
       </div>
       <section id="visitors" data-reading-section className="contact-visitors" aria-labelledby="visitors-title">
         <div className="section-title">
           <h3 id="visitors-title">{t("Visitors")}</h3>
           <ReadingTrack section="visitors"/>
         </div>
         <figure className="visitor-map">
           <iframe
             src={assetPath("/visitor-map.html")}
             title={t("Visitor map from MapMyVisitors")}
             sandbox="allow-scripts allow-top-navigation-by-user-activation"
           />
           <figcaption>{t("Visitor map by")} <External href="https://mapmyvisitors.com/">MapMyVisitors <Arrow up/></External></figcaption>
         </figure>
       </section>
     </div>
     <footer>
       <a href="#top">Pengpei Zhu <span lang="zh">朱芃佩</span></a>
       <span>{t("© 2026 · Astronomy & curiosity")}</span>
     </footer>
   </div>
 </section>
</main>
 {active && (
   <a className="back-to-top" href="#top" aria-label={t("Back to top")}>
     <span className="back-to-top-arrow" aria-hidden="true">↑</span>
     <span className="back-to-top-label">{t("Back to top")}</span>
   </a>
 )}
 <dialog
   ref={dialog}
   className="figure-dialog"
   aria-labelledby="figure-title"
   onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
 >
   <div className="dialog-header">
     <h2 id="figure-title">{t(expandedFigure.title)}</h2>
     <button autoFocus className="small-button" onClick={() => dialog.current?.close()}>{t("Close ×")}</button>
   </div>
   <img src={assetPath(expandedFigure.image)} alt={t(expandedFigure.alt)} width={expandedFigure.width} height={expandedFigure.height} loading="lazy"/>
   <p>
     <External href={assetPath(expandedFigure.pdf || expandedFigure.image)}>
       {t(expandedFigure.pdf ? "Open original PDF" : "Open full-resolution image")} <Arrow up/>
     </External>
   </p>
 </dialog>
<div role="status" aria-live="polite" className={`toast ${notice?"visible":""}`}>{notice}</div></>;
}
