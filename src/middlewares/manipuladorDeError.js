import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisiçãoIncorreta from "../erros/RequisiçãoIncorreta.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next){
  if(error instanceof mongoose.Error.CastError){
    new RequisiçãoIncorreta().enviarResposta(res);
  }else if(error instanceof mongoose.Error.ValidationError){
    new ErroValidacao(error).enviarResposta(res);
  }else if(error instanceof ErroBase){
    error.enviarResposta(res);
  }else{
    new ErroBase().enviarResposta(res);
  }
}
export default manipuladorDeErros;