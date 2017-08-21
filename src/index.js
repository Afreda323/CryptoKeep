import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import {config} from "./config";

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());

mongoose.promise = Promise;
mongoose
  .connect(config.mongo)
  .then(() => console.log("Mongo connected"))
  .catch(e => console.log("Mongo failed to connect"));

app.listen(config.port, function() {
  console.log(`App up on ${config.port}`);
});
