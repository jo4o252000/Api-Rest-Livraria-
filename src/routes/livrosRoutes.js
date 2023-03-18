import express  from "express";
import LivroController from "../controllers/livrosControllers.js";
//o arquivo de route vai definir oq vai acontecer a cada rota 
const router = express.Router()//roteamento do express

router //caso chame a rota '/livros' com o metodo GET ira acionar a classe LivroController
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca/", LivroController.listarLivrosPorEditora)
    .get("/livros/:id", LivroController.listarLivroID)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.excluirLivro)

export default router