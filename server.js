const express = require("express");
const app = express();
const port = 3000;
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./routes/apiRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.get("/", async (req, res) => {
  res.send({ mesaage: "Api is running" });
});

//mongo connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
