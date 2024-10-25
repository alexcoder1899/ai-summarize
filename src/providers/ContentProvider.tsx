import { PropsWithChildren, useState } from "react";

import {
  CommonUrl,
  ContentContext,
  ContentType,
  SummaryContent
} from "@/contexts/ContentContext";

const ContentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [type, setType] = useState<ContentType>("");
  const [textUrls, setTextUrls] = useState<string[]>([]);
  const [rssUrls, setRssUrls] = useState<CommonUrl[]>([]);
  const [feedlyUrls, setFeedlyUrls] = useState<CommonUrl[]>([]);
  const [textIndex, setTextIndex] = useState<number>(-1);
  const [textPage, setTextPage] = useState<number>(0);
  const [rssIndex, setRssIndex] = useState<number>(-1);
  const [rssPage, setRssPage] = useState<number>(0);
  const [feedlyIndex, setFeedlyIndex] = useState<number>(-1);
  const [feedlyPage, setFeedlyPage] = useState<number>(0);
  const [textSummaries, setTextSummaries] = useState<SummaryContent[]>([]);
  const [rssSummaries, setRssSummaries] = useState<SummaryContent[]>([]);
  const [feedlySummaries, setFeedlySummaries] = useState<SummaryContent[]>([]);

  return (
    <ContentContext.Provider
      value={{
        type,
        updateType: setType,
        textUrls,
        updateTextUrls: setTextUrls,
        rssUrls,
        updateRssUrls: setRssUrls,
        feedlyUrls,
        updateFeedlyUrls: setFeedlyUrls,
        textIndex,
        updateTextIndex: setTextIndex,
        textPage,
        updateTextPage: setTextPage,
        rssIndex,
        updateRssIndex: setRssIndex,
        rssPage,
        updateRssPage: setRssPage,
        feedlyIndex,
        updateFeedlyIndex: setFeedlyIndex,
        feedlyPage,
        updateFeedlyPage: setFeedlyPage,
        textSummaries,
        updateTextSummaries: setTextSummaries,
        rssSummaries,
        updateRssSummaries: setRssSummaries,
        feedlySummaries,
        updateFeedlySummaries: setFeedlySummaries
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentProvider };
