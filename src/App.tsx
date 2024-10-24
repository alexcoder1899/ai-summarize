import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import UrlUpload from "./pages/UrlUpload";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="url-upload" element={<UrlUpload />} />
          <Route path="summary" element={<Summary />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
