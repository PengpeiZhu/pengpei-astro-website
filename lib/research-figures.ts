import type { SiteSection } from "./site-text";

export type ResearchFigure = {
  title: string;
  caption: SiteSection;
  image: string;
  width: number;
  height: number;
  alt: string;
  layout?: "wide" | "tall";
  pdf?: string;
};

export const researchFigures: Record<string, readonly ResearchFigure[]> = {
  "neutral-outflows": [
    {
      title: "Gas recycling schematic",
      caption: "Gas recycling figure caption",
      image: "/research/phd1-gas-recycling-schematic.png",
      width: 1254,
      height: 1254,
      alt: "A diagram of a Na I D outflow from a quiescent galaxy. Dashed green arrows trace a possible path for bound gas to fall back.",
    },
    {
      title: "Outflow and escape velocities",
      caption: "Escape velocity figure caption",
      image: "/research/rs-outflow-escape-velocity.png",
      width: 2201,
      height: 2200,
      alt: "A plot of outflow velocity against dynamical-mass escape velocity in kilometres per second. Points with error bars lie on both sides of the dashed equality line.",
      pdf: "/research/rs-outflow-escape-velocity.pdf",
    },
    {
      title: "DeepDive neutral gas outflows",
      caption: "DeepDive figure caption",
      image: "/deepdive-outflows.png",
      width: 5235,
      height: 1886,
      alt: "Star formation rate versus stellar mass and neutral gas velocity offset for DeepDive galaxies and literature samples. Distant quiescent galaxies show neutral outflows despite low star formation rates.",
      layout: "wide",
    },
  ],
  "post-starburst-galaxies": [
    {
      title: "SQuIGGLE Keck/NIRES spectra",
      caption: "SQuIGGLE figure caption",
      image: "/research/squiggle-keck-nires-figure-1.svg",
      width: 1501,
      height: 2065,
      alt: "Paired panels show the spectra near H-alpha and the continuum-subtracted line fits for the SQuIGGLE post-starburst galaxies observed with Keck/NIRES.",
      layout: "tall",
    },
  ],
};
