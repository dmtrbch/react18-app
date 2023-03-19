import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootDiv: HTMLElement = document.getElementById("root")!;

hydrateRoot(
  rootDiv,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
