const express = require("express");
const userRoutes = require("./Routes/routes");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./Config/dbConn");
const path = require("path");
const bodyParser = require("body-parser");
const { logger, logEvents } = require("./Middleware/logger");
const errorHandler = require("./Middleware/errorHandler");
// const cookieParser = require("cookie-parser");xwx
const corsOptions = require("./Config/corsOption");
const port = 4000;

// app.use(logger);

connectDb();

app.use(cors(corsOptions));

app.use(express.json());

// app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send(200, {
//     message: "Hello There",
//   });
// });

app.use("/api/v1/users", userRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
