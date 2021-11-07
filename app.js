const express = require("express");

const app = express();

const mangaRoute = require("./routes/manga");

app.use(express.json());
app.use("/api/manga", mangaRoute);
app.use("/avatar", express.static(__dirname+"/avatar/"));

module.exports = app;