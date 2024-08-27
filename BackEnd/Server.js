const express = require("express");
const path = require("path");
// const cors = require("cors");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const UserRouter = require("./Router/AuthRouter");
const ConnectDb = require("./Config/DbConnect");
const { handlErrors, NotFound } = require("./Middlware/handlError");
const cookieParser = require("cookie-parser");
ConnectDb();
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", UserRouter);

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    console.log("Serving static files from:", path.join(__dirname, "../frontend/dist"));
    
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("*", (req, res) => {
      console.log("Sending file:", path.resolve(__dirname, "../","frontend", "dist", "index.html"));
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  } else {
    app.get("/", (req, res) => {
      console.log("API is running...");
      res.send("API is running...");
    });
  }
  
app.use(handlErrors);
app.use(NotFound);
app.listen(port, () => console.log(` app listening on port ${port}!`));
