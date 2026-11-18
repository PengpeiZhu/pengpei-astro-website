import { SitePage } from "../../site-page";
import { chineseLocale, type ChineseRoute } from "./locale";

export default async function ChinesePage({ params }: ChineseRoute) {
  return <SitePage locale={await chineseLocale(params)} />;
}
