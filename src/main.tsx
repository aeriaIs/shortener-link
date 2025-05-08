import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import App from "./App.tsx";
import RedirectRoute from "./redirect-route.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes location={location}>
        <Route path="/" element={<App />} />
        <Route path="/:parsedUrl" element={<RedirectRoute />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
