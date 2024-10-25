import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";

import Button from "@/components/common/Button";
import { TextUrlIcon } from "@/components/icons/TextUrlIcon";
import { RSSIcon } from "@/components/icons/RSSIcon";
import { FeedlyIcon } from "@/components/icons/FeedlyIcon";
import { CommonUrl, ContentContext, LoadingContext } from "@/contexts";
import config from "@/config";

type UrlItemProps = {
  highlighted: boolean;
  onItemClick: () => void;
};

type TextUrlItemProps = {
  url: string;
};

const TextUrlItem: React.FC<UrlItemProps & TextUrlItemProps> = ({
  url,
  highlighted,
  onItemClick
}) => (
  <div
    className={clsx(
      "group flex cursor-pointer items-center gap-x-4 text-white hover:text-primary",
      { "!text-primary": highlighted }
    )}
    onClick={onItemClick}
  >
    <TextUrlIcon
      fill="#B03DF8"
      className={clsx(
        "shrink-0 group-hover:!fill-primary group-hover:stroke-primary",
        {
          "stroke-primary": highlighted
        }
      )}
      width={24}
    />
    <p className="line-clamp-1 font-bold">{url}</p>
  </div>
);

type RSSUrlItemProps = {
  url: CommonUrl;
};

const RSSUrlItem: React.FC<UrlItemProps & RSSUrlItemProps> = ({
  url,
  highlighted,
  onItemClick
}) => {
  return (
    <div
      className={clsx(
        "group flex cursor-pointer gap-x-4 text-white hover:text-primary",
        { "text-primary": highlighted }
      )}
      onClick={onItemClick}
    >
      <RSSIcon
        width={24}
        className={clsx("mt-2 shrink-0 group-hover:stroke-primary", {
          "stroke-primary": highlighted
        })}
      />
      <div
        className={clsx("flex flex-col gap-y-2", {
          "text-primary": highlighted
        })}
      >
        <p className="line-clamp-1 text-[24px] font-bold">{url.title}</p>
        <p className="line-clamp-3 text-[18px]">{url.summary}</p>
      </div>
    </div>
  );
};

type FeedlyUrlItemProps = {
  url: CommonUrl;
};

const FeedlyUrlItem: React.FC<UrlItemProps & FeedlyUrlItemProps> = ({
  url,
  highlighted,
  onItemClick
}) => {
  return (
    <div
      className={clsx(
        "group flex cursor-pointer gap-x-4 text-white hover:text-primary",
        { "text-primary": highlighted }
      )}
      onClick={onItemClick}
    >
      <FeedlyIcon
        className={clsx("shrink-0 group-hover:stroke-primary", {
          "stroke-primary": highlighted
        })}
        width={24}
      />
      <div
        className={clsx("flex flex-col gap-y-2", {
          "text-primary": highlighted
        })}
      >
        <p className="line-clamp-1 text-[24px] font-bold">{url.title}</p>
        <p className="line-clamp-3 text-[18px]">{url.summary}</p>
      </div>
    </div>
  );
};

