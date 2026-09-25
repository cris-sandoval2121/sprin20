import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createUser, login } from "./controllers/users.js";
import auth from "./middlewares/auth.js";
import errors from "./middlewares/errors.js";
import { errorLogger, requestLogger } from "./middlewares/logger.js";
import {
  validateAuthHeaders,
  validateSignin,
  validateSignup,
} from "./middlewares/validation.js";
import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cards.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/aroundb";

app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.options("{*splat}", cors());

mongoose.connect(MONGO_URL);

app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);

app.use(validateAuthHeaders);
app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  const error = new Error("Recurso solicitado no encontrado");
  error.statusCode = 404;
  next(error);
});

app.use(errorLogger);
app.use(errors);

mongoose.connection.once("open", () => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Error de conexión a MongoDB:", err);
});
