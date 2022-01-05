const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes.root);
app.use(routes.showRoute);

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});