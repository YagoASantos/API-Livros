import erroBase from "./erroBase.js";

class requisicaoIncorreta extends erroBase {
    constructor(mensagem = 'Um ou mais dados fornecidos estão incorretos') {
        super(mensagem, 400);
    }
}
export default requisicaoIncorreta;