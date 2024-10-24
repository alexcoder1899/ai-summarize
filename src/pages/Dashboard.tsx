import { useContext, useState } from "react";
import clsx from "clsx";

import Button from "@/components/common/Button";
import { ContentContext, ContentType } from "@/contexts/ContentContext";
import { TextIcon } from "@/components/icons/TextIcon";
import { RSSIcon } from "@/components/icons/RSSIcon";
import { FeedlyIcon } from "@/components/icons/FeedlyIcon";

const tabItems = [
  {
    title: "Text",
    name: "text",
    icon: <TextIcon width={32} height={32} />
  },
  {
    title: "RSS",
    name: "rss",
    icon: <RSSIcon width={32} height={32} />
  },
  {
    title: "Feedly",
    name: "feedly",
    icon: <FeedlyIcon width={32} height={32} />
  }
];

const Dashboard: React.FC = () => {
  const { updateType } = useContext(ContentContext);
  const [contentType, setContentType] = useState<ContentType>("");

  const handleContinue = () => {
    updateType(contentType);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-[600px] rounded-md border border-primary bg-black px-8 py-20">
        <div className="flex flex-col items-center">
          <p className="text-center text-[48px] font-bold leading-[60px] text-white">
            Select A Format To Use For Your Upload
          </p>
          <div className="mt-[32px] flex gap-x-3.5">
            {tabItems.map((item, index) => (
              <div key={index}>
                <span
                  className={clsx(
                    "flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full border border-primary-border hover:bg-primary/50",
                    { "!bg-primary": contentType === item.name }
                  )}
                  onClick={() => setContentType(item.name as ContentType)}
                >
                  {item.icon}
                </span>
                <p className="mt-2 text-center text-white">{item.title}</p>
              </div>
            ))}
          </div>
          <Button
            className="mt-[50px] font-bold text-white"
            onClick={handleContinue}
            disabled={contentType === ""}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
