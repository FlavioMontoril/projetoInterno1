const express = require("express");
const {randomUUID} = require("crypto");
const { error } = require("console");
const cors  = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const tarefas = [];

app.post("/tarefas", (request, response) => {

    console.log("aqui",request.body);
    const {titulo, descricao} = request.body;

    const dataCriado = new Date().toISOString();

    if(!titulo || !descricao){
        return response.status(400).json({
            error: "Não possui todas as propriedades necessárias"
        });
    }
    
    const tarefa = {
        titulo,
        descricao,
        criado_em: dataCriado,
        status :'pendente',
        id:randomUUID(),
    }


    tarefas.push(tarefa);

    
    
    return response.status(201).json(tarefa); 
});

app.get("/tarefas", (request, response) => {
    console.log("CHEGOU AQUI")
    return response.json(tarefas.reverse());
});

app.get("/tarefas/:id", (request, response) => {
    const {id} = request.params;
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    
    return response.json(tarefa);
});

app.put("/tarefas/:id", (request, response) => {
    console.log(request.body);
    const {id} = request.params;
    const{titulo, descricao, criado_em} = request.body;
    const tarefaIndex = tarefas.findIndex((tarefaIndex) => tarefaIndex.id === id);

    if(tarefaIndex === -1 ){
        return response.status(400).json({
            error: "ID não confere ou não existe"
        });
    }

    
    tarefas[tarefaIndex] = {
        ...tarefas[tarefaIndex],
        titulo,
        descricao,
        criado_em,
    }

    return response.status(200).json({
        message: "Alterado com sucesso",
    })
})

app.delete("/tarefas/:id", (request, response) => {
    const {id} = request.params;
    const tarefa = tarefas.findIndex((tarefa) => tarefa.id === id);
    tarefas.splice(tarefa, 1);
    
    console.log(tarefa)
    return response.status(204).json({
        message: "Produto removido"
    });


});

app.listen(4001, () => console.log("servidor roda na porta 4001"));