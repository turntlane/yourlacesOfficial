const express = require("express");
const userRoutes = require("./Routes/routes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({
  path: "../.env",
});
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.json());

app.get("/", (req, res) => {
  res.send(200, {
    message: "Hello There",
  });
});

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
