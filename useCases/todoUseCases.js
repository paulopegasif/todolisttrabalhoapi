const { pool } = require('../config');
const Tarefa = require('../entities/tarefa')

const getTarefasDB = async () => {
    try {    
        const { rows } = await pool.query('SELECT * FROM tarefas order by codigo');
        return rows.map((tarefa) => new Tarefa(tarefa.codigo, tarefa.titulo));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addTarefaDB = async (body) => {
    try {
        const {codigo, titulo} = body;
        const results = await pool.query(`INSERT INTO tarefas (codigo, titulo)
                                        values ($1, $2)
                                        RETURNING codigo, titulo`,
                                        [codigo, titulo]);
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo);

    } catch(err) {
        throw "Erro ao inserir a tarefa: " + err;
    }
}

const updateTarefaDB = async (body) => {
    try {
        const {codigo, titulo} = body;
        const results = await pool.query(`UPDATE tarefas SET titulo=$1
                                        WHERE codigo=$2
                                        RETURNING codigo, titulo`,
                                        [codigo, titulo]);
        if(results.rowCount == 0){
            throw `Nenhuma tarefa encontrada com o código ${codigo} para ser alterada...`;
        }
        const tarefa = results.rows[0];
        return new Tarefa(tarefa.codigo, tarefa.titulo);

    } catch(err) {
        throw "Erro ao atualizar a tarefa: " + err;
    }
}

const deleteTarefaDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM tarefas WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhuma tarefa encontrada com o código ${codigo} para ser removida...`;

        } else {
            return `Tarefa de código: ${codigo} removida com sucesso!`;
        }

    } catch(err) {
        throw "Erro ao remover tarefa: " + err;
    }
}

const getTarefaPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`SELECT * FROM tarefas WHERE codigo=$1`, [codigo]);

        if (results.rowCount == 0){
            throw `Nenhuma tarefa encontrada com o código ${codigo} ...`;

        } else {
            const tarefa = results.rows[0];
            return new Tarefa(tarefa.codigo, tarefa.titulo);
        }

    } catch(err) {
        throw "Erro ao buscar tarefa por código: " + err;
    }
}

module.exports = {
    getTarefasDB, addTarefaDB, updateTarefaDB, deleteTarefaDB, getTarefaPorCodigoDB
}
