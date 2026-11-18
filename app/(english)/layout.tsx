import { SiteLayout, siteMetadata } from "../site-layout";

export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
