import express  from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js"
//o arquivo de route vai definir oq vai acontecer a cada rota 
const router = express.Router();//roteamento do express

router //caso chame a rota '/autores' com o metodo GET ira acionar a classe AutorController
  .get("/autores", AutorController.listarAutores, paginar)
  .get("/autores/:id", AutorController.listarAutorID)
  .post("/autores", AutorController.cadastrarAutor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;