import axios from "axios";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

import Button from "@/components/common/Button";
import { ContentContext } from "@/contexts/ContentContext";
import { LoadingContext } from "@/contexts";
import config from "@/config";

const UploadByText: React.FC = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>("No file selected");
  const { updateTextUrls, updateTextSummaries } = useContext(ContentContext);

  const handleFileOpen = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFilename(files[0].name);
    }
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleUpload = () => {
    if (fileRef.current && fileRef.current.files) {
      const file = fileRef.current.files[0];
      file
        .text()
        .then((response) => {
          const lines = response
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line);
          updateTextUrls(lines);
          updateTextSummaries(lines.map(() => ({ ai_text: "", summary: "" })));
          navigate("/summary");
        })
        .finally(() => {});
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-[500px] rounded-md border border-primary bg-black px-8 pb-24 pt-12 text-white">
        <p className="text-center text-[40px]">Upload A Text File</p>
        <div className="mt-24 flex items-center justify-between rounded-xl border border-primary px-4 py-3">
          <p>{filename}</p>
          <span
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#19163C] text-[14px] text-white"
            onClick={handleFileOpen}
          >
            <FaPlus />
          </span>
          <input
            ref={fileRef}
            accept=".txt"
            type="file"
            onChange={handleFileChange}
            hidden
          />
        </div>
        <div className="mt-16 flex justify-center gap-x-2">
          <Button variant="outlined" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={
              !fileRef.current ||
              !fileRef.current.files ||
              fileRef.current.files.length === 0
            }
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

const UploadXMLUrl: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { updateRssUrls, updateRssSummaries } = useContext(ContentContext);
  const [url, setUrl] = useState<string>("");

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleAddClick = () => {
    if (!url) return;
    setLoading(true);
    axios
      .post(`${config.api_endpoint}/parse_feed/`, { urls: url })
      .then((response) => response.data)
      .then((response: any[]) => {
        updateRssUrls(response);
        updateRssSummaries(response.map(() => ({ ai_text: "", summary: "" })));
        navigate("/summary");
        setUrl("");
      })
      .catch(() => {
        toast.error("Unsupported rss format.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-[500px] rounded-md border border-primary bg-black px-8 pb-24 pt-12 text-white">
        <p className="text-center text-[40px]">Enter XML URL</p>
        <input
          value={url}
          className="mt-24 flex w-full items-center justify-between rounded-xl border border-primary bg-transparent px-4 py-3"
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="mt-16 flex justify-center gap-x-2">
          <Button variant="outlined" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button onClick={handleAddClick} disabled={!url}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

const UrlUpload: React.FC = () => {
  const { type } = useContext(ContentContext);

  return type === "text" ? (
    <UploadByText />
  ) : type === "rss" ? (
    <UploadXMLUrl />
  ) : (
    <></>
  );
};

export default UrlUpload;
