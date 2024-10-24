import { PropsWithChildren, useState } from "react";

import {
  ContentContext,
  ContentType,
  RssURL,
  SummaryContent
} from "@/contexts/ContentContext";

const ContentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [type, setType] = useState<ContentType>("");
  const [textUrls, setTextUrls] = useState<string[]>([]);
  const [rssUrls, setRssUrls] = useState<RssURL[]>([]);
  const [textIndex, setTextIndex] = useState<number>(-1);
  const [textPage, setTextPage] = useState<number>(0);
  const [rssIndex, setRssIndex] = useState<number>(-1);
  const [rssPage, setRssPage] = useState<number>(0);
  const [textSummaries, setTextSummaries] = useState<SummaryContent[]>([]);
  const [rssSummaries, setRssSummaries] = useState<SummaryContent[]>([]);

  return (
    <ContentContext.Provider
      value={{
        type,
        updateType: setType,
        textUrls,
        updateTextUrls: setTextUrls,
        rssUrls,
        updateRssUrls: setRssUrls,
        textIndex,
        updateTextIndex: setTextIndex,
        textPage,
        updateTextPage: setTextPage,
        rssIndex,
        updateRssIndex: setRssIndex,
        rssPage,
        updateRssPage: setRssPage,
        textSummaries,
        updateTextSummaries: setTextSummaries,
        rssSummaries,
        updateRssSummaries: setRssSummaries
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentProvider };
