const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const codePath = require("./routers/codeRouter");

app.use(express.json());
app.use(cors());

app.use("/todo", codePath);

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}`);
});
