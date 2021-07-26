const express = require("express");
const app = express();
require('dotenv').config()

const port =  process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({gg: "Hello World!"});
});

app.listen(port, () => {
  console.log(`server starting on port http://localhost:${port}`);
});