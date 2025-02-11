import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/toaster.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>

      <App />
    </DndProvider>
    <Toaster />
  </StrictMode>
);
