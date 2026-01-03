import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.js"

// biome-ignore lint/correctness/useImportExtensions: css import
import "./style.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
