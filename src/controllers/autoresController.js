import autores from "../models/Autor.js";
import mongoose from "mongoose";

class autorController {

    static listarAutores = async (req, res) => {
        try{
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        } catch (err) {
            res.status(500).json({message: "Houve um erro no servidor."})
        }
    }
    static listarAutorPorId = async (req, res) => {
        try{
            const id = req.params.id;

            const autorResultado = await autores.findById(id);
            if(autorResultado){
                res.status(200).send(autorResultado);
            } else {
                res.status(404).send({message: 'Id não encontrado.'});
            }
        } catch(err) {
            if(err instanceof mongoose.Error.CastError) {
                res.status(400).send({message: 'Um ou mais dados fornecidos estão incorretos.'});
            } else {
                res.status(500).send({message: 'Erro interno de servidor.'});
            }
        }
    }
    static cadastrarAutor = async (req, res) => {
        try{
            let autor = new autores(req.body);

            await autor.save();
            res.status(201).send(autor.toJSON());
        } catch(err) {
            res.status(500).send({message: `${err.message} - falha ao cadastrar autor`})
        }
    }
    static atualizarAutor = async (req, res) => {
        try{
            const id = req.params.id;
            const attResultado = autores.findByIdAndUpdate();
            res.status(200).send({message: 'Autor atualizado com sucesso!'});
        } catch(err) {
            res.status(500).send({message: err.message});
        }
    }
    static excluirAutor = async (req, res) => {
        try {
            const id = req.params.id;

            const deleteAutor = autores.findByIdAndDelete(id)
            res.status(200).send({message: "Autor excluído com sucesso."});
        } catch (err) {
            res.status(500).send({message: `${err.message} - Id não encontrado`});
        }
    }
}
export default autorController;