"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/site-path";
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

export default function Home({ copy: siteText, showJobBadge }: { copy: SiteText; showJobBadge: boolean }){
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState("selected"),[query,setQuery]=useState(""),[year,setYear]=useState("all"),[notice,setNotice]=useState("");
 const [expandedFigure, setExpandedFigure] = useState(researchFigures["neutral-outflows"][0]);
 const dialog=useRef<HTMLDialogElement>(null),menuButton=useRef<HTMLButtonElement>(null);
 const active=useReadingProgress(sectionIds);
 const matches=publications.filter(p=>(filter==="all"||(filter==="selected"&&p.selected)||(filter==="first"&&p.firstAuthor))&&(year==="all"||p.year===year)&&`${p.title} ${p.authors} ${p.journal} ${p.year} ${p.doi} ${p.arxiv} Pengpei Zhu`.toLowerCase().includes(query.toLowerCase().trim())).sort((a,b)=>filter==="selected"?0:a.scixOrder-b.scixOrder);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(""),4000);return()=>clearTimeout(timer)},[notice]);
 async function copy(text:string,success:string){try{await navigator.clipboard.writeText(text);setNotice(success)}catch{setNotice("Copy is unavailable here. Select the text, or download the bibliography.")}}
 function expandFigure(figure: ResearchFigure) {
   setExpandedFigure(figure);
   dialog.current?.showModal();
 }
 return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><a href="#top" className="wordmark" aria-label="Pengpei Zhu, home"><img className="mark" src={assetPath("/branding/zhu-seal.svg")} alt="" aria-hidden="true" width="42" height="42"/>Pengpei Zhu<span className="wordmark-cn" lang="zh">朱芃佩</span></a><button ref={menuButton} className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?"Close −":"Menu +"}</button><nav id="main-nav" aria-label="Main navigation" className={menu?"open":""} onKeyDown={e=>{if(e.key==="Escape"){setMenu(false);menuButton.current?.focus()}}}>{openingLinks.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?"location":undefined} onClick={()=>setMenu(false)}>{label}</a>)}</nav></div></header>
 <main id="main">
  <section id="top" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
    <div className="hero-main wrap">
      <div>
        <p className="eyebrow hero-eyebrow"><i/>{siteText["Opening label"]}</p>
        <h1 id="hero-title">Pengpei Zhu <span lang="zh">朱芃佩</span></h1>
        <p className="hero-statement">{siteText["Opening headline"]}</p>
        <p className="hero-description">{siteText["Opening introduction"]}</p>
        <p className="hero-palette-credit">{siteText["Colour credit"]}</p>
        <nav className="hero-actions" aria-label="Explore my website">
          {openingLinks.map(([id, label]) => (
            <a className="hero-link" key={id} href={`#${id}`}>{label}<Arrow/></a>
          ))}
        </nav>
      </div>
      <div className="hero-aside">
        <div className="institution-marks" aria-label="Affiliations">
          <a href="https://www.space.dtu.dk/" target="_blank" rel="noreferrer" aria-label="DTU Space">
            <img className="dtu-mark" src={assetPath("/branding/dtu-logo.png")}  alt="DTU" width="1951" height="2846"/>
          </a>
          <a href="https://cosmicdawn.dk/" target="_blank" rel="noreferrer" aria-label="Cosmic Dawn Center">
            <img className="dawn-mark" src={assetPath("/branding/dawn-logo.png")}  alt="Cosmic Dawn Center" width="1625" height="375"/>
          </a>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            <img src={assetPath("/portrait-pengpei-zhu.jpg")} alt="Pengpei Zhu by the water" width="956" height="822" fetchPriority="high"/>
            {showJobBadge && <span className="profile-job-badge">{siteText["Job search badge"]}</span>}
          </div>
          <figcaption>
            <span>{siteText["Profile role"]}</span>
            <span>{siteText["Profile affiliation"]}</span>
          </figcaption>
        </figure>
        <address className="hero-contact" aria-label="Email, CV and contact details">
          <a className="hero-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
          <div className="hero-contact-links">
            <a href={assetPath(`/${cvFilename}`)} download={cvFilename}>Download CV (PDF) <span aria-hidden="true">↓</span></a>
            <a href="#contact">Contact <Arrow/></a>
          </div>
        </address>
      </div>
    </div>
  </section>
  <div className="page-index"><div className="index-inner wrap"><div className="index-contact"><span className="index-label">Contact</span><a href={`mailto:${emailAddress}`}>{emailAddress}</a></div><div><span className="index-label">On this page</span><nav aria-label="On this page">{nav.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?"location":undefined}>{label}<ReadingTrack section={id}/></a>)}</nav></div></div></div>

 <section id="about" data-reading-section className="section about" aria-labelledby="about-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>01</span>About me</p>
     </div>
     <div className="intro-grid">
       <div>
         <SectionTitle section="about">{siteText["About heading"]}</SectionTitle>
         <figure className="about-archery">
           <External href={assetPath("/archery-lagrange-points.jpg")}>
             <img
               src={assetPath("/archery-lagrange-points.jpg")}
               alt="Pengpei drawing a recurve bow with the five Lagrange points marked in red around him."
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
       <li><span>2017–2022 · Santa Cruz</span><strong>Physics &amp; Philosophy</strong><p>BS &amp; BA · UC Santa Cruz</p></li>
       <li><span>2022–2024 · Leiden</span><strong>Astronomy</strong><p>MSc · Leiden University</p></li>
       <li><span>2024–present · Denmark</span><strong>Astrophysics</strong><p>PhD · Cosmic Dawn Center, DTU</p></li>
     </ol>
   </div>
 </section>
 <section id="research" data-reading-section className="section research" aria-labelledby="research-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>02</span>Research</p>
       <span className="section-note">From spectra to physical histories</span>
     </div>
     <div className="intro-grid">
       <SectionTitle section="research">Research</SectionTitle>
       <div className="intro-copy">{siteText["Research introduction"]}</div>
     </div>
     <nav className="research-contents" aria-label="Research topics">
       {projects.map((project, index) => (
         <a href={`#${project.id}`} key={project.id}>
           <span>0{index + 1}</span>{project.label}<Arrow/><ReadingTrack section={project.id}/>
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
                 <p className="eyebrow">0{index + 1} / {project.label}</p>
                 <h3 id={`${project.id}-title`}>{siteText[project.title]}</h3>
                 <ReadingTrack section={project.id}/>
                 <p className="research-meta">{project.meta}</p>
               </div>
               <div className="topic-copy">
                 {siteText[project.text]}
                 {paperUrl && (
                   <a className="text-link" href={paperUrl} target="_blank" rel="noreferrer">{project.link}<Arrow up/></a>
                 )}
               </div>
             </div>
             {figures && (
               <div className="research-figures">
                 {figures.map(figure => (
                   <figure className="science-figure" key={figure.image}>
                     <div className="figure-heading">
                       <span className="eyebrow">{figure.title}</span>
                       <button className="small-button" onClick={() => expandFigure(figure)} aria-label={`Expand ${figure.title}`}>
                         Expand <span aria-hidden="true">⤢</span>
                       </button>
                     </div>
                     <button className="figure-image-button" aria-label={`View ${figure.title}`} onClick={() => expandFigure(figure)}>
                       <img src={assetPath(figure.image)} alt={figure.alt} width={figure.width} height={figure.height} loading="lazy"/>
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
       <p className="eyebrow"><span>03</span>Publications</p>
       <a className="text-link" href={assetPath("/publications.bib")} download>Download bibliography <small>BIB</small>↓</a>
     </div>
     <div className="publications-heading">
       <SectionTitle section="publications">Publications</SectionTitle>
       <a className="scix-link" href={sciXUrl} target="_blank" rel="noreferrer">
         <span>
           <small>My publication list</small>
           <span className="scix-link-title">Explore all papers on SciX</span>
         </span>
         <Arrow up/>
       </a>
     </div>
   <p className="scix-note">{publications.length} publications and preprints, matched to SciX · Updated {publicationSource.displayDate}.</p><div className="publication-controls"><div className="filter-buttons" role="group" aria-label="Filter publications">{[["selected","Selected"],["all",`All publications · ${publications.length}`],["first","First author"]].map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="search-controls"><label className="search-label"><span className="sr-only">Search publications</span><span aria-hidden="true">⌕</span><input type="search" value={query} placeholder="Search papers…" onChange={e=>{setQuery(e.target.value);if(e.target.value)setFilter("all")}}/></label><label><span className="sr-only">Filter by year</span><select value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{Array.from(new Set(publications.map(p => p.year))).sort((a,b) => Number(b)-Number(a)).map(y=><option key={y}>{y}</option>)}</select></label></div></div><p className="result-count" aria-live="polite">{matches.length} {matches.length===1?"publication":"publications"} {filter==="selected"?"selected":"shown"}<span>SciX bibliography · {publicationSource.displayDate}</span></p>
 <div className="publication-list">{matches.map(p => {
   const journalUrl = p.doi ? `https://doi.org/${p.doi}` : undefined;
   const recordUrl = p.scix || (p.arxiv ? arxivUrl(p.arxiv) : undefined);
   return <article className="publication" key={p.id}><div className="publication-year">{p.year}<span>{p.firstAuthor?"First author":p.preprint?"Preprint":"Coauthor"}</span></div><div className="publication-content"><h3><External href={journalUrl || recordUrl || sciXUrl}>{p.title} <Arrow up/></External></h3><p className="authors">{p.authors.split("Pengpei Zhu").map((part,i)=><span key={i}>{i>0&&<strong>Pengpei Zhu</strong>}{part}</span>)}{!p.includesAuthor&&<span> · with <strong>Pengpei Zhu</strong></span>}</p><p className="journal">{p.journal}{p.volume&&` ${p.volume}`}{p.pages&&`, ${p.pages}`}{p.preprint&&` · arXiv:${p.arxiv}`}</p>{"summary" in p&&p.summary&&<p className="publication-summary">{p.summary}</p>}<div className="publication-links">{journalUrl && <External href={journalUrl}>Journal <Arrow up/></External>}{recordUrl && <External href={recordUrl}>{p.scix ? "SciX" : "arXiv"} <Arrow up/></External>}<details><summary>BibTeX +</summary><div className="citation-panel"><button className="small-button" onClick={()=>copy(p.bib,"BibTeX citation copied.")}>Copy BibTeX</button><pre tabIndex={0}>{p.bib}</pre></div></details></div></div></article>;
 })}</div>{!matches.length&&<div className="empty-state"><h3>No papers match these filters.</h3><p>Try a different title, author, or year.</p><button className="button" onClick={()=>{setQuery("");setYear("all");setFilter("all")}}>Clear filters <Arrow/></button></div>}<p className="publication-footnote">{siteText["Publication links note"]}</p></div></section>
 <section id="panels" data-reading-section className="section panels" aria-labelledby="panels-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>04</span>Interactive projects</p></div>
     <div className="intro-grid">
       <SectionTitle section="panels">Explore<br/>the science.</SectionTitle>
       <div className="intro-copy">{siteText["Interactive projects introduction"]}</div>
     </div>
     <InteractiveProjects />
   </div>
 </section>
 <section id="talks" data-reading-section className="section talks-section" aria-labelledby="talks-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>05</span>Presentations</p></div>
     <SectionTitle section="talks">Talks &amp; Posters</SectionTitle>
     <ol className="presentation-list">
       {presentations.map(presentation => {
         const media = `/talks/${presentation.id}`;
         return (
           <li className="presentation-row" key={presentation.id}>
             <div>
               <p className="presentation-format">{presentation.format}</p>
               <h3>{presentation.title}</h3>
               <p className="presentation-event">
                 {presentation.href
                   ? <External href={presentation.href}>{presentation.event} <Arrow up/></External>
                   : presentation.event}
               </p>
               <p className="presentation-date">{presentation.venue} · <time dateTime={presentation.startDate}>{presentation.date}</time></p>
             </div>
             <a
               className="presentation-material"
               data-kind={presentation.material}
               href={assetPath(`${media}.pdf`)}
               target="_blank"
               rel="noreferrer"
               aria-label={`${presentation.material} (PDF) for ${presentation.event} (opens in a new tab)`}
             >
               <img src={assetPath(`${media}.jpg`)} alt="" width={presentation.preview.width} height={presentation.preview.height} loading="lazy"/>
               <span>{presentation.material} (PDF) <Arrow up/></span>
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
       <p className="eyebrow"><span>06</span>Astrophotos</p>
       <span className="section-note">Under the same sky</span>
     </div>
     <div className="intro-grid">
       <SectionTitle section="photography">Astrophotos</SectionTitle>
       <div className="intro-copy">{siteText["Astrophotos introduction"]}</div>
     </div>
     <Astrophotos />
   </div>
 </section>
 <section data-reading-section id="cv" className="section cv-section" aria-labelledby="cv-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>07</span>Curriculum vitae</p><span className="section-note">A path through astronomy</span></div><div className="cv-layout"><div className="cv-intro"><SectionTitle section="cv">Curriculum<br/>vitae</SectionTitle><a className="button" href={assetPath(`/${cvFilename}`)} download={cvFilename}>Download full CV ↓</a><p className="download-note">PDF · 3 pages · Updated 16 November 2026</p></div><div className="cv-details"><h3 className="eyebrow">Education</h3><ol className="timeline"><li><span>2024 — present</span><div><h4>PhD in Astrophysics</h4><p>Cosmic Dawn Center · DTU Space</p><small>Supervisor: Francesco Valentino</small></div></li><li><span>2022 — 2024</span><div><h4>MSc in Astronomy</h4><p>Leiden University, the Netherlands</p><small>Astronomy Research programme</small></div></li><li><span>2017 — 2022</span><div><h4>BS in Physics &amp; BA in Philosophy</h4><p>University of California, Santa Cruz</p><small>Astrophysics and philosophy of science</small></div></li></ol><div className="cv-detail-columns"><div><h3 className="eyebrow">Recognition</h3><p><External href="https://www.universiteitleiden.nl/en/news/2024/11/several-leiden-science-students-excel-and-win-khmw-young-talent-awards">KHMW Young Talent Award <Arrow up/></External><small>Astronomy master’s thesis prize · 2024</small></p><p>UCSC Dean’s Scholarship<small>Undergraduate studies</small></p></div><div><h3 className="eyebrow">Community</h3><p>DTU Space PhD Committee<small>Member · 2026–2027</small></p><p>DAWN Summit 2025<small>Scientific Organizing Committee</small></p><p>Public observing at Leiden<small>L.A.D. “F. Kaiser” · 2022–2023</small></p></div></div></div></div></div></section>
 <section data-reading-section id="contact" className="section contact" aria-labelledby="contact-title">
   <div className="wrap">
     <div className="section-header">
       <p className="eyebrow"><span>08</span>Contact</p>
     </div>
     <div className="contact-layout">
       <div>
         <SectionTitle section="contact">Let’s talk<br/><em>about galaxies.</em></SectionTitle>
         <div className="email-row">
           <a href={`mailto:${emailAddress}`}>{emailAddress} <Arrow up/></a>
           <button onClick={() => copy(emailAddress, "Email address copied.")} aria-label="Copy email address">Copy</button>
         </div>
         <div className="contact-institution">
           <span className="eyebrow">Based at</span>
           <h3>Cosmic Dawn Center</h3>
           <address>
             DTU Space<br/>
             Technical University of Denmark<br/>
             {siteText["Office address"]}
           </address>
           <div className="contact-links">
             <External href="https://cosmicdawn.dk/staff/pengpei-zhu/">DAWN profile <Arrow up/></External>
             <External href="https://orcid.org/0000-0002-6768-8335">ORCID <Arrow up/></External>
             <External href="https://www.linkedin.com/in/pengpei-zhu-52631b265/">LinkedIn <Arrow up/></External>
             <External href="https://scholar.google.com/citations?user=WzUUBYwAAAAJ&amp;hl=en">Google Scholar <Arrow up/></External>
             <External href="https://orbit.dtu.dk/en/persons/pengpei-zhu/">DTU Orbit <Arrow up/></External>
           </div>
         </div>
       </div>
       <section id="visitors" data-reading-section className="contact-visitors" aria-labelledby="visitors-title">
         <div className="section-title">
           <h3 id="visitors-title">Visitors</h3>
           <ReadingTrack section="visitors"/>
         </div>
         <figure className="visitor-map">
           <iframe
             src={assetPath("/visitor-map.html")}
             title="Visitor map from MapMyVisitors"
             sandbox="allow-scripts allow-top-navigation-by-user-activation"
           />
           <figcaption>Visitor map by <External href="https://mapmyvisitors.com/">MapMyVisitors <Arrow up/></External></figcaption>
         </figure>
       </section>
     </div>
     <footer>
       <a href="#top">Pengpei Zhu <span lang="zh">朱芃佩</span></a>
       <span>© 2026 · Astronomy &amp; curiosity</span>
     </footer>
   </div>
 </section>
</main>
 {active && (
   <a className="back-to-top" href="#top" aria-label="Back to top">
     <span className="back-to-top-arrow" aria-hidden="true">↑</span>
     <span className="back-to-top-label">Back to top</span>
   </a>
 )}
 <dialog
   ref={dialog}
   className="figure-dialog"
   aria-labelledby="figure-title"
   onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
 >
   <div className="dialog-header">
     <h2 id="figure-title">{expandedFigure.title}</h2>
     <button autoFocus className="small-button" onClick={() => dialog.current?.close()}>Close ×</button>
   </div>
   <img src={assetPath(expandedFigure.image)} alt={expandedFigure.alt} width={expandedFigure.width} height={expandedFigure.height} loading="lazy"/>
   <p>
     <External href={assetPath(expandedFigure.pdf || expandedFigure.image)}>
       {expandedFigure.pdf ? "Open original PDF" : "Open full-resolution image"} <Arrow up/>
     </External>
   </p>
 </dialog>
<div role="status" aria-live="polite" className={`toast ${notice?"visible":""}`}>{notice}</div></>;
}
