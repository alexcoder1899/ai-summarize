import { createContext } from "react";

type ContentType = "" | "text" | "rss" | "feedly";

type SummaryContent = {
  ai_text: string;
  summary: string;
};

type RssURL = {
  title: string;
  summary: string;
  link: string;
};

interface IContentContext {
  type: ContentType;
  updateType: (type: ContentType) => void;
  textUrls: string[];
  updateTextUrls: (urls: string[]) => void;
  rssUrls: RssURL[];
  updateRssUrls: (urls: RssURL[]) => void;
  textIndex: number;
  updateTextIndex: (index: number) => void;
  textPage: number;
  updateTextPage: (page: number) => void;
  rssIndex: number;
  updateRssIndex: (index: number) => void;
  rssPage: number;
  updateRssPage: (page: number) => void;
  textSummaries: SummaryContent[];
  updateTextSummaries: (summaries: SummaryContent[]) => void;
  rssSummaries: SummaryContent[];
  updateRssSummaries: (summaries: SummaryContent[]) => void;
}

export const ContentContext = createContext<IContentContext>({
  type: "",
  updateType: () => {},
  textUrls: [],
  updateTextUrls: () => {},
  rssUrls: [],
  updateRssUrls: () => {},
  textIndex: -1,
  updateTextIndex: () => {},
  textPage: 0,
  updateTextPage: () => {},
  rssIndex: -1,
  updateRssIndex: () => {},
  rssPage: 0,
  updateRssPage: () => {},
  textSummaries: [],
  updateTextSummaries: () => {},
  rssSummaries: [],
  updateRssSummaries: () => {}
});

export type { ContentType, RssURL, SummaryContent };
