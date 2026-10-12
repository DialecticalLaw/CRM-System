import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { App } from "./App";
import { Board } from "./pages/Board/Board";
import { TaskList } from "./pages/TaskList/TaskList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Navigate to="/board" replace />} />
          <Route path="board" element={<Board />} />
          <Route path="task-list" element={<TaskList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
