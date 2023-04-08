/* eslint-disable no-unused-vars */
import express from "express";
import db from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeError.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));//uma forma de prever o erro 
db.once("open", () => {//Abrir a conexão com o mongo
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;