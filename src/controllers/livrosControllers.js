import livros from "../models/Livro.js";
//A controlador define a implementação do metodo 
//crianado uma class para armazenar os metodos 
class LivroController{

    static listarLivros = (req, res) =>{
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static listarLivroID = (req, res) => {
        const id = req.params.id

        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livros) => {
                if(err){
                    res.status(400).send({message: `${err.message} - id do livro não localizado. `})
                }else{
                    res.status(200).send(livros);
                }
        })
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body)

        livro.save((err) => {
            if(err){
                res.status(500).send({mesage: `${err.message} - falha ao cadastrar livro.`})
            }else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Livro atualizado com suceso'})
            }else{
                res.status(500).send({message: err.message})
            }
        })
    }

    static excluirLivro = (req, res) => {
        const id = req.params.id

        livros.findByIdAndDelete(id, (err) => {
            if(!err){
                res.status(200).send({message: 'livros removido com sucesso'})
            }else{
                res.status(500).send({message: err.message})
            }
        })
    }

    static listarLivrosPorEditora = (req, res) => {
        //busca especifica por editora recebendo um query params 
        //rota para acionar : http://localhost:3000/livros/busca?editora=Hogwarts inn
        const editora = req.query.editora

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    }
}

export default LivroController