import { renderToPipeableStream } from "react-dom/server"; // run our application in node stream - it will progresively render our app
import { StaticRouter } from "react-router-dom/server"; // react router that can be run in Node
import App from "./App";

export default function render(url, opts) {
  const stream = renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );

  return stream;
}
