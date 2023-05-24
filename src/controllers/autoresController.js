import { autores } from "../models/index.js";
import naoEncontrado from "../erros/naoEncontrado.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

class autorController {

    static listarAutores = async (req, res) => {
        try{
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (err) {
            next(err);
        }
    }
    static listarAutorPorId = async (req, res, next) => {
        try{
            const id = req.params.id;

            const autorResultado = await autores.findById(id);
            if(autorResultado){
                res.status(200).send(autorResultado);
            } else {
                next(new naoEncontrado('Id não encontrado.'));
            }
        } catch(err) {
            next(err);
        }
    }
    static cadastrarAutor = async (req, res, next) => {
        try{
            let autor = new autores(req.body);

            await autor.save();
            res.status(201).send(autor.toJSON());
        } catch(err) {
            next(err);
        }
    }
    static atualizarAutor = async (req, res, next) => {
        try{
            const id = req.params.id;
            const attResultado = autores.findByIdAndUpdate();

            if(attResultado) {
                res.status(200).send({message: 'Autor atualizado com sucesso!'});
            } else {
                next(new NaoEncontrado('Id não encontrado.'));
            }

        } catch(err) {
            next(err);
        }
    }
    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            const deleteAutor = autores.findByIdAndDelete(id)

            if(deleteAutor) {
                res.status(200).send({message: "Autor excluído com sucesso."});
            } else {
                next(new NaoEncontrado('Id não encontrado.'));
            }
        } catch (err) {
            next(err);
        }
    }
}
export default autorController;