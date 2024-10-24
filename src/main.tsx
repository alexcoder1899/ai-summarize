import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import { LoadingProvider, ContentProvider } from "./providers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LoadingProvider>
    <ContentProvider>
      <App />
      <Toaster />
    </ContentProvider>
  </LoadingProvider>
);
