import ErroBase from "./ErroBase.js";

class NaoEncotrado extends ErroBase{
  constructor(){
    super("pagina não encontrada ", 404);
  }
}   
export default NaoEncotrado;