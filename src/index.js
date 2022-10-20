import express  from "express";
import multer from "multer";
import talesRoutes from "./routes/tales.routes.js";
import { PORT } from "./config.js";
import "./config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(talesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found"
  })
})

app.use(multer);

app.listen(PORT);