import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/HomePage";
import { PostsPage } from "./pages/PostsPage";
import { SinglePostPage } from "./pages/SinglePostPage";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:slug" element={<SinglePostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
