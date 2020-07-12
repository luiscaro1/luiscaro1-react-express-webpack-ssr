import React from "react";
import path from "path";
import express from "express";
import { renderToString } from "react-dom/server";
import App from "../../client/src/App";
const app = express();

app.use(express.static(__dirname));

const handleRender = (req, res) => {
  const html = renderToString(<App />);
  res.send(renderFullPage(html));
};

const renderFullPage = (html) => {
  return `
  <!doctype html>
  <html>
    <head>
      <title>Redux Universal Example</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `;
};

app.get("*", handleRender);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});
