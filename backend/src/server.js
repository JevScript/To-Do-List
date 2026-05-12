const express = require('express');
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/tarefas', async(req, res)=>{
try{
    const tasks = await prisma.task.findMany({
        orderBy:{createdAt: 'desc' }
    })
    res.status(200).json(tasks);
}catch(err){
    res.status(500).json({err:"Erro ao buscar tarefas"})
}
})

app.post('/tarefas', async(req, res) =>{
const {title, descricao} = req.body;
try{
    const newTask = await prisma.task.create({
        data:{
            titulo,
            descricao,
            completa:false
        }
    })
    res.status(201).json(newTask);
}catch(err){
    res.status(400).json({err:"Erro ao criar tarefa"})
}
});

app.put('/tarefas/:id', async (req, res)=>{
    const {id} = req.params;
    const {titulo, descricao, completa} = req.body;
    try{
        const tarefaAtualizada = await prisma.task.update({
            where: {id: parseInt(id) },
            data: {titulo, descricao, completa}
        });
        res.status(200).json(tarefaAtualizada);
    }catch(err){
        res.status(400).json({err:"Erro ao atualizar tarefa"})
    }
});


