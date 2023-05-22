import express from "express";
import autorController from "../controllers/autoresController.js";

const router = express.Router();

router.get('/autores', autorController.listarAutores)
    .post("/autores", autorController.cadastrarAutor)
    .put("/autores/:id", autorController.atualizarAutor)
    .get("/autores/:id", autorController.listarAutorPorId)
    .delete("/autores/:id", autorController.excluirAutor);
export default router;