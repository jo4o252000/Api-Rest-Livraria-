import RequisiçãoIncorreta from "./RequisiçãoIncorreta.js";

class ErroValidacao extends RequisiçãoIncorreta{
  constructor(error){
    const  mensagensErros = Object.values(error.errors).map(erro => erro.message).join("; ");
    super(`Os seguintes erros foram encontrados: ${mensagensErros}`);
  }
}

export default ErroValidacao;