const Summary: React.FC = () => {
  const {
    type,
    textUrls,
    rssUrls,
    feedlyUrls,
    textIndex,
    updateTextIndex,
    textPage,
    updateTextPage,
    rssIndex,
    updateRssIndex,
    rssPage,
    updateRssPage,
    feedlyIndex,
    updateFeedlyIndex,
    feedlyPage,
    updateFeedlyPage,
    textSummaries,
    updateTextSummaries,
    rssSummaries,
    updateRssSummaries,
    feedlySummaries,
    updateFeedlySummaries
  } = useContext(ContentContext);
  const { setLoading } = useContext(LoadingContext);
  const [curSection, setCurSection] = useState<"ai_text" | "summary">(
    "ai_text"
  );
  const [content, setContent] = useState<string>("");

  const handleUrlItemClick = useCallback(
    (url: string, currentIdx: number) => () => {
      if (type === "text") {
        updateTextIndex(currentIdx);
        const text = textSummaries[currentIdx]?.[curSection];
        if (text) {
          setContent(text);
          return;
        }
      } else if (type === "rss") {
        updateRssIndex(currentIdx);
        const text = rssSummaries[currentIdx]?.[curSection];
        if (text) {
          setContent(text);
          return;
        }
      } else {
        updateFeedlyIndex(currentIdx);
        const text = feedlySummaries[currentIdx]?.[curSection];
        if (text) {
          setContent(text);
          return;
        }
      }
      setLoading(true);
      axios
        .post(`${config.api_endpoint}/summarize/`, { urls: url })
        .then((response) => response.data)
        .then((response) => {
          const { summary_content, ai_content } = response;
          if (type === "text") {
            updateTextSummaries(
              textSummaries.map((summary, idx) =>
                idx === currentIdx
                  ? {
                      ...summary,
                      ai_text: ai_content,
                      summary: summary_content
                    }
                  : summary
              )
            );
          } else if (type === "rss") {
            updateRssSummaries(
              rssSummaries.map((summary, idx) =>
                idx === currentIdx
                  ? {
                      ...summary,
                      ai_text: ai_content,
                      summary: summary_content
                    }
                  : summary
              )
            );
          } else {
            updateFeedlySummaries(
              feedlySummaries.map((summary, idx) =>
                idx === currentIdx
                  ? {
                      ...summary,
                      ai_text: ai_content,
                      summary: summary_content
                    }
                  : summary
              )
            );
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [type, textSummaries, rssSummaries, feedlySummaries]
  );

  const handlePagePrev = useCallback(() => {
    if (type === "text") updateTextPage(textPage - 1);
    else if (type === "rss") updateRssPage(rssPage - 1);
    else updateRssPage(feedlyPage - 1);
  }, [type, textPage, rssPage, feedlyPage]);

  const handlePageNext = useCallback(() => {
    if (type === "text") updateTextPage(textPage + 1);
    else if (type === "rss") updateRssPage(rssPage + 1);
    else updateFeedlyPage(feedlyPage + 1);
  }, [type, textPage, rssPage, feedlyPage]);

  useEffect(() => {
    if (type === "text" && textSummaries[textIndex]?.[curSection]) {
      setContent(textSummaries[textIndex]?.[curSection]);
    } else if (type === "rss" && rssSummaries[rssIndex]?.[curSection]) {
      setContent(rssSummaries[rssIndex]?.[curSection]);
    } else if (
      type === "feedly" &&
      feedlySummaries[feedlyIndex]?.[curSection]
    ) {
      setContent(feedlySummaries[feedlyIndex]?.[curSection]);
    }
  }, [
    type,
    curSection,
    textIndex,
    textSummaries,
    rssIndex,
    rssSummaries,
    feedlyIndex,
    feedlySummaries
  ]);

  return (
    <div className="flex flex-1 flex-col gap-y-6 overflow-y-auto">
      <p className="text-center text-[40px] font-bold text-white">
        AI Summarize
      </p>
      <div className="flex flex-col items-center gap-y-6">
        <div className="grid w-full grid-cols-3 gap-3">
          {type === "text"
            ? textUrls
                .slice(textPage * 6, textPage * 6 + 6)
                .map((url, idx) => (
                  <TextUrlItem
                    key={idx}
                    url={url}
                    highlighted={idx + textPage * 6 === textIndex}
                    onItemClick={handleUrlItemClick(url, idx + textPage * 6)}
                  />
                ))
            : type === "rss"
            ? rssUrls
                .slice(rssPage * 6, rssPage * 6 + 6)
                .map((url, idx) => (
                  <RSSUrlItem
                    key={idx}
                    url={url}
                    highlighted={idx + rssPage * 6 === rssIndex}
                    onItemClick={handleUrlItemClick(
                      url.link,
                      idx + rssPage * 6
                    )}
                  />
                ))
            : feedlyUrls
                .slice(feedlyPage * 6, feedlyPage * 6 + 6)
                .map((url, idx) => (
                  <FeedlyUrlItem
                    key={idx}
                    url={url}
                    highlighted={idx + feedlyPage * 6 === feedlyIndex}
                    onItemClick={handleUrlItemClick(
                      url.link,
                      idx + feedlyPage * 6
                    )}
                  />
                ))}
        </div>
        <div className="flex gap-x-6">
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#3378BC] disabled:bg-gray-400"
            onClick={handlePagePrev}
            disabled={
              (type === "text"
                ? textPage
                : type === "rss"
                ? rssPage
                : feedlyPage) === 0
            }
          >
            <FaChevronLeft />
          </button>
          <button
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#3378BC] disabled:bg-gray-400"
            onClick={handlePageNext}
            disabled={
              ((type === "text"
                ? textPage
                : type === "rss"
                ? rssPage
                : feedlyPage) +
                1) *
                6 >=
              (type === "text"
                ? textUrls
                : type === "feedly"
                ? rssUrls
                : feedlyUrls
              ).length
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-end gap-y-4 overflow-y-auto">
        <div className="flex gap-x-2 text-white">
          <Button
            variant={curSection === "ai_text" ? "contained" : "outlined"}
            onClick={() => setCurSection("ai_text")}
            className="w-[200px]"
          >
            AI Text
          </Button>
          <Button
            variant={curSection === "summary" ? "contained" : "outlined"}
            onClick={() => setCurSection("summary")}
            className="w-[200px]"
          >
            Summary
          </Button>
        </div>
        <pre
          className="w-full flex-1 overflow-y-auto whitespace-pre-wrap rounded-xl border border-primary bg-black p-12 font-SFPro text-lg text-white"
          dangerouslySetInnerHTML={{ __html: content }}
        ></pre>
      </div>
    </div>
  );
};

export default Summary;
