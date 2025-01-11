const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server");
const { connect } = require("./config/db");
const apiRoutes = require("./routes/index.js");

async function runServer() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    await connect();
    console.log("Connected to database");
    console.log(`Listening on port ${PORT}!`);
    console.log(`http://localhost:${PORT}`);
  });
}
runServer();
