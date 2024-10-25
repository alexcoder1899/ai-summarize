import axios from "axios";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Header from "./Header";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { ContentContext, LoadingContext } from "@/contexts";
import config from "@/config";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, setLoading } = useContext(LoadingContext);
  const { type, textUrls, rssUrls, feedlyUrls, updateFeedlyUrls } =
    useContext(ContentContext);

  useEffect(() => {
    if (type === "") navigate("/");
    else if (type !== "feedly")
      navigate(
        (type === "text" ? textUrls : rssUrls).length > 0
          ? "/summary"
          : "/url-upload"
      );
    else {
      if (feedlyUrls.length > 0) {
        return navigate("/summary");
      }
      setLoading(true);
      axios
        .get(`${config.api_endpoint}/feed/`)
        .then((response) => response.data)
        .then((response: any[]) => {
          updateFeedlyUrls(response);
          if (response.length > 0) navigate("/summary");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [type, textUrls, rssUrls, feedlyUrls]);

  return (
    <div className="h-screen w-screen bg-primary-background">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center">
            <LogoIcon width={120} height={120} />
            <p className="mt-6 text-center text-[24px] font-bold text-white">
              One Moment
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <Header />
          <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col overflow-y-auto py-8">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
