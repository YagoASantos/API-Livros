import { livros, autores } from "../models/index.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class livroController {

    static listarLivros = async (req, res, next) => {
        try{
            const buscaLivros = livros.find();

            req.resultado = buscaLivros;

            next();
        } catch(err) {
            next(err);
        }
    }
    static listarLivroPorId = async (req, res, next) => {
        try{
            const id = req.params.id;
            const livro = await livros.findById(id).populate('autor').exec();

            if(livro) {
                res.status(200).send(livro);
            } else {
                next(new NaoEncontrado('Id não encontrado.'));
            }
        } catch(err) {
            next(err);
        }
    }
    static cadastrarLivro = async (req, res, next) => {
        try{
            let livro = new livros(req.body);
            await livro.save();

            res.status(201).send(livro.toJSON());
        } catch(err) {
            next(err);
        }
    }
    static atualizarLivro = async (req, res, next) => {
        try{
            const id = req.params.id;
            const livro = await livros.findByIdAndUpdate(id, {$set: req.body});

            if(livro) {
                res.status(200).send({message: 'Livro atualizado com sucesso!'});
            } else {
                next(new NaoEncontrado('Id não encontrado.'));
            }
        } catch(err) {
            next(err);
        }
    }
    static excluirLivro = async (req, res, next) => {
        try{
            const id = req.params.id;
            const livro = await livros.findByIdAndDelete(id);

            if (livro) {
                res.status(200).send({ message: "Livro excluído com sucesso." });
            } else {
                next(new NaoEncontrado('Id não encontrado'));
            }

        } catch(err) {
            next(err);
        }
    }
    static listarLivroPorFiltro = async (req, res, next) => {
        console.log('teste');
        try{
            const busca = processaBusca(req.query);
            if(busca !== null) {
                const livrosResultado = await livros
                    .find(busca)
                    .populate("autor");

                res.status(200).send(livrosResultado);
            } else {
                res.status(200).send([]);
            }
            console.log(livrosResultado)
        } catch(err) {
            next(err);
        }
    }
}

async function processaBusca(parametros) {
    const { editora, titulo, maxPaginas, minPaginas, nomeAutor } = parametros;

    // const regex = new RegExp(titulo, 'i');
    let busca = {};

    if(editora) busca.editora = editora;
    if(titulo) busca.titulo = { $regex: titulo, $options: 'i' };

    if(maxPaginas || minPaginas) busca.numeroPaginas = {};

    if(minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

    if(nomeAutor) {
        const autor = await autores.findOne(nomeAutor);

        if(autor){
            busca.autor = autor._id;
        } else {
            busca = null;
        }
    };

    return busca;
}
export default livroController;