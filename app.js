const express = require("express");
const {randomUUID} = require("crypto");

const app = express();

app.use(express.json());

const tarefas = [];

app.post("/tarefas", (request, response) => {
    const body = request.body;
    
    const tarefa = {
        ...request.body,
        id:randomUUID()
        
    }

    tarefas.push(tarefa);

    console.log(tarefa);
    return response.json(tarefa);
});

app.get("/tarefas", (request, response) => {
    return response.json(tarefas);
});

app.get("/tarefas/:id", (request, response) => {
    const {id} = request.params;
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    
    return response.json(tarefa);
});

app.put("/tarefas/:id", (request, response) => {
    const {id} = request.params;

    const{titulo, descricao} = request.body;
    const tarefaIndex = tarefas.findIndex((tarefaIndex) => tarefaIndex.id === id);
    tarefas[tarefaIndex] = {
        ...tarefas,
        titulo,
        descricao,
    }

    return response.json({
        message: "Alterado com sucesso",
    })
})

app.listen(4001, () => console.log("servidor roda na porta 4001"));