import { useContext } from "react";
import clsx from "clsx";

import { TextIcon } from "@/components/icons/TextIcon";
import { RSSIcon } from "@/components/icons/RSSIcon";
import { FeedlyIcon } from "@/components/icons/FeedlyIcon";
import { ContentContext, ContentType } from "@/contexts/ContentContext";
import Logo from "/logo.png";
import { useLocation } from "react-router-dom";

const tabItems = [
  {
    title: "Text",
    name: "text",
    icon: <TextIcon width={16} height={16} />
  },
  {
    title: "RSS",
    name: "rss",
    icon: <RSSIcon width={20} height={20} />
  },
  {
    title: "Feedly",
    name: "feedly",
    icon: <FeedlyIcon width={20} height={20} />
  }
];

const RootRoute = "/";

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { type, updateType } = useContext(ContentContext);

  return (
    <header className="relative flex px-[42px] py-[30px]">
      <div className="flex flex-1 justify-center">
        <img src={Logo} alt="Logo" className="w-[300px]" />
      </div>
      {pathname !== RootRoute && (
        <div className="absolute right-[42px] top-[30px] flex gap-x-3.5">
          {tabItems.map((item, index) => (
            <div key={index}>
              <span
                className={clsx(
                  "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-primary-border hover:bg-primary/50",
                  { "!bg-primary": type === item.name }
                )}
                onClick={() => updateType(item.name as ContentType)}
              >
                {item.icon}
              </span>
              <p className="text-center text-white">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
export { tabItems };
