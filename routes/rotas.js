const { Router } = require('express');

const tarefasController = require('../controllers/tarefasController');

const rotas = new Router();

rotas.route('/tarefas')
     .get(tarefasController.getTarefas)
     .post(tarefasController.addTarefa)
     .put(tarefasController.updateTarefa)

rotas.route('/tarefas/:codigo')
     .get(tarefasController.getTarefaPorCodigo)
     .delete(tarefasController.deleteTarefa)

module.exports = rotas;
