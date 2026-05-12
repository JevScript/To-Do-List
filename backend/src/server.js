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
