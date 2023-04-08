import {autores, livros} from "../models/index.js";
//A controlador define a implementação do metodo 
//crianado uma class para armazenar os metodos 
class LivroController{

  static listarLivros = async (req, res, next) =>{
    try{
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;

      next();
    }catch(error){
      next(error);
    }
  };

  static listarLivroID = async (req, res, next) => {
    const id = req.params.id;
    try{
      await livros.findById(id)
        .populate("autor", "nome")
        .exec((livros) => {
          res.status(200).send(livros);
        });
    }catch(error){
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);
    try{
      await livro.save();
      res.status(200).send({mensage: "Livro cadastrado com sucesso"});
    }catch(error){  
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;
    try{
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({mensage: "Livro atualizado com sucesso"});
    }catch(error){
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;
    try{
      await livros.findByIdAndDelete(id);
      res.status(200).send({mensage: "livro deletado com sucesso"});
    }catch(error){
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    //busca especifica por editora recebendo um query params 
    //rota para acionar : http://localhost:3000/livros/busca?editra=Hogwarts inn
    //regex = expressão regulares    
    const busca = await processaBusca(req.query);

    if(busca !== null){
      try{
        const livroResultado = livros.find(busca).populate("autor");
        req.resultado = livroResultado;
        next();
      }catch(error){
        next(error);
      }
    }else{
      res.status(200).send([]);
    }
  };
}

async function processaBusca(parametros){
  const {editora,  titulo, minPaginas, maxPaginas, nomeAutor} = parametros;

  const regex = new RegExp(titulo, "i"); //criando uma regex nova
  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};
  if(minPaginas) busca.numeroPaginas = {$gte: minPaginas};
  if(maxPaginas) busca.numeroPaginas = {$lte: maxPaginas};
  if(nomeAutor) {
    const autor = await autores.findOne({nome: nomeAutor});

    if(autor !== null){
      busca.autor = autor._id;
    }else{
      busca = null;
    }
    
  }
  //  /mongoose/i o I ignora o maiusculo e minusculo
  return busca;
}

export default LivroController;