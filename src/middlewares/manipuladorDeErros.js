import mongoose from "mongoose";
import erroBase from "../erros/erroBase.js";
import requisicaoIncorreta from "../erros/requisicaoIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";
import ErroBase from "../erros/erroBase.js";

function manipuladorDeErros(erro, req, res, next) {
    if(erro instanceof mongoose.Error.CastError) {
        new requisicaoIncorreta().enviarResposta(res);
    } else if(erro instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(erro).enviarResposta(res);
    }else if(erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } else {
        new erroBase().enviarResposta(res);
    }
}
export default manipuladorDeErros;