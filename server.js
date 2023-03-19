import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // __dirname is whatever directory we are in

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
const PORT = process.env.PORT || 3001;

// write some method that calls that api every five minutes and cash the result

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const html = fs
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString(); // our project is gonna build an html file and we are going to read that html file; where the css is, where the js is...

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const parts = html.split("not rendered"); // split index.html in two parts (the initial part and the "react" part)

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
app.use(
  "/assets",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

// everything that is not server as a static asset, let react handle
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
app.use((req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  res.write(parts[0]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      res.write(parts[1]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
console.log(`listening on http://localhost:${PORT}`);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
app.listen(PORT);
