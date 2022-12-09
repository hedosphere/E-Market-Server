import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import myDatabase from "./utils/moongose";
import cookieParser from "cookie-parser";

require("dotenv").config();
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
//
// RandomNumber();
// console.log(9090);
myDatabase(process.env.MONGOOSE_DATABASE);

//
readdirSync("./routes").map((d) =>
  app.use("/api/v1", require("./routes/" + d))
);

// app.get("/api/v1/home",);
//

//

app.listen(port, () => {
  console.log("App runs on port: " + port);
});
