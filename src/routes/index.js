import express from "express";
import livrosRoutes from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

//criar rotas, o conjunto de todas as rotas que vai ter no sistema 

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({titulo: "Curso de node"});
  });
  app.use(
    express.json(),
    livrosRoutes,
    autores
  );    
};

export default routes;