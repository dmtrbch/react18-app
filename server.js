import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // __dirname is whatever directory we are in

const PORT = process.env.PORT || 3001;

// write some method that calls that api every five minutes and cash the result

const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString(); // our project is gonna build an html file and we are going to read that html file; where the css is, where the js is...

const parts = html.split("not rendered"); // split index.html in two parts (the initial part and the "react" part)

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

// everything that is not server as a static asset, let react handle
app.use((req, res) => {
  res.write(parts[0]);

  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res); // this is the important thing, the response object and the react stream are being connected to each other
      // if seo is really important rendering things to stream can be a problem because it's slow, we might do
      // it it is the crawler do nothing here
    },
    onShellError() {
      // do error handling here -> log out to error service
    },
    onAllReady() {
      // last thing to write

      //it it is the crawler then stream.pipe(res) here
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
