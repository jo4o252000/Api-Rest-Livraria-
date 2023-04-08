import {autores} from "../models/index.js";
//A controlador define a implementação do metodo 
//crianado uma class para armazenar os metodos 
class AutorController{

  static listarAutores = async (req, res, next) =>{
    try{
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;
      next();
    }catch (error){
      next(error);
    }
  };

  static listarAutorID = async (req, res, next) => {
    const id = req.params.id;
    try{
      const autoresResultadoId = await autores.findById(id);
      if(autoresResultadoId !== null){
        res.status(200).json(autoresResultadoId);
      }else{
        res.status(404).json({mensage:"Id do autor não encontrado"});
      }
    }catch (error){
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);
    try{
      await autor.save();
      res.status(200).json({mensage:"Autor cadastrado com sucesso"});
    }catch (error){
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;
    try{
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).json({mensage:"autor atualizado com sucesso"});
    }catch (error){
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;

    try{
      await autores.findByIdAndDelete(id);
      res.status(200).json({mensage: "Autor deletado com sucesso"});
    }catch(error){
      next(error);
    }
  };
}

export default AutorController;