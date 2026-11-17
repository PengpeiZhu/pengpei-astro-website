import type { SiteSection } from "./site-text";

export type ResearchFigure = {
  title: string;
  caption: SiteSection;
  image: string;
  width: number;
  height: number;
  alt: string;
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
  ],
  "post-starburst-galaxies": [
    {
      title: "SQuIGGLE star formation and molecular gas",
      caption: "SQuIGGLE figure caption",
      image: "/research/squiggle-star-formation-figure-3.svg",
      width: 673,
      height: 645,
      alt: "Star formation rate versus molecular hydrogen mass. Red stars show SQuIGGLE post-starburst galaxies and coloured contours show three comparison samples.",
    },
  ],
};
