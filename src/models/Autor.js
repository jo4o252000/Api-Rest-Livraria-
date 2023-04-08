import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "O nome do(a) é obrigatorio"]//mensagem de erro persinalizada
    },
    nacionalidade: {type: String}
  },
  {
    //versionamento do modelo
    versionKey: false
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;