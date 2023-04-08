import RequisiçãoIncorreta from "../erros/RequisiçãoIncorreta.js";

async function paginar(req, res, next){
  try{
    let {limite = 5, pagina = 1, ordenacao = "_id:-1"} = req.query; //paginação 

    let [campoOrdenenacao, ordem] = ordenacao.split(":");//quebrando a variavel ordenacao pelo ':'

    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if(pagina > 0){
      const resultadoPaginado = await resultado.find()
        .sort({[campoOrdenenacao]: ordem})//ordenando os resultados
        .skip((pagina - 1) * limite)/*Numero de pagina -1, mutiplicado pela quantidade de lvros que é mostrada por pagina*. Sendo assim consegue extrair a quantidade de livros que te que ser pulada para mostrar na pagina correta*/
        .limit(limite);
      res.status(200).json(resultadoPaginado);
    }else{
      next(new RequisiçãoIncorreta());
    }   
  }catch (error){
    next(error);
  } 
}
export default paginar;