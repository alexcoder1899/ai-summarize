import { createContext } from "react";

type ContentType = "" | "text" | "rss" | "feedly";

type SummaryContent = {
  ai_text: string;
  summary: string;
};

type CommonUrl = {
  title: string;
  summary: string;
  link: string;
};

interface IContentContext {
  type: ContentType;
  updateType: (type: ContentType) => void;
  textUrls: string[];
  updateTextUrls: (urls: string[]) => void;
  rssUrls: CommonUrl[];
  updateRssUrls: (urls: CommonUrl[]) => void;
  feedlyUrls: CommonUrl[];
  updateFeedlyUrls: (urls: CommonUrl[]) => void;
  textIndex: number;
  updateTextIndex: (index: number) => void;
  textPage: number;
  updateTextPage: (page: number) => void;
  rssIndex: number;
  updateRssIndex: (index: number) => void;
  rssPage: number;
  updateRssPage: (page: number) => void;
  feedlyIndex: number;
  updateFeedlyIndex: (index: number) => void;
  feedlyPage: number;
  updateFeedlyPage: (page: number) => void;
  textSummaries: SummaryContent[];
  updateTextSummaries: (summaries: SummaryContent[]) => void;
  rssSummaries: SummaryContent[];
  updateRssSummaries: (summaries: SummaryContent[]) => void;
  feedlySummaries: SummaryContent[];
  updateFeedlySummaries: (summaries: SummaryContent[]) => void;
}

export const ContentContext = createContext<IContentContext>({
  type: "",
  updateType: () => {},
  textUrls: [],
  updateTextUrls: () => {},
  rssUrls: [],
  updateRssUrls: () => {},
  feedlyUrls: [],
  updateFeedlyUrls: () => {},
  textIndex: -1,
  updateTextIndex: () => {},
  textPage: 0,
  updateTextPage: () => {},
  rssIndex: -1,
  updateRssIndex: () => {},
  rssPage: 0,
  updateRssPage: () => {},
  feedlyIndex: -1,
  updateFeedlyIndex: () => {},
  feedlyPage: 0,
  updateFeedlyPage: () => {},
  textSummaries: [],
  updateTextSummaries: () => {},
  rssSummaries: [],
  updateRssSummaries: () => {},
  feedlySummaries: [],
  updateFeedlySummaries: () => {}
});

export type { ContentType, CommonUrl, SummaryContent };
