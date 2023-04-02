const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require("./src/routes/routes"));

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
