//QUANDO SE TRATA DE COLEÇÃO/ENTIDADE O NOME DO ARQUIVO COMEÇA COM MAIUSCULO E SEMPRE NO SINGULAR 
//esse arquivo vai ser um schema 
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "Titulo é obrigatorio"]},
    autor: {type: mongoose.Schema.Types.ObjectId ,ref: "autores" , required: [true, "Autor é obrigatorio"] },
    editora: {type: String, required:[true, "Editora é obrigatorio"], enum: { values: ["Casa do cdigo", "alura"], message: "A editora {VALUE} fornecida não é um valor permitido"}},
    numeroPaginas: {
      type: String,
      validate: {
        validator: (valor)=>{//validador personalizado
          return valor >= 10 && valor <= 5000;
        },
        message: "O numero de paginas deve estar entre 10 e 5000"
      }
    }
  }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;