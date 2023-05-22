import livros from "../models/Livro.js";

class livroController {

    static listarLivros = async (req, res) => {
        try{
            await livros.find().populate('autor').exec();
            res.status(200).json(livros);
        } catch(err) {
            res.status(500).json({message: 'Erro interno no banco.'})
        }
    }
    static listarLivroPorId = async (req, res) => {
        try{
            const id = req.params.id;
            await livros.findById(id).populate('autor').exec();
            res.status(200).send(livros);
        } catch(err) {
            res.status(400).send({message: `${err.message} - Id não encontrado.`});
        }
    }
    static cadastrarLivro = async (req, res) => {
        try{
            let livro = new livros(req.body);
            await livro.save();

            res.status(201).send(livro.toJSON());
        } catch(err) {
            res.status(500).send({message: `${err.message} - falha ao cadastrar livro`})
        }
    }
    static atualizarLivro = async (req, res) => {
        try{
            const id = req.params.id;
            await livros.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: 'Livro atualizado com sucesso!'});
        } catch(err) {
            res.status(500).send({message: err.message});
        }
    }
    static excluirLivro = async (req, res) => {
        try{
            const id = req.params.id;
            await livros.findByIdAndDelete(id);

            res.status(200).send({ message: "Livro excluído com sucesso." });
        } catch(err) {
            res.status(500).send({ message: `${err.message} - Id não encontrado`});
        }
    }
    static listarLivroPorEditora = async (req, res) => {
        try{
            const editora = req.query.editora;
            await livros.find({":editora": editora}, {});

            res.status(200).send(livros);
        } catch(err) {
            res.status(400).json({message: `Editora ${editora} não encontrado(a).`});
        }
    }
}
export default livroController;