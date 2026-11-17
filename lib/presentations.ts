type Presentation = {
  id: string;
  title: string;
  event: string;
  venue: string;
  date: string;
  startDate: string;
  format: string;
  href?: string;
  material: "Slides" | "Poster";
  preview: { width: number; height: number };
};

export const presentations: Presentation[] = [
  {
    id: "eas-2026-poster",
    title: "There and back again? Neutral outflows in z ∼ 3.5 quiescent galaxies",
    event: "EAS Annual Meeting 2026",
    venue: "Lausanne, Switzerland",
    date: "29 June–3 July 2026",
    startDate: "2026-06-29",
    format: "ePoster",
    href: "https://eas.unige.ch/EAS2026/index.jsp",
    material: "Poster",
    preview: { width: 581, height: 820 },
  },
  {
    id: "phd-mandatory-lecture",
    title: "In Quenched Giants, Gas Flows and Stars Remember",
    event: "PhD mandatory lecture",
    venue: "DTU Space, Denmark",
    date: "1 June 2026",
    startDate: "2026-06-01",
    format: "Lecture",
    material: "Slides",
    preview: { width: 820, height: 462 },
  },
  {
    id: "charting-cosmic-dawn-2026",
    title: "DeepDive: Neutral gas outflows in z ∼ 3.5 quiescent galaxies",
    event: "Charting Cosmic Dawn in Copenhagen",
    venue: "Helsingør, Denmark",
    date: "13 April 2026",
    startDate: "2026-04-13",
    format: "Contributed talk · 15 min",
    href: "https://indico.nbi.ku.dk/event/2223/",
    material: "Slides",
    preview: { width: 820, height: 462 },
  },
  {
    id: "tokyo-jwst-2026",
    title: "DeepDive: Neutral gas outflows in z ∼ 3.5 quiescent galaxies",
    event: "Tokyo JWST 2026",
    venue: "Tokyo, Japan",
    date: "27 March 2026",
    startDate: "2026-03-27",
    format: "Contributed talk · 7 min",
    href: "http://cos.icrr.u-tokyo.ac.jp/conference/tokyojwst2026/",
    material: "Slides",
    preview: { width: 820, height: 462 },
  },
  {
    id: "msc-colloquium",
    title: "The pair NGC 833 & NGC 835 as a case study of galaxy interaction in compact group",
    event: "MSc colloquium",
    venue: "Leiden Observatory",
    date: "25 June 2024",
    startDate: "2024-06-25",
    format: "Colloquium",
    material: "Slides",
    preview: { width: 820, height: 462 },
  },
  {
    id: "nac-2024-poster",
    title: "The pair NGC 833/835 as a case study of a gas-rich galaxy interaction",
    event: "Netherlands Astronomers’ Conference 2024",
    venue: "Egmond aan Zee, Netherlands",
    date: "13–15 May 2024",
    startDate: "2024-05-13",
    format: "Poster",
    href: "https://research.hva.nl/p/en/activities/nederlandse-astronomen-conferentie-2024",
    material: "Poster",
    preview: { width: 580, height: 820 },
  },
];
